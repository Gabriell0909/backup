import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Icons from '../../constants/icons';
import { Styles } from './Recovery.style.js';
import Input from '../../components/inputs.jsx';
import Button from '../../components/customButton.jsx';

import { requestRecoveryPassword } from '../../Auth/AuthService.js';
import { useState } from 'react';

export default function Recovery() {
   const [email, setEmail] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const handleSendRecoveryEmailOnScreen = async () => {
      try {
         await requestRecoveryPassword(email);
      } catch (error) {
         console.log('paiou');
      }
   };
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <StatusBar barStyle={'dark-content'} />
         <View style={Styles.container}>
            <Icons.Face />

            <View style={Styles.view}>
               <Ionicons name="mail-outline" size={24} />
               <Input
                  style={Styles.input}
                  placeholder="exemplo123@gmail.com"
                  maxLength={40}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
               ></Input>
            </View>

            <Text style={Styles.texto}>
               Digite seu e-mail, para receber um e-mail {'\n'}para redefinição da senha
            </Text>

            <View style={{ marginTop: 140, flex: 1 }}>
               <Icons.Pig style={Styles.pig} />
               <Button
                  style={{ marginTop: 0 }}
                  onPress={() => {
                     handleSendRecoveryEmailOnScreen();
                  }}
               >
                  <Text>Enviar</Text>
               </Button>
            </View>
         </View>
      </SafeAreaView>
   );
}
