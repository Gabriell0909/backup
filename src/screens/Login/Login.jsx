import {
   View,
   Text,
   Pressable,
   TouchableOpacity,
   KeyboardAvoidingView,
   ScrollView,
   Platform,
   StatusBar,
   TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SemiCirculo from '../../components/semicirculo';
import Icons from '../../constants/icons';
import { styles } from './Login.style';

import { FazerLogin } from '../../Auth/AuthLogin';
import { useState } from 'react';
import InputAuth from '../../components/InputAuth/inputsAuth';

export default function Login({ navigation }) {
   const [hidden, setHidden] = useState(true);

   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');

   const handleLogin = async () => {
      try {
         await FazerLogin(email, senha);
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
                  <InputAuth
                     placeholder="Exemplo123@gmail.com"
                     maxLength={40}
                     keyboardType="email-address"
                     onChangeText={(text) => {
                        setEmail(text);
                     }}
                  >
                     <Ionicons name="mail-outline" size={24} color={'#000'} />
                  </InputAuth>

                  <InputAuth
                     placeholder="Digite sua senha"
                     maxLength={40}
                     secureTextEntry={hidden}
                     value={senha}
                     onChangeText={(text) => {
                        setSenha(text);
                     }}
                     rightIcon={
                        <Ionicons
                           name={hidden ? 'eye-off-outline' : 'eye-outline'}
                           size={24}
                           color="#000"
                           onPress={() => {
                              setHidden(!hidden);
                           }}
                        />
                     }
                  >
                     <Ionicons name="lock-closed-outline" size={24} color={'#000'} />
                  </InputAuth>

                  <Pressable onPress={() => navigation.navigate('AuthRecovery')}>
                     {({ pressed }) => (
                        <Text style={[styles.recovery, pressed && { color: '#0077b6' }]}>
                           Esqueceu a senha?
                        </Text>
                     )}
                  </Pressable>

                  <Pressable onPress={() => navigation.navigate('AuthCadastro')}>
                     {({ pressed }) => (
                        <Text style={[styles.register, pressed && { color: '#0077b6' }]}>
                           Não tenho conta
                        </Text>
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
