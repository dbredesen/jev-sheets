# Jev’s System One model, inside Google Sheets™

Ask questions about your data in plain language. Get categories, scores, and yes/no answers directly in your cells—with formulas you can fill down, filter, and combine.

Jev is TypeSafe’s AI model for structured decisions. Jev for Sheets brings it into your spreadsheet to help categorize feedback, prioritize requests, and evaluate information against your own criteria.

[Install from Google Workspace Marketplace](https://workspace.google.com/marketplace/app/jev_for_sheets/33542281317) [Follow the setup guide](https://jev.developedby.ai/setup/)

**Free add-on. Your own TypeSafe account and API key are required; API usage may incur charges.**

## Put your text to work

- **Categorize customer feedback.** Label comments as billing issues, bug reports, feature requests, or other topics you choose.
- **Route incoming requests.** Suggest Sales, Support, or another team for each request, then filter the results for review.
- **Score sentiment.** Rate feedback against an ordered scale such as Negative, Neutral, and Positive to help you spot patterns.

Use AI text classification and sentiment analysis through Google Sheets formulas, with the categories and criteria you choose.

## See a formula in action

Suppose cell **A2** contains: “I was charged twice for my subscription.” After setup, enter this formula in **B2**:

```excel
=JEV_CHOICE(A2, "What is this feedback about?", "Billing", "Bug", "Feature request", "Other")
```

An example result is **Billing**. Replace the question and labels to fit your work, then fill the formula down alongside your other comments. Each nonblank formula makes an API request; start with a small sample and review the results.

## Choose the answer your sheet needs

- **JEV_CHOICE** returns one of the labels you supply.
- **JEV_SCORE** returns a number based on your ordered scale.
- **JEV_NOUL** answers a yes/no question with TRUE or FALSE, using a probability threshold.
- **JEV** returns the full API response as JSON for advanced uses.

Jev uses TypeSafe AI's Jev model. Formula inputs are sent to TypeSafe for processing, and AI results can be wrong. [Read the FAQ](https://jev.developedby.ai/faq/) for pricing, data handling, and installation details.

## Try it in your spreadsheet

Install the add-on, activate it in your spreadsheet, and connect your TypeSafe API key. The add-on can then create sample worksheets for you to explore.

[Get started with the setup guide](https://jev.developedby.ai/setup/) · [Get help](https://jev.developedby.ai/support/)

Developed by **Dave Bredesen**. An independent integration for Google Sheets™; not an official Google or TypeSafe product.
