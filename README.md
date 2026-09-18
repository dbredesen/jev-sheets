# Jev for Google Sheets

A standalone Google Sheets Editor add-on. Google Apps Script hosts the runtime; no separate backend, database, or proxy is required.

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

## API key menu

Use **Extensions → Jev for Sheets → API key & connection**. Save a personal API key and label, test it, then explicitly connect it to the current spreadsheet. Google may label the submenu with the test deployment's name.

Personal keys live in this add-on's user properties. A spreadsheet connection stores a copy of the selected key in this add-on's document properties, bound to that spreadsheet ID. Every collaborator's formula evaluations use the connected account. Connecting therefore permits collaborators to consume that account's API usage. Keys are never placed in formulas, cells, source code, or UI responses. Other scripts cannot read this add-on's properties; project source editors must nevertheless be trusted.

Saving/replacing a personal key does not update existing spreadsheet connections. Reconnect each spreadsheet explicitly. **Disconnect spreadsheet** removes the active connection. **Remove my saved key** removes only the personal saved copy, not existing connections; revoke the key at TypeSafe to disable it everywhere.

After connection changes, choose **Refresh Jev formulas**. This re-enters direct `=JEV(...)`, `=JEV_NOUL(...)`, `=JEV_CHOICE(...)`, and `=JEV_SCORE(...)` formulas without changing their text. Nested calls such as `=IF(JEV_NOUL(...),...)` must be re-entered manually. Previously calculated values can remain visible until recalculation. Formula execution checks the connected account each time and never silently falls back to the document owner's key.

## Development

Requires Node 20+; no npm dependencies.

```sh
npm test
npm run build
```

Pure request/response logic is in `src/core.js`; Apps Script adapters and menu actions in `src/addon.js`; example generation in `src/samples.js`; sidebar in `src/settings.html`. Build produces a single `dist/Code.gs` containing the HTML and code, plus an explicit manifest. Tests use fake keys and mocked Apps Script services.

## Private deployment

1. Create a standalone project at https://script.google.com/home.
2. Paste `dist/Code.gs` into `Code.gs`.
3. In Project Settings, show the manifest; replace `appsscript.json` with the built manifest.
4. Create a private blank Google spreadsheet.
5. Choose **Deploy → Test deployments → Editor add-on**, select Latest Code, installation enabled, and the test spreadsheet. Save and execute the test.
6. Authorize the add-on, open its menu, save/connect a key, and choose **Add sample worksheets**.
7. Run the same test deployment workflow against a second spreadsheet to check connection isolation.

Open test documents through their test deployment URLs; a private developer test is not a public Marketplace installation. Test deployments persist properties for the same script/document pair. This milestone does not use installable triggers.

**Observed test-deployment limitation:** the standalone private deployment exposes its menu and sidebar and successfully calls TypeSafe, but Sheets reports `Unknown function` for its formulas, including after reload and manual re-entry. A similar symptom is reported in [Google's Apps Script samples issue #195](https://github.com/googleworkspace/apps-script-samples/issues/195). This is an observed limitation, not proof that Marketplace installation will work; that path still needs verification.

For native formula testing without publishing, install the identical built bundle and manifest in the sample spreadsheet's **Extensions → Apps Script** bound project. Authorize it and save/connect the test key using that project's own menu. Its properties are separate from the standalone add-on. Keep this workbook private: spreadsheet editors can edit a bound script, so this test harness does not provide the standalone add-on's source isolation. See `TEST_REPORT.md` for completed checks and remaining live tests.

For Marketplace release, configure a standard Google Cloud project, OAuth consent and any required verification, Marketplace SDK/listing, support/privacy URLs, and submit for Google's review. No separate backend is introduced by publication.

## Limits

- Apps Script custom functions have a 30-second runtime limit. URL Fetch has no per-call timeout setting exposed here.
- No caching, batching across formula cells, automatic retries, or data-range inference in v1. Each nonblank formula makes a request and can incur TypeSafe usage; requests and usage grow with sheet size.
- API errors throw sanitized Sheets errors. HTTP response bodies and credentials are not logged. Responses too large for one cell are rejected.
- Choice supports 2–255 labels and Score 2–10 levels. Exact model values are not deterministic test fixtures.
- This is a private test deployment, not a Marketplace-approved listing.

## References

- https://docs.typesafe.ai/api
- https://docs.typesafe.ai/primitives
- https://developers.google.com/apps-script/guides/sheets/functions
- https://developers.google.com/apps-script/reference/properties/properties-service
- https://developers.google.com/workspace/add-ons/how-tos/testing-editor-addons
