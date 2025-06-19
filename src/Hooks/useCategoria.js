import { CadastrarCategoria, editarCategoria, deletarCategoria, buscarCategorias } from "../services/categoriaService";
import { useState } from "react";
import { Alert } from "react-native";

export const useCategoriaForm = (onSuccess) => {

   const [nome, setNome] = useState('');
   const handleCadastrarCateg = async () => {
      if (!nome.trim()) {
         Alert.alert('Atenção', 'Por favor, digite um nome para a categoria.');
         return;
      }
      try {
         const dadosCategorias = {
            nome: nome,
            icone: null,
         };

         const id = await CadastrarCategoria(dadosCategorias);

         if (id) {
            setNome('');
            if (onSuccess) onSuccess();
         }
      } catch (error) {
         console.log('erro ao cadastar', error);
      }
    };

    const handleEditarCategoria  = async (id, dadosAtualizados) => {
      try {
         await editarCategoria(id, dadosAtualizados);
         if (onSuccess) onSuccess();
      } catch (error) {
         console.log('erro ao editar', error);
      }
    }

    const handleDeletarCategoria = async (id) => {
      try {
         await deletarCategoria(id);
         if (onSuccess) onSuccess();
      } catch (error) {
         console.log('erro ao deletar', error);
      }
    }

    const handleBuscarCategorias = async () => {
      try {
         const categorias = await buscarCategorias();
         if (onSuccess) onSuccess(categorias);
      } catch (error) {
         console.log('erro ao buscar', error);
      }
    }

    return { nome, setNome, handleCadastrarCateg, handleEditarCategoria, handleDeletarCategoria, handleBuscarCategorias };
};