#!/usr/bin/env python3
"""Generate beautiful 3D-style card images for the kids learning platform."""

from PIL import Image, ImageDraw, ImageFont
import os, math

OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'icons')
os.makedirs(OUT_DIR, exist_ok=True)

W, H = 320, 200
RADIUS = 24

# Font paths
HEITI = '/System/Library/Fonts/STHeiti Medium.ttc'
ARIAL_UNICODE = '/System/Library/Fonts/Supplemental/Arial Unicode.ttf'
EMOJI_FONT = '/System/Library/Fonts/Apple Color Emoji.ttc'

def load_font(path, size, index=0):
    try:
        return ImageFont.truetype(path, size, index=index)
    except Exception:
        return ImageFont.load_default()

def round_rect_mask(w, h, r):
    mask = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, w-1, h-1], radius=r, fill=255)
    return mask

def lerp_color(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))

def make_gradient(w, h, color_top, color_bottom, angle=145):
    img = Image.new('RGB', (w, h))
    rad = math.radians(angle)
    dx = math.cos(rad)
    dy = math.sin(rad)
    for y in range(h):
        for x in range(w):
            t = (x * dx + y * dy) / (w * abs(dx) + h * abs(dy))
            t = max(0, min(1, t))
            img.putpixel((x, y), lerp_color(color_top, color_bottom, t))
    return img

def add_gloss(img):
    """Add subtle glossy highlight to top-left."""
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    # top-left elliptical gloss
    d.ellipse([-30, -40, 200, 80], fill=(255, 255, 255, 30))
    base = img.convert('RGBA')
    return Image.alpha_composite(base, overlay).convert('RGB')

def draw_badge(draw, text, x, y, color, font):
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    pad_x, pad_y = 10, 5
    bw = tw + pad_x * 2
    bh = th + pad_y * 2
    draw.rounded_rectangle([x, y, x + bw, y + bh], radius=bh//2,
                            fill=(255, 255, 255, 180))
    draw.text((x + pad_x, y + pad_y - bbox[1]), text, fill=color, font=font)
    return bw

