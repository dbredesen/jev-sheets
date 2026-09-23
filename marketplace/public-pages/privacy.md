# Jev for Sheets — Privacy Policy

Last updated: September 23, 2026

Jev for Sheets is maintained by Dave Bredesen. Contact: [dbredesen@gmail.com](mailto:dbredesen@gmail.com).

This policy describes the Jev for Sheets add-on and its per-spreadsheet script installation. Google, TypeSafe, and GitHub operate their own services under their own policies.

## Information processed and why

When a Jev formula evaluates, the script sends its supplied data and question to TypeSafe AI's API at `api.typesafe.ai`. Choice and score calls also send the supplied choices or rubric. The raw JEV function sends the JSON state and questions you provide, together with the selected model. The API key you connect authenticates these requests. Only supply data that you are authorized to send to TypeSafe.

Google Apps Script runs this processing. Jev for Sheets does not route inference requests through a separate server operated by Dave Bredesen. A convenience formula with blank data does not make an API request. The Test saved key action sends a built-in sample question about the word “dog”.

The script uses the active spreadsheet ID to associate its connection with that spreadsheet. Menu actions can create example worksheets and read/re-enter Jev formulas in the active spreadsheet to refresh their results. Google's Marketplace installation consent also requests your email address, name, and profile picture. The Jev script does not intentionally read or store those identity details. It does not request access to your contacts or all of your Drive files.

## API keys and spreadsheet connections

A saved personal API key and account label are stored in Google Apps Script user properties for the script project. Connecting a spreadsheet stores a separate copy of that key, its label, and the spreadsheet ID in that project's document properties. All collaborators' Jev formula requests in that spreadsheet use this connected account and can incur charges on it.

Keys are not intentionally written to spreadsheet cells, source code, logs, or the settings page's returned data. The password field is cleared after saving. Project source editors must be trusted. For a per-spreadsheet bound installation, spreadsheet editors can also edit its script and potentially access stored credentials.

## Storage and retention

Saved keys and connections remain in Apps Script properties until removed through the relevant menu actions. Saving a replacement personal key does not update existing spreadsheet connections. API responses become spreadsheet formula results and remain subject to Google's spreadsheet storage and history behavior. The add-on does not maintain a separate database of formula inputs or outputs.

The application does not intentionally log request bodies, response bodies, or credentials. Google may retain execution metadata and error diagnostics under its own service settings and policies. Support emails and information you voluntarily include are retained to handle your request and support history until deleted; contact us to request their deletion.

TypeSafe's processing and retention depend on the policies and agreements applicable to your TypeSafe account. This policy does not promise that TypeSafe retains no data or makes no use of it. Review [TypeSafe's privacy policy](https://typesafe.ai/legal/privacy-policy) and any API/service agreement for your account before sending data.

## Sharing and use

Inputs are transferred to TypeSafe to provide the requested inference, and Google processes the spreadsheet, script, and stored settings. Dave Bredesen does not sell Google user data, use it for advertising, or use formula inputs or outputs to train AI models. No advertising or analytics SDK is included in the add-on. This does not describe tracking that may be provided separately by the website's hosting platform.

Jev for Sheets' use and transfer of information received from Google APIs will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including its Limited Use requirements.

## Deleting data and stopping access

1. Use **Disconnect spreadsheet** in each connected spreadsheet to remove its stored connection.
2. Use **Remove my saved key** to delete the personal saved key and label for that script project. This does not disconnect existing spreadsheets.
3. Revoke the key in [TypeSafe's console](https://console.typesafe.ai/keys) to stop its use everywhere, including any remaining copies.
4. Refresh or delete formulas/results as appropriate. Previously calculated values and spreadsheet history may remain in Google Sheets.
5. Uninstall the add-on or revoke Google access from your Google Account. Do not rely on uninstalling alone to revoke the TypeSafe key or delete existing spreadsheet results.

Contact dbredesen@gmail.com for privacy questions or deletion of information submitted directly for support. For Google- or TypeSafe-held data, use the controls and request processes of those providers.

## Changes

Updates to this policy will be published here with a revised date.
