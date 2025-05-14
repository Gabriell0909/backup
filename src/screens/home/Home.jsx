import React, { useState } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Home.style';
import Card from '../../components/card';
import Divider from '../../components/divider';
import ButtonS from '../../components/customButton';
import Icons from '../../constants/icons';

export default function Home({ navigation }) {
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
                  <ImageBackground source={{ uri: backgroundImage.uri }} style={styles.cardImage} resizeMode="cover">
                     <Image source={imagemPerfil ? { uri: imagemPerfil } : Icons.DefaultAvatar} style={styles.circle} />
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
                  <View style={styles.cardOptions}>
                     <ButtonS style={styles.cardActionButton} Icon={Icons.FaceIcon} />
                     <ButtonS style={styles.cardActionButton} Icon={Icons.Category} />
                     <ButtonS style={styles.cardActionButton} Icon={Icons.ChartIcon} />
                  </View>
               </Card>

              
            </View>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
