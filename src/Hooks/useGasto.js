import { useState } from 'react';
import { cadastrarGasto } from '../services/gastoService';
import { Alert } from 'react-native';

export const useGasto = (onSuccess) => {
   const [titulo, setTitulo] = useState('');
   const [devedor, setDevedor] = useState(null);
   const [descricao, setDescricao] = useState('');
   const [conta, setConta] = useState(null);
   const [categoria, setCategoria] = useState(null);
   const [data, setData] = useState(null);
   const [valor, setValor] = useState('');
   const [tipo, setTipo] = useState('unico'); // unico, recorrente, parcelado
   const [recorrencia, setRecorrencia] = useState('mensal'); // mensal, anual
   const [parcelas, setParcelas] = useState(1);
   const [loading, setLoading] = useState(false);

   const handleSalvarGasto = async () => {
      if (!titulo || !descricao || !conta || !categoria || !data || !valor || !tipo) {
         Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
         return;
      }
      setLoading(true);
      try {
         const gasto = {
            titulo,
            devedor: devedor ? devedor : 'proprio',
            descricao,
            conta,
            categoria,
            data,
            valor: Number(valor),
            tipo,
            recorrencia: tipo === 'recorrente' ? recorrencia : null,
            parcelas: tipo === 'parcelado' ? parcelas : null,
            criadoEm: new Date().toISOString(),
         };
         await cadastrarGasto(gasto);
         if (onSuccess) onSuccess();
         // Limpar campos
         setTitulo('');
         setDevedor(null);
         setDescricao('');
         setConta(null);
         setCategoria(null);
         setData(null);
         setValor('');
         setTipo('unico');
         setRecorrencia('mensal');
         setParcelas(1);
         Alert.alert('Sucesso', 'Gasto lançado com sucesso!');
      } catch (error) {
         Alert.alert('Erro', 'Não foi possível lançar o gasto.');
      } finally {
         setLoading(false);
      }
   };

   return {
      titulo, setTitulo,
      devedor, setDevedor,
      descricao, setDescricao,
      conta, setConta,
      categoria, setCategoria,
      data, setData,
      valor, setValor,
      tipo, setTipo,
      recorrencia, setRecorrencia,
      parcelas, setParcelas,
      loading,
      handleSalvarGasto,
   };
}; 