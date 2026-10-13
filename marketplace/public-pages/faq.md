# Jev for Sheets™ — FAQ

Quick answers about the add-on, costs, and getting started. For step-by-step instructions, visit the [Setup guide](https://jev.developedby.ai/setup/).

## What is Jev for Sheets?

Jev for Sheets™ is a Google Sheets™ add-on that uses TypeSafe AI's Jev model to classify text, score it against a rubric, and answer yes/no questions through spreadsheet formulas. It can help you categorize customer feedback, suggest a team for an incoming request, or score sentiment. See a [formula example on the homepage](https://jev.developedby.ai/).

## What is a System One model?

System One is TypeSafe’s name for AI models designed to make structured decisions that software can use directly. Jev is its first public model; in Jev for Sheets, you ask a question through a formula and get a label, a score, or a TRUE/FALSE answer. Read [TypeSafe’s introduction to System One models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) for the model’s design and capabilities.

## Is Jev for Sheets free?

The add-on has no fee. It uses your own TypeSafe account, and TypeSafe API usage may incur charges; each nonblank formula evaluation makes a request. In a shared spreadsheet, all collaborators' Jev formulas use the connected account's API usage.

## Do I need an API key?

Yes. Create a [TypeSafe account and API key](https://console.typesafe.ai/keys), save the key in the add-on's **API key & connection** menu, and select **Connect this spreadsheet**. Keep the key in the settings menu, not in a cell; the [Setup guide](https://jev.developedby.ai/setup/) walks you through the connection.

## What does Jev for Sheets send to TypeSafe?

For classification, scoring, and yes/no formulas, it sends the cell value you supply, your question, and any labels or score levels you provide. The advanced `JEV` formula sends your supplied JSON, and your connected API key authenticates requests. Read the [Privacy policy](https://jev.developedby.ai/privacy/) for details on processing, storage, and deletion.

## How do I install Jev for Sheets?

Install it from [Google Workspace Marketplace](https://workspace.google.com/marketplace/app/jev_for_sheets/33542281317), then enable **Use in this document** for each spreadsheet where you want to use it. Connect your TypeSafe key and add the sample worksheets or enter a formula. Follow the [Setup guide](https://jev.developedby.ai/setup/) for the exact steps, or visit [Support](https://jev.developedby.ai/support/) if you get stuck.
