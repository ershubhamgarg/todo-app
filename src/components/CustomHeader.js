import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './CustomHeader.styles';
import colors from '../theme/colors';

const CustomHeader = ({
  title = 'LetsDoIt',
  subtitle = 'Design your day, one win at a time.',
  showBack = false,
  onBack,
}) => (
  <View style={styles.container}>
    <View>
      {showBack ? (
        <Pressable onPress={onBack} style={styles.backRow}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      ) : (
        <Text style={styles.kicker}>Good morning</Text>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <View style={styles.avatar}>
      <Ionicons name="sparkles" size={22} color={colors.primary} />
    </View>
  </View>
);

export default CustomHeader;
