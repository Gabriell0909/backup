import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';
import { Alert } from 'react-native';

export const useDeleteDevedor = () => {
   const deletarDevedor = async (id) => {
      if (!id) {
         Alert.alert('Erro', 'ID do devedor não fornecido');
         return false;
      }

      try {
         const devedorRef = doc(db, 'devedores', id);
         await deleteDoc(devedorRef);
         Alert.alert('Sucesso', 'Devedor removido com sucesso');
         return true;
      } catch (error) {
         console.error('Erro ao deletar devedor:', error);
         Alert.alert('Erro', 'Não foi possível remover o devedor. Tente novamente.');
         return false;
      }
   };
   return { deletarDevedor };
};
