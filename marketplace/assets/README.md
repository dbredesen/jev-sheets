# Draft listing artwork

The supplied Jev J/grid mark is stored as `icon-source.png`. The smaller assets are exact resizes of that image, without Google or TypeSafe logos.

- icon-32.png: 32 × 32
- icon-120.png: 120 × 120 OAuth consent-screen logo
- icon-128.png: 128 × 128
- card-banner-220x140.png: 220 × 140
- examples-sheet-1280x800.png: 1280 × 800 screenshot of the live bound sample spreadsheet, used in the saved draft listing. It demonstrates product UI, not Marketplace installation.

Regenerate the resized icons and card banner on macOS with Pillow using `python3 scripts/marketplace-assets.py` (Arial Bold system font for banner text). Then run `python3 scripts/build-site.py` to copy the 128 × 128 icon to the public site. The screenshot is a separate capture of actual sample-sheet output. Replace or supplement it with an installed Marketplace draft screenshot after clean-sheet testing succeeds.
