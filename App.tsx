import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { AppState, View } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import AppNavigator from './src/navigation/AppNavigator';
import { TodoProvider } from './src/hooks/TodoProvider';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { PinProvider } from './src/hooks/PinProvider';
import { ToastProvider } from './src/hooks/ToastProvider';

const App = () => {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
  });
  const isTest = process.env.NODE_ENV === 'test';
  const [isActive, setIsActive] = useState(isTest ? true : AppState.currentState === 'active');

  useEffect(() => {
    if (isTest) return;
    ScreenCapture.preventScreenCaptureAsync().catch(() => null);
    if (ScreenCapture.enableAppSwitcherProtectionAsync) {
      ScreenCapture.enableAppSwitcherProtectionAsync().catch(() => null);
    }
    const sub = AppState.addEventListener('change', (state) => {
      setIsActive(state === 'active');
    });
    return () => sub.remove();
  }, [isTest]);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#FFF4EC' }} />;
  }

  if (!isActive) {
    return <View style={{ flex: 1, backgroundColor: '#000' }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <PinProvider>
              <TodoProvider>
                <AppNavigator />
              </TodoProvider>
            </PinProvider>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
