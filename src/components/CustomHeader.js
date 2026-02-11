import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import createStyles from './CustomHeader.styles';
import typography from '../theme/typography';
import spacing from '../theme/spacing';
import { useTheme } from '../theme/ThemeProvider';

const CustomHeader = ({
  title = 'LetsDoIt',
  subtitle = 'Design your day, one win at a time.',
  showBack = false,
  onBack,
  onSettings,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography, spacing), [colors]);

  return (
    <View style={styles.container}>
      <View>
        {showBack ? (
          <Pressable onPress={onBack} style={styles.backRow}>
            <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        ) : (
          <Text style={styles.kicker}>Good morning</Text>
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.rightActions}>
        {onSettings ? (
          <Pressable onPress={onSettings} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={20} color={colors.textPrimary} />
          </Pressable>
        ) : null}
        <View style={styles.avatar}>
          <Ionicons name="sparkles" size={22} color={colors.primary} />
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
