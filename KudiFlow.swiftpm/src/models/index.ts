export type LedgerEntryType = 'income' | 'expense' | 'receivable' | 'payable' | 'inventory' | 'unknown';
export type PaymentStatus = 'paid' | 'unpaid' | 'partial' | 'unknown';
export type SourceType = 'text' | 'imageReceipt' | 'bankAlertScreenshot' | 'manual' | 'assistant';

export interface LedgerItem {
  id: string;
  name: string;
  quantity: string | null;
  unitPrice: number | null;
}

export interface LedgerDraftItem {
  name: string;
  quantity: string | null;
  unitPrice: number | null;
}

export interface LedgerDraft {
  type: LedgerEntryType;
  title: string;
  amount: number | null;
  currency: 'NGN';
  dateText: string | null;
  paymentStatus: PaymentStatus;
  counterparty: string | null;
  items: LedgerDraftItem[];
  sourceType: SourceType;
  originalNote: string | null;
  confidence: number;
  needsReview: boolean;
  warnings: string[];
}

export interface LedgerEntry {
  id: string;
  type: LedgerEntryType;
  title: string;
  amount: number;
  currency: 'NGN';
  date: string;
  paymentStatus: PaymentStatus;
  counterparty: string | null;
  items: LedgerItem[];
  sourceType: SourceType;
  originalNote: string | null;
  confidence: number;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  name: string;
  amountOwed: number;
  item: string | null;
}

export interface DashboardSummary {
  sales: number;
  expenses: number;
  cashCollected: number;
  receivables: number;
  estimatedProfit: number;
  transactionCount: number;
}

export interface CreditSummary {
  totals: DashboardSummary;
  generatedAt: string;
  narrative: string;
}

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ValidationIssue {
  field: string;
  message: string;
  severity: 'warning' | 'error';
}

export interface LedgerFilter {
  type: LedgerEntryType | 'all';
  paymentStatus: PaymentStatus | 'all';
}
