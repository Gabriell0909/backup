import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import ButtonOpacity from '../../../../components/customButton';

export default function CustomModal({ visible, onEdit, onDelete, onClose }) {
   return (
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
         <Pressable style={styles.overlay} onPress={onClose}>
            <View style={styles.modalContent}>
               <Text style={styles.title}>Deseja desativar esta conta?</Text>
               <Text style={styles.description}>
                  Ela será removida das listagens e poderá ser reativada posteriormente na seção de perfil.
               </Text>

               <View style={styles.buttonContainer}>
                  <ButtonOpacity style={styles.button} onPress={onEdit}>
                     <Text style={styles.buttonText}>Cancelar</Text>
                  </ButtonOpacity>

                  <ButtonOpacity style={styles.button} onPress={onDelete}>
                     <Text style={styles.buttonText}>desativar</Text>
                  </ButtonOpacity>
               </View>
            </View>
         </Pressable>
      </Modal>
   );
}
const styles = StyleSheet.create({
   overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
   },
   modalContent: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      elevation: 8,
      gap: 10,
   },
   title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
   },

   description: {
      fontSize: 18,
      color: '#333',
      fontWeight: 300,
      textAlign: 'center',
   },
   buttonContainer: {
      flexDirection: 'row',
      gap: 10,
   },
   button: {
      width: '40%',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 30,
      marginTop: 15,
   },
   buttonText: {
      fontSize: 15,
      color: '#000',
      fontWeight: 'semibold',
   },
});
