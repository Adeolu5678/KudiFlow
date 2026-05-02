import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { LedgerEntryType, PaymentStatus } from '../models';
import { RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Filters'>;

const typeOptions: Array<LedgerEntryType | 'all'> = ['all', 'income', 'expense', 'receivable', 'payable', 'inventory', 'unknown'];
const paymentOptions: Array<PaymentStatus | 'all'> = ['all', 'paid', 'unpaid', 'partial', 'unknown'];

export function FiltersScreen({ navigation }: Props) {
  const { filter, setFilter } = useAppState();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Filters</Text>
      <Text style={styles.sectionLabel}>Type</Text>
      <View style={styles.wrap}>
        {typeOptions.map((option) => (
          <Pressable
            key={option}
            style={[styles.option, filter.type === option && styles.optionActive]}
            onPress={() => setFilter({ ...filter, type: option })}
          >
            <Text style={[styles.optionText, filter.type === option && styles.optionTextActive]}>{option}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.sectionLabel}>Payment</Text>
      <View style={styles.wrap}>
        {paymentOptions.map((option) => (
          <Pressable
            key={option}
            style={[styles.option, filter.paymentStatus === option && styles.optionActive]}
            onPress={() => setFilter({ ...filter, paymentStatus: option })}
          >
            <Text style={[styles.optionText, filter.paymentStatus === option && styles.optionTextActive]}>{option}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.primary} onPress={() => navigation.goBack()}>
        <Text style={styles.primaryText}>Apply</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  sectionLabel: { color: colors.textSecondary, fontWeight: '700', marginTop: 4 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.surface,
  },
  optionActive: { backgroundColor: '#123B38', borderColor: colors.accent },
  optionText: { color: colors.textSecondary, fontWeight: '700' },
  optionTextActive: { color: colors.accent },
  primary: {
    marginTop: 6,
    backgroundColor: colors.accentStrong,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: { color: '#031611', fontWeight: '900' },
});
