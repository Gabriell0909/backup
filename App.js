import 'react-native-gesture-handler';
import 'react-native-reanimated';
import Routes from './src/Navigation/index';
import LoadScreen from './src/screens/Splash/Splash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider, useAuth } from './src/Hooks/useAuth';

function AppContent() {
   const { user, initializing } = useAuth();

   if (initializing) {
      return <LoadScreen />;
   }

   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <Routes user={user} />
      </GestureHandlerRootView>
   );
}

export default function App() {
   return (
      <AuthProvider>
         <AppContent />
      </AuthProvider>
   );
}
