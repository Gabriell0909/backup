import { useState } from 'react';
import { editarDevedor } from '../services/editarDevedor';

export const useEditDevedor = (onSuccess) => {
   const [isEditing, setIsEditing] = useState(false);

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

   return {
      isEditing,
      handleEditDevedor,
   };
}; 