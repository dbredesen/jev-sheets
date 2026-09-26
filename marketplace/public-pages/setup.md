# Jev for Sheets™ — Setup

A TypeSafe account and API key are required. [Open TypeSafe](https://console.typesafe.ai/) and [manage API keys](https://console.typesafe.ai/keys). TypeSafe API charges may apply.

## Local installation

Follow the repository's [Local Installation](https://github.com/dbredesen/jev-sheets#local-installation) instructions to build and install the script in one spreadsheet. Repeat for each additional spreadsheet. The public Marketplace listing is under Google review; there is no approved store installation link yet.

## Marketplace draft testing

Named testers can install the [Jev for Sheets™ draft](https://workspace.google.com/marketplace/app/jev_for_sheets/33542281317). It is not a public approved release. In each spreadsheet, choose **Extensions → Add-ons → Manage add-ons → Jev for Sheets™ → Options → Use in this document** before entering formulas. This Google per-document activation step is required even after account-level installation. Reload if Sheets still displays `Unknown function`.

## Connect an installed script or add-on

1. Open **Extensions → [your Jev script/add-on name] → API key & connection**.
2. Review and grant Google's requested permissions for the installed project.
3. Enter an account label and your TypeSafe API key. Click **Save key**. This saves it for the script project but does not connect the spreadsheet.
4. Click **Test saved key**. This makes one small API request using sample data.
5. Read the data-sharing and shared-usage disclosure, then click **Connect my saved key**. Every collaborator's Jev formulas in this spreadsheet use that connected account.
6. Select **Add sample worksheets** to create Examples, Rubrics, and Tests without overwriting existing tabs. You can also enter a formula directly.

Example: `=JEV_NOUL("dog", "Is it a mammal?")`

Formula inputs are sent to TypeSafe for processing. Save secrets only through the settings menu, not in cells or source code.

## Change or remove a connection

After connecting, disconnecting, or replacing a connection, use **Refresh Jev formulas**. Nested expressions such as IF(JEV_NOUL(...),...) need manual re-entry. Changing input cells and referenced choices normally causes recalculation.

Removing your personal saved key does not disconnect spreadsheets that already hold its connection. Disconnect each spreadsheet separately or revoke the key in TypeSafe to disable it everywhere. See [privacy and deletion](https://jev.developedby.ai/privacy/).
