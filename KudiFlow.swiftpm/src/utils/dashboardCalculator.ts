import { DashboardSummary, LedgerEntry } from '../models';

const INCOME_LIKE_TYPES = new Set(['income', 'receivable']);

export const DashboardCalculator = {
  calculate(entries: LedgerEntry[]): DashboardSummary {
    const sales = entries.filter((e) => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
    const expenses = entries.filter((e) => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
    const receivables = entries
      .filter((e) => e.type === 'receivable' || (INCOME_LIKE_TYPES.has(e.type) && e.paymentStatus === 'unpaid'))
      .reduce((sum, e) => sum + e.amount, 0);
    const cashCollected = entries
      .filter((e) => INCOME_LIKE_TYPES.has(e.type) && e.paymentStatus === 'paid')
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      sales,
      expenses,
      cashCollected,
      receivables,
      estimatedProfit: sales - expenses,
      transactionCount: entries.length,
    };
  },
};
