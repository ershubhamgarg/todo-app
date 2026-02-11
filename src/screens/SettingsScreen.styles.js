import { StyleSheet } from 'react-native';

const createStyles = (colors, typography, spacing) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.backgroundTop,
    },
    headerWrapper: {
      paddingTop: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
    container: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.lg,
      gap: spacing.md,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 18,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.outline,
      gap: spacing.sm,
    },
    title: {
      fontSize: typography.size.lg,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: typography.size.sm,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.outline,
    },
    optionLast: {
      borderBottomWidth: 0,
    },
    optionText: {
      fontSize: typography.size.md,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    optionHint: {
      fontSize: typography.size.sm,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    radio: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: colors.outline,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioActive: {
      borderColor: colors.primary,
    },
    radioDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
  });

export default createStyles;
