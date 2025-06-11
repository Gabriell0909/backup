import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const buscarTiposDeConta = async () => {
  try {
    console.log("Iniciando busca de tipos de conta...");
    const tiposDeContaRef = collection(db, 'tipoDeConta');
    const snapshot = await getDocs(tiposDeContaRef);
    
    console.log("Número de documentos encontrados:", snapshot.size);
    
    const dadosFormatados = [];
    snapshot.forEach((doc) => {
      console.log("Documento encontrado:", doc.data());
      const item = {
        label: doc.data().nomeAmigavel,
        value: doc.data().codigoInterno,
      };
      dadosFormatados.push(item);
    });

    console.log("Dados formatados:", dadosFormatados);
    return dadosFormatados;

  } catch (error) {
    console.error("Erro na busca de tipos de conta: ", error);
    throw error;
  }
}; 