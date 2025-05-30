import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Icons from '../../constants/icons';
import { Styles } from './Recovery.style.js';
import Input from '../../components/InputAuth/inputsAuth.jsx';
import ButtonC from '../../components/customButton.jsx';
import { useState } from 'react';

export default function ResetPassword() {
   const [hidden, setHidden] = useState(true);
   const [hiddenConfirm, setHiddenConfirm] = useState(true);

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
         <View style={Styles.container}>
            <Icons.Face />

            <View style={Styles.views}>
               <Input
                  placeholder="digite sua nova senha"
                  maxLength={20}
                  keyboardType="default"
                  secureTextEntry={hidden}
                  rightIcon={
                     <Ionicons
                        name={hidden ? 'eye-off-outline' : 'eye-outline'}
                        size={24}
                        onPress={() => {
                           setHidden(!hidden);
                        }}
                     />
                  }
               >
                  <Ionicons name="lock-closed-outline" size={24} />
               </Input>

               <Input
                  style={Styles.input}
                  placeholder="repita sua nova senha"
                  maxLength={20}
                  keyboardType="default"
                  secureTextEntry={hiddenConfirm}
                  rightIcon={
                     <Ionicons
                        name={hiddenConfirm ? 'eye-off-outline' : 'eye-outline'}
                        size={24}
                        onPress={() => {
                           setHiddenConfirm(!hiddenConfirm);
                        }}
                     />
                  }
               >
                  <Ionicons name="lock-closed-outline" size={24} />
               </Input>
            </View>

            <ButtonC style={{ top: 180 }}>
               <Text>Confirmar</Text>
            </ButtonC>
         </View>
      </SafeAreaView>
   );
}
