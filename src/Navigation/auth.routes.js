import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login/Login';
import Cadastro from '../screens/Cadastro/Cadastro';
import Recovery from '../screens/Recovery/Recovery';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="AuthLogin" component={Login} />
         <Stack.Screen name="AuthCadastro" component={Cadastro} />
         <Stack.Screen name="AuthRecovery" component={Recovery} />
      </Stack.Navigator>
   );
}
