import { StyleSheet } from 'react-native';

const createStyles = (colors, typography, spacing) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      left: spacing.lg,
      right: spacing.lg,
      bottom: spacing.xl,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 16,
      backgroundColor: colors.primary,
      borderWidth: 1,
      borderColor: colors.primary,
      alignItems: 'center',
    },
    text: {
      color: colors.surface,
      fontSize: typography.size.sm,
      fontFamily: typography.fontFamily.bold,
    },
  });

export default createStyles;
