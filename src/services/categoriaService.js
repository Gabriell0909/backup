import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const buscarCategorias = async () => {
   try {
      console.log('Conectando ao Firestore...');
      const categRef = collection(db, 'categoria');
      console.log('Buscando documentos...');
      const snapShots = await getDocs(categRef);
      console.log('Número de documentos encontrados:', snapShots.size);

      const dadosFormatados = [];

      snapShots.forEach((doc) => {
         const data = doc.data();
         console.log('Documento encontrado:', data);
         dadosFormatados.push({
            key: doc.id,
            nome: data.nome,
            // icone:data.icone,
         });
      });

      console.log('Dados formatados:', dadosFormatados);
      return dadosFormatados;
   } catch (error) {
      console.error('Erro ao buscar categorias no Firestore:', error);
      throw error;
   }
};
