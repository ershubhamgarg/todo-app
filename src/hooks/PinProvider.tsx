import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PIN_KEY = 'letsdoit.pin.v1';

type PinContextValue = {
  pin: string | null;
  hasPin: boolean;
  hydrated: boolean;
  unlocked: boolean;
  setNewPin: (nextPin: string) => Promise<boolean>;
  clearPin: () => Promise<void>;
  verifyPin: (input: string) => boolean;
  lock: () => void;
};

const PinContext = createContext<PinContextValue | null>(null);

export const PinProvider = ({ children }: { children: React.ReactNode }) => {
  const isTest = process.env.NODE_ENV === 'test';
  const [pin, setPin] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(isTest);
  const [unlocked, setUnlocked] = useState(isTest);

  useEffect(() => {
    if (isTest) return;
    const hydrate = async () => {
      try {
        const stored = await AsyncStorage.getItem(PIN_KEY);
        setPin(stored || null);
        setUnlocked(!stored);
      } catch (error) {
        setPin(null);
        setUnlocked(true);
      } finally {
        setHydrated(true);
      }
    };
    hydrate();
  }, []);

  const setNewPin = useCallback(async (nextPin: string) => {
    if (!nextPin) return false;
    await AsyncStorage.setItem(PIN_KEY, nextPin);
    setPin(nextPin);
    setUnlocked(true);
    return true;
  }, []);

  const clearPin = useCallback(async () => {
    await AsyncStorage.removeItem(PIN_KEY);
    setPin(null);
    setUnlocked(true);
  }, []);

  const verifyPin = useCallback(
    (input: string) => {
      if (!pin) return true;
      const ok = input === pin;
      if (ok) setUnlocked(true);
      return ok;
    },
    [pin]
  );

  const lock = useCallback(() => {
    if (pin) setUnlocked(false);
  }, [pin]);

  const value = useMemo(
    () => ({
      pin,
      hasPin: Boolean(pin),
      hydrated,
      unlocked,
      setNewPin,
      clearPin,
      verifyPin,
      lock,
    }),
    [pin, hydrated, unlocked, setNewPin, clearPin, verifyPin, lock]
  );

  return <PinContext.Provider value={value}>{children}</PinContext.Provider>;
};

export const usePin = (): PinContextValue => {
  const context = useContext(PinContext);
  if (!context) {
    throw new Error('usePin must be used within PinProvider');
  }
  return context;
};
