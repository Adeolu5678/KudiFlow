import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = {
  label: string;
  value: string;
};

export function MetricCard({ label, value }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 6,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  value: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
});
