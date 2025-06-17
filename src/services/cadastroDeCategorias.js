import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const CadastrarCategoria = async (categ) => {
   try {
      const catgeref = await addDoc(collection(db, 'categorias'), categ);
      return catgeref.id;
   } catch (error) {
      console.log('erro ao cadastrar categoria', error);
   }
};
