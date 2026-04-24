"""
Normalize the 12 finalist photos for the Tandkvalitet website:
- Apply EXIF orientation (so image pixels are in the intended orientation)
- Resize to web-appropriate dimensions (max 2000px on long side)
- Save as JPEG quality 85 to src/assets/
"""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path(r"C:\Users\joe77\OneDrive\Documents\RiverAI-Pipeline\Tandkvalitet pictures\filtered photos")
DST = Path(r"C:\Users\joe77\OneDrive\Documents\RiverAI-Pipeline\apps\tandkvalitet-rebuild\assets")

# slot_name -> source filename
FINALISTS = {
    "hero-reception.jpg":       "20260421_120404.jpg",
    "tandlaegeskraek-waiting.jpg": "20260421_120444.jpg",
    "hana-portrait.jpg":        "20260421_122240.jpg",
    "allan-portrait.jpg":       "20260421_122611.jpg",
    "implantater-room.jpg":     "20260421_123449.jpg",
    "behandlinger-action.jpg":  "20260421_125938.jpg",
    "service-generel.jpg":      "20260421_125936.jpg",
    "service-kirurgi.jpg":      "20260421_130219.jpg",
    "service-kroner.jpg":       "20260421_124225.jpg",
    "service-akut.jpg":         "20260421_131510.jpg",
    "lokation-exterior.jpg":    "20260421_132904.jpg",
    "cta-church.jpg":           "20260421_132933.jpg",
}

MAX_DIM = 2000
QUALITY = 85

# Service card thumbnails are rendered in a short landscape strip (h-32 ~= 128px).
# Force-fit these slots to a wide 2:1 crop. Per-slot centering so subject lands
# in the visible strip rather than cropping it out.
SERVICE_SIZE = (1400, 700)  # 2:1 landscape
SERVICE_CENTERING = {
    "service-generel.jpg": (0.5, 0.55),  # team-room shot — slight down-bias to keep equipment + cut ceiling
    "service-kirurgi.jpg": (0.5, 0.3),   # bias up — show hands/action, cut drape
    "service-kroner.jpg":  (0.5, 0.5),
    "service-akut.jpg":    (0.5, 0.5),
}

# Team portraits: pre-crop to the card aspect (4:5) with per-subject centering
# so the face/shoulders fill the frame, not wall above the head.
PORTRAIT_SIZE = (1200, 1500)  # 4:5 portrait
PORTRAIT_CENTERING = {
    "allan-portrait.jpg": (0.5, 0.8),   # Allan framed very loose → strong down-bias
    "hana-portrait.jpg":  (0.5, 0.55),  # Hana framed tighter → moderate bias
}

for slot, src_name in FINALISTS.items():
    src_path = SRC / src_name
    dst_path = DST / slot
    if not src_path.exists():
        print(f"MISSING: {src_path}")
        continue
    img = Image.open(src_path)
    # Apply EXIF orientation (bakes rotation into pixels)
    img = ImageOps.exif_transpose(img)
    # Convert to RGB (strip alpha if any) before processing
    if img.mode != "RGB":
        img = img.convert("RGB")
    # Crop/resize depending on slot
    if slot in SERVICE_CENTERING:
        img = ImageOps.fit(img, SERVICE_SIZE, Image.LANCZOS, centering=SERVICE_CENTERING[slot])
    elif slot in PORTRAIT_CENTERING:
        img = ImageOps.fit(img, PORTRAIT_SIZE, Image.LANCZOS, centering=PORTRAIT_CENTERING[slot])
    elif max(img.size) > MAX_DIM:
        img.thumbnail((MAX_DIM, MAX_DIM), Image.LANCZOS)
    img.save(dst_path, "JPEG", quality=QUALITY, optimize=True)
    print(f"{slot}: {img.size}  ({dst_path.stat().st_size // 1024} KB)")

print("Done.")
