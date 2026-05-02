# Test Plan by Stage

## Principle

Every build phase must end with a test. Do not continue if the current phase is broken.

## Stage 0: Environment tests

Test:
- Xcode builds.
- Simulator launches.
- Firebase packages resolve.

Pass:
- App opens to RootTabView.

Fail action:
- Remove optional packages first.
- Keep only FirebaseCore, FirebaseFirestore, FirebaseAILogic.

## Stage 1: UI tests

Manual tests:
- Tap every tab.
- Universal Log button opens Log tab.
- Assistant quick prompts are visible.
- Ledger empty state visible.
- Credit summary empty state visible.

Pass:
- No crash.
- No broken navigation.

## Stage 2: Model tests

Create test entries:

1. Income: 10000
2. Expense: 3000
3. Receivable: 8000

Expected:
- sales = 10000
- expenses = 3000
- profit = 7000
- outstanding = 8000

Pass:
- Dashboard shows exact values.

## Stage 3: Firestore tests

Test 1:
- Save manual income entry.
- Confirm entry appears in Firebase console.

Test 2:
- Relaunch app.
- Entry still appears.

Test 3:
- Save second entry.
- Dashboard updates.

Pass:
- Firestore read/write stable.

## Stage 4: AI extraction tests

### Text extraction fixtures

Input:
- "Sold rice to Tunde for 15000, paid transfer."

Expected:
- type: income
- amount: 15000
- paymentStatus: paid
- counterparty: Tunde

Input:
- "Mama Bose collect garri 8k she go pay tomorrow."

Expected:
- type: receivable
- amount: 8000
- paymentStatus: unpaid
- counterparty: Mama Bose

Input:
- "Bought tomatoes 30000 cash."

Expected:
- type: expense
- amount: 30000
- paymentStatus: paid

Pass:
- Correct enough to review and edit.

Fail action:
- Tighten prompt.
- Lower ambition.
- Add manual correction.

## Stage 5: Review screen tests

Test:
- AI draft appears.
- User changes amount.
- Save uses edited value, not original AI value.

Pass:
- Firestore stores final reviewed value.

## Stage 6: Assistant tests

Seed ledger:
- unpaid Mama Bose 8000,
- sales 48500,
- expenses 21000.

Questions:
1. "Who owes me?"
2. "How is my business today?"
3. "Write reminder for Mama Bose."
4. "Generate credit summary."

Expected:
- Uses exact ledger numbers.
- Does not invent new customers.
- Reminder message is polite and short.
- Credit summary does not promise loan approval.

## Stage 7: Failure tests

AI unavailable:
- App shows manual entry fallback.

Invalid JSON:
- App shows manual entry fallback.

No entries:
- Assistant says there are not enough records.

Low confidence:
- Review screen warning visible.

Firestore save fails:
- Retry option visible.

## Stage 8: Demo rehearsal tests

Run the full judge demo 3 times:

1. Cold start.
2. Text entry.
3. Image entry.
4. Dashboard.
5. Assistant.
6. Credit summary.

Pass:
- Entire flow under 3 minutes.
- No live debugging.
