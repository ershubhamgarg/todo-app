import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import createStyles from './StatsCard.styles';
import { useTheme } from '../theme/ThemeProvider';
import typography from '../theme/typography';
import spacing from '../theme/spacing';

const StatsCard = ({ stats }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography, spacing), [colors]);
  const completion = Math.round((stats.done / Math.max(stats.total, 1)) * 100);
  const radius = 22;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = Math.min(Math.max(completion, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <LinearGradient colors={[colors.primary, colors.accent]} style={styles.heroCard}>
      <View style={styles.heroTop}>
        <View>
          <Text style={styles.heroTitle}>Today Focus</Text>
          <Text style={styles.heroCount}>{stats.today} tasks left</Text>
        </View>
        <View style={styles.heroRing}>
          <Svg height={radius * 2} width={radius * 2}>
            <Circle
              stroke="rgba(255,255,255,0.3)"
              fill="none"
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              strokeWidth={stroke}
            />
            <Circle
              stroke={colors.surface}
              fill="none"
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              strokeWidth={stroke}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${radius}, ${radius}`}
            />
          </Svg>
          <Text style={styles.heroRingText}>{completion}%</Text>
        </View>
      </View>
      <View style={styles.heroMeta}>
        <View style={styles.heroPill}>
          <Ionicons name="timer-outline" size={16} color={colors.surface} />
          <Text style={styles.heroPillText}>15 min sprint</Text>
        </View>
        <View style={styles.heroPill}>
          <Ionicons name="flame-outline" size={16} color={colors.surface} />
          <Text style={styles.heroPillText}>Streak 6 days</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default StatsCard;
