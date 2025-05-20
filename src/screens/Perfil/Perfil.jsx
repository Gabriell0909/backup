import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Perfil.style';
import { View, Text, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import Card from '../../components/card'

export default function Perfil() {
   useFocusEffect(
      useCallback(() => {
         StatusBar.setBarStyle('dark-content');
         return () => StatusBar.setBarStyle('light-content');
      }, []),
   );
   return (
      <SafeAreaView style={styles.SafeArea}>
         <View style={styles.container}>
            <View style={styles.linear1}>
               <Text style={styles.titulo}> Sua Conta</Text>
               <Ionicons name="exit-outline" size={32} />
            </View>

            <View>
               <Card>
                  
               </Card>
            </View>
         </View>
      </SafeAreaView>
   );
}
