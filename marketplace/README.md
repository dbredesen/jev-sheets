# Marketplace publishing handoff

Publisher: **Dave Bredesen** · Support: **dbredesen@gmail.com** · App: **Jev for Sheets**.

These are preparation materials, not an approved or submitted listing.

## Public website on GitHub Pages

The five Markdown drafts in `public-pages/` are the editable source. `npm run site:build` renders plain HTML to the repository's `/docs` directory using `markdown-it-py` (install with `python3 -m pip install -r scripts/requirements-site.txt` if needed). Commit source and generated HTML together. GitHub Pages is configured to publish `main` → `/docs`, with custom domain `jev.developedby.ai`; its first build passed September 23. This website has no Wix dependency or runtime backend.

| Public URL | Copy |
| --- | --- |
| https://jev.developedby.ai/ | [Homepage](public-pages/home.md) |
| https://jev.developedby.ai/privacy/ | [Privacy policy](public-pages/privacy.md) |
| https://jev.developedby.ai/terms/ | [Terms](public-pages/terms.md) |
| https://jev.developedby.ai/support/ | [Support](public-pages/support.md) |
| https://jev.developedby.ai/setup/ | [Setup](public-pages/setup.md) |

The owner should review the privacy policy and terms as publisher. The site has visible Privacy, Terms, Support, and Setup navigation and retains draft availability wording until Marketplace approval.

### DNS handoff for the owner

The domain's **Advanced DNS → Host Records** section is read-only and directs you to cPanel, so use its current DNS manager. For Namecheap shared hosting, open **Hosting List → Go to cPanel**, then **Domains → Zone Editor → Manage** next to `developedby.ai`. Choose **+ Add Record → CNAME**. Enter **Name `jev.developedby.ai.`**, **Record `dbredesen.github.io.`**, and leave the default positive **TTL**; save. A trailing dot is optional in cPanel. Do not include `https://` or `/jev-sheets`. Do not click **Change DNS Type** or change the existing root, `www`, email, or Google Search Console TXT records. If an existing record for `jev.developedby.ai` appears, inspect it before adding a conflicting CNAME. The GitHub Pages custom domain is already set. After DNS resolves and GitHub provisions a certificate, enable **Enforce HTTPS** under repository **Settings → Pages**.

The **Domain** property `developedby.ai` was verified in Google Search Console under `dbredesen@gmail.com`, the Cloud project owner, on September 22. Keep its TXT record in DNS. Google ownership verification is separate from GitHub Pages domain configuration. The old Wix URL remains 404 and should not be used for the listing.

## Review package

- [Listing fields](listing.json) and [full description](listing-description.md)
- [OAuth justifications and demonstration script](oauth-review.md)
- [Current publication status](publication-status.md)
- [Marketplace draft installation test and observed activation step](draft-install-test.md)

Do not include personal API keys, reviewer keys, OAuth tokens, or billing account identifiers in this directory.
