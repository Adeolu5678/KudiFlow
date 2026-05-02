import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ErrorBanner } from '../components/ErrorBanner';
import { MetricCard } from '../components/MetricCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { TabParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';
import { formatNaira } from '../utils/formatting';

type Props = BottomTabScreenProps<TabParamList, 'Home'>;

export function HomeDashboardScreen({ navigation }: Props) {
  const { dashboard, error, clearError, firebaseNotice } = useAppState();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Home Dashboard</Text>
      <Text style={styles.subtitle}>Track your business in real-time from your ledger.</Text>
      {firebaseNotice ? <ErrorBanner message={firebaseNotice} onDismiss={clearError} /> : null}
      {error ? <ErrorBanner message={error} onDismiss={clearError} /> : null}
      <View style={styles.grid}>
        <MetricCard label="Sales" value={formatNaira(dashboard.sales)} />
        <MetricCard label="Expenses" value={formatNaira(dashboard.expenses)} />
        <MetricCard label="Profit" value={formatNaira(dashboard.estimatedProfit)} />
        <MetricCard label="Outstanding" value={formatNaira(dashboard.receivables)} />
      </View>
      <Pressable style={styles.primary} onPress={() => navigation.navigate('Log')}>
        <Text style={styles.primaryText}>Universal Log</Text>
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => navigation.navigate('Assistant')}>
        <Text style={styles.secondaryText}>Ask Kudi</Text>
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => navigation.getParent()?.navigate('AccountMore' as never)}>
        <Text style={styles.secondaryText}>Account / More</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  subtitle: { color: colors.textSecondary, fontSize: 14, marginBottom: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  primary: {
    marginTop: 4,
    backgroundColor: colors.accentStrong,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: { color: '#031611', fontWeight: '900', fontSize: 15 },
  secondary: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: colors.surface,
  },
  secondaryText: { color: colors.textPrimary, fontWeight: '700', fontSize: 15 },
});
