import { KeyboardAvoidingView, Platform, StatusBar, Text, View } from 'react-native';
import { Ionicons} from '@expo/vector-icons'

import { styles } from './Devedores.style';
import Card from '../../components/card';
import Input from '../../components/inputs';
import ButtonC from '../../components/customButton';

export default function Devedores() {
   return (
      <KeyboardAvoidingView
         style={{ flex: 1, alignItems: 'center' }}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
         <StatusBar translucent backgroundColor="transparent" />
         <Card style={styles.banner}>
            <Text style={styles.title}>Devedores</Text>
         </Card>

         <Input style={styles.inputs} placeholder='Digite um nome para o devedor'/>

         <View style = {styles.containerButton}>
            <ButtonC style={styles.buttonC}>
               <Ionicons name='person-circle-outline' size={32}/>
               <Text>Icone</Text>
            </ButtonC>
         </View>

         <ButtonC style={styles.btn}>
            <Text>Salvar</Text>
         </ButtonC>

         <View style = {{marginTop:70}}>
            <Text>Devedores</Text>
            
         </View>
      </KeyboardAvoidingView>
   );
}
