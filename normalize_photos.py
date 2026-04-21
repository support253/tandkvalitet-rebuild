"""
Normalize the 12 finalist photos for the Tandkvalitet website:
- Apply EXIF orientation (so image pixels are in the intended orientation)
- Resize to web-appropriate dimensions (max 2000px on long side)
- Save as JPEG quality 85 to src/assets/
"""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path(r"C:\Users\joe77\OneDrive\Documents\RiverAI-Pipeline\Tandkvalitet pictures\filtered photos")
DST = Path(r"C:\Users\joe77\OneDrive\Documents\RiverAI-Pipeline\apps\tandkvalitet-rebuild\src\assets")

# slot_name -> source filename
FINALISTS = {
    "hero-reception.jpg":       "20260421_120404.jpg",
    "tandlaegeskraek-waiting.jpg": "20260421_120444.jpg",
    "hana-portrait.jpg":        "20260421_122240.jpg",
    "allan-portrait.jpg":       "20260421_122611.jpg",
    "implantater-room.jpg":     "20260421_123449.jpg",
    "behandlinger-action.jpg":  "20260421_125938.jpg",
    "service-generel.jpg":      "20260421_125812.jpg",
    "service-kirurgi.jpg":      "20260421_130219.jpg",
    "service-kroner.jpg":       "20260421_124225.jpg",
    "service-akut.jpg":         "20260421_132712.jpg",
    "lokation-exterior.jpg":    "20260421_132904.jpg",
    "cta-church.jpg":           "20260421_132933.jpg",
}

MAX_DIM = 2000
QUALITY = 85

for slot, src_name in FINALISTS.items():
    src_path = SRC / src_name
    dst_path = DST / slot
    if not src_path.exists():
        print(f"MISSING: {src_path}")
        continue
    img = Image.open(src_path)
    # Apply EXIF orientation (bakes rotation into pixels)
    img = ImageOps.exif_transpose(img)
    # Resize if needed, preserving aspect ratio
    if max(img.size) > MAX_DIM:
        img.thumbnail((MAX_DIM, MAX_DIM), Image.LANCZOS)
    # Convert to RGB (strip alpha if any) and save
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.save(dst_path, "JPEG", quality=QUALITY, optimize=True)
    print(f"{slot}: {img.size}  ({dst_path.stat().st_size // 1024} KB)")

print("Done.")
