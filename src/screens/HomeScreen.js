import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useTodos } from '../hooks/TodoProvider';
import StatsCard from '../components/StatsCard';
import QuickAdd from '../components/QuickAdd';
import SectionHeader from '../components/SectionHeader';
import TodoCard from '../components/TodoCard';
import CustomHeader from '../components/CustomHeader';
import createStyles from './HomeScreen.styles';
import typography from '../theme/typography';
import spacing from '../theme/spacing';
import { useTheme } from '../theme/ThemeProvider';

const HomeScreen = ({ navigation }) => {
  const {
    stats,
    visibleTodos,
    filter,
    setFilter,
    addTodo,
    toggleComplete,
    toggleStar,
    reorderTodos,
    clearExpiredReminders,
  } = useTodos();
  const { colors, effectiveMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography, spacing), [colors]);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    clearExpiredReminders(now);
  }, [now, clearExpiredReminders]);

  const draggable = filter === 'All';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style={effectiveMode === 'dark' ? 'light' : 'dark'} />
      <LinearGradient colors={[colors.backgroundTop, colors.backgroundBottom]} style={styles.background}>
        <View style={styles.glow} />
        <DraggableFlatList
          data={visibleTodos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          onDragEnd={({ data }) => {
            if (draggable) reorderTodos(data);
          }}
          renderItem={({ item, drag, isActive }) => (
            <TodoCard
              todo={item}
              onToggle={() => toggleComplete(item.id)}
              onStar={() => toggleStar(item.id)}
              onPress={() => navigation.navigate('Details', { id: item.id })}
              drag={drag}
              isActive={isActive}
              draggable={draggable}
              now={now}
            />
          )}
          ListHeaderComponent={
            <View>
              <CustomHeader onSettings={() => navigation.navigate('Settings')} />

              <StatsCard stats={stats} />

              <QuickAdd filter={filter} onFilterChange={setFilter} onAdd={addTodo} />

              <SectionHeader title="Your Flow" subtitle={`${stats.done}/${stats.total} done`} />
              {!draggable && (
                <Text style={styles.helperText}>Reordering is available in the All view.</Text>
              )}
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No tasks yet</Text>
              <Text style={styles.emptySubtitle}>Add a new task and keep the momentum going.</Text>
            </View>
          }
        />

        <Pressable style={styles.fab} onPress={() => navigation.navigate('Details', { id: 'new' })}>
          <MaterialCommunityIcons name="plus" size={26} color={colors.surface} />
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;
