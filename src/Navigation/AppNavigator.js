import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabRoutes from './tab.routes';

import Devedores from '../screens/Devedores/Devedores';
import Categorias from '../screens/Categorias/Categorias';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainHomeTabs" component={TabRoutes} />
      <Stack.Screen name="DevedoresScreen" component={Devedores} />
      <Stack.Screen name="CategoriasScreen" component={Categorias} />
    </Stack.Navigator>
  );
}