# MDD: Model Design Document

## Model usage

KudiFlow uses Gemini for two distinct tasks:

1. Extraction model
   - Input: text or image.
   - Output: structured `LedgerDraft`.
   - Required behavior: deterministic extraction, no extra prose.

2. Assistant model
   - Input: user question + compact ledger context.
   - Output: concise business answer.
   - Required behavior: answer only from provided records or clearly state uncertainty.

## Recommended model

Primary stable model:
- `gemini-2.5-flash`

Reason:
- Stable model.
- Supports text, image, audio, video inputs.
- Supports structured outputs.
- Supports function calling.
- Suitable for low-latency/high-volume tasks.

Optional latest preview model:
- `gemini-3-flash-preview`

Use only if:
- It is available in the Firebase project during the competition.
- It works reliably with structured output in the app.
- Switching does not break the demo.

Do not block the MVP on preview-model behavior.

## Model initialization policy

- Store model name in one central constant:
  - `AIConfig.extractionModelName`
  - `AIConfig.assistantModelName`
- Do not hardcode model names across multiple files.
- If a model fails, switch one config value only.

## Extraction behavior

The extraction model must:
- return JSON only,
- classify transaction type,
- extract amount in NGN,
- infer paid/unpaid status,
- include confidence,
- mark uncertain fields as `unknown` or `null`,
- never invent missing information.

## Assistant behavior

The assistant model must:
- answer from ledger context only,
- be concise,
- use Nigerian Naira formatting,
- avoid broad financial advice,
- never claim loan approval,
- never alter database state directly.

## Human-in-the-loop rule

No AI-generated ledger entry is saved automatically.

Always show:
- extracted fields,
- confidence,
- editable fields,
- Save button,
- Cancel button.

## LedgerDraft JSON contract

See `07_AI_SCHEMAS_AND_PROMPTS.md`.

## Hallucination controls

1. Structured output for extraction.
2. Local validation before review screen.
3. Confirmation before save.
4. Assistant receives compact ledger context.
5. Assistant instructed to say "I do not have enough records yet" when needed.
6. Assistant cannot call external web or invent market prices.
7. Credit summaries use app-calculated totals, not model-calculated totals.

## Confidence policy

- `confidence >= 0.80`: show normal review.
- `0.50 <= confidence < 0.80`: show warning: "Please check this carefully."
- `confidence < 0.50`: show manual entry mode with AI suggestions.

## Prompt testing fixtures

Minimum extraction test cases:

1. "Sold rice to Tunde for 15000, paid transfer."
2. "Mama Bose collect garri 8k she go pay tomorrow."
3. "Bought tomatoes 30000 cash."
4. Receipt image with item + amount.
5. Bank alert screenshot with CR amount.
6. Ambiguous text: "Tunde 5k yesterday" -> should mark unknown type/payment status if unclear.

## Future function calling

P1 assistant can use function calling for:
- `getLedgerSummary(dateRange)`
- `getUnpaidCustomers()`
- `createLedgerDraftFromText(text)`
- `generateCreditSummary(dateRange)`

For one-day MVP, prefer app-side context injection because it is faster and safer.
