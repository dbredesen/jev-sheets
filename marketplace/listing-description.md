# Jev for Sheets

Turn text in Google Sheets into typed decisions with TypeSafe AI's Jev model. Classify feedback, organize messy labels, score messages against a rubric, or ask yes/no questions about a cell.

Four functions work directly in spreadsheet formulas:

- JEV_NOUL(data, question, [threshold]) returns TRUE when the model's probability exceeds your threshold. The default is 50%.
- JEV_CHOICE(data, question, choice1, …) selects a label from your choices. Choices can also come from a vertical range.
- JEV_SCORE(data, question, level1, …) returns a numeric score on 2–10 ordered levels, numbered from zero. Levels can come from a vertical range.
- JEV(state_json, questions_json, [model]) returns the full TypeSafe response as JSON text for advanced workflows.

Examples:
=JEV_NOUL(B3, "Is this asking for a refund?")
=JEV_CHOICE(B3, "Which team should handle this?", "Sales", "Support", "Other")
=JEV_SCORE(B3, "How frustrated is the customer?", "Calm", "Concerned", "Very angry")

A separate TypeSafe account and your own API key are required. The add-on has no fee; TypeSafe API usage may incur charges. Create or access your TypeSafe account at https://console.typesafe.ai/ and manage keys there.

After installation, open Extensions → Jev for Sheets → API key & connection. Save and test your key, then explicitly connect it to the spreadsheet. All collaborators' Jev formulas in that spreadsheet use the connected TypeSafe account and its API usage. Use the menu to disconnect a spreadsheet, remove your saved key, generate examples, or refresh formulas.

Formula inputs—including the selected cell's value, question, and supplied choices or score levels—are sent to TypeSafe for processing. Raw JEV sends the supplied JSON. Google Apps Script executes the add-on; no separate developer-operated inference backend is used. API keys are stored in Apps Script properties, not spreadsheet cells. See the privacy policy for storage, deletion, and third-party processing details.

Each nonblank evaluation can make a billed API request. Blank data in the convenience functions returns blank. Apps Script quotas and a 30-second custom-function limit apply. AI judgments can be incorrect; review results before acting on them.

Developed independently by Dave Bredesen. This is not an official Google or TypeSafe product. Support: dbredesen@gmail.com. Source: https://github.com/dbredesen/jev-sheets.
