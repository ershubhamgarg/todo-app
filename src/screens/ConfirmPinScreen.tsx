import React, { useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import createStyles from './PinScreen.styles';
import { useTheme } from '../theme/ThemeProvider';
import typography from '../theme/typography';
import spacing from '../theme/spacing';
import { usePin } from '../hooks/PinProvider';
import Toast from '../components/Toast';
import type { RootStackParamList } from '../types';
import type { StackScreenProps } from '@react-navigation/stack';

const digits: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'spacer', '0', 'spacer'];

type Props = StackScreenProps<RootStackParamList, 'ConfirmPin'>;

const ConfirmPinScreen = ({ navigation }: Props) => {
  const { colors, effectiveMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography, spacing), [colors]);
  const { verifyPin, clearPin } = usePin();
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDigit = (digit) => {
    if (pinInput.length >= 4) return;
    const next = pinInput + digit;
    setPinInput(next);
    setError('');
    if (next.length === 4) {
      const ok = verifyPin(next);
      if (!ok) {
        setError('Incorrect PIN. Try again.');
        setPinInput('');
      } else {
        clearPin();
        setSuccess('PIN removed successfully.');
        setTimeout(() => navigation.goBack(), 700);
      }
    }
  };

  const handleBackspace = () => {
    setPinInput((prev) => prev.slice(0, -1));
    setError('');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar style={effectiveMode === 'dark' ? 'light' : 'dark'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Confirm PIN</Text>
          <Text style={styles.subtitle}>Enter your current PIN to remove it.</Text>
          <View style={styles.pinRow}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <View
                key={idx}
                style={[styles.pinDot, pinInput.length > idx && styles.pinDotFilled]}
              />
            ))}
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}
        </View>

        <View>
          <View style={styles.keypad}>
            {digits.map((digit, index) => (
              <Pressable
                key={`${digit}-${index}`}
                style={[styles.key, digit === 'spacer' && styles.keySpacer]}
                onPress={() => (digit === 'spacer' ? null : handleDigit(digit))}
                disabled={digit === 'spacer'}
                testID={digit === 'spacer' ? undefined : `confirm-pin-digit-${digit}`}
              >
                <Text style={styles.keyText}>{digit === 'spacer' ? '' : digit}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.actionRow}>
            <Pressable testID="confirm-pin-delete" style={styles.actionButton} onPress={handleBackspace}>
              <Text style={styles.actionText}>Delete</Text>
            </Pressable>
          </View>
        </View>
        <Toast message={success} />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmPinScreen;
