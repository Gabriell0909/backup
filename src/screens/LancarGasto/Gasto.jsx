import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, Text, View, ScrollView } from 'react-native';
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

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default function LançarGastos() {
   const [day, setDay] = useState();

   const sheetRef = useRef(null);
   const [active, setActive] = useState(null);

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

                  <InputShort style={styles.inputTitle} placeholder="Título" multiline={false} />
                  <ButtonA
                     style={styles.button}
                     onPress={() => {
                        openBottomSheet('devedores');
                     }}
                  >
                     <Ionicons name="person-circle-outline" size={32} />
                     <Text>Devedor</Text>
                  </ButtonA>
               </View>

               <InputDescription
                  style={styles.inputDescricao}
                  placeholder="Descreva seu gasto"
                  multiline={true}
                  numberOfLines={6}
               />

               <View style={styles.containerGroupButton}>
                  <ButtonA
                     style={styles.button}
                     onPress={() => {
                        openBottomSheet('contas');
                     }}
                  >
                     <Ionicons name="card-outline" size={32} />
                     <Text>Conta</Text>
                  </ButtonA>
                  <ButtonA
                     style={styles.categoria}
                     onPress={() => {
                        openBottomSheet('categorias');
                     }}
                  >
                     <Ionicons name="layers-outline" size={32} />
                     <Text>Categoria</Text>
                  </ButtonA>
                  <ButtonA
                     style={styles.calendario}
                     onPress={() => {
                        openBottomSheet('calendario');
                     }}
                  >
                     <Ionicons name="calendar-outline" size={32} />
                  </ButtonA>
               </View>

               <View style={styles.containerViews}>
                  <Input style={styles.inputP} placeholder="R$ 0,00" />
               </View>

               <View>
                  <Text style={styles.textDescription}>Tipo de gasto</Text>
                  <View style={styles.containerGastos}>
                     <ButtonA style={styles.typeOfExpense} onPress={() => {}}>
                        <Text>Único</Text>
                     </ButtonA>
                     <ButtonA
                        style={styles.typeOfExpense}
                        onPress={() => {
                           openBottomSheet('tipoDeGasto');
                        }}
                     >
                        <Text>Recorrente</Text>
                     </ButtonA>
                     <ButtonA
                        style={styles.typeOfExpense}
                        onPress={() => {
                           openBottomSheet('parcelas');
                        }}
                     >
                        <Text>Parcelado</Text>
                     </ButtonA>
                  </View>
               </View>

               <ButtonA style={{ marginTop: 15 }}>
                  <Text style={styles.textDescription}>Salvar</Text>
               </ButtonA>
            </View>
         </ScrollView>

         <BottomCustom sheetRef={sheetRef}>
            {active === 'devedores' && (
               <View>
                  <Text>devedores</Text>
               </View>
            )}

            {active === 'contas' && (
               <View>
                  <Text>escolha sua conta</Text>
               </View>
            )}

            {active === 'categorias' && (
               <View>
                  <Text>Categorias</Text>
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
                        onDayPress={setDay}
                        renderArrow={(direction) => (
                           <Feather size={24} color={'#000'} name={`chevron-${direction}`} />
                        )}
                        markedDates={
                           day
                              ? {
                                   [day.dateString]: {
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
                     {/* <Text>Data selecionada {day?.dateString}</Text> */}

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

            {active === 'tipoDeGasto' && (
               <View style={{ alignItems: 'center' }}>
                  <Text style={styles.titleTypeOfExpense}>Tipo de gasto</Text>
                  <ButtonA style={styles.typeOfExpenseButton}>
                     <Text>Anual</Text>
                  </ButtonA>
                  <ButtonA style={styles.typeOfExpenseButton}>
                     <Text>Mensal</Text>
                  </ButtonA>
                  <ButtonA>
                     <Text>Confirmar</Text>
                  </ButtonA>
               </View>
            )}
            {active === 'parcelas' && (
               <View>
                  <Text>quantidade de parcelas</Text>
               </View>
            )}
         </BottomCustom>
      </KeyboardAvoidingView>
   );
}
