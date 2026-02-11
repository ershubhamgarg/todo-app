import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createTodo, FILTERS, seedTodos } from '../domain/todo';
import { loadTodos, saveTodos } from '../storage/todoStorage';
import {
  cancelReminder,
  registerForNotifications,
  scheduleTodoReminder,
} from '../services/notifications';

const TodoContext = createContext(null);

const sortByOrder = (items) => [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
const hasExpiredReminder = (todo, now) =>
  todo.reminderMinutes &&
  todo.reminderMinutes > 0 &&
  todo.reminderSetAt &&
  now - todo.reminderSetAt >= todo.reminderMinutes * 60 * 1000;

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(FILTERS[0]);
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

  const stats = useMemo(() => {
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

  const addTodo = async (payload) => {
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

  const updateTodo = async (id, changes) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...changes } : todo))
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleStar = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, starred: !todo.starred } : todo))
    );
  };

  const removeTodo = async (id) => {
    const todo = todos.find((item) => item.id === id);
    if (todo?.reminderId) {
      await cancelReminder(todo.reminderId);
    }
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const setReminder = async (id, minutesFromNow) => {
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

  const reorderTodos = (orderedList) => {
    const orderedWithIndex = orderedList.map((todo, index) => ({
      ...todo,
      order: index + 1,
    }));
    setTodos(orderedWithIndex);
  };

  const clearExpiredReminders = useCallback((now = Date.now()) => {
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

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
};
