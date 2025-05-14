import { Text, View } from 'react-native';
import Card from '../../components/card'
import { styles } from './despesas.style';

export default function Despesa() {
   return (
      <View>
         <Card style={styles.bannerTitle}>
            <View style={styles.chieldContainer}>
               <Text style={styles.titulo}>Despesas</Text>
            </View>
         </Card>
      </View>
   );
}
