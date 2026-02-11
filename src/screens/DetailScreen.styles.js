import { StyleSheet } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

const styles = StyleSheet.create({
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
  label: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.size.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.textPrimary,
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.chip,
  },
  chipActive: {
    backgroundColor: colors.primaryDark,
  },
  chipText: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.medium,
  },
  chipTextActive: {
    color: colors.surface,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  toggleText: {
    fontSize: typography.size.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.textPrimary,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: typography.size.md,
    fontFamily: typography.fontFamily.bold,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outline,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontFamily: typography.fontFamily.bold,
  },
  dangerButton: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    borderRadius: 16,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontFamily: typography.fontFamily.bold,
  },
  hint: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
  },
});

export default styles;
