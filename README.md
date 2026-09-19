# Jev for Google Sheets

Jev formula functions and an API-key menu for Google Sheets. Google Apps Script hosts the runtime; no separate backend, database, or proxy is required.

**Installation status:** the unchanged repository build was installed in a new spreadsheet's bound script and passed all 16 live worksheet checks on September 19, 2026, including calls to TypeSafe. Follow **Local Installation** below to reproduce that setup. The standalone Editor add-on test deployment still fails formula registration in our tests. These are separate installation paths; the bound installation does not fix or validate standalone distribution. See [TEST_REPORT.md](TEST_REPORT.md).

## Formulas

```excel
=JEV_NOUL(B3, "Is it a mammal?")
=JEV_NOUL(B3, "Is it a mammal?", 80%)
=JEV_CHOICE(B3, "What kind of animal is it?", "Mammal", "Bird", "Other")
=JEV_CHOICE(B3, "What kind of animal is it?", H2:H4)
=JEV_SCORE(B3, "How frustrated is the customer?", "Calm", "Concerned", "Very angry")
=JEV_SCORE(B3, "How frustrated is the customer?", H2:H4)
=JEV(A2, B2)
```

Noul returns a native Boolean using strict `probability > threshold` (default 0.5). Choice returns the API-selected label. Score returns the unrounded probability-weighted position on 2–10 levels numbered from zero. Raw `JEV` accepts JSON state and a JSON question map and returns the full API response as JSON text; its optional third argument selects the model (default `jev-latest`).

Convenience functions accept one data cell or literal. They send `{data: value}` with instructions explicitly scoped to `data`. Numbers and Booleans retain their type, dates become ISO timestamps, and formatting is not transmitted. Empty data skips the API call. JSON-looking input remains text. Choices and levels can mix literal arguments and vertical ranges; horizontal/rectangular criteria ranges and multi-cell data ranges are rejected.

## Local Installation

Local Installation works in **one spreadsheet at a time**. Use it for development or as a workaround until Jev is published in Google Workspace Marketplace. It installs the repository build as a **container-bound script**, using Google's [custom-function installation mechanism](https://developers.google.com/apps-script/guides/sheets/functions). “Local” means scoped to that spreadsheet; execution still happens on Google's servers. It does not install an account-wide add-on.

1. Clone this repository and run `npm test` followed by `npm run build` (Node 20+).
2. Create a **new blank spreadsheet**. From that spreadsheet choose **Extensions → Apps Script**. Do not start with a standalone project at script.google.com.
3. Name the project **Jev for Sheets — Local**. Replace the default `Code.gs` contents with the complete contents of **`dist/Code.gs`**. No editing of the generated code, extra wrapper functions, or hardcoded key is needed.
4. Open **Project Settings**, enable **Show appsscript.json manifest file in editor**, return to **Editor**, and replace that manifest with **`dist/appsscript.json`**. Save both files.
5. Reload the spreadsheet. No **Deploy** or **Test deployments** operation is required.
6. Run the registration checks below before configuring a key. All four must produce the documented results. `Unknown function` is a failed installation, not an acceptable warning.
7. Open **Extensions → Jev for Sheets — Local → API key & connection** and authorize your project. The manifest requests only spreadsheet access where installed, external-service calls, and sidebar content. Save your own TypeSafe key and label, select **Test saved key**, then **Connect my saved key**. No key belongs in source code or cells.
8. Choose **Add sample worksheets**, then **Refresh Jev formulas**. Verify the real formula cases and inspect the expected validation errors on the Tests tab. Do not accept error-case PASS cells alone as evidence of a successful install.

### Registration checks (no key or API usage)

Paste these into separate cells in the new spreadsheet:

| Formula | Expected |
| --- | --- |
| `=JEV_NOUL("","Registration check")=""` | `TRUE` |
| `=JEV_CHOICE("","Registration check","A","B")=""` | `TRUE` |
| `=JEV_SCORE("","Registration check","Low","High")=""` | `TRUE` |
| `=JEV("not JSON","{}")` | Intentional error whose message contains `Jev: State must contain valid JSON.` |

These checks prove that Sheets invokes the functions from the installed bundle. They do **not** verify authorization, credentials, network calls, or model outputs. If a function is unknown, check that the code was saved in the project opened from **that spreadsheet**, and reload. Do not add one-off wrapper functions to conceal registration failures.

### Updates and additional spreadsheets

After pulling a new repository revision, rebuild and replace the same two files in the existing bound project. Reload the sheet and refresh formulas; project properties remain in that project. Repeat the installation in each additional spreadsheet and connect a key there. Avoid installing over an existing script without reviewing its contents first.

