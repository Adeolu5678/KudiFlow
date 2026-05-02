# AI Schemas and Prompts

## Extraction JSON schema

All extraction responses must fit this structure.

```json
{
  "type": "income | expense | receivable | payable | inventory | unknown",
  "title": "string",
  "amount": 0,
  "currency": "NGN",
  "dateText": "YYYY-MM-DD or null",
  "paymentStatus": "paid | unpaid | partial | unknown",
  "counterparty": "string or null",
  "items": [
    {
      "name": "string",
      "quantity": "string or null",
      "unitPrice": 0
    }
  ],
  "sourceType": "text | imageReceipt | bankAlertScreenshot | manual | assistant",
  "originalNote": "string or null",
  "confidence": 0.0,
  "needsReview": true,
  "warnings": ["string"]
}
```

## Universal Log extraction prompt

Use the canonical version in `prompts/universal_log_prompt.md`.

## Assistant prompt

Use the canonical version in `prompts/assistant_prompt.md`.

## Extraction rules

The model must:
- output JSON only,
- avoid Markdown,
- use NGN,
- return null for unknown fields,
- classify unpaid sales as `receivable`,
- classify money spent as `expense`,
- classify money received as `income`,
- mark unclear entries as `unknown`,
- include warnings when uncertain.

## Examples

### Input

```text
Sold rice to Tunde for 15000, paid transfer.
```

### Output

```json
{
  "type": "income",
  "title": "Rice sold to Tunde",
  "amount": 15000,
  "currency": "NGN",
  "dateText": null,
  "paymentStatus": "paid",
  "counterparty": "Tunde",
  "items": [
    {
      "name": "rice",
      "quantity": null,
      "unitPrice": null
    }
  ],
  "sourceType": "text",
  "originalNote": "Sold rice to Tunde for 15000, paid transfer.",
  "confidence": 0.91,
  "needsReview": true,
  "warnings": []
}
```

### Input

```text
Mama Bose collect garri 8k she go pay tomorrow.
```

### Output

```json
{
  "type": "receivable",
  "title": "Garri sold to Mama Bose",
  "amount": 8000,
  "currency": "NGN",
  "dateText": null,
  "paymentStatus": "unpaid",
  "counterparty": "Mama Bose",
  "items": [
    {
      "name": "garri",
      "quantity": null,
      "unitPrice": null
    }
  ],
  "sourceType": "text",
  "originalNote": "Mama Bose collect garri 8k she go pay tomorrow.",
  "confidence": 0.88,
  "needsReview": true,
  "warnings": ["Payment date mentioned as tomorrow, but exact due-date field is not in MVP schema."]
}
```

## Assistant supported intents

The assistant can answer:
- today's sales,
- today's expenses,
- estimated profit,
- unpaid customers,
- top items,
- reminder message,
- credit summary,
- add transaction by conversation.

The assistant must refuse or redirect:
- unrelated general questions,
- loan approval guarantees,
- legal/tax advice,
- medical/political/religious advice,
- unsupported external market price claims.

## Assistant context format

The app should compute and send:

```json
{
  "date": "2026-05-02",
  "currency": "NGN",
  "totals": {
    "sales": 48500,
    "expenses": 21000,
    "cashCollected": 40500,
    "receivables": 8000,
    "estimatedProfit": 27500
  },
  "unpaidCustomers": [
    {
      "name": "Mama Bose",
      "amount": 8000,
      "item": "Garri"
    }
  ],
  "recentTransactions": []
}
```

## Critical rule

The assistant should not recalculate totals if the app already supplies totals. It should explain the supplied numbers.
