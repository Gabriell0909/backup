import { useCallback, useRef, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
   View,
   Text,
   ImageBackground,
   Image,
   StatusBar,
   FlatList,
   TouchableOpacity,
   Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

import { styles } from './Home.style';
import Card from '../../components/card';
import CardAction from './components/cardAction.jsx';
import Input from '../../components/inputs';
import Divider from '../../components/divider';
import ButtonS from '../../components/customButton';
import BottomSheetCustomHome from './components/bottomSheetHome.jsx';
import Icons from '../../constants/icons';
import Wallet from './components/wallet';
import WalletDetail from './components/walletDetail';

import { buscarTiposDeConta } from '../../services/tipoContaService';
import { ContaItem } from './components/listaSaldo/ContaItem.jsx';

export default function Home({ navigation }) {
   useFocusEffect(
      useCallback(() => {
         StatusBar.setBarStyle('dark-content');
         return () => StatusBar.setBarStyle('light-content');
      }, []),
   );

   useEffect(() => {
      const carregarTiposDeConta = async () => {
         try {
            const dadosFormatados = await buscarTiposDeConta();
            setItems(dadosFormatados);
         } catch (error) {
            console.error('Erro ao carregar tipos de conta:', error);
         }
      };

      carregarTiposDeConta();
   }, []);

   const imagemPerfil = '';
   const [PerfilImage, setperfilImage] = useState({ uri: imagemPerfil });

   const imagemCapa = '';

   const [backgroundImage, setBackgroundImage] = useState({ uri: imagemCapa });

   const imagemValida = backgroundImage?.uri?.length > 0;

   const sheetRef = useRef(null);
   const bannerDefault = require('../../assets/img/banner.png');

   const [open, setOpen] = useState(false);
   const [value, setValue] = useState(null);
   const [items, setItems] = useState([]);

   const [nomeConta, setNomeConta] = useState('');
   const [valorConta, setValorConta] = useState('');

   const [conta, setConta] = useState([
      { key: '1', nome: 'Inter', tipo: 'corrente', valor: 'R$ 1.000' },
      { key: '2', nome: 'Itau', tipo: 'corrente', valor: 'R$ 5.000' },
      { key: '3', nome: 'Nubank', tipo: 'corrente', valor: 'R$ 500' },
   ]);

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

                     <FlatList
                        data={conta}
                        horizontal={true}
                        pagingEnabled
                        renderItem={({ item }) => (
                           <ContaItem
                              nome={item.nome}
                              tipo={item.tipo}
                              valor={item.valor}
                              onPress={() => alert(item.nome)}
                           />
                        )}
                     />

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

            <BottomSheetCustomHome sheetRef={sheetRef}>
               <Input placeholder="Nome" value={nomeConta} onChangeText={setNomeConta} />
               <Input
                  placeholder="R$ 0,00"
                  value={valorConta}
                  onChangeText={setValorConta}
                  keyboardType="numeric"
               />

               <View style={styles.viewIcon}>
                  <Text>Ícone</Text>
                  <ButtonS style={styles.selectIcon}>
                     <Ionicons name="shapes-outline" size={32} />
                  </ButtonS>
               </View>

               <View>
                  <Text>Tipo de conta</Text>
                  <DropDownPicker
                     open={open}
                     value={value}
                     items={items}
                     setOpen={setOpen}
                     setValue={setValue}
                     setItems={setItems}
                     placeholder="Escolha uma opção"
                     style={styles.dropdown}
                     dropDownContainerStyle={styles.dropdownBox}
                     placeholderStyle={styles.placeholder}
                  />
               </View>

               <ButtonS>
                  <Text> Salvar </Text>
               </ButtonS>
            </BottomSheetCustomHome>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
