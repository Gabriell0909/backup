import { NavigationContainer } from '@react-navigation/native';
import NavigateStacks from './stack.routes';

import AuthNavigator from './auth.routes';
import AppNavigator from './AppNavigator';
import { Text } from 'react-native';

export default function Routes({ user }) {
   console.log('[Navigation/index.js] Usuário para rotas:', user ? user.uid : 'Nenhum');
   const linking = {
      prefixes: ['economizaapp://','https://economiza-75d55.firebaseapp.com'],
      config: {
         screens: {
            AuthNavigator: {
               screens: {
                  ResetPasswordScreen: 'reset-password',
               },
            },
         },
      },
   };

   return (
      <NavigationContainer linking={linking} fallback={<Text>Carregando...</Text>}>
         {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
   );
}
