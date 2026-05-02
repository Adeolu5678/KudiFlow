import * as Clipboard from 'expo-clipboard';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EmptyStateView } from '../components/EmptyStateView';
import { MetricCard } from '../components/MetricCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { TabParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';
import { formatNaira } from '../utils/formatting';

type Props = BottomTabScreenProps<TabParamList, 'Credit'>;

export function CreditSummaryScreen(_: Props) {
  const { creditSummary, dashboard, generateCreditSummary, loading } = useAppState();

  const summary = creditSummary?.narrative
    ? creditSummary
    : {
        totals: dashboard,
        generatedAt: new Date().toISOString(),
        narrative:
          'Generate summary to produce a lender-friendly explanation from your current ledger totals.',
      };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Credit Summary</Text>
      <View style={styles.grid}>
        <MetricCard label="Sales" value={formatNaira(summary.totals.sales)} />
        <MetricCard label="Expenses" value={formatNaira(summary.totals.expenses)} />
        <MetricCard label="Receivables" value={formatNaira(summary.totals.receivables)} />
        <MetricCard label="Profit" value={formatNaira(summary.totals.estimatedProfit)} />
      </View>
      {creditSummary ? (
        <View style={styles.narrative}>
          <Text style={styles.narrativeText}>{summary.narrative}</Text>
        </View>
      ) : (
        <EmptyStateView title="No summary yet" subtitle="Generate credit summary from your ledger records." />
      )}
      <Pressable style={styles.primary} onPress={generateCreditSummary} disabled={loading}>
        <Text style={styles.primaryText}>{loading ? 'Generating...' : 'Generate Summary'}</Text>
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => Clipboard.setStringAsync(summary.narrative)}>
        <Text style={styles.secondaryText}>Copy Summary</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  narrative: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
    padding: 12,
  },
  narrativeText: { color: colors.textPrimary, fontSize: 13, lineHeight: 20 },
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
