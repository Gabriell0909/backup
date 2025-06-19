import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig'

export const buscarCategorias = async () => {
   try {
      const querySnapshot = await getDocs(collection(db, 'categoria'));
      return querySnapshot.docs.map(doc => ({
         key: doc.id,
         ...doc.data()
      }));
   } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw error;
   }
};

export const cadastrarCategoria = async (dados) => {
   try {
      const docRef = await addDoc(collection(db, 'categoria'), dados);
      return docRef.id;
   } catch (error) {
      console.error('Erro ao cadastrar categoria:', error);
      throw error;
   }
};

export const deletarCategoria = async (id) => {
   try {
      await deleteDoc(doc(db, 'categoria', id));
      return true;
   } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      throw error;
   }
};

export const editarCategoria = async (id, dados) => {
   try {
      const categoriaRef = doc(db, 'categoria', id);
      await updateDoc(categoriaRef, dados);
      return true;
   } catch (error) {
      console.error('Erro ao editar categoria:', error);
      throw error;
   }
};
