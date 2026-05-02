# Demo Script and Judge Story

## Opening

"Many small businesses do not fail because they lack customers. They fail because their business data is trapped in receipts, screenshots, notebooks, and memory."

"KudiFlow turns that messy data into clean business records."

## Persona

"This is for a trader in Ibadan who sells food items and provisions. She receives cash, bank transfers, gives some customers credit, and wants to build records for credit access."

## Demo flow

### Step 1: Universal Log

Say:
"Instead of asking her to learn accounting software, we give her one button: Universal Log."

Action:
- Open Universal Log.
- Enter: "Mama Bose collect garri 8k she go pay tomorrow."
- Tap Extract.

Expected result:
- App extracts receivable, ₦8,000, Mama Bose, unpaid.

Say:
"KudiFlow understands this is not cash received. It is money owed."

### Step 2: Review before save

Action:
- Show review screen.
- Save.

Say:
"We never let AI silently write financial records. The user confirms first."

### Step 3: Bank alert / receipt

Action:
- Upload screenshot/photo or use second text if live image fails.
- Extract paid sale or expense.

Say:
"The same Universal Log works for receipts, transfer alerts, and notes."

### Step 4: Dashboard

Action:
- Open Home.

Say:
"Now she can see sales, expenses, profit estimate, and outstanding customer debt."

### Step 5: Assistant

Action:
- Open Assistant.
- Tap "Who owes me?"

Expected:
- Kudi says Mama Bose owes ₦8,000.

Say:
"This is not a generic chatbot. It is an assistant connected to her records."

### Step 6: Credit summary

Action:
- Tap "Generate credit summary."

Say:
"Over time, these records become a simple credit-readiness report."

## Closing

"KudiFlow is the financial memory for small businesses. It captures the way traders already work and turns it into records they can use."

## Backup demo path

If AI fails:
- Use mock AI toggle.
- Say: "For demo stability, this mode uses the same schema with seeded extraction."
- Continue flow.

Do not apologize. Keep moving.
