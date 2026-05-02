# Seeded Demo Data

Use seeded data to stabilize the demo.

## Seed entries

1. Income
   - title: "Rice sale to Tunde"
   - amount: 15000
   - type: income
   - paymentStatus: paid
   - counterparty: Tunde

2. Expense
   - title: "Tomatoes restock"
   - amount: 30000
   - type: expense
   - paymentStatus: paid
   - counterparty: Bodija supplier

3. Receivable
   - title: "Garri sold to Mama Bose"
   - amount: 8000
   - type: receivable
   - paymentStatus: unpaid
   - counterparty: Mama Bose

4. Income
   - title: "Transfer alert sale"
   - amount: 25000
   - type: income
   - paymentStatus: paid
   - counterparty: Customer

## Reset demo data button

Add debug-only button:
- "Reset Demo Data"

Behavior:
- Deletes demo user's entries.
- Recreates the seed entries.

If delete is too slow:
- Just write entries with new IDs and filter by current session ID.

## Mock AI responses

When `AppConfig.useMockAI == true`:

Input contains "Mama Bose":
- return receivable ₦8,000.

Input contains "rice":
- return income ₦15,000.

Input contains "tomatoes":
- return expense ₦30,000.

Image input:
- return income ₦25,000 bank transfer.

Assistant:
- generate deterministic answers from current ledger summary.
