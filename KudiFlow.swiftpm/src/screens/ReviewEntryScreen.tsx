import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { EmptyStateView } from '../components/EmptyStateView';
import { ErrorBanner } from '../components/ErrorBanner';
import { ScreenContainer } from '../components/ScreenContainer';
import { LedgerDraft } from '../models';
import { RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';

type ReceiptProps = NativeStackScreenProps<RootStackParamList, 'AIReviewReceipt'>;
type VoiceProps = NativeStackScreenProps<RootStackParamList, 'AIReviewVoice'>;

type Props = ReceiptProps | VoiceProps;

function DraftEditor({
  draft,
  onChange,
}: {
  draft: LedgerDraft;
  onChange: (next: LedgerDraft) => void;
}) {
  return (
    <View style={styles.form}>
      <TextInput
        value={draft.title}
        onChangeText={(value) => onChange({ ...draft, title: value })}
        placeholder="Title"
        placeholderTextColor="#6E7AA3"
        style={styles.input}
      />
      <TextInput
        value={draft.amount?.toString() ?? ''}
        keyboardType="numeric"
        onChangeText={(value) => onChange({ ...draft, amount: Number(value || 0) })}
        placeholder="Amount"
        placeholderTextColor="#6E7AA3"
        style={styles.input}
      />
      <TextInput
        value={draft.counterparty ?? ''}
        onChangeText={(value) => onChange({ ...draft, counterparty: value || null })}
        placeholder="Counterparty"
        placeholderTextColor="#6E7AA3"
        style={styles.input}
      />
      <TextInput
        value={draft.paymentStatus}
        onChangeText={(value) => onChange({ ...draft, paymentStatus: (value as LedgerDraft['paymentStatus']) || 'unknown' })}
        placeholder="paid | unpaid | partial | unknown"
        placeholderTextColor="#6E7AA3"
        style={styles.input}
      />
      <TextInput
        value={draft.type}
        onChangeText={(value) => onChange({ ...draft, type: (value as LedgerDraft['type']) || 'unknown' })}
        placeholder="income | expense | receivable | payable"
        placeholderTextColor="#6E7AA3"
        style={styles.input}
      />
      {draft.confidence < 0.8 ? (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            {draft.confidence < 0.5 ? 'Low confidence. Manual correction required.' : 'Please check this carefully.'}
          </Text>
        </View>
      ) : null}
      {draft.warnings.length > 0 ? (
        <View style={styles.warning}>
          <Text style={styles.warningText}>{draft.warnings.join(' ')}</Text>
        </View>
      ) : null}
    </View>
  );
}

export function ReviewEntryScreen({ navigation, route }: Props) {
  const { draft, saveReviewedDraft, dismissDraft, loading, error, clearError } = useAppState();
  const [workingDraft, setWorkingDraft] = useState<LedgerDraft | null>(draft);

  useEffect(() => {
    setWorkingDraft(draft);
  }, [draft]);

  if (!workingDraft) {
    return (
      <ScreenContainer>
        <EmptyStateView
          title="No draft to review"
          subtitle="Extract a transaction first from Universal Log, then return here to review and save."
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>{route.name === 'AIReviewVoice' ? 'AI Review — Voice' : 'AI Review — Receipt'}</Text>
      <Text style={styles.subtitle}>Always confirm and edit before saving to ledger.</Text>
      {error ? <ErrorBanner message={error} onDismiss={clearError} /> : null}
      <DraftEditor draft={workingDraft} onChange={setWorkingDraft} />
      <Pressable
        style={styles.primary}
        onPress={async () => {
          await saveReviewedDraft(workingDraft);
          navigation.navigate('Tabs');
        }}
        disabled={loading}
      >
        <Text style={styles.primaryText}>{loading ? 'Saving...' : 'Save Transaction'}</Text>
      </Pressable>
      <Pressable
        style={styles.secondary}
        onPress={() => {
          dismissDraft();
          navigation.goBack();
        }}
      >
        <Text style={styles.secondaryText}>Cancel</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  subtitle: { color: colors.textSecondary },
  form: { gap: 10 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  warning: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.warning,
    backgroundColor: '#3A2E0D',
    padding: 10,
  },
  warningText: { color: '#FDE68A', fontSize: 12, lineHeight: 18 },
  primary: {
    backgroundColor: colors.accentStrong,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: { color: '#031611', fontWeight: '900' },
  secondary: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: colors.surface,
  },
  secondaryText: { color: colors.textPrimary, fontWeight: '700' },
});
