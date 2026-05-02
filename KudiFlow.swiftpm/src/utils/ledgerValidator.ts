import { LedgerDraft, LedgerEntry, ValidationIssue } from '../models';
import { toIsoNow } from './formatting';

export const LedgerValidator = {
  validateDraft(draft: LedgerDraft): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    if (draft.amount === null || draft.amount <= 0) {
      issues.push({ field: 'amount', message: 'Amount must be greater than 0.', severity: 'error' });
    }
    if (draft.currency !== 'NGN') {
      issues.push({ field: 'currency', message: 'Currency must be NGN.', severity: 'error' });
    }
    if (!draft.type) {
      issues.push({ field: 'type', message: 'Type is required.', severity: 'error' });
    }
    if (draft.confidence < 0.5) {
      issues.push({
        field: 'confidence',
        message: 'Low confidence. Please verify every field carefully.',
        severity: 'warning',
      });
    }
    return issues;
  },

  makeEntry(draft: LedgerDraft): LedgerEntry {
    const amount = draft.amount ?? 0;
    if (amount <= 0) {
      throw new Error('Ledger draft amount is invalid.');
    }
    const now = toIsoNow();
    return {
      id: `entry-${Date.now()}`,
      type: draft.type,
      title: draft.title || 'Untitled transaction',
      amount,
      currency: 'NGN',
      date: draft.dateText ? new Date(draft.dateText).toISOString() : now,
      paymentStatus: draft.paymentStatus,
      counterparty: draft.counterparty,
      items: draft.items.map((item, index) => ({
        id: `item-${index}-${Date.now()}`,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      sourceType: draft.sourceType,
      originalNote: draft.originalNote,
      confidence: draft.confidence,
      createdAt: now,
      updatedAt: now,
    };
  },
};