## API key menu

Use **Extensions → [your Jev script's name] → API key & connection**. Save a personal API key and label, test it, then explicitly connect it to the current spreadsheet. For the local installation above, the submenu is **Jev for Sheets — Local**.

Personal keys live in the script project's user properties. A spreadsheet connection stores a copy of the selected key in that project's document properties, bound to that spreadsheet ID. Every collaborator's formula evaluations use the connected account. Connecting therefore permits collaborators to consume that account's API usage. Keys are never placed in formulas, cells, source code, or UI responses. Other script projects cannot read these properties; project source editors must nevertheless be trusted. In a bound installation, spreadsheet editors can also edit the script and access its stored credentials. Use it only with trusted editors. Each separately installed bound project has its own saved keys and connection.

Saving/replacing a personal key does not update existing spreadsheet connections. Reconnect each spreadsheet explicitly. **Disconnect spreadsheet** removes the active connection. **Remove my saved key** removes only the personal saved copy, not existing connections; revoke the key at TypeSafe to disable it everywhere.

After connection changes, choose **Refresh Jev formulas**. This re-enters direct `=JEV(...)`, `=JEV_NOUL(...)`, `=JEV_CHOICE(...)`, and `=JEV_SCORE(...)` formulas without changing their text. Nested calls such as `=IF(JEV_NOUL(...),...)` must be re-entered manually. Previously calculated values can remain visible until recalculation. Formula execution checks the connected account each time and never silently falls back to the document owner's key.

## Development

Requires Node 20+; no npm dependencies.

```sh
npm test
npm run build
```

Pure request/response logic is in `src/core.js`; Apps Script adapters and menu actions in `src/addon.js`; example generation in `src/samples.js`; sidebar in `src/settings.html`. Build produces a single `dist/Code.gs` containing the HTML and code, plus an explicit manifest. Tests use fake keys and mocked Apps Script services.

## Standalone add-on developer testing — unresolved

This is the intended add-on distribution architecture, but the following developer test route is **not a verified working installation path for formulas**. Use it to investigate standalone registration; do not put bound Jev code into its test spreadsheet, because that would mask a failure.

1. Create a standalone project at https://script.google.com/home.
2. Paste `dist/Code.gs` into `Code.gs`.
3. In Project Settings, show the manifest; replace `appsscript.json` with the built manifest.
4. Create a private blank Google spreadsheet.
5. Choose **Deploy → Test deployments → Editor add-on**, select Latest Code, installation enabled, and the test spreadsheet. Save and execute the test.
6. Authorize the add-on, open its menu, save/connect a key, and choose **Add sample worksheets**.
7. Run the same test deployment workflow against a second spreadsheet to check connection isolation.

Open test documents through their test deployment URLs; a private developer test is not a public Marketplace installation. Test deployments persist properties for the same script/document pair. This milestone does not use installable triggers.

**Observed failure, cause unconfirmed:** our standalone test exposes its menu and sidebar and calls TypeSafe, but Sheets reports `Unknown function` for formulas. On September 19 this reproduced in the untouched second test spreadsheet with a blank-input formula that makes no API call. A similar symptom is reported in [Google's Apps Script samples issue #195](https://github.com/googleworkspace/apps-script-samples/issues/195); that report does not establish our root cause or imply every private deployment fails. Neither a working bound installation nor this failure proves how Marketplace installation will behave.

For Marketplace release, configure a standard Google Cloud project, OAuth consent and any required verification, Marketplace SDK/listing, support/privacy URLs, and submit for Google's review. No separate backend is introduced by publication.

## Limits

- Apps Script custom functions have a 30-second runtime limit. URL Fetch has no per-call timeout setting exposed here.
- No caching, batching across formula cells, automatic retries, or data-range inference in v1. Each nonblank formula makes a request and can incur TypeSafe usage; requests and usage grow with sheet size.
- API errors throw sanitized Sheets errors. HTTP response bodies and credentials are not logged. Responses too large for one cell are rejected.
- Choice supports 2–255 labels and Score 2–10 levels. Exact model values are not deterministic test fixtures.
- Standalone distribution is not verified and there is no Marketplace-approved listing. Per-spreadsheet bound installation has different sharing and update behavior.

## References

- https://docs.typesafe.ai/api
- https://docs.typesafe.ai/primitives
- https://developers.google.com/apps-script/guides/sheets/functions
- https://developers.google.com/apps-script/reference/properties/properties-service
- https://developers.google.com/workspace/add-ons/how-tos/testing-editor-addons
