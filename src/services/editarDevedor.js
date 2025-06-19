import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/FirebaseConfig";

export const editarDevedor = async (id, dadosAtualizados) => {
   try {
      const devedorRef = doc(db, 'devedores', id);
      await updateDoc(devedorRef, dadosAtualizados);
      return true;
   } catch (error) {
      console.error('Erro ao editar devedor:', error);
      throw error;
   }
}; 