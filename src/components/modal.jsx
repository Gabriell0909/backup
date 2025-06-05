import { Modal, View, Text, TouchableOpacity } from 'react-native';

export default function CustomAlert({ visible, message, onClose }) {
   return (
      <Modal visible={visible} transparent animationType="fade">
         <View
            style={{
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center',
               backgroundColor: 'rgba(0,0,0,0.4)',
            }}
         >
            <View
               style={{
                  backgroundColor: '#fff',
                  padding: 24,
                  borderRadius: 10,
                  minWidth: 250,
                  alignItems: 'center',
               }}
            >
               <Text style={{marginBottom: 20,  fontSize:15}}>{message}</Text>
               <TouchableOpacity onPress={onClose}>
                  <Text style={{ color: '#0077b6' }}>Fechar</Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   );
}
