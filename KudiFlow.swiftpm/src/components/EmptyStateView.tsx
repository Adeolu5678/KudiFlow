import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = {
  title: string;
  subtitle: string;
};

export function EmptyStateView({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 8,
  },
  title: { color: colors.textPrimary, fontSize: 16, fontWeight: '800' },
  subtitle: { color: colors.textSecondary, fontSize: 13, lineHeight: 18 },
});
