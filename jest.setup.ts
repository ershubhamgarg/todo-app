import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { View } from 'react-native';

// Enable React 18+ act environment for testing-library
// eslint-disable-next-line no-undef
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children }: { children: React.ReactNode }) =>
      React.createElement(View, null, children),
  };
});

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Ionicons: () => React.createElement(View, null),
    MaterialCommunityIcons: () => React.createElement(View, null),
  };
});

jest.mock('expo-status-bar', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    StatusBar: () => React.createElement(View, null),
  };
});

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
}));

jest.mock('expo-screen-capture', () => ({
  preventScreenCaptureAsync: jest.fn(),
  allowScreenCaptureAsync: jest.fn(),
  enableAppSwitcherProtectionAsync: jest.fn(),
}));

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');
  const handler = ({ children }: { children?: React.ReactNode }) =>
    React.createElement(View, null, children);
  return {
    GestureHandlerRootView: handler,
    PanGestureHandler: handler,
    TapGestureHandler: handler,
    LongPressGestureHandler: handler,
    State: {},
    Directions: {},
  };
});

jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: ({ children }: { children?: React.ReactNode }) =>
      React.createElement(View, null, children),
    Circle: ({ children }: { children?: React.ReactNode }) =>
      React.createElement(View, null, children),
  };
});

jest.mock('react-native-draggable-flatlist', () => {
  const React = require('react');
  const { View } = require('react-native');
  const isElement = React.isValidElement;
  return (props: any) => {
    const {
      data = [],
      renderItem,
      ListHeaderComponent,
      ListEmptyComponent,
      contentContainerStyle,
    } = props;
    const header = isElement(ListHeaderComponent)
      ? ListHeaderComponent
      : ListHeaderComponent
      ? React.createElement(ListHeaderComponent)
      : null;
    const empty = isElement(ListEmptyComponent)
      ? ListEmptyComponent
      : ListEmptyComponent
      ? React.createElement(ListEmptyComponent)
      : null;
    const items = data.map((item: any, index: number) => {
      const rendered = renderItem({ item, index, drag: jest.fn(), isActive: false });
      if (isElement(rendered)) {
        return React.cloneElement(rendered, { key: item?.id ?? index });
      }
      return React.createElement(React.Fragment, { key: item?.id ?? index }, rendered);
    });
    return React.createElement(
      View,
      { style: contentContainerStyle },
      header,
      items.length ? items : empty
    );
  };
});

jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  scheduleNotificationAsync: jest.fn().mockResolvedValue('notification-id'),
  cancelScheduledNotificationAsync: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
  return {
    ...Platform,
    OS: 'ios',
    select: (obj: Record<string, unknown>) => obj.ios,
  };
});

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: () => 'light',
}));
