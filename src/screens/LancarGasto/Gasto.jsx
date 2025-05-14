import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/card';
import { styles } from '../LancarGasto/Gasto.style';

export default function LançarGastos() {
   return (
      <View>
         <Card style={styles.bannerTitle}>
            <View style ={styles.chieldContainer}>
               <Text style={styles.titulo}>Lançar Gastos</Text>
            </View>
         </Card>
      </View>
   );
}
