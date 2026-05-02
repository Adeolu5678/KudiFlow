import { Pressable, StyleSheet, Text } from 'react-native';
import { EmptyStateView } from '../components/EmptyStateView';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors } from '../theme';

export function EmptyStateScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Empty State</Text>
      <EmptyStateView
        title="No records yet"
        subtitle="Tap Universal Log to add your first sale, expense, receivable, or transfer alert."
      />
      <Pressable style={styles.hint}>
        <Text style={styles.hintText}>This matches the required empty-state flow in the MVP docs.</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  hint: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    padding: 12,
  },
  hintText: { color: colors.textSecondary },
});
