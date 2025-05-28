import {
   View,
   Text,
   Pressable,
   TouchableOpacity,
   KeyboardAvoidingView,
   ScrollView,
   Platform,
   StatusBar,
} from 'react-native';
import SemiCirculo from '../../components/semicirculo';
import Input from '../../components/inputs';
import Icons from '../../constants/icons';
import { styles } from './Login.style';

import { FazerLogin } from '../../Auth/AuthLogin';
import { useState } from 'react';

export default function Login({ navigation }) {
   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');

   const handleLogin = async () => {
      try {
         await FazerLogin(email, senha);
         // navigation.navigate('MainHomeTabs');
      } catch (error) {
         console.log('paiou o login rapeize 🙂👍', error.message);
         throw error;
      }
   };
   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
         <StatusBar translucent backgroundColor="transparent" />
         <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={{ flex: 1, alignItems: 'center' }}>
               <SemiCirculo />
               <Icons.SecureLoginAmico width={360} height={360} />
               <Text style={styles.titulo}>Login</Text>

               <View style={styles.container}>
                  <Input
                     placeholder="Exemplo123@gmail.com"
                     maxLength={40}
                     keyboardType="email-address"
                     onChangeText={(text) => {
                        setEmail(text);
                     }}
                  />
                  <Input
                     placeholder="Digite sua senha"
                     maxLength={40}
                     secureTextEntry
                     onChangeText={(text) => {
                        setSenha(text);
                     }}
                  />

                  <Pressable onPress={() => navigation.navigate('AuthRecovery')}>
                     {({ pressed }) => (
                        <Text style={[styles.recovery, pressed && { color: '#0077b6' }]}>Esqueceu a senha?</Text>
                     )}
                  </Pressable>

                  <Pressable onPress={() => navigation.navigate('AuthCadastro')}>
                     {({ pressed }) => (
                        <Text style={[styles.register, pressed && { color: '#0077b6' }]}>Não tenho conta</Text>
                     )}
                  </Pressable>

                  <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                     <Text>Login</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}
