import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const cadastrarConta = async (conta) => {
   try {
      const docRef = await addDoc(collection(db, 'conta'),conta) ;
      return docRef.id;
   } catch (error) {
      console.log('erro ao criar coleção', error);
   }
};

export const buscarContas = async () => {
   try {
      const querySnapshot = await getDocs(collection(db, 'conta'));
      return querySnapshot.docs
         .map(doc => ({
            key: doc.id,
            ...doc.data()
         }))
         .filter(conta => conta.ativa !== false);
   } catch (error) {
      console.error('Erro ao buscar contas:', error);
      throw error;
   }
};
