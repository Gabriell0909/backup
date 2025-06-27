import { useState, useEffect } from 'react';
import { buscarContas } from '../services/cadastroDeContas';
import { editarConta } from '../services/editarConta';

export const useContas = () => {
   const [contas, setContas] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const carregarContas = async () => {
      setLoading(true);
      setError(null);

      try {
         const dados = await buscarContas();
         setContas(dados);
      } catch (error) {
         console.error('Erro ao carregar contas:', error);
         setError('Erro ao carregar contas');
      } finally {
         setLoading(false);
      }
   };

   const atualizarConta = async (id, dadosAtualizados) => {
      try {
         await editarConta(id, dadosAtualizados);
         // Recarregar contas para garantir dados atualizados
         await carregarContas();
         return { success: true, message: 'Conta atualizada com sucesso!' };
      } catch (error) {
         console.error('Erro ao atualizar conta:', error);
         return { success: false, message: 'Não foi possível atualizar a conta' };
      }
   };

   const calcularSaldoTotal = () => {
      return contas.reduce((total, conta) => total + (conta.valor || 0), 0);
   };

   // Carregar contas automaticamente quando o hook for inicializado
   useEffect(() => {
      carregarContas();
   }, []);

   return {
      contas,
      loading,
      error,
      carregarContas,
      atualizarConta,
      calcularSaldoTotal,
   };
};
