import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import createStyles from './Toast.styles';
import { useTheme } from '../theme/ThemeProvider';
import typography from '../theme/typography';
import spacing from '../theme/spacing';

const Toast = ({ message }: { message: string | null }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography, spacing), [colors]);

  if (!message) return null;

  return (
    <View pointerEvents="none" style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Toast;
