# Marketplace draft installation test

Use the saved [Jev for Sheets draft listing](https://workspace.google.com/marketplace/app/jev_for_sheets/33542281317) while signed in as an OAuth test user. Record the account and spreadsheet IDs, installation result, actual formula output or error text, and whether the spreadsheet contains an attached Jev script. Do not paste API keys or OAuth tokens into the record.

1. Install the draft with `dbredesen@gmail.com`. Check the permissions shown against the explicit manifest and SDK configuration. Open an unbound spreadsheet and confirm Extensions → Jev for Sheets opens its menu and sidebar.
2. Choose **Extensions → Add-ons → Manage add-ons → Jev for Sheets → Options → Use in this document**. This per-document activation was required in the owner test: before it, the formula returned `#NAME?`; after it, the formula registered.
3. Before connecting a key, enter `=JEV_NOUL("", "Is it a mammal?")` and the analogous blank-input checks for `JEV_CHOICE` and `JEV_SCORE`. A blank result proves the functions register without making a TypeSafe request; `#NAME?`/Unknown function fails installation regardless of menu behavior. Enter `=JEV("{bad json}", "[]")` and verify its own input-validation error, not Unknown function.
4. Save a test key through the sidebar and connect this spreadsheet. Run its API test. Add the sample worksheets from the menu, verify the expected successful rows and inspect the intentional error messages, not just PASS counts. Confirm all four formulas return their expected output types.
5. Change `dog` to `sparrow` in Examples and verify the NOUL result changes; restore it. Change a referenced choice label in Rubrics and verify the choice result follows that label; restore it.
6. Open another fresh spreadsheet, activate the add-on there, confirm it has no inherited connection, and check the documented disconnected behavior. Reconnect only if needed. Remove the saved key and verify the sidebar state. Record whether an existing document connection persists as documented.
7. Repeat steps 1–6 as `optimizeddiet@gmail.com` with a separate fresh spreadsheet. This account must not own the standalone Apps Script project. The owner can share a review-safe TypeSafe key privately for this test if necessary.

Passing only an Apps Script developer test deployment, bound local installation, or menu/sidebar check does **not** establish Marketplace formula registration. Attach a clean-sheet result to the [publication status](publication-status.md) before submitting for review.
