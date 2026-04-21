#!/usr/bin/env python3
"""
Deduplicate PET and FCE sections in englishWords.js.
Run from the project root: python3 fix_words.py

This script removes duplicate word entries (case-insensitive, keeps first occurrence)
from the PET and FCE sections of src/data/englishWords.js.
"""
import re, sys

filepath = 'src/data/englishWords.js'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Regex to match a single word entry line
ENTRY_LINE_RE = re.compile(
    r"^\s*\{\s*word:\s*'([^']+)',"
)

def find_section_bounds(lines, start_marker, end_marker):
    """Find the line indices where a section starts and ends."""
    start = None
    for i, line in enumerate(lines):
        s = line.strip()
        if start is None and start_marker in s:
            start = i
        elif start is not None and end_marker in s and end_marker not in start_marker:
            return start, i
    return start, len(lines) - 1

# Find PET section bounds
pet_start = None
pet_end = None
fce_start = None
fce_end = None

for i, line in enumerate(lines):
    s = line.strip()
    if s == 'PET: [':
        pet_start = i
    elif pet_start is not None and pet_end is None and '// B2 First (FCE)' in s:
        pet_end = i  # End of PET section (exclusive)
    elif s == 'FCE: [':
        fce_start = i
    elif fce_start is not None and fce_end is None and s in ('}', '}'):
        fce_end = i + 1  # End of FCE section (exclusive)

if None in (pet_start, pet_end, fce_start, fce_end):
    print(f"ERROR: Could not find all section bounds!")
    print(f"  PET: {pet_start}-{pet_end}, FCE: {fce_start}-{fce_end}")
    sys.exit(1)

print(f"PET section: lines {pet_start+1}-{pet_end} ({pet_end - pet_start} lines)")
print(f"FCE section: lines {fce_start+1}-{fce_end} ({fce_end - fce_start} lines)")

def dedup_section(section_lines):
    """Remove duplicate word entries, keeping first occurrence (case-insensitive)."""
    seen = set()
    result = []
    removed = 0
    for line in section_lines:
        m = ENTRY_LINE_RE.match(line)
        if m:
            word_lower = m.group(1).lower()
            if word_lower in seen:
                removed += 1
                continue
            seen.add(word_lower)
        result.append(line)
    return result, removed

# Dedup PET
pet_lines = lines[pet_start:pet_end]
pet_deduped, pet_removed = dedup_section(pet_lines)
print(f"PET: removed {pet_removed} duplicates")

# Dedup FCE
fce_lines = lines[fce_start:fce_end]
fce_deduped, fce_removed = dedup_section(fce_lines)
print(f"FCE: removed {fce_removed} duplicates")

# Reconstruct file
new_lines = (
    lines[:pet_start] +
    pet_deduped +
    lines[pet_end:fce_start] +
    fce_deduped +
    lines[fce_end:]
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("File written successfully.")

# Verification
with open(filepath, 'r', encoding='utf-8') as f:
    final_lines = f.readlines()

final_content = ''.join(final_lines)

def count_section_words(content, section_name):
    pat = re.compile(
        rf"{re.escape(section_name)}:\s*\[(.*?)(?=\n  (?:KET|PET|FCE):\s*\[|\n\}})",
        re.DOTALL
    )
    m = pat.search(content)
    if not m:
        return 0, 0
    body = m.group(1)
    words = re.findall(r"word:\s*'([^']+)'", body)
    words_lower = [w.lower() for w in words]
    dupes = len(words_lower) - len(set(words_lower))
    return len(words), dupes

print("\nVerification:")
for sec in ['KET', 'PET', 'FCE']:
    count, dupes = count_section_words(final_content, sec)
    print(f"  {sec}: {count} words, {dupes} remaining duplicates")

# Grade counts
grade_body_match = re.search(r'export const GRADE_WORDS = \{(.*?)\n\}', final_content, re.DOTALL)
if grade_body_match:
    grade_body = grade_body_match.group(1)
    for g in ['3', '4', '5', '6']:
        gm = re.search(rf'{g}:\s*\[(.*?)(?=\n  \d+:|\n\}})', grade_body, re.DOTALL)
        if gm:
            wds = re.findall(r"word:\s*'([^']+)'", gm.group(1))
            print(f"  Grade {g}: {len(wds)} words")
