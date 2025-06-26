import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Card from '../card';
import { Ionicons } from '@expo/vector-icons';

export const ListaItem = ({ icone, nomeDevedor, categoria, valor, status, titulo, onPress }) => {
   const getStatusColor = () => {
      switch (status?.toLowerCase()) {
         case 'pago':
            return '#4CAF50'; // Verde
         case 'pendente':
            return '#FF9800'; // Laranja
         case 'atrasado':
            return '#F44336'; // Vermelho
         default:
            return '#9E9E9E'; // Cinza
      }
   };

   const getStatusText = () => {
      switch (status?.toLowerCase()) {
         case 'pago':
            return 'Pago';
         case 'pendente':
            return 'Pendente';
         case 'atrasado':
            return 'Atrasado';
         default:
            return 'Pendente';
      }
   };

   return (
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
         <Card style={[styles.cardGasto, { borderLeftColor: getStatusColor() }]}>
            {/* Top Row */}
            <View style={styles.containerTopRow}>
               {/* Devedor */}
               <View style={styles.containerDevedor}>
                  <View style={styles.devedor}></View>
                  <Text style={styles.devedorText}>{nomeDevedor || 'Você'}</Text>
               </View>

               {/* Status */}
               <View style={styles.containerStatus}>
                  <View style={[styles.status, { backgroundColor: getStatusColor() }]}></View>
                  <Text style={styles.statusText}>{getStatusText()}</Text>
               </View>
            </View>

            {/* Middle Row - Título */}
            {titulo && (
               <View style={styles.containerTitulo}>
                  <Text style={styles.textTitulo}>Titulo: {titulo}</Text>
               </View>
            )}

            {/* Bottom Row */}
            <View style={styles.containerBottomRow}>
               <View style={styles.containerCategory}>
                  <Ionicons name="layers-outline" size={20} color="#666" />
                  <Text style={styles.textCategory}>{categoria || 'Sem categoria'}</Text>
               </View>
               <Text style={styles.textBalances}>{valor}</Text>
            </View>
         </Card>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   cardGasto: {
      minHeight: 80,
      elevation: 8,
      backgroundColor: 'white',
      borderRadius: 8,
      marginTop: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderLeftWidth: 5,
   },

   containerTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },

   devedor: {
      width: 40,
      height: 40,
      backgroundColor: 'gray',
      borderRadius: 30,
   },

   devedorText: {
      fontSize: 18,
      fontWeight: 300,
   },

   status: {
      width: 20,
      height: 20,
      backgroundColor: 'red',
      borderRadius: 10,
   },

   statusText: {
      fontSize: 16,
      fontWeight: 400,
   },

   containerStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
   },

   containerDevedor: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
   },

   containerTitulo: {
      marginTop: 8,
      marginBottom: 4,
   },

   textTitulo: {
      fontSize: 16,
      fontWeight: '400',
      color: '#333',
   },

   containerCategory: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },

   dividerBottom: {
      bottom: 48,
      width: '100%',
      alignSelf: 'center',
      position: 'absolute',
   },

   containerBottomRow: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
   },

   textCategory: {
      fontSize: 18,
      fontWeight: 300,
   },

   textBalances: {
      fontSize: 16,
      fontWeight: 300,
   },
});