def make_card(filename, colors_top, colors_bot, badge_text, badge_color,
              title, desc, emoji_text, angle=145):
    """
    colors_top / colors_bot: RGB tuples for gradient
    """
    # Base gradient
    img = make_gradient(W, H, colors_top, colors_bot, angle)

    # Add decorative circle in background (large, translucent)
    circle_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    cd = ImageDraw.Draw(circle_layer)
    # big circle bottom-right
    cd.ellipse([W//2, H//4, W + H//2, H + H//4], fill=(255, 255, 255, 25))
    # smaller circle top-right
    cd.ellipse([W - 80, -40, W + 60, 80], fill=(255, 255, 255, 35))
    img = Image.alpha_composite(img.convert('RGBA'), circle_layer).convert('RGB')

    img = add_gloss(img)

    # Apply rounded corner mask
    mask = round_rect_mask(W, H, RADIUS)
    result = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    result.paste(img, mask=mask)

    draw = ImageDraw.Draw(result)

    # Fonts
    font_badge = load_font(HEITI, 14)
    font_title = load_font(HEITI, 20)
    font_desc  = load_font(HEITI, 13)
    font_emoji = load_font(HEITI, 72)  # fallback text

    # Large emoji / symbol — rendered right side
    # Try to draw a big symbol using the emoji font
    # We'll use a simpler approach: draw big text chars using unicode
    try:
        fe = load_font(EMOJI_FONT, 80)
        # measure
        bb = fe.getbbox(emoji_text)
        ew = bb[2] - bb[0]
        eh = bb[3] - bb[1]
        ex = W - ew - 12
        ey = (H - eh) // 2 - 20
        draw.text((ex - bb[0], ey - bb[1]), emoji_text, font=fe, embedded_color=True)
    except Exception:
        # fallback: draw first char large
        bb = font_emoji.getbbox(emoji_text[0] if emoji_text else '?')
        ew = bb[2] - bb[0]
        eh = bb[3] - bb[1]
        ex = W - ew - 16
        ey = (H - eh) // 2 - 10
        draw.text((ex - bb[0], ey - bb[1]), emoji_text[0] if emoji_text else '?',
                  fill=(255, 255, 255, 180), font=font_emoji)

    # Badge
    bx, by = 16, 16
    draw_badge(draw, badge_text, bx, by, badge_color, font_badge)

    # Title
    draw.text((16, H - 54), title, fill=(255, 255, 255), font=font_title,
              stroke_width=1, stroke_fill=(0, 0, 0, 60))

    # Desc — slightly transparent white
    desc_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    dd = ImageDraw.Draw(desc_layer)
    dd.text((16, H - 30), desc, fill=(255, 255, 255, 200), font=font_desc)
    result = Image.alpha_composite(result, desc_layer)

    path = os.path.join(OUT_DIR, filename)
    result.save(path, 'PNG')
    print(f'  saved {filename}')


# ─── English cards ───────────────────────────────────────────────────────────
CARDS_EN = [
    ('card_listening.png',
     (14, 165, 233), (2, 132, 199),
     '听力', (2, 100, 160),
     '听力练习', 'TTS朗读 · 分级故事', '🎧'),
    ('card_history.png',
     (180, 120, 50), (146, 80, 20),
     '历史文化', (120, 60, 10),
     '人类大历史', '中英双语 · 98讲 · TTS朗读', '🌍'),
    ('card_phonics.png',
     (234, 179, 8), (202, 138, 4),
     '拼读', (160, 100, 0),
     '自然拼读', '尼尔森体系 · 148集视频', '🔤'),
    ('card_speaking.png',
     (234, 88, 12), (194, 65, 12),
     '口语', (160, 40, 0),
     '口语对话', 'AI外教Emma · 实时纠错', '🗣️'),
    ('card_grammar.png',
     (37, 99, 235), (29, 78, 216),
     '语法', (20, 50, 180),
     '语法讲解', '14章65知识点 · AI练习', '📐'),
    ('card_reading.png',
     (5, 150, 105), (4, 120, 87),
     '阅读', (0, 90, 60),
     '阅读中心', '分级·绘本·章节书·考试', '📚'),
    ('card_writing.png',
     (124, 58, 237), (109, 40, 217),
     '写作', (80, 20, 180),
     '写作练习', 'AI批改 · 自动录入错题本', '✏️'),
    ('card_vocab.png',
     (59, 130, 246), (37, 99, 235),
     '词汇', (20, 70, 200),
     '词汇记忆', '记忆曲线 · 每日任务', '📅'),
    ('card_flashcard.png',
     (99, 102, 241), (79, 70, 229),
     '单词', (50, 40, 180),
     '单词速练', '沪教版 · KET · PET · FCE', '🃏'),
    ('card_textbook.png',
     (194, 65, 12), (154, 52, 10),
     '教材', (140, 40, 0),
     '教材词汇', '译林版3-6年级 · 听写', '📖'),
    ('card_lookup.png',
     (8, 145, 178), (6, 120, 150),
     '查词', (0, 90, 120),
     '查词·生词本', '即查即存 · 闪音 · 闪卡', '🔍'),
]

# ─── Chinese cards ────────────────────────────────────────────────────────────
CARDS_CN = [
    ('cn_card_shape.png',
     (79, 70, 229), (59, 50, 200),
     '形近字', (40, 30, 160),
     '同音/形近字', '对比 · 组词 · 练习', '🔄'),
    ('cn_card_poetry.png',
     (234, 88, 12), (194, 65, 12),
     '古诗词', (160, 40, 0),
     '古诗词', '朗读 · 背诵打卡 · 1-6年级', '📜'),
    ('cn_card_lookup.png',
     (5, 150, 105), (4, 120, 87),
     '查词', (0, 90, 60),
     '查词·生词本', '汉字词语 · 拼音 · 例句', '🔎'),
    ('cn_card_chars.png',
     (14, 165, 233), (2, 132, 199),
     '生字', (2, 100, 160),
     '生字表', '一类字·二类字·点击发音', '🈶'),
    ('cn_card_dictation.png',
     (124, 58, 237), (109, 40, 217),
     '听写', (80, 20, 180),
     '听写练习', '听写 · 错字本 · 历史记录', '✍️'),
    ('cn_card_idiom.png',
     (220, 38, 38), (185, 28, 28),
     '成语', (150, 15, 15),
     '成语故事', '图文解释 · 例句 · 小测验', '🐉'),
]

print('Generating English cards...')
for args in CARDS_EN:
    make_card(*args)

print('Generating Chinese cards...')
for args in CARDS_CN:
    make_card(*args)

print('Done!')
