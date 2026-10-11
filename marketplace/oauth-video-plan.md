# OAuth verification demo video plan

**Target length:** 2½–3½ minutes
**Recording:** capture the real Jev for Sheets Marketplace draft install in a clean tester profile and a clean, unbound spreadsheet. Use synthetic values. A TypeSafe key can already be saved before recording so its characters never appear, or a dedicated reviewer key can be entered in the masked field. Never show key characters, passwords, tokens, unrelated tabs, or private spreadsheet data. The Google account identity shown by Google's complete consent screen may be visible; inspect the recording before sharing.

## Before recording

- Confirm the Marketplace draft, app branding, Apps Script version, and Google OAuth Data Access scopes match the submitted verification configuration. The current draft install consent is documented as showing five scopes: the three Apps Script scopes plus `userinfo.email` and `userinfo.profile`.
- Set the consent screen language to **English** before recording. Capture the complete consent flow and all requested permissions at readable size; do not cut away before the grant completes.
- Prepare a tester account with access to the draft and a fresh spreadsheet without Jev-bound script code. Keep only the relevant browser tabs and sheet data visible.
- Have a TypeSafe connection ready for a live call. If the key is already saved, show only its saved/masked status and connect it; do not reveal the key or paste it into the sheet, narration, or recording notes.

## Recording handoff

The capture must show a **real new consent grant**. First confirm that the Marketplace draft is available and the owner's saved TypeSafe key works. When ready to record, the owner can revoke Jev for Sheets access in their Google Account's third-party connections, then reinstall the Marketplace draft in a clean Chrome window. Alternatively, use a new, authorized tester account that already has a key saved. A prior install without consent shown on camera does not meet Google's video request.

On macOS, record just the clean Chrome window. TapRecord's **Record Screen** area selector can do this; its current save location is `/Users/dbredesen/Movies`, with **⌘1** for start/pause and **⌘2** for stop. The capture should be large enough to keep consent text readable while excluding unrelated tabs and notifications. The macOS **Shift–Command–5 → Record Selected Portion** option is a fallback. Review every frame for credentials before uploading. Upload to YouTube as **Unlisted** and use the resulting watch URL in Google's OAuth Data Access verification form; ensure anyone with the link can play it without signing in. Do not commit the video or an API key to this repository.

## Shot list

| Time | Screen action and proof | Optional narration |
| --- | --- | --- |
| 0:00–0:15 | Show the Jev for Sheets name/logo on its actual Marketplace draft listing, with the Install action visible. | “This is Jev for Sheets, a Google Sheets add-on that runs TypeSafe Jev calls from spreadsheet formulas.” |
| 0:15–0:55 | Click Install and follow the actual Google flow. Show the **complete consent screen** in English, including the exact requested scopes as legible on screen, then grant access and show installation success. | “I’m installing the Marketplace draft. This is the full Google consent screen and the permissions requested by this version.” |
| 0:55–1:20 | In the fresh spreadsheet, use **Extensions → Add-ons → Manage add-ons → Jev for Sheets → Options → Use in this document**. Show the Jev menu/sidebar becoming available. | “Google requires activation in each spreadsheet. This one has no Jev script attached; the installed add-on supplies the menu and formulas.” |
| 1:20–1:50 | Open **Extensions → Jev for Sheets → API key & connection**. Show the TypeSafe account/key disclosure and masked/saved key status. Test it, then click **Connect my saved key**. Do not display key characters. | “The user supplies a TypeSafe key. It is saved in Apps Script properties, then explicitly connected to this spreadsheet. Formula inputs go to TypeSafe and usage may incur charges.” |
| 1:50–2:35 | In the sheet, enter a synthetic example such as `=JEV_NOUL("dog","Is it a mammal?")`; show the live boolean result. Then show a second example such as `=JEV_CHOICE("sparrow","What kind of animal is it?","Mammal","Bird","Other")` and its returned label. Keep other sheet contents out of frame. | “These formulas send their supplied inputs to TypeSafe. NOUL returns a yes-or-no result, and CHOICE selects one of the supplied labels.” |
| 2:35–3:05 | Show **Refresh Jev formulas** and briefly show that the active spreadsheet connection is scoped to this document (for example, use a prepared second clean spreadsheet with a nonblank formula returning ‘No account connected’). Finish on the connected example and Jev branding. | “The add-on reads the active spreadsheet ID to keep its connection document-specific. Refresh finds Jev formulas in the active sheet. A different spreadsheet starts without this connection.” |

## Scope coverage and accuracy

- `https://www.googleapis.com/auth/spreadsheets.currentonly`: the active-sheet connection and refresh steps show the current spreadsheet context; sample worksheet creation is another feature of this scope, if time permits.
- `https://www.googleapis.com/auth/script.container.ui`: the Jev menu and API key/connection sidebar show the container UI integration.
- `https://www.googleapis.com/auth/script.external_request`: the live formula result demonstrates the request to TypeSafe.
- `userinfo.email` and `userinfo.profile`: Marketplace SDK installation consent reportedly adds these. The project notes and privacy copy say Jev does not intentionally read or store these identity details. Do not claim or stage a feature that uses them.

**Identity-scope review point:** Google's Marketplace SDK adds `userinfo.email` and `userinfo.profile` to installation consent even though the script does not use them. Show these permissions on the real consent screen; do not invent a feature that uses them. The saved OAuth justification explains the SDK behavior. Google may ask about them during verification.

## Final recording check

Verify the whole consent screen is readable and in English; the grant and installation complete on camera; the live formulas return results; the key remains fully masked in every frame; no unrelated data or credentials are visible; and the public video link will be accessible to Google reviewers.
