import { Customer, DashboardSummary, LedgerEntry } from '../models';
import { DashboardCalculator } from './dashboardCalculator';

export const LedgerContextBuilder = {
  build(entries: LedgerEntry[], date = new Date()): string {
    const totals: DashboardSummary = DashboardCalculator.calculate(entries);
    const unpaidCustomersMap = new Map<string, Customer>();
    const recentTransactions = [...entries]
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 8)
      .map((entry) => ({
        type: entry.type,
        title: entry.title,
        amount: entry.amount,
        paymentStatus: entry.paymentStatus,
        counterparty: entry.counterparty,
        date: entry.date,
      }));

    entries
      .filter((entry) => entry.paymentStatus === 'unpaid' && entry.counterparty)
      .forEach((entry) => {
        const key = entry.counterparty ?? 'Unknown';
        const prev = unpaidCustomersMap.get(key);
        if (!prev) {
          unpaidCustomersMap.set(key, {
            name: key,
            amountOwed: entry.amount,
            item: entry.items[0]?.name ?? null,
          });
          return;
        }
        unpaidCustomersMap.set(key, {
          ...prev,
          amountOwed: prev.amountOwed + entry.amount,
        });
      });

    return JSON.stringify({
      date: date.toISOString().slice(0, 10),
      currency: 'NGN',
      totals,
      unpaidCustomers: Array.from(unpaidCustomersMap.values()).map((customer) => ({
        name: customer.name,
        amount: customer.amountOwed,
        item: customer.item,
      })),
      recentTransactions,
    });
  },
};
