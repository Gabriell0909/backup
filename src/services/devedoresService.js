import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const buscarDevedores = async () => {
   const devedoresRef = collection(db, 'devedores');
   const snapShots = await getDocs(devedoresRef);

   const dadosFormatados = [];

   snapShots.forEach((doc) => {
      const data = doc.data();
      dadosFormatados.push({
        key:doc.id,
        nome:data.nome,
        // icone:data.icone,
      });
   });

   return dadosFormatados
};
