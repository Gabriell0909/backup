import SemiCirculo from "../../components/semicirculo";
import { View } from 'react-native';
import icons from '../constants/icons';


export default function Tela() {
  return (
    <View>
        <SemiCirculo/>
        <icons.Grafico width={100} height={100} style={{position:'absolute', top: 50, left: 50}}/>
    </View>
  );
}