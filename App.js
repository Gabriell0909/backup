import 'react-native-gesture-handler';
import 'react-native-reanimated'
import Routes from './src/Navigation/index';
import Gastos from './src/screens/LancarGasto/Gasto'
import LoadScreen from './src/screens/Splash/Splash'
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { useAuth } from './src/Hooks/useAuth'; 

export default function App() {

   const {user, initializing} = useAuth()


   if(initializing){
      return <LoadScreen/>
   }

   return (
      <GestureHandlerRootView style = {{flex:1}}>
         <Routes user={user}/>
      </GestureHandlerRootView>
   )
}
