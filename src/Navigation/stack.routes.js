import Cadastro from '../screens/Cadastro/Cadastro';
import Login from '../screens/Login/Login';
import Recovery from '../screens/Recovery/Recovery';
import TabRoutes from './tab.routes';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function NavigateStacks() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="LoginStack" component={Login} />
         <Stack.Screen name="RecoveryStack" component={Recovery} />
         <Stack.Screen name="CadastroStack" component={Cadastro} />
         <Stack.Screen name="HomeStack" component={TabRoutes} />
      </Stack.Navigator>
   );
}
