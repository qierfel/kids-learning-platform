#!/usr/bin/env python3
import asyncio, sys, json, os, re
sys.path.insert(0, '/Users/lirui/.local/pipx/venvs/edge-tts/lib/python3.14/site-packages')
import edge_tts

OUTPUT_DIR = '/Users/lirui/kids-learning-platform/public/audio/poems'
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 从预导出的 JSON 文件读取
def load_poems():
    with open('/tmp/poems.json', 'r') as f:
        return json.load(f)

def safe_filename(title):
    return re.sub(r'[^\u4e00-\u9fa5a-zA-Z0-9]', '_', title)

async def generate(poem):
    filename = safe_filename(poem['title'])
    out = f"{OUTPUT_DIR}/{filename}.mp3"
    if os.path.exists(out):
        print(f"跳过（已存在）：{poem['title']}")
        return filename

    # 格式化文本：标题、作者、每句用句号分隔
    lines = '。'.join(l.rstrip('，。、') for l in poem['lines'])
    text = f"{poem['title']}。{poem['author']}。{lines}。"

    try:
        communicate = edge_tts.Communicate(text, voice="zh-CN-XiaoxiaoNeural", rate="-15%")
        await communicate.save(out)
        print(f"✓ {poem['title']} ({poem['grade']}年级)")
    except Exception as e:
        print(f"✗ {poem['title']}: {e}")
        return None

    await asyncio.sleep(0.5)
    return filename

async def main():
    poems = load_poems()
    print(f"共 {len(poems)} 首\n")

    manifest = {}
    for poem in poems:
        filename = await generate(poem)
        if filename:
            manifest[poem['title']] = f"{filename}.mp3"

    # 写清单
    with open('/Users/lirui/kids-learning-platform/src/data/poem-audio-manifest.json', 'w') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"\n完成！共生成 {len(manifest)} 首")
    print(f"清单：src/data/poem-audio-manifest.json")

asyncio.run(main())
