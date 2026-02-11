import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../src/screens/HomeScreen';
import DetailScreen from '../src/screens/DetailScreen';
import SettingsScreen from '../src/screens/SettingsScreen';
import PinScreen from '../src/screens/PinScreen';
import ConfirmPinScreen from '../src/screens/ConfirmPinScreen';
import { renderWithProviders } from './testUtils';

const nav = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
};

describe('Functional flows', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.clear();
  });

  it('adds a task from Quick Add', async () => {
    const { getByTestId, findByText } = renderWithProviders(<HomeScreen navigation={nav as any} />);
    fireEvent.changeText(getByTestId('quick-add-input'), 'My New Task');
    fireEvent.press(getByTestId('quick-add-button'));
    expect(await findByText('My New Task')).toBeTruthy();
  });

  it('filters Done tasks', async () => {
    const { getByTestId, queryByText } = renderWithProviders(<HomeScreen navigation={nav as any} />);
    fireEvent.press(getByTestId('filter-chip-Done'));
    expect(queryByText('Stretch + mobility')).toBeTruthy();
    expect(queryByText('Map the onboarding flow')).toBeNull();
  });

  it('expands and collapses a task accordion', async () => {
    const { getByTestId, queryByText } = renderWithProviders(<HomeScreen navigation={nav as any} />);
    fireEvent.press(getByTestId('todo-card-1'));
    expect(queryByText('View Details')).toBeTruthy();
    fireEvent.press(getByTestId('todo-card-1'));
    expect(queryByText('View Details')).toBeNull();
  });

  it('sets reminder from detail screen inputs', async () => {
    const { getByTestId } = renderWithProviders(
      <DetailScreen navigation={nav as any} route={{ params: { id: 'new' } } as any} />
    );
    fireEvent.changeText(getByTestId('detail-title'), 'Reminder Task');
    fireEvent.changeText(getByTestId('detail-reminder-seconds'), '30');
    fireEvent.press(getByTestId('detail-save'));
    expect(nav.goBack).toHaveBeenCalled();
  });

  it('changes theme mode and palette', async () => {
    const { getByTestId } = renderWithProviders(<SettingsScreen navigation={nav as any} />);
    fireEvent.press(getByTestId('theme-mode-dark'));
    fireEvent.press(getByTestId('palette-mono'));
  });

  it('starts PIN change flow from settings', async () => {
    const { getByTestId } = renderWithProviders(<SettingsScreen navigation={nav as any} />);
    fireEvent.press(getByTestId('pin-change'));
    expect(nav.navigate).toHaveBeenCalledWith('Pin', { mode: 'set' });
  });

  it('sets PIN in Pin screen', async () => {
    const { getByTestId } = renderWithProviders(
      <PinScreen navigation={nav as any} route={{ params: { mode: 'set' } } as any} />
    );
    fireEvent.press(getByTestId('pin-digit-1'));
    fireEvent.press(getByTestId('pin-digit-2'));
    fireEvent.press(getByTestId('pin-digit-3'));
    fireEvent.press(getByTestId('pin-digit-4'));
    await waitFor(() => expect(nav.goBack).toHaveBeenCalled());
  });

  it('confirms PIN removal', async () => {
    await AsyncStorage.setItem('letsdoit.pin.v1', '1234');
    const { getByTestId } = renderWithProviders(<ConfirmPinScreen navigation={nav as any} />);
    fireEvent.press(getByTestId('confirm-pin-digit-1'));
    fireEvent.press(getByTestId('confirm-pin-digit-2'));
    fireEvent.press(getByTestId('confirm-pin-digit-3'));
    fireEvent.press(getByTestId('confirm-pin-digit-4'));
    await waitFor(() => expect(nav.goBack).toHaveBeenCalled());
  });

  it('handles PIN unlock success', async () => {
    await AsyncStorage.setItem('letsdoit.pin.v1', '1234');
    const { getByTestId } = renderWithProviders(
      <PinScreen navigation={nav as any} route={{ params: { mode: 'unlock' } } as any} />
    );
    fireEvent.press(getByTestId('pin-digit-1'));
    fireEvent.press(getByTestId('pin-digit-2'));
    fireEvent.press(getByTestId('pin-digit-3'));
    fireEvent.press(getByTestId('pin-digit-4'));
    await waitFor(() => expect(nav.reset).toHaveBeenCalled());
  });
});
