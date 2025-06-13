import { useCallback, useRef, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ImageBackground, Image, StatusBar, FlatList, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import DropDownPicker from 'react-native-dropdown-picker';
import CurrencyInput from 'react-native-currency-input';

import { styles } from './Home.style';
import Card from './components/wallet/card.jsx';
import Input from '../../components/inputs';
import Divider from '../../components/divider';
import ButtonS from '../../components/customButton';
import BottomSheetCustomHome from './components/bottomSheetHome.jsx';
import Icons from '../../constants/icons';

import Wallet from './components/wallet/wallet.js';
import WalletDetail from './components/wallet/walletDetail.js';

import { buscarTiposDeConta } from '../../services/tipoContaService';
import { ContaItem } from './components/listaSaldo/ContaItem.jsx';
import { cadastrarConta } from '../../services/cadastroDeContas';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import CustomAlert from '../../components/modal.jsx';

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

   const [contas, setContas] = useState([]);
   const [alertVisible, setAlertVisible] = useState(false);

   const buscarContas = async () => {
      try {
         const querySnapshot = await getDocs(collection(db, 'conta'));
         const contasFormatadas = querySnapshot.docs.map((doc) => ({
            key: doc.id,
            ...doc.data(),
         }));

         contasFormatadas.sort((a, b) => a.timestamp - b.timestamp);

         setContas(contasFormatadas);
      } catch (error) {
         console.error('Erro ao buscar contas:', error);

         Alert.alert('Erro', 'Não foi possível carregar as contas');
      }
   };

   useEffect(() => {
      buscarContas();
   }, []);

   const handleCadastrarConta = async () => {
      if (!nomeConta || !valorConta || !value) {
         setAlertVisible(true);
         return;
      }

      try {
         const dadosDaConta = {
            nome: nomeConta,
            valor: Number(valorConta),
            icone: null,
            tipo: value,
            timestamp: new Date().getTime(),
         };

         const id = await cadastrarConta(dadosDaConta);

         if (id) {
            Alert.alert('Sucesso', 'Conta cadastrada com sucesso!');
            setNomeConta('');
            setValorConta('');
            setValue(null);
            sheetRef.current?.close();
            buscarContas();
         }
      } catch (error) {
         console.error('Erro ao cadastrar conta:', error);
         setAlertVisible(true);
      }
   };

   const currencyFormatter = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
   });

   const [saldoTotal, setSaldoTotal] = useState(0);
   useEffect(() => {
      if (contas.length === 0) {
         return setSaldoTotal(0);
      }

      const total = contas.reduce((soma, conta) => soma + conta.valor, 0);
      setSaldoTotal(total);
   }, [contas]);

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

               <View style={styles.containerContent}>
                  <Wallet>
                     <WalletDetail />
                  </Wallet>
                  <Card>
                     <View style={styles.sectionBalance}>
                        <Text style={styles.textWallet}>Saldo geral</Text>
                        <Text style={styles.textWallet}>{currencyFormatter.format(saldoTotal)}</Text>
                        <Divider />
                        <Text style={styles.textWallet}>Minhas Contas</Text>
                     </View>
                     <FlatList
                        data={contas}
                        horizontal={true}
                        pagingEnabled
                        itemSeparatorComponent={() => <View style={{width:8}} />}
                        renderItem={({ item }) => {
                           const tipoConta = items.find((tipo) => tipo.value === item.tipo);

                           return (
                              <ContaItem
                                 nome={item.nome}
                                 tipo={tipoConta ? tipoConta.label : item.tipo}
                                 valor={currencyFormatter.format(item.valor)}
                                 onPress={() => alert(item.nome)}
                              />
                           );
                        }}
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
            </View>

            <BottomSheetCustomHome sheetRef={sheetRef}>
               <CustomAlert
                  visible={alertVisible}
                  onClose={() => setAlertVisible(false)}
                  message="Preencha todos os campos"
               />

               <Input placeholder="Nome" value={nomeConta} onChangeText={setNomeConta} />

               <CurrencyInput
                  style={styles.currencyInput}
                  placeholder="R$ 0,00"
                  value={valorConta}
                  onChangeValue={setValorConta}
                  keyboardType="numeric"
                  prefix="R$"
                  delimiter="."
                  separator=","
                  precision={2}
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

               <ButtonS onPress={handleCadastrarConta}>
                  <Text> Salvar </Text>
               </ButtonS>
            </BottomSheetCustomHome>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
