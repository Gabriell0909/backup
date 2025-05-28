import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Perfil.style';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import Card from '../../components/card';
import icons from '../../constants/icons';
import Divider from '../../components/divider';
import { Deslogar } from '../../Auth/AuthLogout';

export default function Perfil({ navigation }) {
   useFocusEffect(
      useCallback(() => {
         StatusBar.setBarStyle('dark-content');
         return () => StatusBar.setBarStyle('light-content');
      }, []),
   );

   const handleLogoutSucess = () => {
      Deslogar();
   };

   const imgPerfil = '';
   const [imagem, setImagem] = useState({ uri: imgPerfil });

   return (
      <SafeAreaView style={styles.SafeArea}>
         <StatusBar translucent backgroundColor="transparent" />
         <View style={styles.container}>
            <View style={styles.linear1}>
               <Text style={styles.titulo}> Sua Conta</Text>

               <TouchableOpacity onPress={handleLogoutSucess}>
                  <Ionicons name="exit-outline" size={32} />
               </TouchableOpacity>
            </View>

            <View style={styles.containerUser}>
               <Image style={styles.circle} source={imgPerfil ? { uri: imgPerfil } : icons.DefaultAvatar} />

               <Text>Gabs</Text>
               <Text>Gabs@gmail.com</Text>

               <Divider style={styles.divider} />
            </View>
         </View>
      </SafeAreaView>
   );
}
