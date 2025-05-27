import Cadastro from '../screens/Cadastro/Cadastro';
import Login from '../screens/Login/Login';
import Recovery from '../screens/Recovery/Recovery';
import Devedores from '../screens/Devedores/Devedores'
import Categorias from '../screens/Categorias/Categorias'

import TabRoutes from './tab.routes';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function NavigateStacks() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="DevedoresStack" component={Devedores}/>
         <Stack.Screen name="CategoriaStack" component={Categorias}/>
         <Stack.Screen name="HomeStack" component={TabRoutes} />
      </Stack.Navigator>
   );
}
