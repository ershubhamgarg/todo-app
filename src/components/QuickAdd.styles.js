import { StyleSheet } from 'react-native';

const createStyles = (colors, typography, spacing) =>
  StyleSheet.create({
    quickAddCard: {
      backgroundColor: colors.surfaceMuted,
      borderRadius: 20,
      padding: spacing.md,
      marginBottom: spacing.lg,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 3,
    },
    quickRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    input: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 14,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      color: colors.textPrimary,
      fontSize: typography.size.md,
      fontFamily: typography.fontFamily.regular,
    },
    addButton: {
      backgroundColor: colors.primary,
      width: 44,
      height: 44,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOpacity: 0.3,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
    },
    filterRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.md,
      flexWrap: 'wrap',
    },
    filterChip: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm - 2,
      borderRadius: 999,
      backgroundColor: colors.chip,
    },
    filterChipActive: {
      backgroundColor: colors.darkChip,
    },
    filterText: {
      color: colors.textSecondary,
      fontSize: typography.size.sm,
      fontFamily: typography.fontFamily.medium,
    },
    filterTextActive: {
      color: colors.surface,
    },
  });

export default createStyles;
