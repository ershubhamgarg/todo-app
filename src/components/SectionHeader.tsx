import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import createStyles from './SectionHeader.styles';
import { useTheme } from '../theme/ThemeProvider';
import typography from '../theme/typography';
import spacing from '../theme/spacing';

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography, spacing), [colors]);

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.link}>{subtitle}</Text>
    </View>
  );
};

export default SectionHeader;
