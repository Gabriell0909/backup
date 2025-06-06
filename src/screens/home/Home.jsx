import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ImageBackground, Image, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './Home.style';
import Card from '../../components/card';
import CardAction from './components/cardAction.jsx';
import Input from '../../components/inputs';
import Divider from '../../components/divider';
import ButtonS from '../../components/customButton';
import BottomSheetCustom from '../../components/bottomSheet';
import Icons from '../../constants/icons';
import Wallet from './components/wallet';
import WalletDetail from './components/walletDetail';

export default function Home({ navigation }) {
   useFocusEffect(
      useCallback(() => {
         StatusBar.setBarStyle('dark-content');
         return () => StatusBar.setBarStyle('light-content');
      }, []),
   );

   const imagemPerfil = '';
   const [PerfilImage, setperfilImage] = useState({ uri: imagemPerfil });

   const imagemCapa = '';

   const [backgroundImage, setBackgroundImage] = useState({ uri: imagemCapa });

   const imagemValida = backgroundImage?.uri?.length > 0;

   const sheetRef = useRef(null);
   const bannerDefault = require('../../assets/img/banner.png');

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
                  <ImageBackground source={bannerDefault} style={styles.cardImage} resizeMode="cover">
                     <Image
                        source={imagemPerfil ? { uri: imagemPerfil } : Icons.DefaultAvatar}
                        style={styles.circle}
                     />
                  </ImageBackground>
               )}

               <View style={styles.wallet}>
                     <Wallet>
                        <WalletDetail />
                     </Wallet>
                  <Card>
                     <View style={styles.sectionBalance}>
                        <Text style={styles.text}>Saldo geral</Text>
                        <Text style={styles.text}>R$ 0,00</Text>
                        <Divider />
                        <Text style={styles.text}>Minhas Contas</Text>
                     </View>

                     <View style={styles.sectionButton}>
                        <ButtonS
                           style={styles.button}
                           activeOpacity={0.8}
                           onPress={() => {
                              sheetRef.current?.snapToIndex(1);
                           }}
                        >
                           <Text> ADICIONAR</Text>
                        </ButtonS>
                     </View>
                  </Card>
               </View>

               <CardAction>
                  <View style={styles.containerActions}>
                     <View style={styles.cardOptions}>
                        <ButtonS
                           style={styles.cardActionButton}
                           onPress={() => {
                              navigation.navigate('DevedoresScreen');
                           }}
                        >
                           <Ionicons name="person-circle-sharp" size={42} />
                        </ButtonS>

                        <Text style={styles.text}>Devedores</Text>
                     </View>

                     <View style={styles.cardOptions}>
                        <ButtonS
                           style={styles.cardActionButton}
                           onPress={() => {
                              navigation.navigate('CategoriasScreen');
                           }}
                        >
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
               </CardAction>
            </View>

            <BottomSheetCustom sheetRef={sheetRef}>
               <Input placeholder="Nome" />
               <Input placeholder="R$ 0,00" />
               <ButtonS>
                  <Text> Salvar </Text>
               </ButtonS>
            </BottomSheetCustom>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
