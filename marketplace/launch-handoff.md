# Production launch handoff

Status checked September 23, 2026. The Marketplace listing is a saved public draft, not submitted or approved. The OAuth audience is still **Testing**. See [publication-status.md](publication-status.md) for live installation evidence.

## Completed by Codex

- Built and tested the add-on; 13 local tests pass, and the saved Marketplace draft was installed in two independent Google accounts. Four live formulas and 16 worksheet checks passed in the owner's unbound spreadsheet. The second account proved registration and missing-connection behavior without using a key.
- Prepared the five-page public site, listing copy and artwork, privacy and terms pages, scope justifications, and demo script.
- Saved `dbredesen@gmail.com` as the Marketplace SDK **Developer Email** and verified the draft save.
- Inspected Cloud OAuth Data Access: `spreadsheets.currentonly` is non-sensitive; `script.container.ui` and `script.external_request` are sensitive; no restricted scopes are declared. The SDK automatically adds email/profile consent permissions, which the script does not use.
- Inspected TypeSafe key creation: the dialog offers a key name but no per-key cap. The account currently presents updated legal terms that require the account owner's acceptance.

## Owner actions needed

1. **Authorize the OAuth production switch.** In [Cloud Audience](https://console.cloud.google.com/auth/audience?project=jev-sheets-509414), **Publish app → Confirm** makes the OAuth app available to any Google account; it does *not* publish the Marketplace listing. Codex attempted the final click, but automatic approval review rejected it because it materially expands access. Give specific approval for this change if you want Codex to perform it.
2. **Accept TypeSafe's updated Terms of Use and Master Customer Agreement**, if you agree, in [TypeSafe Console](https://console.typesafe.ai/keys). This is a legal account decision. Then arrange a separate reviewer key; check whether TypeSafe can limit its usage, since the key dialog did not offer a cap. Do not use the existing personal key for review.
3. **Review the public privacy policy and terms as publisher.** The drafts are at [Privacy](https://jev.developedby.ai/privacy/) and [Terms](https://jev.developedby.ai/terms/). Report any corrections before submission.

## Codex actions after those inputs

1. Recheck the production OAuth Verification Center, reconcile the SDK-added identity scopes with the OAuth review form, prepare the required demo recording for the two sensitive scopes, and submit OAuth verification.
2. Put the separate TypeSafe key only in Google's private reviewer instructions, with a revocation plan; complete a second-account API call if review access permits.
3. Submit the saved Marketplace draft for review, respond to Google's findings, and confirm public installation after approval. Google controls review timing and final approval.

**Review risk:** Google's published user-experience criteria favor access without entering another credential after Google sign-in, while this add-on requires a TypeSafe API key. The listing discloses that requirement, but only Google can decide whether the bring-your-own-key flow passes review. A dedicated reviewer key and a clear explanation of the third-party account model will be needed.

The active Google project is `jev-sheets-509414`; the [Marketplace SDK](https://console.cloud.google.com/apis/api/appsmarket-component.googleapis.com/googleapps_sdk?project=jev-sheets-509414) has Apps Script version 2 selected. Do not confuse the OAuth **Publish app** action with the Marketplace **Submit for review** action.
