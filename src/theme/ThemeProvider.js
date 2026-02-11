import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors } from './colors';

const STORAGE_KEY = 'letsdoit.theme.mode.v1';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const deviceScheme = useColorScheme();
  const [mode, setMode] = useState('system');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setMode(stored);
        }
      } catch (error) {
        // no-op
      } finally {
        setHydrated(true);
      }
    };
    hydrate();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => null);
  }, [mode, hydrated]);

  const effectiveMode = mode === 'system' ? (deviceScheme ?? 'light') : mode;
  const colors = effectiveMode === 'dark' ? darkColors : lightColors;

  const setThemeMode = useCallback((nextMode) => {
    setMode(nextMode);
  }, []);

  const value = useMemo(
    () => ({
      mode,
      effectiveMode,
      colors,
      setThemeMode,
    }),
    [mode, effectiveMode, colors, setThemeMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
