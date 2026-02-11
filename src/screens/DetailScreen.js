import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTodos } from '../hooks/TodoProvider';
import { PRIORITIES } from '../domain/todo';
import CustomHeader from '../components/CustomHeader';
import styles from './DetailScreen.styles';
import colors from '../theme/colors';

const DetailScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { todos, addTodo, updateTodo, removeTodo, setReminder } = useTodos();

  const existing = useMemo(() => todos.find((item) => item.id === id), [id, todos]);
  const isNew = id === 'new' || !existing;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [note, setNote] = useState(existing?.note ?? '');
  const [due, setDue] = useState(existing?.due ?? 'Today');
  const [priority, setPriority] = useState(existing?.priority ?? 'Medium');
  const [tags, setTags] = useState(existing?.tags?.join(', ') ?? '');
  const [completed, setCompleted] = useState(existing?.completed ?? false);
  const [reminderMinutes, setReminderMinutes] = useState(
    existing?.reminderMinutes ? String(existing.reminderMinutes) : ''
  );
  const [reminderSeconds, setReminderSeconds] = useState('');

  const handleSave = async () => {
    if (!title.trim()) return;

    const payload = {
      title: title.trim(),
      note,
      due,
      priority,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      completed,
    };

    let reminderPayload = 0;
    if (reminderSeconds.trim()) {
      const seconds = Number(reminderSeconds);
      reminderPayload = Number.isNaN(seconds) ? 0 : seconds / 60;
    } else if (reminderMinutes.trim()) {
      const minutes = Number(reminderMinutes);
      reminderPayload = Number.isNaN(minutes) ? 0 : minutes;
    }

    if (isNew) {
      await addTodo({ ...payload, reminderMinutes: reminderPayload });
    } else {
      await updateTodo(id, payload);
      await setReminder(id, reminderPayload);
    }

    navigation.goBack();
  };

  const handleDelete = async () => {
    if (!isNew) {
      await removeTodo(id);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.headerWrapper}>
        <CustomHeader
          title={isNew ? 'New Task' : 'Task Details'}
          subtitle={isNew ? 'Capture what needs focus.' : 'Update and keep momentum.'}
          showBack
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholder="Task title"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            style={[styles.input, styles.textArea]}
            placeholder="Add details"
            placeholderTextColor={colors.textMuted}
            multiline
          />
        </View>

        <View>
          <Text style={styles.label}>Due</Text>
          <View style={styles.row}>
            {['Today', 'Tomorrow', 'This Week', 'Upcoming'].map((item) => {
              const active = item === due;
              return (
                <Pressable
                  key={item}
                  onPress={() => setDue(item)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.row}>
            {PRIORITIES.map((item) => {
              const active = item === priority;
              return (
                <Pressable
                  key={item}
                  onPress={() => setPriority(item)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <Text style={styles.label}>Tags (comma separated)</Text>
          <TextInput
            value={tags}
            onChangeText={setTags}
            style={styles.input}
            placeholder="Design, Work"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View>
          <Text style={styles.label}>Reminder (seconds from now)</Text>
          <TextInput
            value={reminderSeconds}
            onChangeText={setReminderSeconds}
            style={styles.input}
            placeholder="45"
            placeholderTextColor={colors.textMuted}
            keyboardType="numeric"
          />
          <Text style={styles.hint}>If set, seconds will override minutes.</Text>
        </View>

        <View>
          <Text style={styles.label}>Reminder (minutes from now)</Text>
          <TextInput
            value={reminderMinutes}
            onChangeText={setReminderMinutes}
            style={styles.input}
            placeholder="2"
            placeholderTextColor={colors.textMuted}
            keyboardType="numeric"
          />
          <Text style={styles.hint}>Set to 0 or leave blank to clear reminder.</Text>
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>Mark as done</Text>
          <Switch value={completed} onValueChange={setCompleted} thumbColor={colors.primary} />
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={handleSave}>
            <Text style={styles.primaryButtonText}>Save</Text>
          </Pressable>
        </View>

        {!isNew && (
          <Pressable style={styles.dangerButton} onPress={handleDelete}>
            <Text style={styles.dangerButtonText}>Delete Task</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
