import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'letsdoit.todos.v1';

export const loadTodos = async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

export const saveTodos = async (todos) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    // Silently ignore storage errors to keep UX responsive.
  }
};

export const clearTodos = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    // no-op
  }
};
