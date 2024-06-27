import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, PolylineScreen, RoutesScreen } from '@/features';
import type { ScreenParams } from './navigation';

const Stack = createNativeStackNavigator<ScreenParams>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Polyline" component={PolylineScreen} />
        <Stack.Screen name="Routes" component={RoutesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
