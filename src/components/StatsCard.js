import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from './StatsCard.styles';
import colors from '../theme/colors';

const StatsCard = ({ stats }) => {
  const completion = Math.round((stats.done / Math.max(stats.total, 1)) * 100);

  return (
    <LinearGradient colors={[colors.primary, colors.accent]} style={styles.heroCard}>
      <View style={styles.heroTop}>
        <View>
          <Text style={styles.heroTitle}>Today Focus</Text>
          <Text style={styles.heroCount}>{stats.today} tasks left</Text>
        </View>
        <View style={styles.heroRing}>
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
