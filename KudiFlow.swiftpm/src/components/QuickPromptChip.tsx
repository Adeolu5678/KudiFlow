import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

type Props = {
  text: string;
  onPress: () => void;
};

export function QuickPromptChip({ text, onPress }: Props) {
  return (
    <Pressable style={styles.chip} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
});
