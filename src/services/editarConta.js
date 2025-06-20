import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const editarConta = async (id, dadosAtualizados) => {
   try {
      const docRef = doc(db, 'conta', id);
      await updateDoc(docRef, dadosAtualizados);
      return true;
   } catch (error) {
      console.log('erro ao editar conta', error);
      throw error;
   }
}; 