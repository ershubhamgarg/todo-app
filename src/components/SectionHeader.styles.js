import { StyleSheet } from 'react-native';

const createStyles = (colors, typography, spacing) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    title: {
      fontSize: typography.size.xl,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    link: {
      fontSize: typography.size.sm,
      color: colors.textSecondary,
      fontFamily: typography.fontFamily.medium,
    },
  });

export default createStyles;
