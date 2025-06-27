import { useRef, useState, useEffect } from 'react';
import {
   KeyboardAvoidingView,
   Platform,
   StatusBar,
   Text,
   View,
   ScrollView,
   TouchableOpacity,
   TextInput,
} from 'react-native';
import { styles } from '../LancarGasto/Gasto.style';
import { Feather, Ionicons } from '@expo/vector-icons';

import { Calendar, LocaleConfig } from 'react-native-calendars';

import Card from '../../components/card';
import Input from '../../components/inputs';
import InputDescription from './components/InputDescription';
import ButtonA from '../../components/customButton';
import BottomCustom from '../../components/bottomSheet';
import { ptBR } from '../../Utils/LocaleCalendarConfig';
import InputShort from './components/InputShort';
import { useGasto } from '../../Hooks/useGasto';
import { buscarDevedores } from '../../services/devedoresService';
import { buscarCategorias } from '../../services/categoriaService';
import { buscarContas } from '../../services/cadastroDeContas';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default function LancarGastos() {
   const sheetRef = useRef(null);
   const [active, setActive] = useState(null);
   const [devedores, setDevedores] = useState([]);
   const [categorias, setCategorias] = useState([]);
   const [contas, setContas] = useState([]);
   const [showRecorrente, setShowRecorrente] = useState(false);
   const [showParcelas, setShowParcelas] = useState(false);
   const [parcelasInput, setParcelasInput] = useState('');

   const {
      titulo,
      setTitulo,
      devedor,
      setDevedor,
      descricao,
      setDescricao,
      conta,
      setConta,
      categoria,
      setCategoria,
      data,
      setData,
      valor,
      setValor,
      tipo,
      setTipo,
      recorrencia,
      setRecorrencia,
      parcelas,
      setParcelas,
      loading,
      handleSalvarGasto,
   } = useGasto();

   useEffect(() => {
      buscarDevedores().then(setDevedores);
      buscarCategorias().then(setCategorias);
      buscarContas().then(setContas);
   }, []);

   const openBottomSheet = (type) => {
      setActive(type);
      sheetRef.current?.snapToIndex(1);
   };

   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
         <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', gap: 30 }}>
            <StatusBar barStyle={'light-content'} backgroundColor="transparent" translucent />

            <Card style={styles.bannerTitle}>
               <View style={styles.chieldContainer}>
                  <Text style={styles.titulo}>Lançar Gastos</Text>
               </View>
            </Card>

            <View style={styles.group}>
               <View style={styles.containerViews}>
                  <InputShort
                     style={styles.inputTitle}
                     placeholder="Título"
                     value={titulo}
                     onChangeText={setTitulo}
                     multiline={false}
                  />
                  <ButtonA style={styles.button} onPress={() => openBottomSheet('devedores')}>
                     <Ionicons name="person-circle-outline" size={32} />
                     <Text>{devedor ? devedor.nome : 'Devedor'}</Text>
                  </ButtonA>
               </View>

               <InputDescription
                  style={styles.inputDescricao}
                  placeholder="Descreva seu gasto"
                  value={descricao}
                  onChangeText={setDescricao}
                  multiline={true}
                  numberOfLines={6}
               />

               <View style={styles.containerGroupButton}>
                  <ButtonA style={styles.button} onPress={() => openBottomSheet('contas')}>
                     <Ionicons name="card-outline" size={32} />
                     <Text>{conta ? conta.label : 'Conta'}</Text>
                  </ButtonA>
                  <ButtonA style={styles.categoria} onPress={() => openBottomSheet('categorias')}>
                     <Ionicons name="layers-outline" size={32} />
                  </ButtonA>
                  <ButtonA style={styles.calendario} onPress={() => openBottomSheet('calendario')}>
                     <Ionicons name="calendar-outline" size={32} />
                  </ButtonA>
               </View>

               <View style={styles.containerViews}>
                  <Input
                     style={styles.inputP}
                     placeholder="R$ 0,00"
                     value={valor}
                     onChangeText={setValor}
                     keyboardType="numeric"
                  />
               </View>

               <View>
                  <Text style={styles.textDescription}>Tipo de gasto</Text>
                  <View style={styles.containerGastos}>
                     <ButtonA
                        style={[
                           styles.typeOfExpense,
                           tipo === 'unico' && { borderWidth: 2, borderColor: '#0dd' },
                        ]}
                        onPress={() => {
                           setTipo('unico');
                           setShowRecorrente(false);
                           setShowParcelas(false);
                        }}
                     >
                        <Text style={{ color: '#000' }}>Único</Text>
                     </ButtonA>
                     <ButtonA
                        style={[
                           styles.typeOfExpense,
                           tipo === 'recorrente' && { borderWidth: 2, borderColor: '#0dd' },
                        ]}
                        onPress={() => {
                           setTipo('recorrente');
                           setShowRecorrente(true);
                           setShowParcelas(false);
                           openBottomSheet('recorrente');
                        }}
                     >
                        <Text style={{ color: '#000' }}>Recorrente</Text>
                     </ButtonA>
                     <ButtonA
                        style={[
                           styles.typeOfExpense,
                           tipo === 'parcelado' && { borderWidth: 2, borderColor: '#0dd' },
                        ]}
                        onPress={() => {
                           setTipo('parcelado');
                           setShowRecorrente(false);
                           setShowParcelas(true);
                           openBottomSheet('parcelas');
                        }}
                     >
                        <Text style={{ color: '#000' }}>Parcelado</Text>
                     </ButtonA>
                  </View>
               </View>

               <ButtonA style={{ marginTop: 15 }} onPress={handleSalvarGasto} disabled={loading}>
                  <Text style={styles.textDescription}>{loading ? 'Salvando...' : 'Salvar'}</Text>
               </ButtonA>
            </View>
         </ScrollView>

         <BottomCustom sheetRef={sheetRef}>
            {active === 'devedores' && (
               <View>
                  <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Selecione o devedor</Text>
                  {devedores.map((d) => (
                     <ButtonA
                        key={d.key}
                        style={{
                           marginBottom: 5,
                           backgroundColor: devedor && devedor.key === d.key ? '#0dd' : '#fff',
                        }}
                        onPress={() => {
                           setDevedor(d);
                           sheetRef.current?.close();
                        }}
                     >
                        <Text style={{ color: devedor && devedor.key === d.key ? '#fff' : '#000' }}>
                           {d.nome}
                        </Text>
                     </ButtonA>
                  ))}
               </View>
            )}

            {active === 'contas' && (
               <View>
                  <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Escolha sua conta</Text>
                  {contas.map((c) => (
                     <ButtonA
                        key={c.key}
                        style={{
                           marginBottom: 5,
                           backgroundColor: conta && conta.key === c.key ? '#0dd' : '#fff',
                        }}
                        onPress={() => {
                           setConta(c);
                           sheetRef.current?.close();
                        }}
                     >
                        <Text style={{ color: conta && conta.key === c.key ? '#fff' : '#000' }}>
                           {c.nome}
                        </Text>
                     </ButtonA>
                  ))}
               </View>
            )}

            {active === 'categorias' && (
               <View>
                  <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Categorias</Text>
                  {categorias.map((cat) => (
                     <ButtonA
                        key={cat.key}
                        style={{
                           marginBottom: 5,
                           backgroundColor: categoria && categoria.key === cat.key ? '#0dd' : '#fff',
                        }}
                        onPress={() => {
                           setCategoria(cat);
                           sheetRef.current?.close();
                        }}
                     >
                        <Text style={{ color: categoria && categoria.key === cat.key ? '#fff' : '#000' }}>
                           {cat.nome}
                        </Text>
                     </ButtonA>
                  ))}
               </View>
            )}

            {active === 'calendario' && (
               <View style={{ width: '100%' }}>
                  <View>
                     <Calendar
                        style={{ borderWidth: 1, width: '100%', borderRadius: 15, padding: 3 }}
                        theme={{
                           selectedDayTextColor: 'red',
                           selectedDayBackgroundColor: '#000',
                           todayTextColor: '#000',
                           selectedDotColor: '#000',
                           arrowColor: '#000',
                        }}
                        onDayPress={(d) => {
                           console.log('Data selecionada:', d.dateString);
                           setData(d.dateString);
                        }}
                        renderArrow={(direction) => (
                           <Feather size={24} color={'#000'} name={`chevron-${direction}`} />
                        )}
                        markedDates={
                           data
                              ? {
                                   [data]: {
                                      selected: true,
                                      selectedColor: '#000',
                                      selectedTextColor: '#fff',
                                   },
                                }
                              : {}
                        }
                     />
                  </View>

                  <View style={{ marginTop: 40, alignItems: 'center' }}>
                     <ButtonA
                        style={{ marginTop: 0 }}
                        onPress={() => {
                           sheetRef.current?.close();
                        }}
                     >
                        <Text>Confirmar</Text>
                     </ButtonA>
                  </View>
               </View>
            )}

            {active === 'recorrente' && tipo === 'recorrente' && (
               <View style={{ alignItems: 'center', gap: 10 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Tipo de recorrência</Text>
                  <ButtonA
                     style={[
                        styles.typeOfExpenseButton,
                        recorrencia === 'mensal' && { borderWidth: 2, borderColor: '#0dd' },
                     ]}
                     onPress={() => setRecorrencia('mensal')}
                  >
                     <Text style={{ color: '#000' }}>Mensal</Text>
                  </ButtonA>
                  <ButtonA
                     style={[
                        styles.typeOfExpenseButton,
                        recorrencia === 'anual' && { borderWidth: 2, borderColor: '#0dd' },
                     ]}
                     onPress={() => setRecorrencia('anual')}
                  >
                     <Text style={{ color: '#000' }}>Anual</Text>
                  </ButtonA>
                  <ButtonA style={{ marginTop: 10 }} onPress={() => sheetRef.current?.close()}>
                     <Text>Confirmar</Text>
                  </ButtonA>
               </View>
            )}

            {active === 'parcelas' && tipo === 'parcelado' && (
               <View style={{ alignItems: 'center', gap: 10 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Quantidade de parcelas</Text>
                  <View
                     style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 10,
                        justifyContent: 'center',
                     }}
                  >
                     <TouchableOpacity onPress={() => setParcelas(Math.max(1, parcelas - 1))}>
                        <Text style={{ fontSize: 22, paddingHorizontal: 10 }}>-</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => {
                           setParcelasInput(parcelas.toString());
                        }}
                        activeOpacity={1}
                     >
                        <TextInput
                           style={{
                              fontSize: 18,
                              minWidth: 40,
                              textAlign: 'center',
                              borderBottomWidth: 1,
                              borderColor: '#0dd',
                           }}
                           value={parcelasInput !== '' ? parcelasInput : parcelas.toString()}
                           onChangeText={(txt) => {
                              const num = txt.replace(/[^0-9]/g, '');
                              setParcelasInput(num);
                           }}
                           keyboardType="numeric"
                           onBlur={() => {
                              if (
                                 parcelasInput !== '' &&
                                 !isNaN(Number(parcelasInput)) &&
                                 Number(parcelasInput) > 0
                              ) {
                                 setParcelas(Number(parcelasInput));
                              }
                              setParcelasInput('');
                           }}
                        />
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => setParcelas(parcelas + 1)}>
                        <Text style={{ fontSize: 22, paddingHorizontal: 10 }}>+</Text>
                     </TouchableOpacity>
                  </View>
                  <ButtonA style={{ marginTop: 10 }} onPress={() => sheetRef.current?.close()}>
                     <Text>Confirmar</Text>
                  </ButtonA>
               </View>
            )}
         </BottomCustom>
      </KeyboardAvoidingView>
   );
}
