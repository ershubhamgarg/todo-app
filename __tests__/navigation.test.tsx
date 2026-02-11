import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '../src/navigation/AppNavigator';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { TodoProvider } from '../src/hooks/TodoProvider';
import { PinProvider } from '../src/hooks/PinProvider';

const wrap = () =>
  render(
    <ThemeProvider>
      <PinProvider>
        <TodoProvider>
          <AppNavigator />
        </TodoProvider>
      </PinProvider>
    </ThemeProvider>
  );

describe('Navigation', () => {
  it('renders navigator', () => {
    const { toJSON } = wrap();
    expect(toJSON()).toBeTruthy();
  });
});
