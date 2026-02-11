import React, { useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import createStyles from './PinScreen.styles';
import { useTheme } from '../theme/ThemeProvider';
import typography from '../theme/typography';
import spacing from '../theme/spacing';
import { usePin } from '../hooks/PinProvider';
import { useToast } from '../hooks/ToastProvider';
import type { RootStackParamList } from '../types';
import type { StackScreenProps } from '@react-navigation/stack';

const digits: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'spacer', '0', 'spacer'];

type Props = StackScreenProps<RootStackParamList, 'Pin'>;

const PinScreen = ({ navigation, route }: Props) => {
  const { colors, effectiveMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography, spacing), [colors]);
  const { hasPin, verifyPin, setNewPin } = usePin();
  const { showToast } = useToast();
  const mode = route?.params?.mode || (hasPin ? 'unlock' : 'set');
  const isChangeFlow = mode === 'change';
  const [stage, setStage] = useState<'current' | 'new' | 'confirm'>(
    isChangeFlow ? 'current' : 'new'
  );
  const [firstPin, setFirstPin] = useState('');
  const [success, setSuccess] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState('');

  const handleDigit = async (digit) => {
    if (pinInput.length >= 4) return;
    const next = pinInput + digit;
    setPinInput(next);
    setError('');
    setSuccess('');
    if (next.length === 4) {
      if (mode === 'unlock') {
        const ok = verifyPin(next);
        if (!ok) {
          setError('Incorrect PIN. Try again.');
          setPinInput('');
        } else {
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }
        return;
      }

      if (isChangeFlow && stage === 'current') {
        const ok = verifyPin(next);
        if (!ok) {
          setError('Incorrect PIN. Try again.');
          setPinInput('');
        } else {
          setStage('new');
          setPinInput('');
        }
        return;
      }

      if (mode === 'set') {
        await setNewPin(next);
        setSuccess('PIN set successfully.');
        showToast('PIN set successfully.');
        setTimeout(() => navigation.goBack(), 700);
        return;
      }

      if (stage === 'new') {
        setFirstPin(next);
        setStage('confirm');
        setPinInput('');
        return;
      }

      if (stage === 'confirm') {
        if (next !== firstPin) {
          setError('PINs do not match. Try again.');
          setPinInput('');
        } else {
          await setNewPin(next);
          setSuccess('PIN updated successfully.');
          showToast('PIN updated successfully.');
          setTimeout(() => navigation.goBack(), 700);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPinInput((prev) => prev.slice(0, -1));
    setError('');
  };

  const handleSave = async () => {
    if (pinInput.length !== 4) {
      setError('Enter a 4-digit PIN.');
      return;
    }
    if (isChangeFlow && stage === 'current') {
      const ok = verifyPin(pinInput);
      if (!ok) {
        setError('Incorrect PIN. Try again.');
        setPinInput('');
      } else {
        setStage('new');
        setPinInput('');
      }
      return;
    }
    if (mode === 'set') {
      await setNewPin(pinInput);
      setSuccess('PIN set successfully.');
      showToast('PIN set successfully.');
      setTimeout(() => navigation.goBack(), 700);
      return;
    }
    if (stage === 'new') {
      setFirstPin(pinInput);
      setStage('confirm');
      setPinInput('');
      return;
    }
    if (stage === 'confirm') {
      if (pinInput !== firstPin) {
        setError('PINs do not match. Try again.');
        setPinInput('');
        return;
      }
      await setNewPin(pinInput);
      setSuccess('PIN updated successfully.');
      showToast('PIN updated successfully.');
      setTimeout(() => navigation.goBack(), 700);
    }
  };


  const title =
    mode === 'unlock'
      ? 'Enter PIN'
      : isChangeFlow && stage === 'current'
        ? 'Current PIN'
        : stage === 'confirm'
          ? 'Confirm PIN'
          : 'New PIN';
  const subtitle =
    mode === 'unlock'
      ? 'Unlock LetsDoIt to continue.'
      : isChangeFlow && stage === 'current'
        ? 'Enter your current 4-digit PIN.'
        : stage === 'confirm'
          ? 'Re-enter your new 4-digit PIN.'
          : 'Choose a new 4-digit PIN.';

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar style={effectiveMode === 'dark' ? 'light' : 'dark'} />
      <View style={styles.container}>
        <View style={styles.header}>
          {mode !== 'unlock' ? (
            <Pressable style={styles.backRow} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={18} color={colors.textSecondary} />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
          ) : null}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
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
                testID={digit === 'spacer' ? undefined : `pin-digit-${digit}`}
              >
                <Text style={styles.keyText}>{digit === 'spacer' ? '' : digit}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.actionRow}>
            <Pressable testID="pin-delete" style={styles.actionButton} onPress={handleBackspace}>
              <Text style={styles.actionText}>Delete</Text>
            </Pressable>
            {mode !== 'unlock' ? (
              <Pressable style={[styles.actionButton, styles.actionPrimary]} onPress={handleSave}>
                <Text style={[styles.actionText, styles.actionTextPrimary]}>
                  {isChangeFlow && stage === 'current'
                    ? 'Next'
                    : stage === 'confirm'
                      ? 'Confirm'
                      : 'Save PIN'}
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PinScreen;
