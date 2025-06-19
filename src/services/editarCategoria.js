import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/FirebaseConfig";

export const editarCategoria = async (id, dadosAtualizados) => {
   try {
      const categoriaRef = doc(db, 'categoria', id);
      await updateDoc(categoriaRef, dadosAtualizados);
      return true;
   } catch (error) {
      console.error('Erro ao editar categoria:', error);
      throw error;
   }
}; 