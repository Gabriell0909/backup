import { useState } from 'react';
import { editarCategoria } from '../services/categoriaService';

export const useEditCateg = (onSuccess) => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const handleEditCateg = async (id, dados) => {
      try {
         setLoading(true);
         setError(null);
         await editarCategoria(id, dados);
         if (onSuccess) {
            onSuccess();
         }
      } catch (error) {
         console.error('Erro ao editar categoria:', error);
         setError('Não foi possível editar a categoria');
         throw error;
      } finally {
         setLoading(false);
      }
   };

   return {
      handleEditCateg,
      loading,
      error
   };
}; 