import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors } from '../theme';

export function SpoilSenseScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Spoil Sense</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Optional bonus module</Text>
        <Text style={styles.cardText}>
          This MVP keeps Spoil Sense as a static placeholder, preserving the product surface while keeping P0 scope focused.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
    gap: 8,
  },
  cardTitle: { color: colors.textPrimary, fontWeight: '800' },
  cardText: { color: colors.textSecondary, lineHeight: 20 },
});
