#!/usr/bin/env python3
"""Render the public Marketplace pages to plain GitHub Pages HTML.

Requires markdown-it-py. Run: python3 scripts/build-site.py
"""

from html import escape
from pathlib import Path
import re
import shutil

try:
    from markdown_it import MarkdownIt
except ImportError as exc:
    raise SystemExit("Install markdown-it-py first: python3 -m pip install -r scripts/requirements-site.txt") from exc


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "marketplace" / "public-pages"
OUTPUT = ROOT / "docs"
DOMAIN = "jev.developedby.ai"
BASE_URL = f"https://{DOMAIN}"
PAGES = {
    "home": ("Jev for Sheets", "Classify text, score feedback, and answer questions in Google Sheets with TypeSafe Jev."),
    "setup": ("Setup", "Install Jev for Sheets and connect your TypeSafe API key."),
    "privacy": ("Privacy Policy", "How Jev for Sheets handles spreadsheet data, API keys, and TypeSafe requests."),
    "terms": ("Terms of Use", "Terms for the Jev for Sheets Google Sheets integration."),
    "support": ("Support", "Get help with Jev for Sheets formulas, installation, and API connections."),
}


def render_page(slug: str, title: str, description: str) -> str:
    source = (SOURCE / f"{slug}.md").read_text(encoding="utf-8")
    converted = MarkdownIt("commonmark", {"html": False}).render(source)
    prefix = "./" if slug == "home" else "../"
    converted = re.sub(
        rf'href="{re.escape(BASE_URL)}/([^\"]*)"',
        lambda match: f'href="{prefix}{match.group(1)}"',
        converted,
    )
    canonical = BASE_URL + ("/" if slug == "home" else f"/{slug}/")
    nav = "\n".join(
        f'<a href="{prefix if key == "home" else prefix + key + "/"}"'
        + (' aria-current="page"' if key == slug else '')
        + f'>{escape(PAGES[key][0] if key != "home" else "Overview")}</a>'
        for key in ("home", "setup", "privacy", "terms", "support")
    )
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{escape(description, quote=True)}">
  <meta name="theme-color" content="#132822">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{escape(title, quote=True)}">
  <meta property="og:description" content="{escape(description, quote=True)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{BASE_URL}/assets/icon-128.png">
  <link rel="canonical" href="{canonical}">
  <link rel="icon" type="image/png" href="{prefix}assets/icon-128.png">
  <link rel="stylesheet" href="{prefix}assets/site.css">
  <title>{escape(title if slug == 'home' else title + ' · Jev for Sheets')}</title>
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="{prefix}" aria-label="Jev for Sheets home">
        <img src="{prefix}assets/icon-128.png" width="40" height="40" alt="">
        <span>Jev for Sheets</span>
      </a>
      <nav class="site-nav" aria-label="Main navigation">{nav}</nav>
    </div>
  </header>
  <main id="content" class="shell">
    <div class="eyebrow">Google Sheets + TypeSafe Jev</div>
    <article class="content {'home' if slug == 'home' else 'document'}">
{converted.rstrip()}
    </article>
  </main>
  <footer class="site-footer">
    <div class="shell footer-inner">
      <span>Independent open-source integration by Dave Bredesen.</span>
      <a href="https://github.com/dbredesen/jev-sheets">Source on GitHub</a>
      <a href="mailto:dbredesen@gmail.com">Contact support</a>
    </div>
  </footer>
</body>
</html>
"""


def main() -> None:
    OUTPUT.mkdir(exist_ok=True)
    for slug, (title, description) in PAGES.items():
        destination = OUTPUT if slug == "home" else OUTPUT / slug
        destination.mkdir(exist_ok=True)
        (destination / "index.html").write_text(render_page(slug, title, description), encoding="utf-8")
    assets = OUTPUT / "assets"
    assets.mkdir(exist_ok=True)
    shutil.copyfile(ROOT / "marketplace" / "assets" / "icon-128.png", assets / "icon-128.png")
    (OUTPUT / ".nojekyll").touch()
    (OUTPUT / "CNAME").write_text(DOMAIN + "\n", encoding="utf-8")
    (OUTPUT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {BASE_URL}/sitemap.xml\n", encoding="utf-8")
    (OUTPUT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "".join(
            f"  <url><loc>{BASE_URL}{'/' if slug == 'home' else f'/{slug}/'}</loc></url>\n"
            for slug in PAGES
        )
        + "</urlset>\n",
        encoding="utf-8",
    )
    print(f"Built {len(PAGES)} pages in {OUTPUT}")


if __name__ == "__main__":
    main()
