import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import ButtonOpacity from '../../../../components/customButton';

export default function CustomModal({ visible, onEdit, onDelete, onClose }) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Ações da conta</Text>
                    
                    <ButtonOpacity 
                        style={styles.button}
                        onPress={onEdit} 
                    >
                        <Text style={styles.buttonText}>editar</Text>
                    </ButtonOpacity>
                    
                    
                    <ButtonOpacity 
                        style={styles.button}
                        onPress={onDelete}
                    >
                        <Text style={styles.buttonText}>desativar</Text>
                    </ButtonOpacity>
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
    button: {
        width: '70%',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom:30,
        marginTop:0,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'semibold',
    },
});
