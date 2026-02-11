import React from 'react';
import { renderWithProviders } from './testUtils';
import HomeScreen from '../src/screens/HomeScreen';
import DetailScreen from '../src/screens/DetailScreen';
import SettingsScreen from '../src/screens/SettingsScreen';
import PinScreen from '../src/screens/PinScreen';
import ConfirmPinScreen from '../src/screens/ConfirmPinScreen';

const nav = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
};

describe('Screens', () => {
  it('renders HomeScreen', () => {
    const { getByText } = renderWithProviders(<HomeScreen navigation={nav as any} />);
    expect(getByText('LetsDoIt')).toBeTruthy();
  });

  it('renders DetailScreen', () => {
    const { getByText } = renderWithProviders(
      <DetailScreen navigation={nav as any} route={{ params: { id: 'new' } } as any} />
    );
    expect(getByText('New Task')).toBeTruthy();
  });

  it('renders SettingsScreen', () => {
    const { getByText } = renderWithProviders(<SettingsScreen navigation={nav as any} />);
    expect(getByText('Settings')).toBeTruthy();
  });

  it('renders PinScreen', () => {
    const { getByText } = renderWithProviders(
      <PinScreen navigation={nav as any} route={{ params: { mode: 'set' } } as any} />
    );
    expect(getByText('New PIN')).toBeTruthy();
  });

  it('renders ConfirmPinScreen', () => {
    const { getByText } = renderWithProviders(<ConfirmPinScreen navigation={nav as any} />);
    expect(getByText('Confirm PIN')).toBeTruthy();
  });
});
