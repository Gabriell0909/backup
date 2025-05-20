import 'react-native-gesture-handler';
import 'react-native-reanimated'
import Routes from './src/Navigation/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
   return (
      <GestureHandlerRootView style = {{flex:1}}>
         <Routes/>
      </GestureHandlerRootView>
   )
}
