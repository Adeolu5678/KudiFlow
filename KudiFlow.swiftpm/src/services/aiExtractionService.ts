import { getApp } from 'firebase/app';
import { AppConfig } from '../config/AppConfig';
import { LedgerDraft, SourceType } from '../models';

const extractionPrompt = `You are KudiFlow's ledger extraction engine.
Convert messy business input into one structured ledger draft JSON.
Output JSON only. No markdown.
Use NGN.
Classify unpaid sales as receivable.
Use null for unknown fields.
Set needsReview true.
Include warnings when uncertain.`;

const emptyDraft: LedgerDraft = {
  type: 'unknown',
  title: '',
  amount: null,
  currency: 'NGN',
  dateText: null,
  paymentStatus: 'unknown',
  counterparty: null,
  items: [],
  sourceType: 'manual',
  originalNote: null,
  confidence: 0.1,
  needsReview: true,
  warnings: ['AI could not read this clearly. Please edit manually.'],
};

function mockFromText(text: string, sourceType: SourceType): LedgerDraft {
  const normalized = text.toLowerCase();
  if (normalized.includes('mama bose')) {
    return {
      type: 'receivable',
      title: 'Garri sold to Mama Bose',
      amount: 8000,
      currency: 'NGN',
      dateText: null,
      paymentStatus: 'unpaid',
      counterparty: 'Mama Bose',
      items: [{ name: 'Garri', quantity: null, unitPrice: null }],
      sourceType,
      originalNote: text,
      confidence: 0.88,
      needsReview: true,
      warnings: [],
    };
  }
  if (normalized.includes('rice')) {
    return {
      type: 'income',
      title: 'Rice sale',
      amount: 15000,
      currency: 'NGN',
      dateText: null,
      paymentStatus: 'paid',
      counterparty: 'Customer',
      items: [{ name: 'Rice', quantity: null, unitPrice: null }],
      sourceType,
      originalNote: text,
      confidence: 0.91,
      needsReview: true,
      warnings: [],
    };
  }
  if (normalized.includes('tomatoes')) {
    return {
      type: 'expense',
      title: 'Tomatoes restock',
      amount: 30000,
      currency: 'NGN',
      dateText: null,
      paymentStatus: 'paid',
      counterparty: 'Supplier',
      items: [{ name: 'Tomatoes', quantity: null, unitPrice: null }],
      sourceType,
      originalNote: text,
      confidence: 0.9,
      needsReview: true,
      warnings: [],
    };
  }
  return {
    ...emptyDraft,
    sourceType,
    originalNote: text,
  };
}

function parseDraftOrThrow(responseText: string, sourceType: SourceType, originalNote: string | null): LedgerDraft {
  const parsed = JSON.parse(responseText) as Partial<LedgerDraft>;
  return {
    type: parsed.type ?? 'unknown',
    title: parsed.title ?? '',
    amount: parsed.amount ?? null,
    currency: 'NGN',
    dateText: parsed.dateText ?? null,
    paymentStatus: parsed.paymentStatus ?? 'unknown',
    counterparty: parsed.counterparty ?? null,
    items: parsed.items ?? [],
    sourceType,
    originalNote,
    confidence: parsed.confidence ?? 0.3,
    needsReview: true,
    warnings: parsed.warnings ?? [],
  };
}

async function requestLiveTextExtraction(note: string, sourceType: SourceType): Promise<LedgerDraft> {
  const aiModule: any = await import('firebase/ai');
  const app = getApp();
  const ai = aiModule.getAI(app, { backend: new aiModule.GoogleAIBackend() });
  const model = aiModule.getGenerativeModel(ai, {
    model: AppConfig.extractionModelName,
    generationConfig: { responseMimeType: 'application/json' },
    systemInstruction: extractionPrompt,
  });
  const result = await model.generateContent(note);
  const text = result.response.text();
  return parseDraftOrThrow(text, sourceType, note);
}

async function requestLiveImageExtraction(base64Image: string, sourceType: SourceType): Promise<LedgerDraft> {
  const aiModule: any = await import('firebase/ai');
  const app = getApp();
  const ai = aiModule.getAI(app, { backend: new aiModule.GoogleAIBackend() });
  const model = aiModule.getGenerativeModel(ai, {
    model: AppConfig.extractionModelName,
    generationConfig: { responseMimeType: 'application/json' },
    systemInstruction: extractionPrompt,
  });
  const content = [
    { text: 'Extract one ledger transaction from this uploaded transaction evidence.' },
    { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
  ];
  const result = await model.generateContent(content);
  const text = result.response.text();
  return parseDraftOrThrow(text, sourceType, null);
}

export const AIExtractionService = {
  async extractFromText(text: string, sourceType: SourceType): Promise<LedgerDraft> {
    if (!text.trim()) {
      throw new Error('emptyInput');
    }
    if (AppConfig.useMockAI) {
      return mockFromText(text, sourceType);
    }
    try {
      return await requestLiveTextExtraction(text, sourceType);
    } catch (error) {
      if (!AppConfig.allowMockAIFallback) {
        throw error;
      }
      const draft = mockFromText(text, sourceType);
      draft.warnings = [...draft.warnings, 'Live AI unavailable. Using deterministic demo extraction.'];
      return draft;
    }
  },

  async extractFromImage(base64Image: string, sourceType: SourceType): Promise<LedgerDraft> {
    if (!base64Image) {
      throw new Error('emptyInput');
    }
    if (AppConfig.useMockAI) {
      return {
        type: 'income',
        title: 'Transfer alert sale',
        amount: 25000,
        currency: 'NGN',
        dateText: null,
        paymentStatus: 'paid',
        counterparty: 'Customer',
        items: [],
        sourceType,
        originalNote: 'Image input',
        confidence: 0.84,
        needsReview: true,
        warnings: [],
      };
    }
    try {
      return await requestLiveImageExtraction(base64Image, sourceType);
    } catch (error) {
      if (!AppConfig.allowMockAIFallback) {
        throw error;
      }
      return {
        type: 'income',
        title: 'Transfer alert sale',
        amount: 25000,
        currency: 'NGN',
        dateText: null,
        paymentStatus: 'paid',
        counterparty: 'Customer',
        items: [],
        sourceType,
        originalNote: 'Image input',
        confidence: 0.84,
        needsReview: true,
        warnings: ['Live AI unavailable. Using deterministic demo extraction.'],
      };
    }
  },
};
