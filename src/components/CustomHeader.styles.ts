import { StyleSheet } from 'react-native';

const createStyles = (colors, typography, spacing) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.lg,
    },
    backRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginBottom: spacing.xs,
    },
    backText: {
      fontSize: typography.size.sm,
      color: colors.textSecondary,
      fontFamily: typography.fontFamily.medium,
    },
    kicker: {
      fontSize: typography.size.sm,
      color: colors.textMuted,
      letterSpacing: 1,
      textTransform: 'uppercase',
      fontFamily: typography.fontFamily.medium,
    },
    title: {
      fontSize: typography.size.display,
      color: colors.textPrimary,
      fontFamily: typography.fontFamily.bold,
    },
    subtitle: {
      marginTop: 4,
      color: colors.textSecondary,
      fontSize: typography.size.sm,
      fontFamily: typography.fontFamily.regular,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: colors.avatarBg,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
    rightActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    settingsButton: {
      width: 44,
      height: 44,
      borderRadius: 16,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.outline,
    },
  });

export default createStyles;
