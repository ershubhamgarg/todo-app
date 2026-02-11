import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './TodoCard.styles';
import colors from '../theme/colors';

const TodoCard = ({ todo, onToggle, onStar, onPress, drag, isActive, draggable, now }) => {
  const priorityStyle = styles[`badge${todo.priority}`] || styles.badgeMedium;
  const hasReminder = todo.reminderMinutes && todo.reminderMinutes > 0 && todo.reminderSetAt;
  let reminderLabel = null;
  if (hasReminder) {
    const totalSeconds = Math.max(
      0,
      Math.round(todo.reminderMinutes * 60 - (now - todo.reminderSetAt) / 1000)
    );
    if (totalSeconds > 0) {
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      reminderLabel = mins > 0 ? `Remind in ${mins}m ${secs}s` : `Remind in ${secs}s`;
    }
  }

  return (
    <Pressable
      style={[styles.card, todo.completed && styles.cardDone, isActive && { opacity: 0.7 }]}
      onPress={onPress}
    >
      <Pressable onPress={onToggle} style={styles.checkCircle}>
        {todo.completed ? (
          <Ionicons name="checkmark" size={16} color={colors.surface} />
        ) : (
          <View style={styles.checkDot} />
        )}
      </Pressable>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, todo.completed && styles.titleDone]} numberOfLines={1}>
            {todo.title}
          </Text>
          <Pressable onPress={onStar}>
            <Ionicons
              name={todo.starred ? 'star' : 'star-outline'}
              size={18}
              color={todo.starred ? '#FFB703' : '#CBB4A2'}
            />
          </Pressable>
          {draggable ? (
            <Pressable onLongPress={drag} style={styles.dragHandle}>
              <Ionicons name="reorder-two" size={18} color={colors.textMuted} />
            </Pressable>
          ) : null}
        </View>
        <Text style={styles.note}>{todo.note}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.badge, priorityStyle]}>
            <Text style={styles.badgeText}>{todo.priority}</Text>
          </View>
          {reminderLabel ? (
            <View style={styles.badgeOutline}>
              <Ionicons name="timer-outline" size={14} color={colors.textSecondary} />
              <Text style={styles.badgeOutlineText}>{reminderLabel}</Text>
            </View>
          ) : null}
          <View style={styles.badgeOutline}>
            <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.badgeOutlineText}>{todo.due}</Text>
          </View>
          {todo.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

export default TodoCard;
