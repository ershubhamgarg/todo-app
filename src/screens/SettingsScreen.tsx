import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../components/CustomHeader';
import createStyles from './SettingsScreen.styles';
import { useTheme } from '../theme/ThemeProvider';
import { usePin } from '../hooks/PinProvider';
import { colorPalettes } from '../theme/colors';
import typography from '../theme/typography';
import spacing from '../theme/spacing';
import type { RootStackParamList } from '../types';
import type { StackScreenProps } from '@react-navigation/stack';

const options = [
  { key: 'system', label: 'System', hint: 'Match device settings' },
  { key: 'light', label: 'Light', hint: 'Bright and airy' },
  { key: 'dark', label: 'Dark', hint: 'Low-light friendly' },
];

type Props = StackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: Props) => {
  const { colors, mode, paletteName, setThemeMode, setThemePalette, effectiveMode } = useTheme();
  const { hasPin } = usePin();
  const styles = useMemo(() => createStyles(colors, typography, spacing), [colors]);
  const paletteOptions = ['orange', 'green', 'blue', 'red', 'mono'];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar style={effectiveMode === 'dark' ? 'light' : 'dark'} />
      <View style={styles.headerWrapper}>
        <CustomHeader
          title="Settings"
          subtitle="Make LetsDoIt feel like home."
          showBack
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Appearance</Text>
          <Text style={styles.subtitle}>Choose how the app looks.</Text>
          {options.map((option, index) => {
            const active = option.key === mode;
            return (
              <Pressable
                key={option.key}
                onPress={() => setThemeMode(option.key)}
                style={[styles.optionRow, index === options.length - 1 && styles.optionLast]}
              >
                <View>
                  <Text style={styles.optionText}>{option.label}</Text>
                  <Text style={styles.optionHint}>{option.hint}</Text>
                </View>
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active ? <View style={styles.radioDot} /> : null}
                </View>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Color Theme</Text>
          <Text style={styles.subtitle}>Pick the accent palette.</Text>
          <View style={styles.paletteRow}>
            {paletteOptions.map((palette) => {
              const active = palette === paletteName;
              const swatch = colorPalettes[palette][effectiveMode]?.primary || colors.primary;
              return (
                <Pressable
                  key={palette}
                  onPress={() => setThemePalette(palette)}
                  style={[styles.paletteItem, active && styles.paletteItemActive]}
                >
                  <View style={[styles.paletteSwatch, { backgroundColor: swatch }]} />
                  <Text style={styles.paletteText}>{palette}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>App Lock</Text>
          <Text style={styles.subtitle}>Protect your tasks with a PIN.</Text>
          <View style={styles.actionRow}>
            <Pressable
              style={[styles.actionButton, styles.actionPrimary]}
              onPress={() => navigation.navigate('Pin', { mode: hasPin ? 'change' : 'set' })}
            >
              <Text style={[styles.actionText, styles.actionTextPrimary]}>
                {hasPin ? 'Change PIN' : 'Set PIN'}
              </Text>
            </Pressable>
            {hasPin ? (
              <Pressable
                style={styles.actionButton}
                onPress={() => navigation.navigate('ConfirmPin')}
              >
                <Text style={styles.actionText}>Remove PIN</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
