import 'react-native-gesture-handler';
import 'react-native-reanimated'
import Routes from './src/Navigation/index';
import Gastos from './src/screens/LancarGasto/Gasto'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
   return (
      <GestureHandlerRootView style = {{flex:1}}>
         {/* <Gastos/> */}
         <Routes/>
      </GestureHandlerRootView>
   )
}
