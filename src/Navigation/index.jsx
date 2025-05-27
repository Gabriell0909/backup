import { NavigationContainer } from "@react-navigation/native";
import NavigateStacks from "./stack.routes";

import AuthNavigator from './auth.routes';
import AppNavigator from './AppNavigator';

export default function Routes({user}) {
     console.log('[Navigation/index.js] Usuário para rotas:', user ? user.uid : 'Nenhum');
    return (
        <NavigationContainer>
            {user? <AppNavigator/> : <AuthNavigator/>}
        </NavigationContainer>
    );
}