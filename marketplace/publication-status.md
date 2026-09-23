# Publication status

Updated September 22, 2026. **Marketplace draft saved; not submitted or approved.**

## Confirmed

- Public source: https://github.com/dbredesen/jev-sheets
- Reproducible bound installation: 16 live Sheets checks passed September 19; see [TEST_REPORT.md](../TEST_REPORT.md).
- Dedicated standard Google Cloud project **Jev for Sheets**: `jev-sheets-509414`, project number `33542281317`. The owner's selected billing account is linked; no paid compute was provisioned.
- Standalone Apps Script project `1knOaCdGWpQQ6qp79J29ggqexp8O3RrIAj3z3GbIQyhxJCM0XgPH_Kepq` is linked to that Cloud project. The current built source was saved and byte-checked in Apps Script, and numbered version **2** was created. The version 2 deployment ID is `AKfycby82_zRwiDcjn7U4VK6Njnu9xQUNHBgYK5mkwfwR2r5LtT0CdqiYHUPLp9TPGM2F3QawA`.
- External OAuth consent is in **Testing** with `dbredesen@gmail.com` and `optimizeddiet@gmail.com` saved as test users. The three explicit Apps Script scopes are saved in OAuth Data Access. OAuth branding uses the proposed developedby.ai URLs and has the matching 120 × 120 logo. **Google Search Console verified the `developedby.ai` Domain property** under the Cloud-project owner account on September 22 after the owner added the DNS TXT record. Keep that record in DNS. The Verification Center says verification is not required while the app stays in Testing; production verification remains pending.
- Marketplace SDK App Configuration is saved for a public Sheets Editor add-on, individual and admin installation, Apps Script version 2, publisher Dave Bredesen, support `dbredesen@gmail.com`, and Non-trader status.
- Listing draft is saved with copy, setup/support URLs, icons, banner, and one actual product screenshot. Draft URL: https://workspace.google.com/marketplace/app/jev_for_sheets/33542281317 . It opens in the owner account with a **DRAFT** banner and Install button.
- Local build and all 13 automated tests pass. The new sidebar source is deployed in the standalone project and its key test/connection controls worked in an installed draft copy.
- Draft installed under `dbredesen@gmail.com`. In the unbound [Connection Isolation spreadsheet](https://docs.google.com/spreadsheets/d/1x0XGCogHdVyo3sBjM4bCtcDkS1j1JoJFsGnWEM_opKw/edit), `JEV_NOUL` initially returned `#NAME?`. **Extensions → Add-ons → Manage add-ons → Jev for Sheets → Options → Use in this document** activated the formulas. The nonblank formula then reported the expected `Jev: No account connected.` error. The saved key's sidebar test succeeded, and the spreadsheet was connected. After refresh, NOUL returned TRUE for dog/mammal, CHOICE returned Dog, SCORE returned 2 for an angry message, and raw JEV returned JSON with model `jev-1.13.0`. No bound Jev code was added to this workbook.
- The installed draft generated Examples, Rubrics, and Tests in that unbound workbook. All **16/16** live checks passed; the five intentional errors were inspected by message. Changing dog to sparrow changed NOUL from TRUE to FALSE, and restoring dog restored TRUE. Changing a referenced choice label from Bird to Avian changed the result to Avian; restoring Bird restored Bird.
- A [newly created clean workbook](https://docs.google.com/spreadsheets/d/1baQD43OnqzgeBYP09OAeAcV3P6JxkoiewIqLljmErQA/edit) with no bound code activated the Marketplace draft using the same **Use in this document** step. A nonblank NOUL formula returned `Jev: No account connected.` even though the first workbook was connected, confirming document-scoped connection isolation for the owner account.
- Independent tester `optimizeddiet@gmail.com` installed the same Marketplace draft from a separate Chrome profile signed in only to that account. Google showed the draft-tester banner, OAuth consent for the approved five permissions, and **Jev for Sheets has been installed!**. In the tester-owned [independent workbook](https://docs.google.com/spreadsheets/d/1DMeroAUoCPcF0Y0J72xqwqAFoHKJYDpabZOIcecH_Ro/edit), **Use in this document** activated the add-on without attached Jev code. Nonblank `JEV_NOUL` and `JEV_CHOICE` formulas both executed and returned the expected `Jev: No account connected.` message. No TypeSafe API key was saved or used on that account. The earlier `Page Not Found` during Install occurred only in the original Chrome profile where the tester was a secondary Google sign-in; the separate-profile result supports a multi-account routing explanation, though Google's cause is not confirmed.

## Important scope observation

Marketplace SDK added `userinfo.email` and `userinfo.profile` to the permissions shown during draft installation, in addition to the three explicit Apps Script scopes. Those identity permissions reappeared after an attempt to remove them in SDK configuration. They are not listed in the Apps Script manifest. Verify the final SDK/OAuth permission set and justify or eliminate any unnecessary scope before production submission. The owner separately approved the extra name/profile permission for the draft install.

## Pending

1. Publish the five [Wix pages](README.md) and confirm their exact URLs. The proposed homepage still returned **404** in Chrome after DNS ownership verification on September 22. Domain ownership itself is now verified; the DNS challenge is complete.
2. Reconcile SDK-added identity scopes, finish OAuth production/verification, and provide a demonstration recording if requested.
3. Provide a dedicated TypeSafe reviewer key privately, with suitable controls; confirm the bring-your-own-key setup is accepted for review. A second-account API call remains untested because no key was supplied for that account; installation and formula registration were verified independently.
4. Submit for Marketplace review and address Google's feedback. No approval or publication date is implied by the saved draft.

The app name is **Jev for Sheets** throughout the current Cloud, OAuth, and listing configuration.
