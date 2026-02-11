import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PinScreen from '../screens/PinScreen';
import ConfirmPinScreen from '../screens/ConfirmPinScreen';
import { usePin } from '../hooks/PinProvider';
import type { RootStackParamList } from '../types';
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { hydrated, hasPin, unlocked } = usePin();

  if (!hydrated) return null;

  const isLocked = hasPin && !unlocked;
  const navKey = isLocked ? 'locked' : 'unlocked';

  return (
    <NavigationContainer>
      <Stack.Navigator
        key={navKey}
        screenOptions={{ headerShown: false }}
        initialRouteName={isLocked ? 'Pin' : 'Home'}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Pin" component={PinScreen} initialParams={{ mode: 'unlock' }} />
        <Stack.Screen name="ConfirmPin" component={ConfirmPinScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
