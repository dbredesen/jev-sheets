# Verification status — September 18, 2026

## September 19 follow-up: reproducible installation

The README now separates **local per-spreadsheet bound installation** from **standalone add-on developer testing**. This is a documented alternative, not a fix for standalone registration. No implementation code was changed for this installation test.

- Standalone failure reproduced in the untouched Connection Isolation spreadsheet, opened through its Editor add-on test URL. `=JEV_NOUL("", "Registration check")` returned `#NAME?`, with the exact message `Unknown function: 'JEV_NOUL'.` This probe makes no API request and does not require a saved key.
- Created a new [Jev — Clean Repository Install workbook](https://docs.google.com/spreadsheets/d/11nJhc9ED2g2EJixApsi8zKL5IBxInWR-CDikOBi2OUQ/edit).
- Opened Extensions → Apps Script in that new workbook and installed the unchanged build in [Jev for Sheets — Local](https://script.google.com/home/projects/1Z6khDYopLMJOo1BV8LxLWw3iQQqm4k7jq40mJzqvzyZkgXChM1E3o87k/edit), together with the repository's explicit three-scope manifest. No standalone test deployment, wrapper, library, or key embedded in code was used.
- After reload, the README registration checks returned TRUE for NOUL, CHOICE, and SCORE. The raw JEV check returned the exact expected `Jev: State must contain valid JSON.` error. All four entry points therefore execute in this clean bound installation.
- User explicitly approved this fresh project's three OAuth scopes and use of the supplied test key. Google authorization completed, and the key was saved and connected through the standard sidebar. The sidebar's live API test succeeded.
- The shipped **Add sample worksheets** menu generated Examples, Rubrics, and Tests. All **16 worksheet checks passed**: native Boolean/choice/score results, typed zero and FALSE, blank handling, raw JSON, and invalid-input errors. Raw response identified model `jev-1.13.0`.
- Inspected the five intentional error messages: invalid threshold, duplicate choice labels, fewer than two score levels, invalid state JSON, and multiple data cells. Thus error-case PASS results were not caused by unknown functions or missing credentials.
- Changed Examples B4 from dog to sparrow: D4 recalculated from TRUE to FALSE. Restored dog: TRUE. Changed Rubrics A5 from Bird to Avian: the referenced choice result changed to Avian. Restored Bird.
- Disconnected the spreadsheet through the sidebar and ran **Refresh Jev formulas**. A nonblank formula returned `Jev: No account connected.` Reconnected the saved key and refreshed to restore working formulas.

Tested source: repository commit `7754cea`. A clean export of that commit passes all 11 local tests and builds the same bundle. SHA-256:

```
4115e178bcbb4687ae7d2a77220ae121e4f7dce80627c9379a2831a990bc7e3d  dist/Code.gs
6ad640d056b076be6ec426e4cd14979ea7ca9b58ad806514b8182eaf90bf4f0b  dist/appsscript.json
```

These results establish a reproducible, single-owner bound installation with no source patches. They do not verify another Google account, collaborator behavior, or installed Marketplace distribution. The September 18 observations below are historical; its bound-harness authorization blocker does not apply to the separately authorized September 19 project.

## Artifacts

- [Standalone Editor add-on project](https://script.google.com/home/projects/1knOaCdGWpQQ6qp79J29ggqexp8O3RrIAj3z3GbIQyhxJCM0XgPH_Kepq/edit)
- [Examples, Rubrics, and Tests workbook](https://docs.google.com/spreadsheets/d/15E39RT3Gy_ERS_6Uft2z5lYXO4pnoOknOl_hhTcXlvY/edit)
- [Bound native-formula test harness](https://script.google.com/home/projects/1FwKYJxi9GNhZY9ftiTeX2mmVrwP4gXG4qRW26a0IPucsZ4zeSSttAK9c/edit)
- [Second workbook for connection-isolation testing](https://docs.google.com/spreadsheets/d/1x0XGCogHdVyo3sBjM4bCtcDkS1j1JoJFsGnWEM_opKw/edit)

## Completed

- Local automated suite: 11 tests pass. Covers request and response contracts, thresholds, criteria, invalid inputs, blank handling, typed data, raw JSON, sanitized API errors, and mocked credential isolation/lifecycle.
- Build produces Apps Script code and explicit three-scope manifest without npm dependencies or a backend.
- Standalone private Editor add-on test deployment created.
- Menu and settings sidebar work in Google Sheets.
- Invalid test key produces a sanitized authentication error.
- User-supplied valid key successfully calls the live TypeSafe API through the sidebar's test action.
- Personal key saved and explicitly connected to the first workbook; settings report the account label without returning the key.
- Sample generator creates formatted Examples, Rubrics, and Tests worksheets.
- Identical source bundle saved in bound test harness; minimal manifest saved and its menu appears after reload.

## Incomplete / blocked

Standalone test deployment does not register custom formulas: Sheets returns `#NAME?` / `Unknown function: JEV_NOUL`. Reload and manual re-entry did not resolve it. Similar reports exist in [Google's Apps Script samples repository](https://github.com/googleworkspace/apps-script-samples/issues/195); exact platform cause has not been established.

Bound harness live execution awaits explicit approval of Google's three OAuth scopes: manage spreadsheets where installed, connect to external services, and display third-party sidebar content. Automatic approval review rejected submission pending specific user approval. The harness is not yet connected to an API key.

The 16 native worksheet tests have therefore **not passed yet**. Error-case rows can say PASS for an unrelated error such as an unknown function, so the aggregate must not be accepted until successful live cases work and each intentional error message is inspected.

## Remaining live test procedure

1. Authorize the bound harness, save and connect the key through its sidebar.
2. Refresh formulas; verify all four functions, 16 checks, and the five exact validation errors. Expect bounds and relative ordering for scores, not fixed model outputs.
3. Change dog to sparrow and confirm recalculation; restore. Change referenced choice/rubric cells and confirm dependencies; restore.
4. Disconnect and refresh: nonblank formulas must reject missing connection. Reconnect and restore results. Verify removing the personal saved key leaves an explicitly connected document unchanged.
5. Execute the standalone test deployment in the second workbook and verify no connection is inherited; verify the personal key remains available to the same user.
6. Test a second collaborator account and an actual installed Marketplace distribution before claiming production installation readiness. Neither is verified by the mocked tests or bound harness.

No Marketplace publication has been performed. No API key is stored in these source files or this report.


## September 22 — Marketplace preparation

- Local build succeeds and all 13 Node tests pass (11 existing, 2 new sidebar tests).
- New sidebar tests cover pending/disabled controls, saved-key removal while a document remains connected, key-field clearing after save, and recovery from a failed connect request.
- Sidebar copy now discloses third-party API charges and transmitted formula inputs and links account creation, key management, support, and formula help.
- New source is not yet deployed or verified in live Sheets; earlier live results apply to the previous bundle.
- Standalone Apps Script is linked to standard Cloud project 33542281317. This does not establish that standalone formulas work. See marketplace/publication-status.md for remaining verification work.

## September 22 — installed Marketplace draft

- Saved a version 2 public-visibility Marketplace **draft** and installed it as `dbredesen@gmail.com`. This is an authorized draft tester install, not a published listing.
- Opened the existing Connection Isolation spreadsheet, which has no attached Jev code. The add-on menu appeared, but a blank NOUL formula initially returned `#NAME?`.
- In **Extensions → Add-ons → Manage add-ons**, set **Jev for Sheets → Options → Use in this document**. The blank formula then returned blank, and a nonblank NOUL formula reported `Jev: No account connected.` This per-document activation was the missing step for the Marketplace installation path; it has now been documented. It does not make the separate private Test deployments route work.
- The saved personal TypeSafe key passed the sidebar's live test. Connected the isolated spreadsheet and refreshed five direct Jev formulas. `JEV_NOUL("dog", "Is it a mammal?")` returned TRUE; `JEV_CHOICE("dog", "Which animal?", "Dog", "Cat")` returned Dog; a three-level `JEV_SCORE` for an angry message returned 2; and `JEV` returned raw JSON identifying model `jev-1.13.0`. Invalid raw JSON produced the expected `Jev: State must contain valid JSON.` error before replacement with the valid formula.
- The second test account `optimizeddiet@gmail.com` initially saw **Page Not Found** when installing as a secondary Google sign-in in the owner's Chrome profile. In a separate Chrome profile signed in only to the tester account, the same direct draft listing displayed the draft-tester banner, the approved OAuth consent flow completed, and Marketplace confirmed **Jev for Sheets has been installed!**. This supports a mixed-account routing explanation for the earlier error, but Google's cause is not confirmed.
- The installed draft's **Add sample worksheets** created Examples, Rubrics, and Tests in the unbound Connection Isolation workbook. All **16/16** checks passed, including native Boolean/choice/score results, zero and FALSE handling, blanks, raw JSON, and intentional validation errors. The five error messages were inspected. Changing Examples B4 from dog to sparrow recalculated D4 from TRUE to FALSE; restoring dog restored TRUE. Changing the referenced Rubrics A5 from Bird to Avian changed the corresponding choice result to Avian; restoring Bird restored Bird.
- Created a separate [Jev — Marketplace Draft Clean Sheet](https://docs.google.com/spreadsheets/d/1baQD43OnqzgeBYP09OAeAcV3P6JxkoiewIqLljmErQA/edit) from the Sheets blank template, with no attached Jev code. Activated Jev through **Manage add-ons → Use in this document**. `=JEV_NOUL("dog", "Is it a mammal?")` ran but returned the precise `Jev: No account connected.` error, proving the first workbook's TypeSafe connection did not carry into the newly created one.
- Google Search Console verified the `developedby.ai` Domain property with the owner's newly added DNS TXT record. The Wix homepage still returned 404 at `https://developedby.ai/jev-sheets/` afterward.
- In the tester-owned [Jev — Independent Draft Test](https://docs.google.com/spreadsheets/d/1DMeroAUoCPcF0Y0J72xqwqAFoHKJYDpabZOIcecH_Ro/edit), used **Extensions → Add-ons → Manage add-ons → Jev for Sheets → Options → Use in this document**. `JEV_NOUL` and `JEV_CHOICE` executed without attached Jev code and returned `Jev: No account connected.` as expected. No TypeSafe key was saved or used on the tester account, so its API response and full worksheet suite remain untested. The direct draft listing worked even though the embedded Marketplace search did not index the draft.
