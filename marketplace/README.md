# Marketplace publishing handoff

Publisher: **Dave Bredesen** · Support: **dbredesen@gmail.com** · App: **Jev for Sheets**.

These are preparation materials, not an approved or submitted listing.

## Wix pages to publish

Paste the following Markdown copy into Wix text elements, preserving headings and links. Publish pages without sign-in requirements. The proposed paths below must match the final OAuth and listing URLs; if Wix uses different paths, update listing.json and all page links before submitting.

| Public URL | Copy |
| --- | --- |
| https://developedby.ai/jev-sheets/ | [Homepage](public-pages/home.md) |
| https://developedby.ai/jev-sheets/privacy/ | [Privacy policy](public-pages/privacy.md) |
| https://developedby.ai/jev-sheets/terms/ | [Terms](public-pages/terms.md) |
| https://developedby.ai/jev-sheets/support/ | [Support](public-pages/support.md) |
| https://developedby.ai/jev-sheets/setup/ | [Setup](public-pages/setup.md) |

Review the policies as publisher before publishing. Add visible Privacy, Terms, Support, and Setup links to the homepage. Keep the current availability wording until Marketplace approval; do not add a pretend installation link.

Google domain ownership verification may also require a Search Console verification record or tag configured through Wix/domain settings. A page being live alone does not establish ownership verification.

For this project, Google requires verification of the **Domain** property `developedby.ai` using a DNS TXT record. The Search Console challenge was created under `dbredesen@gmail.com`, the Cloud project owner, on September 22. The record value was sent privately to the publisher. Add it at the actual DNS provider (which may differ from Wix), then return to Search Console and select **Verify**. Keep the record in DNS after verification.

## Review package

- [Listing fields](listing.json) and [full description](listing-description.md)
- [OAuth justifications and demonstration script](oauth-review.md)
- [Current publication status](publication-status.md)
- [Marketplace draft installation test and observed activation step](draft-install-test.md)

Do not include personal API keys, reviewer keys, OAuth tokens, or billing account identifiers in this directory.
