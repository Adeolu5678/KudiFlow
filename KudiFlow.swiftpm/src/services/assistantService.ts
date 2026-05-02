import { getApp } from 'firebase/app';
import { AppConfig } from '../config/AppConfig';
import { CreditSummary, DashboardSummary } from '../models';
import { formatNaira } from '../utils/formatting';

const assistantPrompt = `You are Kudi, a business assistant inside KudiFlow.
Answer only from provided ledger context.
Use concise plain language and Naira format.
Do not promise loan approval.
If data is insufficient, say clearly you do not have enough records yet.`;

function deterministicAssistant(message: string, context: string): string {
  const parsed = JSON.parse(context) as {
    totals: DashboardSummary;
    unpaidCustomers: Array<{ name: string; amount: number; item: string | null }>;
  };
  const normalized = message.toLowerCase();
  if (normalized.includes('who owes me')) {
    if (parsed.unpaidCustomers.length === 0) {
      return 'No customer is currently marked unpaid in your records.';
    }
    return parsed.unpaidCustomers
      .map((customer) => `${customer.name} owes ${formatNaira(customer.amount)}${customer.item ? ` for ${customer.item}` : ''}.`)
      .join(' ');
  }
  if (normalized.includes('how much did i sell today') || normalized.includes('business today')) {
    return `You recorded ${formatNaira(parsed.totals.sales)} in sales, ${formatNaira(parsed.totals.expenses)} in expenses, and an estimated profit of ${formatNaira(parsed.totals.estimatedProfit)}.`;
  }
  if (normalized.includes('restock')) {
    return 'From your records, check items linked to repeated sales and low-margin expenses first before restocking.';
  }
  if (normalized.includes('reminder')) {
    const first = parsed.unpaidCustomers[0];
    if (!first) {
      return 'No unpaid customer found to write a reminder for yet.';
    }
    return `Hello ${first.name}, just a quick reminder on ${formatNaira(first.amount)}${first.item ? ` for ${first.item}` : ''}. Thank you.`;
  }
  if (normalized.includes('credit summary')) {
    return `Your records show sales of ${formatNaira(parsed.totals.sales)}, expenses of ${formatNaira(parsed.totals.expenses)}, receivables of ${formatNaira(parsed.totals.receivables)}, and estimated profit of ${formatNaira(parsed.totals.estimatedProfit)}.`;
  }
  return 'I can help with sales, expenses, who owes you, restocking hints, reminders, and credit summary from your ledger.';
}

async function requestLiveAssistant(message: string, context: string): Promise<string> {
  const aiModule: any = await import('firebase/ai');
  const app = getApp();
  const ai = aiModule.getAI(app, { backend: new aiModule.GoogleAIBackend() });
  const model = aiModule.getGenerativeModel(ai, {
    model: AppConfig.assistantModelName,
    systemInstruction: assistantPrompt,
  });
  const result = await model.generateContent(`Ledger context: ${context}\nUser: ${message}`);
  return result.response.text();
}

export const AssistantService = {
  async sendMessage(message: string, ledgerContext: string): Promise<string> {
    if (!message.trim()) {
      throw new Error('emptyMessage');
    }
    if (!ledgerContext.trim()) {
      throw new Error('noLedgerContext');
    }
    if (AppConfig.useMockAI) {
      return deterministicAssistant(message, ledgerContext);
    }
    try {
      return await requestLiveAssistant(message, ledgerContext);
    } catch (error) {
      if (!AppConfig.allowMockAIFallback) {
        throw error;
      }
      return deterministicAssistant(message, ledgerContext);
    }
  },

  async generateCreditSummary(context: string): Promise<string> {
    return this.sendMessage('Generate credit summary.', context);
  },

  fromTotals(totals: DashboardSummary, narrative: string): CreditSummary {
    return {
      totals,
      generatedAt: new Date().toISOString(),
      narrative,
    };
  },
};
