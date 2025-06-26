import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const cadastrarGasto = async (gasto) => {
   try {
      const docRef = await addDoc(collection(db, 'gastos'), gasto);
      return docRef.id;
   } catch (error) {
      console.error('Erro ao cadastrar gasto', error);
      throw error;
   }
};

export const buscarGastos = async () => {
   try {
      const querySnapshot = await getDocs(collection(db, 'gastos'));
      return querySnapshot.docs.map(doc => ({
         key: doc.id,
         ...doc.data()
      }));
   } catch (error) {
      console.error('Erro ao buscar gastos:', error);
      throw error;
   }
}; 