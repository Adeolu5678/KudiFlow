import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LedgerEntry } from '../models';
import { colors } from '../theme';
import { formatDateLabel, formatNaira } from '../utils/formatting';

type Props = {
  entry: LedgerEntry;
  onPress?: () => void;
};

export function EntryRow({ entry, onPress }: Props) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.top}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.amount}>{formatNaira(entry.amount)}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.badge}>{entry.type.toUpperCase()}</Text>
        <Text style={styles.metaText}>{entry.paymentStatus}</Text>
        <Text style={styles.metaText}>{entry.counterparty ?? '—'}</Text>
        <Text style={styles.metaText}>{formatDateLabel(entry.date)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 8,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontWeight: '700', flex: 1, paddingRight: 10 },
  amount: { color: colors.accent, fontWeight: '800' },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  badge: {
    color: colors.textPrimary,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '700',
  },
  metaText: { color: colors.textSecondary, fontSize: 12 },
});
