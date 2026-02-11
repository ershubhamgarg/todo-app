import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { TodoProvider } from '../src/hooks/TodoProvider';
import { PinProvider } from '../src/hooks/PinProvider';
import { ToastProvider } from '../src/hooks/ToastProvider';

export const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <ThemeProvider>
      <ToastProvider>
        <PinProvider>
          <TodoProvider>
            <NavigationContainer>{ui}</NavigationContainer>
          </TodoProvider>
        </PinProvider>
      </ToastProvider>
    </ThemeProvider>
  );
