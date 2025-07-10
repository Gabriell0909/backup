import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabRoutes from './tab.routes';

import Devedores from '../screens/Devedores/Devedores';
import Categorias from '../screens/Categorias/Categorias';
import Graficos from '../screens/Graficos/Graficos';
import EditarPerfil from '../screens/Perfil/EditarPerfil';
import Seguranca from '../screens/Perfil/Seguranca';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="MainHomeTabs" component={TabRoutes} />
         <Stack.Screen name="DevedoresScreen" component={Devedores} />
         <Stack.Screen name="CategoriasScreen" component={Categorias} />
         <Stack.Screen name="GraficosScreen" component={Graficos} />
         <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
         <Stack.Screen name="Seguranca" component={Seguranca} />
      </Stack.Navigator>
   );
}
