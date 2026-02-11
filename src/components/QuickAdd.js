import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './QuickAdd.styles';
import colors from '../theme/colors';
import { FILTERS } from '../domain/todo';

const QuickAdd = ({ filter, onFilterChange, onAdd }) => {
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
          placeholder="Quick add a task"
          placeholderTextColor={colors.textMuted}
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Ionicons name="add" size={22} color={colors.surface} />
        </Pressable>
      </View>
      <View style={styles.filterRow}>
        {FILTERS.map((item) => {
          const active = item === filter;
          return (
            <Pressable
              key={item}
              onPress={() => onFilterChange(item)}
              style={[styles.filterChip, active && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default QuickAdd;
