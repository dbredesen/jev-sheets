# Jev for Sheets™ — Support

Developed by Dave Bredesen. Email [dbredesen@gmail.com](mailto:dbredesen@gmail.com) or [report a bug on GitHub](https://github.com/dbredesen/jev-sheets/issues).

Include the formula (with sensitive inputs removed), error message, installation method, and steps to reproduce. Never send an API key, Google password, access token, or private spreadsheet contents in a public issue.

## Common problems

- **Unknown function:** for local installation, confirm the complete built code is saved in the Apps Script™ project opened from that spreadsheet, then reload. The developer add-on test-deployment path has an unresolved registration failure; it is not the documented local setup.
- **No account connected:** open the API key & connection menu, save a key and label, explicitly connect it, then refresh Jev formulas.
- **Authentication failed:** check the key in TypeSafe, save the replacement, and reconnect the spreadsheet. Replacing your saved key alone does not update existing connections.
- **Rate limit or timeout:** reduce simultaneous formulas and retry later. Apps Script™ custom functions have a 30-second limit.
- **Old values after disconnect:** existing results may remain visible until recalculation. Refresh Jev formulas or remove the results as appropriate.

[Setup](https://jev.developedby.ai/setup/) · [Privacy and deletion](https://jev.developedby.ai/privacy/) · [Terms](https://jev.developedby.ai/terms/)
