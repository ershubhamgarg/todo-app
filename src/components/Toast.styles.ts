import { StyleSheet } from 'react-native';

const createStyles = (colors, typography, spacing) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      left: spacing.lg,
      right: spacing.lg,
      top: spacing.xl + spacing.sm,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 16,
      backgroundColor: colors.primary,
      borderWidth: 1,
      borderColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    text: {
      color: colors.surface,
      fontSize: typography.size.sm,
      fontFamily: typography.fontFamily.bold,
      flex: 1,
    },
    closeButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.15)',
    },
  });

export default createStyles;
