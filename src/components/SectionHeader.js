import React from 'react';
import { View, Text } from 'react-native';
import styles from './SectionHeader.styles';

const SectionHeader = ({ title, subtitle }) => (
  <View style={styles.row}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.link}>{subtitle}</Text>
  </View>
);

export default SectionHeader;
