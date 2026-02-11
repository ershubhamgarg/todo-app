import { StyleSheet } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

const styles = StyleSheet.create({
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
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
});

export default styles;
