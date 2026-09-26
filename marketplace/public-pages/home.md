# Jev for Sheets™

Classify text, score feedback, and ask yes/no questions with spreadsheet formulas powered by TypeSafe AI's Jev model.

Developed by **Dave Bredesen**. An independent integration for Google Sheets™; not an official Google or TypeSafe product.

## Four formulas

- **JEV_NOUL** answers a yes/no question about a cell using a probability threshold.
- **JEV_CHOICE** chooses a label from the options you supply.
- **JEV_SCORE** scores a cell against your ordered rubric.
- **JEV** returns a full JSON response for advanced questions.

For example: `=JEV_CHOICE(B3, "Which team should handle this?", "Sales", "Support", "Other")`

## Availability and setup

The project is currently available for local installation in individual spreadsheets. The public Marketplace listing is under Google review; there is no approved Marketplace installation link yet.

[Source and local installation instructions](https://github.com/dbredesen/jev-sheets#local-installation) · [Setup guide](https://jev.developedby.ai/setup/)

## Your TypeSafe account

You need a [TypeSafe account and API key](https://console.typesafe.ai/). The add-on has no fee; TypeSafe API usage may incur charges. Save your key through the settings menu, then explicitly connect it to a spreadsheet. Collaborators' formulas use the account connected to that spreadsheet.

Your formula's data, questions, and supplied choices or score levels are sent to TypeSafe for processing. AI results can be wrong; review them before acting.

[Privacy](https://jev.developedby.ai/privacy/) · [Terms](https://jev.developedby.ai/terms/) · [Support](https://jev.developedby.ai/support/)
