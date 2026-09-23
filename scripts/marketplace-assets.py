"""Resize the supplied Jev mark for the site and Marketplace artwork."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


OUT = Path(__file__).resolve().parents[1] / "marketplace/assets"
SOURCE = OUT / "icon-source.png"
FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

with Image.open(SOURCE) as original:
    mark = original.convert("RGB")


def icon(size):
    return mark.resize((size, size), Image.Resampling.LANCZOS)


for size in (32, 120, 128):
    icon(size).save(OUT / f"icon-{size}.png")

banner = Image.new("RGB", (880, 560), "#0C454A")
draw = ImageDraw.Draw(banner)
banner.paste(icon(220), (42, 55))
draw.text((292, 80), "Jev", font=ImageFont.truetype(FONT, 112), fill="white")
draw.text((296, 211), "for Sheets", font=ImageFont.truetype(FONT, 46), fill="#74DEC7")
draw.text((56, 363), "Typed AI. In your cells.", font=ImageFont.truetype(FONT, 52), fill="white")
banner.resize((220, 140), Image.Resampling.LANCZOS).save(OUT / "card-banner-220x140.png")
