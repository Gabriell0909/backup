import { collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';


export const CadastrarDevedores = async (devedor) =>{
   try{
       const docRef = await addDoc(collection(db,'devedores'), devedor)
       return docRef.id
   }catch(error){
       console.error('erro ao cadastrar devedor', error)
   }
}


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

export const deletarDevedor = async (id) => {
   try {
      await deleteDoc(doc(db, 'devedores', id));
      return true;
   } catch (error) {
      console.error('Erro ao deletar devedor:', error);
      throw error;
   }
};
