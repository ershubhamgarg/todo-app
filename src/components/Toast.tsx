import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import createStyles from './Toast.styles';
import { useTheme } from '../theme/ThemeProvider';
import typography from '../theme/typography';
import spacing from '../theme/spacing';

const Toast = ({
  message,
  onClose,
}: {
  message: string | null;
  onClose?: () => void;
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography, spacing), [colors]);

  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      {onClose ? (
        <Pressable testID="toast-close" onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={16} color={colors.surface} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default Toast;
