import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EmptyStateView } from '../components/EmptyStateView';
import { EntryRow } from '../components/EntryRow';
import { ScreenContainer } from '../components/ScreenContainer';
import { RootStackParamList, TabParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';

type Props = BottomTabScreenProps<TabParamList, 'Ledger'> & {
  navigation: BottomTabScreenProps<TabParamList, 'Ledger'>['navigation'] & {
    navigate: (screen: keyof RootStackParamList | keyof TabParamList) => void;
  };
};

export function LedgerListScreen({ navigation }: Props) {
  const { entries, filter } = useAppState();
  const filtered = entries.filter((entry) => {
    const typePass = filter.type === 'all' || entry.type === filter.type;
    const paymentPass = filter.paymentStatus === 'all' || entry.paymentStatus === filter.paymentStatus;
    return typePass && paymentPass;
  });

  return (
    <ScreenContainer>
      <Text style={styles.title}>Ledger List</Text>
      <View style={styles.actions}>
        <Pressable style={styles.secondary} onPress={() => navigation.navigate('Filters')}>
          <Text style={styles.secondaryText}>Filters</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={() => navigation.navigate('AddEditTransaction')}>
          <Text style={styles.secondaryText}>Add / Edit</Text>
        </Pressable>
      </View>
      {filtered.length === 0 ? (
        <EmptyStateView
          title="No records yet"
          subtitle="Tap Universal Log to add your first sale or expense."
        />
      ) : (
        filtered.map((entry) => <EntryRow key={entry.id} entry={entry} />)
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  actions: { flexDirection: 'row', gap: 10 },
  secondary: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: 11,
  },
  secondaryText: { color: colors.textPrimary, fontWeight: '700' },
});
