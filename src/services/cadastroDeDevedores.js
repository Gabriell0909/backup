import { addDoc, collection } from "firebase/firestore";
import { db } from "../Config/FirebaseConfig";

export const CadastrarDevedores = async (devedor) =>{

    try{
        const docRef = await addDoc(collection(db,'devedores'), devedor)
        return docRef.id
    }catch(error){
        console.error('erro ao cadastrar devedor', error)
    }
}