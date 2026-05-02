import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AppConfig, setUseMockAI } from '../config/AppConfig';
import { seedLedgerEntries } from '../data/seedLedgerEntries';
import { AIExtractionService } from '../services/aiExtractionService';
import { AssistantService } from '../services/assistantService';
import { bootstrapFirebase, getFirebaseInitError } from '../services/firebaseBootstrap';
import { LedgerRepository } from '../services/ledgerRepository';
import {
  AssistantMessage,
  CreditSummary,
  DashboardSummary,
  LedgerDraft,
  LedgerEntry,
  LedgerFilter,
  SourceType,
} from '../models';
import { DashboardCalculator } from '../utils/dashboardCalculator';
import { LedgerContextBuilder } from '../utils/ledgerContextBuilder';
import { LedgerValidator } from '../utils/ledgerValidator';
import { toIsoNow } from '../utils/formatting';

interface AppStateValue {
  entries: LedgerEntry[];
  dashboard: DashboardSummary;
  messages: AssistantMessage[];
  draft: LedgerDraft | null;
  creditSummary: CreditSummary | null;
  loading: boolean;
  error: string | null;
  filter: LedgerFilter;
  firebaseNotice: string | null;
  mockAIMode: boolean;
  setMockAIMode: (enabled: boolean) => void;
  setFilter: (filter: LedgerFilter) => void;
  clearError: () => void;
  extractFromText: (text: string, sourceType: SourceType) => Promise<void>;
  extractFromImage: (base64Image: string, sourceType: SourceType) => Promise<void>;
  saveReviewedDraft: (draft: LedgerDraft) => Promise<void>;
  saveManualEntry: (entry: LedgerEntry) => Promise<void>;
  sendAssistantMessage: (message: string) => Promise<void>;
  generateCreditSummary: () => Promise<void>;
  resetDemoData: () => Promise<void>;
  dismissDraft: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

const repository = new LedgerRepository();

function addAssistantMessage(role: AssistantMessage['role'], content: string): AssistantMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: toIsoNow(),
  };
}

export function AppStateProvider({ children }: PropsWithChildren) {
  const [entries, setEntries] = useState<LedgerEntry[]>([...seedLedgerEntries]);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [draft, setDraft] = useState<LedgerDraft | null>(null);
  const [creditSummary, setCreditSummary] = useState<CreditSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<LedgerFilter>({ type: 'all', paymentStatus: 'all' });
  const [mockAIMode, setMockAIModeState] = useState(AppConfig.useMockAI);

  useEffect(() => {
    bootstrapFirebase();
    const unsubscribe = repository.listen(AppConfig.demoUserId, setEntries);
    return unsubscribe;
  }, []);

  const setErrorMessage = useCallback((message: string) => {
    setError(message);
  }, []);

  const withLoading = useCallback(async (action: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    try {
      await action();
    } finally {
      setLoading(false);
    }
  }, []);

  const extractFromText = useCallback(
    async (text: string, sourceType: SourceType) => {
      await withLoading(async () => {
        try {
          const extracted = await AIExtractionService.extractFromText(text, sourceType);
          setDraft(extracted);
        } catch (serviceError) {
          const message =
            serviceError instanceof Error ? serviceError.message : 'I could not read this clearly. Please edit manually.';
          setErrorMessage(message);
        }
      });
    },
    [setErrorMessage, withLoading]
  );

  const extractFromImage = useCallback(
    async (base64Image: string, sourceType: SourceType) => {
      await withLoading(async () => {
        try {
          const extracted = await AIExtractionService.extractFromImage(base64Image, sourceType);
          setDraft(extracted);
        } catch (serviceError) {
          const message =
            serviceError instanceof Error ? serviceError.message : 'I could not read this image clearly. Please edit manually.';
          setErrorMessage(message);
        }
      });
    },
    [setErrorMessage, withLoading]
  );

  const saveReviewedDraft = useCallback(
    async (incomingDraft: LedgerDraft) => {
      await withLoading(async () => {
        const issues = LedgerValidator.validateDraft(incomingDraft);
        const hasErrors = issues.some((issue) => issue.severity === 'error');
        if (hasErrors) {
          setErrorMessage(issues.map((issue) => issue.message).join('\n'));
          return;
        }
        const entry = LedgerValidator.makeEntry(incomingDraft);
        await repository.save(entry, AppConfig.demoUserId);
        setDraft(null);
      });
    },
    [setErrorMessage, withLoading]
  );

  const saveManualEntry = useCallback(
    async (entry: LedgerEntry) => {
      await withLoading(async () => {
        await repository.save(entry, AppConfig.demoUserId);
      });
    },
    [withLoading]
  );

  const sendAssistantMessage = useCallback(
    async (message: string) => {
      await withLoading(async () => {
        const context = LedgerContextBuilder.build(entries);
        const userMsg = addAssistantMessage('user', message);
        setMessages((prev) => [...prev, userMsg]);
        try {
          const reply = await AssistantService.sendMessage(message, context);
          setMessages((prev) => [...prev, addAssistantMessage('assistant', reply)]);
        } catch (serviceError) {
          const errorMessage = serviceError instanceof Error ? serviceError.message : 'Assistant failed to respond.';
          setErrorMessage(errorMessage);
        }
      });
    },
    [entries, setErrorMessage, withLoading]
  );

  const generateCreditSummary = useCallback(async () => {
    await withLoading(async () => {
      const totals = DashboardCalculator.calculate(entries);
      const context = LedgerContextBuilder.build(entries);
      const narrative = await AssistantService.generateCreditSummary(context);
      setCreditSummary(AssistantService.fromTotals(totals, narrative));
    });
  }, [entries, withLoading]);

  const resetDemoData = useCallback(async () => {
    await withLoading(async () => {
      await repository.resetDemoData(AppConfig.demoUserId);
      setMessages([]);
      setCreditSummary(null);
      setDraft(null);
    });
  }, [withLoading]);

  const dashboard = useMemo(() => DashboardCalculator.calculate(entries), [entries]);
  const firebaseNotice = getFirebaseInitError();
  const setMockAIMode = useCallback((enabled: boolean) => {
    setUseMockAI(enabled);
    setMockAIModeState(enabled);
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
      entries,
      dashboard,
      messages,
      draft,
      creditSummary,
      loading,
      error,
      filter,
      firebaseNotice,
      mockAIMode,
      setMockAIMode,
      setFilter,
      clearError: () => setError(null),
      extractFromText,
      extractFromImage,
      saveReviewedDraft,
      saveManualEntry,
      sendAssistantMessage,
      generateCreditSummary,
      resetDemoData,
      dismissDraft: () => setDraft(null),
    }),
    [
      entries,
      dashboard,
      messages,
      draft,
      creditSummary,
      loading,
      error,
      filter,
      firebaseNotice,
      mockAIMode,
      extractFromText,
      extractFromImage,
      saveReviewedDraft,
      saveManualEntry,
      sendAssistantMessage,
      generateCreditSummary,
      resetDemoData,
      setMockAIMode,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider.');
  }
  return context;
}
