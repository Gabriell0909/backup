import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/FirebaseConfig";
import { deletarDevedor, CadastrarDevedores, editarDevedor, buscarDevedores } from '../services/devedoresService';
import { useState } from "react";
import { Alert } from "react-native";

export const useDevedor = (onSuccess) => {
    const [nome, setNome] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    const handleCadastrarDevedor = async () => {
       if (!nome.trim()) {
          Alert.alert('Atenção', 'Por favor, digite um nome para o devedor.');
          return;
       }

       setLoading(true);
       setError(null);

       try {
          const dadosFormatados = {
             nome: nome,
             icone: null,
          };
          const id = await CadastrarDevedores(dadosFormatados);
          if (id) {
             setNome('');
             if(onSuccess) onSuccess()
          }
       } catch (error) {
          console.log('erro', error);
       } finally {
          setLoading(false);
       }
    };

    const handleEditDevedor = async (id, dadosAtualizados) => {
       try {
          setIsEditing(true);
          await editarDevedor(id, dadosAtualizados);
          if (onSuccess) {
             onSuccess();
          }
       } catch (error) {
          console.error('Erro ao editar devedor:', error);
          throw error;
       } finally {
          setIsEditing(false);
       }
    };

    const handleDeletarDevedor = async (id) => {
        if (!id) {
           Alert.alert('Erro', 'ID do devedor não fornecido');
           return false;
        }
  
        try {
           await deletarDevedor(id);
           Alert.alert('Sucesso', 'Devedor removido com sucesso');
           if (onSuccess) onSuccess();
           return true;
        } catch (error) {
           console.error('Erro ao deletar devedor:', error);
           Alert.alert('Erro', 'Não foi possível remover o devedor. Tente novamente.');
           return false;
        }
     };

    const handleBuscarDevedores = async () => {
        try {
            const devedores = await buscarDevedores();
            if (onSuccess) onSuccess(devedores);
        } catch (error) {
            console.log('erro ao buscar', error);
        }
    };

    return { 
      nome, 
      setNome, 
      loading,      
      error,        
      isEditing,    
      handleCadastrarDevedor, 
      handleEditDevedor, 
      handleDeletarDevedor, 
      handleBuscarDevedores 
  };
}





