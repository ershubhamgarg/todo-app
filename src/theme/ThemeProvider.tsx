import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorPalettes, darkBase, lightBase } from './colors';
import type { PaletteName, ThemeColors, ThemeMode } from '../types';

const MODE_KEY = 'letsdoit.theme.mode.v1';
const PALETTE_KEY = 'letsdoit.theme.palette.v1';

type ThemeContextValue = {
  mode: ThemeMode;
  paletteName: PaletteName;
  effectiveMode: 'light' | 'dark';
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => void;
  setThemePalette: (palette: PaletteName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getPalette = (name: PaletteName, mode: 'light' | 'dark') => {
  const fallback = colorPalettes.orange;
  const palette = colorPalettes[name] || fallback;
  return mode === 'dark' ? palette.dark : palette.light;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const deviceScheme = useColorScheme();
  const isTest = process.env.NODE_ENV === 'test';
  const [mode, setMode] = useState<ThemeMode>('system');
  const [paletteName, setPaletteName] = useState<PaletteName>('orange');
  const [hydrated, setHydrated] = useState(isTest);

  useEffect(() => {
    if (isTest) return;
    const hydrate = async () => {
      try {
        const storedMode = await AsyncStorage.getItem(MODE_KEY);
        if (storedMode === 'light' || storedMode === 'dark' || storedMode === 'system') {
          setMode(storedMode);
        }
        const storedPalette = await AsyncStorage.getItem(PALETTE_KEY);
        if (storedPalette && (colorPalettes as Record<string, unknown>)[storedPalette]) {
          setPaletteName(storedPalette as PaletteName);
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
    if (!hydrated || isTest) return;
    AsyncStorage.setItem(MODE_KEY, mode).catch(() => null);
    AsyncStorage.setItem(PALETTE_KEY, paletteName).catch(() => null);
  }, [mode, paletteName, hydrated, isTest]);

  const effectiveMode: 'light' | 'dark' = mode === 'system' ? (deviceScheme ?? 'light') : mode;
  const base = effectiveMode === 'dark' ? darkBase : lightBase;
  const palette = getPalette(paletteName, effectiveMode);
  const colors: ThemeColors = { ...base, ...palette } as ThemeColors;

  const setThemeMode = useCallback((nextMode: ThemeMode) => {
    setMode(nextMode);
  }, []);

  const setThemePalette = useCallback((nextPalette: PaletteName) => {
    if (colorPalettes[nextPalette]) {
      setPaletteName(nextPalette);
    }
  }, []);

  const value = useMemo(
    () => ({
      mode,
      paletteName,
      effectiveMode,
      colors,
      setThemeMode,
      setThemePalette,
    }),
    [mode, paletteName, effectiveMode, colors, setThemeMode, setThemePalette]
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
