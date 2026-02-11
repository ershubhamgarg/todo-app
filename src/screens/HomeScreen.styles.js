import { StyleSheet, Platform, StatusBar } from 'react-native';

const createStyles = (colors, typography, spacing) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.backgroundTop,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    background: {
      flex: 1,
    },
    glow: {
      position: 'absolute',
      width: 280,
      height: 280,
      borderRadius: 140,
      backgroundColor: colors.glow,
      top: -100,
      right: -60,
      opacity: 0.6,
    },
    container: {
      padding: spacing.lg,
      paddingBottom: 160,
    },
    list: {
      gap: spacing.sm,
    },
    itemSeparator: {
      height: spacing.sm,
    },
    helperText: {
      marginTop: spacing.sm,
      fontSize: typography.size.sm,
      color: colors.textMuted,
      fontFamily: typography.fontFamily.medium,
    },
    fab: {
      position: 'absolute',
      right: 24,
      bottom: 28,
      width: 58,
      height: 58,
      borderRadius: 20,
      backgroundColor: colors.textPrimary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    emptyState: {
      backgroundColor: colors.surface,
      borderRadius: 18,
      padding: spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.outline,
    },
    emptyTitle: {
      fontSize: typography.size.lg,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    emptySubtitle: {
      marginTop: spacing.xs,
      fontSize: typography.size.sm,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

export default createStyles;
