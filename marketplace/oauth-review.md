# OAuth verification package

App name: **Jev for Sheets**. Publisher/support: Dave Bredesen, dbredesen@gmail.com.
Audience: External. Use Testing with named testers during development; complete required verification and production configuration before Marketplace submission.
Authorized domain: developedby.ai. Domain ownership and live public pages must be verified before submission. Do not list typesafe.ai or google.com as publisher-owned domains.

## Scope justifications

| Scope | Why it is required | Demonstration |
| --- | --- | --- |
| spreadsheets.currentonly | Read the active spreadsheet ID to bind its explicit connection; generate optional example tabs; find and refresh existing Jev formulas in the active spreadsheet. Does not open arbitrary Drive files. | Connect one sheet, add examples, refresh, then show the second sheet has no inherited connection. |
| script.container.ui | Display the key/settings sidebar, menu feedback, and formula help in Sheets. | Open API key & connection and Help. |
| script.external_request | Send the formula's explicit inputs to https://api.typesafe.ai/v1/systemone with the user's TypeSafe key. | Test a review-only key and calculate representative formulas. |

The three functional scopes above are declared in `src/appsscript.json`. The Marketplace SDK also automatically includes `userinfo.email` and `userinfo.profile`; the SDK restored them after removal, and draft installation consent displayed both. On September 23 OAuth Data Access was aligned with all five permissions actually shown at installation. The script does not use either identity scope, so they are not added to the Apps Script manifest merely to make the lists look identical. Google Console classifies `script.container.ui` and `script.external_request` as sensitive, and the other three as non-sensitive; no restricted scope is declared. This app does not request Drive-wide or Gmail access.

## Demo recording script

Use a dedicated reviewer key and synthetic sample data. Never show the key characters or tokens in recordings.

1. Show the app's identity and public homepage/privacy/support links.
2. Start with a fresh spreadsheet and a tester who does not own the Apps Script project. Show the actual installation path; do not conceal attached script code.
3. Show the Google consent screen, requested permissions, and successful authorization.
4. Open the menu and show account-creation/key-management links and the TypeSafe usage/data disclosure.
5. Save the masked review key, test, then connect it. Explain shared spreadsheet billing.
6. Enter each of the four formulas and show live outputs. Change input and a referenced choice to show recalculation.
7. Show intentional validation errors and a missing-connection error, then reconnect.
8. Show a second spreadsheet has no connection by default. Demonstrate removing a saved key and disconnecting separately.
9. Show privacy/deletion instructions and support contact.

The owner uploaded the final [OAuth reel](https://youtu.be/LYDnaf-G3iY) and reviewed its content and credential exposure. Its URL was saved in Google Cloud Data Access and submitted for verification on September 25, 2026. The Verification Center reports **under review**. This submission uses an existing unbound spreadsheet with a saved key and connection, rather than showing a new spreadsheet activation or new key entry.

## Reviewer authentication note

The app uses Google authorization for Sheets and a separately supplied TypeSafe API key for the user's third-party inference account. It does not collect Google passwords or implement another Google sign-in. The key associates inference charges with the user's TypeSafe account. The Marketplace review checklist contains broad single-sign-on wording; ask reviewers to assess this third-party API configuration explicitly rather than claiming a preapproved exception. If Google requires a different flow, assess TypeSafe's supported authentication options before promising a replacement.

## Dedicated test access

Create a separate TypeSafe key for reviewers, with a usage cap if the provider supports one and enough credit for the demo. The September 23 TypeSafe key-creation dialog showed only a name field and no per-key cap; check account-level controls after the owner accepts TypeSafe's updated terms. Provide the key only in Google's private reviewer instructions. Do not use the developer's personal test key, put a key in this repository, or show it in screenshots. Remove/revoke reviewer access after review is finished.

## References (checked September 22, 2026)

- https://developers.google.com/workspace/marketplace/configure-oauth-consent-screen
- https://developers.google.com/workspace/marketplace/about-app-review
- https://developers.google.com/workspace/marketplace/enable-configure-sdk
