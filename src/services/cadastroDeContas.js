import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const cadastrarConta = async (conta) => {
   try {
      const docRef = await addDoc(collection(db, 'conta'),conta) ;
      return docRef.id;
   } catch (error) {
      console.log('erro ao criar coleção', error);
   }
};
