"""Generate 800w and 1600w srcset variants from the normalized photos in assets/.

Reads the 9 <img>-tagged photos (hero, service, portraits, waiting room, lokation)
and writes *-800w.jpg and *-1600w.jpg next to each. Leaves the 2000w originals alone.
"""
from PIL import Image
from pathlib import Path

SRC = Path(r"C:\Users\joe77\OneDrive\Documents\RiverAI-Pipeline\apps\tandkvalitet-rebuild\assets")

IMG_PHOTOS = [
    "behandlinger-action.jpg",
    "tandlaegeskraek-waiting.jpg",
    "hana-portrait.jpg",
    "allan-portrait.jpg",
    "service-generel.jpg",
    "service-kirurgi.jpg",
    "service-kroner.jpg",
    "service-akut.jpg",
    "lokation-exterior.jpg",
]

WIDTHS = [800, 1600]
QUALITY = 85

for name in IMG_PHOTOS:
    src = SRC / name
    if not src.exists():
        print(f"MISSING: {src}")
        continue
    img = Image.open(src)
    stem = src.stem
    for w in WIDTHS:
        if img.width <= w:
            print(f"  skip {stem}-{w}w (source only {img.width}px wide)")
            continue
        ratio = w / img.width
        new_size = (w, round(img.height * ratio))
        resized = img.resize(new_size, Image.LANCZOS)
        out = SRC / f"{stem}-{w}w.jpg"
        resized.save(out, "JPEG", quality=QUALITY, optimize=True)
        print(f"{out.name}: {new_size}  ({out.stat().st_size // 1024} KB)")

print("Done.")
