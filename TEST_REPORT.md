# Verification status — September 18, 2026

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
