import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Perfil.style';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Perfil() {
   return (
      <SafeAreaView style={styles.SafeArea}>
         <View style={styles.container}>
            <View style={styles.linear1}>
               <Text style = {styles.titulo}> Sua Conta</Text>
               <Ionicons name='exit-outline' size={32} />
            </View>
         </View>
      </SafeAreaView>
   );
}
