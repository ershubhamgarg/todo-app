import { StyleSheet } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    color: colors.surface,
    fontSize: typography.size.lg,
    fontFamily: typography.fontFamily.medium,
  },
  heroCount: {
    color: colors.surface,
    fontSize: typography.size.xxl,
    fontFamily: typography.fontFamily.bold,
    marginTop: 4,
  },
  heroRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  heroRingText: {
    color: colors.surface,
    fontFamily: typography.fontFamily.bold,
  },
  heroMeta: {
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm - 2,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  heroPillText: {
    color: colors.surface,
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.medium,
  },
});

export default styles;
