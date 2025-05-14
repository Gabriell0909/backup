import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';

import React, { useState } from 'react';
import SemiCirculo from '../../components/semicirculo';
import { styles } from './Cadastro.style.js';
import Input from '../../components/inputs.jsx';
import Icons from '../../constants/icons';

import { validarEmail, validarSenha, validarSenhaConfirmada } from '../../Utils/Rules';
import { CadastrarUsuario } from '../../Auth/AuthCadastro.js';

export default function Cadastro({ navigation }) {
   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');
   const [senhaConfirmada, setSenhaConfirmada] = useState('');

   const [erroEmail, setErroEmail] = useState(false);
   const [erroSenha, setErroSenha] = useState(false);
   const [erroSenhaConfirmada, seterroSenhaConfirmada] = useState(false);

   const HandleCadastro = async () => {
      const emailErro = validarEmail(email);
      const senhaErro = validarSenha(senha);
      const senhaConfirmadaErro = validarSenhaConfirmada(senha, senhaConfirmada);

      setErroEmail(emailErro);
      setErroSenha(senhaErro);
      seterroSenhaConfirmada(senhaConfirmadaErro);

      if (emailErro || senhaErro || senhaConfirmadaErro) {
         return;
      }

      try {
         await CadastrarUsuario(email, senha);
         navigation.navigate('HomeStack');
      } catch (error) {
         console.log('Erro ao cadastrar', error);
         Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
      }
   };

   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
         <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
               <SemiCirculo />
               <Icons.SecureLogin width={350} height={350} />

               <Text style={styles.titulo}>Cadastro</Text>

               <View style={styles.group}>
                  <Input
                     placeholder="Exemplo123@gmail.com"
                     maxLength={40}
                     onChangeText={(text) => {
                        setEmail(text);
                        setErroEmail('');
                     }}
                     erro={!!erroEmail}
                  />
                  {erroEmail ? <Text style={styles.errorText}>{erroEmail}</Text> : null}

                  <Input
                     placeholder="Digite sua senha"
                     maxLength={8}
                     secureTextEntry
                     onChangeText={(text) => {
                        setSenha(text);
                        setErroSenha('');
                     }}
                     erro={!!erroSenha}
                  />
                  {erroSenha ? <Text style={styles.errorText}>{erroSenha}</Text> : null}

                  <Input
                     placeholder="Repita sua senha"
                     maxLength={8}
                     secureTextEntry
                     onChangeText={(text) => {
                        setSenhaConfirmada(text);
                        seterroSenhaConfirmada('');
                     }}
                     erro={!!erroSenhaConfirmada}
                  />
                  {erroSenhaConfirmada ? <Text style={styles.errorText}>{erroSenhaConfirmada}</Text> : null}

                  <TouchableOpacity style={styles.button} onPress={HandleCadastro}>
                     <Text>Cadastrar</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}
