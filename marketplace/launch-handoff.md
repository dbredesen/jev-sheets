# Production launch handoff

Status checked September 25, 2026. The OAuth data-access request and public Marketplace listing are both **under Google review**. The add-on is not yet publicly available. See [publication-status.md](publication-status.md) for live draft-installation evidence.

## Completed by Codex

- Built and tested the add-on; 13 local tests pass, and the saved Marketplace draft was installed in two independent Google accounts. Four live formulas and 16 worksheet checks passed in the owner's unbound spreadsheet. The second account proved registration and missing-connection behavior without using a key.
- Prepared the five-page public site, listing copy and artwork, privacy and terms pages, scope justifications, and demo script.
- Saved `dbredesen@gmail.com` as the Marketplace SDK **Developer Email** and verified the draft save.
- Inspected Cloud OAuth Data Access: `spreadsheets.currentonly` is non-sensitive; `script.container.ui` and `script.external_request` are sensitive; no restricted scopes are declared. The SDK automatically adds email/profile consent permissions, which the script does not use.
- Inspected TypeSafe key creation: the dialog offers a key name but no per-key cap. The account currently presents updated legal terms that require the account owner's acceptance.
- With the owner's explicit approval, switched OAuth to **In production**, verified and published its branding, aligned OAuth Data Access with all five permissions displayed during Marketplace draft installation, and saved the sensitive-scope justification.
- Saved the owner-uploaded [OAuth demonstration video](https://youtu.be/LYDnaf-G3iY) in Google Cloud and submitted data-access verification. Google shows **under review**.
- Corrected and saved the Marketplace developer email, then submitted the public Store Listing for review. Google says the draft is in review and locked against editing; approval will publish it automatically.

## Owner actions needed

1. **Accept TypeSafe's updated Terms of Use and Master Customer Agreement**, if you agree, in [TypeSafe Console](https://console.typesafe.ai/keys). This is a legal account decision. Then arrange a separate reviewer key; check whether TypeSafe can limit its usage, since the key dialog did not offer a cap. Do not use the existing personal key for review.
2. **Watch `dbredesen@gmail.com` for Google review requests.** If Google asks for reviewer credentials, provide a dedicated TypeSafe key through Google's private channel, never in the repository or public video.

## After Google's decisions

1. Respond to any OAuth or Marketplace review findings. A correction to the locked listing may require canceling review, editing, and resubmitting.
2. After approval, test installation and formulas from the public listing with a non-tester account and update the public site and README with the installation link.

**Review risk:** Google's published user-experience criteria favor access without entering another credential after Google sign-in, while this add-on requires a TypeSafe API key. The listing discloses that requirement, but only Google can decide whether the bring-your-own-key flow passes review. A dedicated reviewer key and a clear explanation of the third-party account model will be needed.

The active Google project is `jev-sheets-509414`; the [Marketplace SDK](https://console.cloud.google.com/apis/api/appsmarket-component.googleapis.com/googleapps_sdk?project=jev-sheets-509414) has Apps Script version 2 selected. OAuth being in production does not make the Marketplace listing public; Google must approve its separate review.
