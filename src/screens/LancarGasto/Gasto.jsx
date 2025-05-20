import { KeyboardAvoidingView, Platform, StatusBar, Text, View, ScrollView } from 'react-native';
import { styles } from '../LancarGasto/Gasto.style';
import { Ionicons } from '@expo/vector-icons';

import Card from '../../components/card';
import Input from '../../components/inputs';
import ButtonA from '../../components/customButton';

export default function LançarGastos() {
   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 30}
      >
         <ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center', gap: 30 }}
         
         >
            <StatusBar barStyle={'light-content'} backgroundColor="transparent" />

            <Card style={styles.bannerTitle}>
               <View style={styles.chieldContainer}>
                  <Text style={styles.titulo}>Lançar Gastos</Text>
               </View>
            </Card>

            <View style={styles.containerViews}>
               <Input style={styles.inputTitle} placeholder="Título" multiline={false} />
               <ButtonA style={styles.button}>
                  <Ionicons name="person-circle-outline" size={32} />
                  <Text>Devedor</Text>
               </ButtonA>
            </View>

            <View style={styles.containerViews}>
               <Input
                  style={styles.inputDescricao}
                  numberOfLines={6}
                  placeholder="Descreva detalhes sobre o gasto"
                  multiline={true}
               />
            </View>

            <View style={styles.containerViews}>
               <ButtonA style={styles.button}>
                  <Ionicons name="card-outline" size={32} />
                  <Text>Conta</Text>
               </ButtonA>
               <ButtonA style={styles.categoria}>
                  <Ionicons name="layers-outline" size={32} />
                  <Text>Categoria</Text>
               </ButtonA>
               <ButtonA style={styles.calendario}>
                  <Ionicons name="calendar-outline" size={32} />
               </ButtonA>
            </View>

            <View style={styles.containerViews}>
               <Input style={styles.inputP} placeholder="R$ 0,00" />
            </View>

            <View>
               <Text style={styles.textDescription}>Tipo de gasto</Text>
               <View style={styles.containerViews}>
                  <ButtonA style={styles.typeOfExpense}>
                     <Text>Único</Text>
                  </ButtonA>
                  <ButtonA style={styles.typeOfExpense}>
                     <Text>Recorrente</Text>
                  </ButtonA>
                  <ButtonA style={styles.typeOfExpense}>
                     <Text>Parcelado</Text>
                  </ButtonA>
               </View>
            </View>

            <ButtonA style={{ marginTop: 0 }}>
               <Text style={styles.textDescription}>Salvar</Text>
            </ButtonA>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}