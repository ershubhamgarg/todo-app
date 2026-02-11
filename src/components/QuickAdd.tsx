import React, { useMemo, useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import createStyles from './QuickAdd.styles';
import { useTheme } from '../theme/ThemeProvider';
import typography from '../theme/typography';
import spacing from '../theme/spacing';

const QuickAdd = ({
  onAdd,
}: {
  onAdd: (payload: { title: string }) => Promise<unknown>;
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography, spacing), [colors]);
  const [input, setInput] = useState('');

  const handleAdd = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    await onAdd({ title: trimmed });
    setInput('');
  };

  return (
    <View style={styles.quickAddCard}>
      <View style={styles.quickRow}>
        <TextInput
          testID="quick-add-input"
          placeholder="Quick add a task"
          placeholderTextColor={colors.textMuted}
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <Pressable testID="quick-add-button" style={styles.addButton} onPress={handleAdd}>
          <Ionicons name="add" size={22} color={colors.surface} />
        </Pressable>
      </View>
    </View>
  );
};

export default QuickAdd;
