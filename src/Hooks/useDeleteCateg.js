import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';
import { Alert } from 'react-native';

export const useDeleteCateg = () => {
   const deletarCategoria = async (id) => {
      if (!id) {
         Alert.alert('Erro', 'ID da categoria não fornecido');
         return false;
      }

      try {
         const categRef = doc(db, 'categoria', id);
         await deleteDoc(categRef);
         Alert.alert('Sucesso', 'Categoria removido com sucesso');
         return true;
      } catch (error) {
         console.error('Erro ao deletar categoria:', error);
         Alert.alert('Erro', 'Não foi possível remover. Tente novamente.');
         return false;
      }
   };
   return { deletarCategoria };
};
