import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../components/CustomHeader';
import createStyles from './SettingsScreen.styles';
import { useTheme } from '../theme/ThemeProvider';
import typography from '../theme/typography';
import spacing from '../theme/spacing';

const options = [
  { key: 'system', label: 'System', hint: 'Match device settings' },
  { key: 'light', label: 'Light', hint: 'Bright and airy' },
  { key: 'dark', label: 'Dark', hint: 'Low-light friendly' },
];

const SettingsScreen = ({ navigation }) => {
  const { colors, mode, setThemeMode, effectiveMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography, spacing), [colors]);

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
