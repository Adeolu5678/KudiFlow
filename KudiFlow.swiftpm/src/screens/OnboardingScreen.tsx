import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: Props) {
  return (
    <ScreenContainer contentStyle={styles.content}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Welcome to KudiFlow</Text>
      </View>
      <Text style={styles.title}>Your AI-powered financial memory for business</Text>
      <Text style={styles.subtitle}>
        Record sales, expenses, receivables, payables, and transfer alerts the way you already work.
      </Text>
      <Pressable style={styles.primary} onPress={() => navigation.replace('Tabs')}>
        <Text style={styles.primaryText}>Start Logging</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { justifyContent: 'center', minHeight: '100%' },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: { color: colors.accent, fontWeight: '700', fontSize: 12 },
  title: { color: colors.textPrimary, fontSize: 32, fontWeight: '900', lineHeight: 38 },
  subtitle: { color: colors.textSecondary, fontSize: 15, lineHeight: 22 },
  primary: {
    marginTop: 12,
    backgroundColor: colors.accentStrong,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: { color: '#031611', fontSize: 16, fontWeight: '900' },
});
