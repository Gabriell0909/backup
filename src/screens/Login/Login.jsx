import {
   View,
   Text,
   Pressable,
   TouchableOpacity,
   KeyboardAvoidingView,
   ScrollView,
   Platform,
   StatusBar,
   Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { styles } from './Login.style';
import { FazerLogin } from '../../Auth/AuthLogin';
import SemiCirculo from '../../components/semicirculo';
import Icons from '../../constants/icons';
import InputAuth from '../../components/InputAuth/inputsAuth';
import { validarEmail, validarSenha } from '../../Utils/AuthRules/login/loginRules';
import { errorMessages } from '../../Utils/AuthRules/ErrosMenssages';
import CustomAlert from '../../components/modal';

export default function Login({ navigation }) {
   const [hidden, setHidden] = useState(true);

   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');

   const [erroEmail, setErroEmail] = useState(false);
   const [erroSenha, setErroSenha] = useState(false);

   const [alertVisible, setAlertVisible] = useState(false);
   const [alertMessage, setAlertMessage] = useState('');

   const onBlurEmail = () => {
      const erroEmail = validarEmail(email);
      setErroEmail(!!erroEmail);
   };
   const onBlurSenha = () => {
      const erroSenha = validarSenha(senha);
      setErroSenha(!!erroSenha);
   };

   const handleLogin = async () => {
      const erroSenha = validarSenha(senha);
      const erroEmail = validarEmail(email);

      setErroSenha(!!erroSenha);
      setErroEmail(!!erroEmail);

      if (erroEmail || erroSenha) {
         setAlertMessage(erroEmail || erroSenha);
         setAlertVisible(true);
         return;
      }

      try {
         await FazerLogin(email, senha);
      } catch (error) {
         console.error('[handleLogin] Erro no login:', error);
         if (
            error.code === 'auth/invalid-credential' ||
            error.code === 'auth/wrong-password' ||
            error.code === 'auth/user-not-found'
         ) {
            setAlertMessage(errorMessages.invalidCredential);
         } else {
            setAlertMessage(error.message || 'erro ao fazer login');
         }
         if (error.code === 'auth/too-many-requests') {
            setAlertMessage(errorMessages.tooManyRequests);
         }
         if (error.code === 'auth/email-already-in-use') {
            setAlertMessage(errorMessages.emailAlreadyInUse);
         }
         setAlertVisible(true);
      }
   };

   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
         <StatusBar translucent backgroundColor="transparent" />
         <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
            <View style={{ flex: 1, alignItems: 'center' }}>
               <SemiCirculo />
               <Icons.SecureLoginAmico width={360} height={360} />
               <Text style={styles.titulo}>Login</Text>

               <CustomAlert
                  visible={alertVisible}
                  message={alertMessage}
                  onClose={() => setAlertVisible(false)}
               />
               <View style={styles.container}>
                  <InputAuth
                     erro={erroEmail}
                     placeholder={erroEmail ? validarEmail(email) : 'Exemplo123@gmail.com'}
                     maxLength={40}
                     keyboardType="email-address"
                     onChangeText={(text) => {
                        setEmail(text);
                        setErroEmail(false);
                     }}
                     onBlur={onBlurEmail}
                     editable={true}
                     pointerEvents="auto"
                     value={email}
                  >
                     <Ionicons name="mail-outline" size={24} color={'#000'} />
                  </InputAuth>

                  <InputAuth
                     placeholder={erroSenha ? validarSenha(senha) : 'Digite sua senha'}
                     erro={erroSenha}
                     maxLength={40}
                     secureTextEntry={hidden}
                     value={senha}
                     onChangeText={(text) => {
                        setSenha(text);
                        setErroSenha(false);
                     }}
                     onBlur={onBlurSenha}
                     editable={true}
                     pointerEvents="auto"
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
