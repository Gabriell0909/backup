import { useCallback, useRef, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ImageBackground, Image, StatusBar, FlatList, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

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
import { editarConta } from '../../services/editarConta';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import CustomAlert from '../../components/modal.jsx';
import CustomModal from './components/modal/modalCustom.jsx';
import ModalDesable from './components/modal/modalDesable.jsx';
import { useContas } from '../../Hooks/useContas';

export default function Home({ navigation }) {
   const { contas, carregarContas, calcularSaldoTotal } = useContas();

   useFocusEffect(
      useCallback(() => {
         StatusBar.setBarStyle('dark-content');
         // Recarregar contas quando a tela receber foco
         carregarContas();
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

   const [alertVisible, setAlertVisible] = useState(false);
   const [modalDesableVisible, setModalDesableVisible] = useState(false);

   // Estados para edição
   const [isEditing, setIsEditing] = useState(false);
   const [contaEmEdicao, setContaEmEdicao] = useState(null);
   const [nomeContaEdit, setNomeContaEdit] = useState('');
   const [valorContaEdit, setValorContaEdit] = useState('');
   const [tipoContaEdit, setTipoContaEdit] = useState(null);

   const sheetRef = useRef(null);
   const sheetEditRef = useRef(null);
   const bannerDefault = require('../../assets/img/banner.png');

   const [open, setOpen] = useState(false);
   const [value, setValue] = useState(null);
   const [items, setItems] = useState([]);

   // Estados para dropdown de edição
   const [openEdit, setOpenEdit] = useState(false);

   const [nomeConta, setNomeConta] = useState('');
   const [valorConta, setValorConta] = useState('');

   const [modalVisible, setModalVisible] = useState(false);
   const [selectedItem, setSelectedItem] = useState(null);

   const [contaParaDesativar, setContaParaDesativar] = useState(null);

   const abrirEdicao = (conta) => {
      setContaEmEdicao(conta);
      setNomeContaEdit(conta.nome);
      setValorContaEdit(conta.valor.toString());
      setTipoContaEdit(conta.tipo);
      setIsEditing(true);
      setModalVisible(false);
      setSelectedItem(null);
      sheetEditRef.current?.snapToIndex(0);
   };

   const handleSalvarEdicao = async () => {
      if (!nomeContaEdit || !valorContaEdit || !tipoContaEdit) {
         setAlertVisible(true);
         return;
      }

      try {
         const dadosAtualizados = {
            nome: nomeContaEdit,
            valor: Number(valorContaEdit),
            tipo: tipoContaEdit,
         };

         await editarConta(contaEmEdicao.key, dadosAtualizados);

         Alert.alert('Sucesso', 'Conta editada com sucesso!');
         setNomeContaEdit('');
         setValorContaEdit('');
         setTipoContaEdit(null);
         setIsEditing(false);
         setContaEmEdicao(null);
         sheetEditRef.current?.close();
         carregarContas();
      } catch (error) {
         console.error('Erro ao editar conta:', error);
         setAlertVisible(true);
      }
   };

   // Função para cancelar edição
   const cancelarEdicao = () => {
      setNomeContaEdit('');
      setValorContaEdit('');
      setTipoContaEdit(null);
      setIsEditing(false);
      setContaEmEdicao(null);
      sheetEditRef.current?.close();
   };

   // Função para desativar conta
   const handleDesativarConta = async () => {
      if (!contaParaDesativar) return;
      try {
         await editarConta(contaParaDesativar.key, { ativa: false });
         setModalDesableVisible(false);
         setContaParaDesativar(null);
         carregarContas();
         Alert.alert('Sucesso', 'Conta desativada com sucesso!');
      } catch (error) {
         Alert.alert('Erro', 'Não foi possível desativar a conta.');
      }
   };

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
            carregarContas();
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

   // Função personalizada para formatar saldo
   const formatarSaldo = (valor) => {
      const numero = Number(valor);
      if (Math.abs(numero) < 0.005) {
         return 'R$ 0,00';
      }
      return currencyFormatter.format(numero);
   };

   const saldoTotal = calcularSaldoTotal();

   const imagemPerfil = '';
   const [PerfilImage, setperfilImage] = useState({ uri: imagemPerfil });

   const imagemCapa = '';

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
                  <ImageBackground source={bannerDefault} style={styles.cardImage} resizeMode="cover">
                     <Image
                        source={imagemPerfil ? { uri: imagemPerfil } : Icons.IconeAvatar}
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
                        <Text style={styles.textWallet}>{formatarSaldo(saldoTotal)}</Text>
                        <Divider />
                        <Text style={styles.textWallet}>Minhas Contas</Text>
                     </View>
                     <FlatList
                        data={contas}
                        horizontal={true}
                        pagingEnabled
                        refreshing={true}
                        itemSeparatorComponent={() => <View style={{ width: 8 }} />}
                        renderItem={({ item }) => {
                           const tipoConta = items.find((tipo) => tipo.value === item.tipo);

                           return (
                              <ContaItem
                                 nome={item.nome}
                                 tipo={tipoConta ? tipoConta.label : item.tipo}
                                 valor={formatarSaldo(item.valor)}
                                 onLongPress={() => {
                                    setSelectedItem(item);
                                    setModalVisible(true);
                                 }}
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
                        <FontAwesome name="user-secret" size={42} />
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
                     <ButtonS
                        style={styles.cardActionButton}
                        onPress={() => {
                           navigation.navigate('GraficosScreen');
                        }}
                     >
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

               <CustomModal
                  visible={modalVisible}
                  onClose={() => {
                     setModalVisible(false);
                     setSelectedItem(null);
                  }}
                  item={selectedItem}
                  onDelete={async () => {
                     setContaParaDesativar(selectedItem);
                     setModalDesableVisible(true);
                     setSelectedItem(null);
                  }}
                  onEdit={() => {
                     abrirEdicao(selectedItem);
                  }}
               />

               <ModalDesable
                  visible={modalDesableVisible}
                  onClose={() => {
                     setModalDesableVisible(false);
                     setContaParaDesativar(null);
                  }}
                  onDelete={handleDesativarConta}
                  onEdit={() => {
                     setModalDesableVisible(false);
                     setContaParaDesativar(null);
                  }}
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

            {/* Bottom Sheet de Edição */}
            <BottomSheetCustomHome sheetRef={sheetEditRef}>
               <CustomAlert
                  visible={alertVisible}
                  onClose={() => setAlertVisible(false)}
                  message="Preencha todos os campos"
               />

               <Text style={styles.editTitle}>Editar Conta</Text>

               <Input placeholder="Nome" value={nomeContaEdit} onChangeText={setNomeContaEdit} />

               <CurrencyInput
                  style={styles.currencyInput}
                  placeholder="R$ 0,00"
                  value={valorContaEdit}
                  onChangeValue={setValorContaEdit}
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
                     open={openEdit}
                     value={tipoContaEdit}
                     items={items}
                     setOpen={setOpenEdit}
                     setValue={setTipoContaEdit}
                     setItems={setItems}
                     placeholder="Escolha uma opção"
                     style={styles.dropdown}
                     dropDownContainerStyle={styles.dropdownBox}
                     placeholderStyle={styles.placeholder}
                  />
               </View>

               <View style={styles.editButtons}>
                  <ButtonS style={styles.cancelButton} onPress={cancelarEdicao}>
                     <Text>Cancelar</Text>
                  </ButtonS>
                  <ButtonS style={styles.saveButton} onPress={handleSalvarEdicao}>
                     <Text>Salvar</Text>
                  </ButtonS>
               </View>
            </BottomSheetCustomHome>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
