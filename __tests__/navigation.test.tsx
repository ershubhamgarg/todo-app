import React from 'react';
import renderer, { act } from 'react-test-renderer';
jest.mock('../src/screens/HomeScreen', () => () => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, null);
});
jest.mock('../src/screens/DetailScreen', () => () => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, null);
});
jest.mock('../src/screens/SettingsScreen', () => () => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, null);
});
jest.mock('../src/screens/PinScreen', () => () => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, null);
});
jest.mock('../src/screens/ConfirmPinScreen', () => () => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, null);
});

import AppNavigator from '../src/navigation/AppNavigator';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { TodoProvider } from '../src/hooks/TodoProvider';
import { PinProvider } from '../src/hooks/PinProvider';

jest.mock('@react-navigation/native', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    NavigationContainer: ({ children }: { children: React.ReactNode }) =>
      React.createElement(View, null, children),
  };
});

jest.mock('@react-navigation/stack', () => {
  const React = require('react');
  return {
    createStackNavigator: () => ({
      Navigator: ({ children }: { children: React.ReactNode }) => children,
      Screen: ({ component: Component }: { component?: React.ComponentType }) =>
        Component ? React.createElement(Component) : null,
    }),
  };
});

const wrap = () =>
  renderer.create(
    <ThemeProvider>
      <PinProvider>
        <TodoProvider>
          <AppNavigator />
        </TodoProvider>
      </PinProvider>
    </ThemeProvider>
  );

describe('Navigation', () => {
  it('renders navigator', async () => {
    let tree: ReturnType<typeof wrap>;
    await act(async () => {
      tree = wrap();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    // @ts-expect-error assigned in act
    expect(tree.toJSON()).toBeTruthy();
  });
});
