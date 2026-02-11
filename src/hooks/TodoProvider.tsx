import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createTodo, FILTERS, seedTodos } from '../domain/todo';
import { loadTodos, saveTodos } from '../storage/todoStorage';
import {
  cancelReminder,
  registerForNotifications,
  scheduleTodoReminder,
} from '../services/notifications';
import type { Filter, TodoItem, TodoStats } from '../types';

type TodoContextValue = {
  todos: TodoItem[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  stats: TodoStats;
  visibleTodos: TodoItem[];
  addTodo: (payload: {
    title: string;
    note?: string;
    due?: string;
    priority?: TodoItem['priority'];
    tags?: string[];
    reminderMinutes?: number;
  }) => Promise<TodoItem | undefined>;
  updateTodo: (id: string, changes: Partial<TodoItem>) => Promise<void>;
  toggleComplete: (id: string) => void;
  toggleStar: (id: string) => void;
  removeTodo: (id: string) => Promise<void>;
  setReminder: (id: string, minutesFromNow: number) => Promise<void>;
  reorderTodos: (orderedList: TodoItem[]) => void;
  clearExpiredReminders: (now?: number) => void;
};

const TodoContext = createContext<TodoContextValue | null>(null);

const sortByOrder = (items: TodoItem[]) =>
  [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
const hasExpiredReminder = (todo: TodoItem, now: number) =>
  todo.reminderMinutes &&
  todo.reminderMinutes > 0 &&
  todo.reminderSetAt &&
  now - todo.reminderSetAt >= todo.reminderMinutes * 60 * 1000;

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<Filter>(FILTERS[0]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      const stored = await loadTodos();
      setTodos(stored && stored.length ? sortByOrder(stored) : seedTodos);
      setHydrated(true);
    };
    hydrate();
    registerForNotifications();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveTodos(todos);
  }, [todos, hydrated]);

  // Reminder cleanup is triggered from the UI tick to avoid render loops here.

  const stats = useMemo<TodoStats>(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.completed).length;
    const today = todos.filter((t) => t.due === 'Today' && !t.completed).length;
    return { total, done, today };
  }, [todos]);

  const visibleTodos = useMemo(() => {
    if (filter === 'All') return sortByOrder(todos);
    if (filter === 'Done') return todos.filter((t) => t.completed);
    if (filter === 'Today') return todos.filter((t) => t.due === 'Today' && !t.completed);
    if (filter === 'Upcoming') return todos.filter((t) => t.due !== 'Today' && !t.completed);
    return todos;
  }, [todos, filter]);

  const addTodo = async (payload: {
    title: string;
    note?: string;
    due?: string;
    priority?: TodoItem['priority'];
    tags?: string[];
    reminderMinutes?: number;
  }) => {
    const trimmed = payload.title.trim();
    if (!trimmed) return;
    const todo = createTodo({ ...payload, title: trimmed });
    if (payload.reminderMinutes && payload.reminderMinutes > 0) {
      const reminderId = await scheduleTodoReminder({
        title: todo.title,
        minutesFromNow: payload.reminderMinutes,
      });
      todo.reminderMinutes = payload.reminderMinutes;
      todo.reminderId = reminderId;
      todo.reminderSetAt = Date.now();
    }
    setTodos((prev) => [todo, ...prev]);
    return todo;
  };

  const updateTodo = async (id: string, changes: Partial<TodoItem>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...changes } : todo))
    );
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleStar = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, starred: !todo.starred } : todo))
    );
  };

  const removeTodo = async (id: string) => {
    const todo = todos.find((item) => item.id === id);
    if (todo?.reminderId) {
      await cancelReminder(todo.reminderId);
    }
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const setReminder = async (id: string, minutesFromNow: number) => {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;
    if (todo.reminderId) {
      await cancelReminder(todo.reminderId);
    }
    if (!minutesFromNow || minutesFromNow <= 0) {
      setTodos((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, reminderMinutes: 0, reminderId: null, reminderSetAt: null }
            : item
        )
      );
      return;
    }
    const reminderId = await scheduleTodoReminder({
      title: todo.title,
      minutesFromNow,
    });
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              reminderMinutes: minutesFromNow,
              reminderId,
              reminderSetAt: Date.now(),
            }
          : item
      )
    );
  };

  const reorderTodos = (orderedList: TodoItem[]) => {
    const orderedWithIndex = orderedList.map((todo, index) => ({
      ...todo,
      order: index + 1,
    }));
    setTodos(orderedWithIndex);
  };

  const clearExpiredReminders = useCallback((now: number = Date.now()) => {
    setTodos((prev) => {
      let changed = false;
      const next = prev.map((todo) => {
        if (hasExpiredReminder(todo, now)) {
          changed = true;
          return { ...todo, reminderMinutes: 0, reminderId: null, reminderSetAt: null };
        }
        return todo;
      });
      return changed ? next : prev;
    });
  }, []);

  const value = {
    todos,
    filter,
    setFilter,
    stats,
    visibleTodos,
    addTodo,
    updateTodo,
    toggleComplete,
    toggleStar,
    removeTodo,
    setReminder,
    reorderTodos,
    clearExpiredReminders,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = (): TodoContextValue => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
};
