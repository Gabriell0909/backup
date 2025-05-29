import {
   View,
   Text,
   TouchableOpacity,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   Alert,
   StatusBar,
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import SemiCirculo from '../../components/semicirculo';
import { styles } from './Cadastro.style.js';
import InputAuth from '../../components/InputAuth/inputsAuth.jsx';
import Icons from '../../constants/icons';

import { validarEmail, validarSenha, validarSenhaConfirmada } from '../../Utils/Rules';
import { CadastrarUsuario } from '../../Auth/AuthCadastro.js';

export default function Cadastro({ navigation }) {
   const [hidden, setHidden] = useState(true);
   const [hiddenConfirmation, setHiddenConfirmation] = useState(true);

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
         <StatusBar translucent backgroundColor="transparent" />
         <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
               <SemiCirculo />
               <Icons.SecureLogin width={350} height={350} />

               <Text style={styles.titulo}>Cadastro</Text>

               <View style={styles.group}>
             
                  <InputAuth
                     placeholder="Exemplo123@gmail.com"
                     maxLength={40}
                     onChangeText={(text) => {
                        setEmail(text);
                        setErroEmail('');
                     }}
                     value={email}
                     erro={!!erroEmail}
                  >
                     <Ionicons name="mail-outline" size={24} />
                  </InputAuth>

                  {erroEmail ? <Text style={styles.errorText}>{erroEmail}</Text> : null}

                  <InputAuth
                     placeholder="Digite sua senha"
                     maxLength={8}
                     secureTextEntry={hidden}
                     onChangeText={(text) => {
                        setSenha(text);
                        setErroSenha('');
                     }}
                     value={senha}
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
                     erro={!!erroSenha}
                  >
                     <Ionicons name="lock-closed-outline" size={24} color={'#000'} />
                  </InputAuth>

                  {erroSenha ? <Text style={styles.errorText}>{erroSenha}</Text> : null}

                  <InputAuth
                     placeholder="Repita sua senha"
                     maxLength={8}
                     secureTextEntry={hiddenConfirmation}
                     onChangeText={(text) => {
                        setSenhaConfirmada(text);
                        seterroSenhaConfirmada('');
                     }}
                     value={senhaConfirmada}
                     rightIcon={
                        <Ionicons
                           name={hiddenConfirmation ? 'eye-off-outline' : 'eye-outline'}
                           size={24}
                           onPress={() => {
                              setHiddenConfirmation(!hiddenConfirmation);
                           }}
                        />
                     }
                     erro={!!erroSenhaConfirmada}
                  >
                     <Ionicons name="lock-closed-outline" size={24} />
                  </InputAuth>

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
