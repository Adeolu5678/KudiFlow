import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'CapturePhoto'>;

export function CapturePhotoScreen({ navigation }: Props) {
  const { extractFromImage, loading } = useAppState();

  const capture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      return;
    }
    const captureResult = await ImagePicker.launchCameraAsync({ quality: 0.7, base64: true });
    if (captureResult.canceled || !captureResult.assets[0]?.base64) {
      return;
    }
    await extractFromImage(captureResult.assets[0].base64, 'imageReceipt');
    navigation.navigate('AIReviewReceipt');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Capture Photo</Text>
      <Text style={styles.subtitle}>Take a receipt or transfer screenshot image and extract a ledger draft.</Text>
      <Pressable style={styles.primary} onPress={capture} disabled={loading}>
        <Text style={styles.primaryText}>{loading ? 'Reading image...' : 'Open Camera'}</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  subtitle: { color: colors.textSecondary },
  primary: {
    marginTop: 8,
    backgroundColor: colors.accentStrong,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: { color: '#031611', fontWeight: '900' },
});
