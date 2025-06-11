import {
   View,
   Text,
   TouchableOpacity,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   StatusBar,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'; // Passo 1: Importar useEffect
import SemiCirculo from '../../components/semicirculo';
import { styles } from './Cadastro.style.js';
import InputAuth from '../../components/InputAuth/inputsAuth.jsx';
import Icons from '../../constants/icons';

import { validarEmail, validarSenha, validarSenhaConfirmada } from '../../Utils/AuthRules/cadastro/Rules.js';
import { CadastrarUsuario } from '../../Auth/AuthCadastro.js';
import CustomAlert from '../../components/modal.jsx';
import { errorMessages } from '../../Utils/AuthRules/ErrosMenssages'; // Importando as mensagens de erro
import { ErrorBoundary } from '../../components/ErrorBoundary.jsx';

export default function Cadastro({ navigation }) {
   // Adicionei { navigation } caso precise dele no futuro
   const [hidden, setHidden] = useState(true);
   const [hiddenConfirmation, setHiddenConfirmation] = useState(true);

   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');
   const [senhaConfirmada, setSenhaConfirmada] = useState('');

   const [erroEmail, setErroEmail] = useState(false);
   const [erroSenha, setErroSenha] = useState(false);
   const [erroSenhaConfirmada, seterroSenhaConfirmada] = useState(false);

   const [alertMessage, setAlertMessage] = useState('');
   const [alertVisible, setAlertVisible] = useState(false);

   const onBlurEmail = () => {
      const erroMsg = validarEmail(email);
      setErroEmail(!!erroMsg);
   };
   const onBlurSenha = () => {
      const erroMsg = validarSenha(senha);
      setErroSenha(!!erroMsg);
   };
   const onBlurSenhaConfirmada = () => {
      const erroMsg = validarSenhaConfirmada(senha, senhaConfirmada);
      seterroSenhaConfirmada(!!erroMsg);
   };

   const HandleCadastro = async () => {
      const emailErro = validarEmail(email);
      const senhaErro = validarSenha(senha);
      const senhaConfirmadaErro = validarSenhaConfirmada(senha, senhaConfirmada);

      setErroEmail(!!emailErro);
      setErroSenha(!!senhaErro);
      seterroSenhaConfirmada(!!senhaConfirmadaErro);

      if (emailErro || senhaErro || senhaConfirmadaErro) {
         setAlertVisible(true);
         setAlertMessage(emailErro || senhaErro || senhaConfirmadaErro);
         return;
      }

      try {
         await CadastrarUsuario(email, senha);
         setAlertMessage('Cadastro realizado com sucesso!');
         setAlertVisible(true);
      } catch (error) {
         console.log('Erro ao cadastrar', error);
         if (error.code === 'auth/email-already-in-use') {
            setAlertMessage(errorMessages.emailAlreadyInUse || 'E-mail já cadastrado.');
         } else if (error.code === 'auth/invalid-email') {
            setAlertMessage(errorMessages.invalidEmail || 'E-mail inválido.');
         } else if (error.code === 'auth/weak-password') {
            setAlertMessage(errorMessages.weakPassword || 'Senha fraca.');
         } else {
            setAlertMessage(error.message || 'Erro ao cadastrar usuário.');
         }
         setAlertVisible(true);
      }
   };

   return (
      <ErrorBoundary>
         <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
         >
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
               <View style={styles.container}>
                  <SemiCirculo />
                  <Icons.SecureLogin width={350} height={350} />

                  <Text style={styles.titulo}>Cadastro</Text>
                  <CustomAlert
                     visible={alertVisible}
                     onClose={() => setAlertVisible(false)}
                     message={alertMessage}
                  />
                  <View style={styles.group}>
                     <InputAuth
                        placeholder='Exemplo1324@gmail.com'
                        maxLength={40}
                        onChangeText={(text) => {
                           setEmail(text);
                           setErroEmail(false);
                        }}
                        onBlur={onBlurEmail}
                        value={email}
                        erro={erroEmail}
                        editable={true}
                        pointerEvents="auto"
                     >
                        <Ionicons name="mail-outline" size={24} />
                     </InputAuth>

                     <InputAuth
                        placeholder='digite sua senha'
                        maxLength={8}
                        secureTextEntry={hidden}
                        onChangeText={(text) => {
                           setSenha(text);
                           setErroSenha(false);
                        }}
                        value={senha}
                        onBlur={onBlurSenha}
                        editable={true}
                        pointerEvents="auto"
                        rightIcon={
                           <Ionicons
                              name={hidden ? 'eye-off-outline' : 'eye-outline'}
                              size={24}
                              color={'#000'}
                              onPress={() => {
                                 setHidden(!hidden);
                              }}
                           />
                        }
                        erro={erroSenha}
                     >
                        <Ionicons name="lock-closed-outline" size={24} color={'#000'} />
                     </InputAuth>

                     <InputAuth
                        placeholder='Repita sua senha'
                        maxLength={8}
                        secureTextEntry={hiddenConfirmation}
                        onChangeText={(text) => {
                           setSenhaConfirmada(text);
                           seterroSenhaConfirmada(false);
                        }}
                        value={senhaConfirmada}
                        onBlur={onBlurSenhaConfirmada}
                        editable={true}
                        pointerEvents="auto"
                        rightIcon={
                           <Ionicons
                              name={hiddenConfirmation ? 'eye-off-outline' : 'eye-outline'}
                              size={24}
                              onPress={() => {
                                 setHiddenConfirmation(!hiddenConfirmation);
                              }}
                           />
                        }
                        erro={erroSenhaConfirmada}
                     >
                        <Ionicons name="lock-closed-outline" size={24} />
                     </InputAuth>

                     <TouchableOpacity style={styles.button} onPress={HandleCadastro}>
                        <Text>Cadastrar</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </ScrollView>
         </KeyboardAvoidingView>
      </ErrorBoundary>
   );
}
