import { useState } from 'react';
import { CadastrarDevedores } from '../services/cadastroDeDevedores';

export const useDevedorForm = (onSucess) => {
   const [nome, setNome] = useState('');
   const handleCadastrarDevedor = async () => {
      if (!nome.trim()) {
         Alert.alert('Atenção', 'Por favor, digite um nome para o devedor.');
         return;
      }
      try {
         const dadosFormatados = {
            nome: nome,
            icone: null,
         };
         const id = await CadastrarDevedores(dadosFormatados);
         if (id) {
            setNome('');
            if(onSucess) onSucess()
         }
      } catch (error) {
         console.log('erro', error);
      }
   };
   return { nome, setNome, handleCadastrarDevedor };
};
