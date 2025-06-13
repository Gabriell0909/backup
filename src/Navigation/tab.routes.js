import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import { Ionicons } from '@expo/vector-icons';

import Despesas from '../screens/Despesas/Despesas';
import Gasto from '../screens/LancarGasto/Gasto';
import Perfil from '../screens/Perfil/Perfil';
import { styles } from '../styles/tabStyles';
const Tab = createBottomTabNavigator();

export default function TabRoutes() {
   return (
      <Tab.Navigator
         screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: styles.tabStyle,
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#aaa',
         }}
      >
         <Tab.Screen
            name="HomeTab"
            component={Home}
            options={{
               headerShown: false,
               tabBarHideOnKeyboard: true,
               tabBarIcon: ({ color, size, focused }) => {
                  if (focused) {
                     return <Ionicons name="home" size={size} color={color} />;
                  }
                  return <Ionicons name="home-outline" size={size} color={color} />;
               },
            }}
         />

         <Tab.Screen
            name="LançarGastoTab"
            component={Gasto}
            options={{
               headerShown: false,
               tabBarHideOnKeyboard: true,
               tabBarIcon: ({ color, size, focused }) => {
                  if (focused) {
                     return <Ionicons name="add" size={size} color={color} />;
                  }
                  return <Ionicons name="add-outline" size={size} color={color} />;
               },
            }}
         />

         <Tab.Screen
            name="DespesasTab"
            component={Despesas}
            options={{
               headerShown: false,
               tabBarHideOnKeyboard: true,

               tabBarIcon: ({ color, size, focused }) => {
                  if (focused) {
                     return <Ionicons name="wallet" size={size} color={color} />;
                  }
                  return <Ionicons name="wallet-outline" size={size} color={color} />;
               },
            }}
         />

         <Tab.Screen
            name="PerfilTab"
            component={Perfil}
            options={{
               headerShown: false,
               tabBarIcon: ({ color, size, focused }) => {
                  if (focused) {
                     return <Ionicons name="person" size={size} color={color} />;
                  }
                  return <Ionicons name="person-outline" size={size} color={color} />;
               },
            }}
         />
      </Tab.Navigator>
   );
}
