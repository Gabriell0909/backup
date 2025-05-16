import React, { useCallback, useState } from 'react';
import { View, Text, ImageBackground, Image, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Home.style';
import Card from '../../components/card';
import Divider from '../../components/divider';
import ButtonS from '../../components/customButton';
import Icons from '../../constants/icons';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function Home({ navigation }) {
   useFocusEffect(
      useCallback(() => {
         StatusBar.setBarStyle('dark-content');
         return () => StatusBar.setBarStyle('light-content');
      }, []),
   );

   const imagemPerfil = '';
   const [PerfilImage, setperfilImage] = useState({ uri: imagemPerfil });

   const imagemCapa = 'https://cdn-1.motorsport.com/images/amp/YKEZbVX0/s1000/ferrari-499p-1.jpg';
   const [backgroundImage, setBackgroundImage] = useState({ uri: imagemCapa });
   const imagemValida = backgroundImage?.uri?.length > 0;

   return (
      <SafeAreaProvider>
         <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
               {imagemValida ? (
                  <ImageBackground
                     source={{ uri: backgroundImage.uri }}
                     style={styles.cardImage}
                     resizeMode="cover"
                  >
                     <Image
                        source={imagemPerfil ? { uri: imagemPerfil } : Icons.DefaultAvatar}
                        style={styles.circle}
                     />
                  </ImageBackground>
               ) : (
                  <View style={styles.CardNoImage}>
                     <View style={styles.circle}></View>
                  </View>
               )}

               <Card>
                  <View style={styles.sectionBalance}>
                     <Text style={styles.text}>Saldo geral</Text>
                     <Text style={styles.text}>R$ 0,00</Text>
                     <Divider />
                     <Text style={styles.text}>Minhas Contas</Text>
                  </View>

                  <View style={styles.sectionButton}>
                     <ButtonS style={styles.button} activeOpacity={0.8}>
                        <Text> ADICIONAR</Text>
                     </ButtonS>
                  </View>
               </Card>

               <Card>
                  <View style = {styles.containerActions}>

                     <View style={styles.cardOptions}>
                        <ButtonS style={styles.cardActionButton}>
                           <Ionicons name="person-circle-sharp" size={42} />
                        </ButtonS>
                        <Text style={styles.text}>Devedores</Text>
                     </View>

                     <View style={styles.cardOptions}>
                        <ButtonS style={styles.cardActionButton}>
                           <Ionicons name="layers-outline" size={42} />
                        </ButtonS>
                        <Text style={styles.text}>Categorias</Text>
                     </View>

                     <View style={styles.cardOptions}>
                        <ButtonS style={styles.cardActionButton}>
                           <Ionicons name="pie-chart-outline" size={42} />
                        </ButtonS>
                        <Text style={styles.text}>Gráfico</Text>
                     </View>
                  </View>
               </Card>
            </View>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
