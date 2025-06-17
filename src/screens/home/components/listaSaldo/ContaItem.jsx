import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Dimensions } from 'react-native';

const largura = Dimensions.get('window').width;

export const ContaItem = ({ nome, tipo, iconName, valor, onPress, onLongPress }) => {
   return (
      <View style={styles.container}>
         <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.itensContainer} activeOpacity={0.4}>
            <View style={styles.icone} />
            <View style={styles.infoContainer}>
               <View style={styles.topRow}>
                  <Text style={styles.nome}>{nome}</Text>
                  <Text style={styles.valor}>{valor}</Text>
               </View>
               <Text style={styles.tipo}>{tipo}</Text>
            </View>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: largura * 0.81,
      // width: 315,
      height: 60,
      marginHorizontal:0.7,
      borderRadius: 8,
      backgroundColor: 'rgba(87, 87, 87, 0.82)',
      padding: 5,
      marginStart:3,
      marginEnd:3,
   },

   itensContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 8,
   },
   icone: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgb(226, 226, 226)',
      marginRight: 15,
   },
   infoContainer: {
      flex: 1,
   },
   topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
   },
   nome: {
      fontSize: 16,
      fontWeight: '500',
      color: 'white',
   },
   valor: {
      fontSize: 16,
      fontWeight: '500',
      color: 'white',
   },
   tipo: {
      fontSize: 14,
      color: 'white',
   },
});
