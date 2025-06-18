import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ButtonOpacity from '../customButton';

const largura = Dimensions.get('window').width;
export const DevedorItem = ({ nome, iconName, onPress, onLongPress, onDelete }) => {
   return (
      <View style={styles.container}>
         <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.itensContainer}
            activeOpacity={1}
         >
            <View style={styles.icone} />
            <View style={styles.infoContainer}>
               <View style={styles.topRow}>
                  <Text style={styles.nome}>{nome}</Text>
                  <View style={styles.groupButton}>
                     <ButtonOpacity style={styles.button} onPress={onPress}>
                        <Ionicons name="pencil-outline" size={18} color="black"></Ionicons>
                     </ButtonOpacity>
                     <ButtonOpacity style={styles.button} onPress={onDelete}>
                        <Ionicons name="trash-outline" size={18} color="black"></Ionicons>
                     </ButtonOpacity>
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: largura * 0.9,
      height: 60,
      marginHorizontal: 0.7,
      borderRadius: 12,
      padding: 5,
      marginStart: 3,
      marginEnd: 3,
      backgroundColor: 'rgb(255, 255, 255)',
      borderWidth: 1,
   },

   itensContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 4,
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
      fontSize: 18,
      fontWeight: '300',
      color: 'black',
   },

   button: {
      width: 40,
      minHeight: 40,
      marginTop: 0,
      elevation: 4,
      shadowOpacity: 1,
      backgroundColor: 'white',
      borderWidth: 0,
   },

   groupButton: {
      flexDirection: 'row',
      gap: 20,
   },
});
