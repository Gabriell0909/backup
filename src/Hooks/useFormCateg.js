import { CadastrarCategoria } from "../services/cadastroDeCategorias";
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
    return { nome, setNome, handleCadastrarCateg };
};