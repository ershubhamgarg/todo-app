import { StyleSheet } from 'react-native';

const createStyles = (colors, typography, spacing) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.backgroundTop,
    },
    container: {
      flex: 1,
      padding: spacing.lg,
      justifyContent: 'space-between',
    },
    header: {
      gap: spacing.sm,
      marginTop: spacing.xl,
    },
    backRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    backText: {
      fontSize: typography.size.sm,
      fontFamily: typography.fontFamily.medium,
      color: colors.textSecondary,
    },
    title: {
      fontSize: typography.size.xxl,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: typography.size.md,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    pinRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    pinDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      borderWidth: 2,
      borderColor: colors.outline,
    },
    pinDotFilled: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    keypad: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      justifyContent: 'space-between',
      marginBottom: spacing.xl,
    },
    key: {
      width: '30%',
      paddingVertical: spacing.md,
      borderRadius: 16,
      backgroundColor: colors.surface,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.outline,
    },
    keySpacer: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    keyText: {
      fontSize: typography.size.lg,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    error: {
      color: colors.danger,
      fontFamily: typography.fontFamily.medium,
      textAlign: 'center',
      marginTop: spacing.sm,
    },
    success: {
      color: colors.success,
      fontFamily: typography.fontFamily.medium,
      textAlign: 'center',
      marginTop: spacing.sm,
    },
    actionRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.md,
    },
    actionButton: {
      flex: 1,
      paddingVertical: spacing.md,
      borderRadius: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.outline,
      backgroundColor: colors.surface,
    },
    actionPrimary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    actionText: {
      fontSize: typography.size.md,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    actionTextPrimary: {
      color: colors.surface,
    },
  });

export default createStyles;
