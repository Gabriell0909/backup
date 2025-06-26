import { useState, useEffect } from 'react';
import { buscarGastos } from '../services/gastoService';
import { Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const useDespesas = () => {
   const [despesas, setDespesas] = useState([]);
   const [despesasFiltradas, setDespesasFiltradas] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const carregarDespesas = async () => {
      setLoading(true);
      setError(null);

      try {
         const dados = await buscarGastos();
         setDespesas(dados);
         setDespesasFiltradas(dados);
      } catch (error) {
         console.error('Erro ao carregar despesas:', error);
         setError('Erro ao carregar despesas');
         Alert.alert('Erro', 'Não foi possível carregar as despesas');
      } finally {
         setLoading(false);
      }
   };

   const marcarComoPago = async (id) => {
      try {
         // Atualizar no Firebase
         const gastoRef = doc(db, 'gastos', id);
         await updateDoc(gastoRef, {
            status: 'pago',
            pagoEm: new Date().toISOString(),
         });

         // Atualizar o estado local
         const despesasAtualizadas = despesas.map((despesa) =>
            despesa.key === id ? { ...despesa, status: 'pago' } : despesa,
         );

         setDespesas(despesasAtualizadas);
         setDespesasFiltradas(despesasAtualizadas);

         Alert.alert('Sucesso', 'Despesa marcada como paga!');
      } catch (error) {
         console.error('Erro ao marcar como pago:', error);
         Alert.alert('Erro', 'Não foi possível marcar como pago');
      }
   };

   const reverterParaPendente = async (id) => {
      try {
         // Atualizar no Firebase
         const gastoRef = doc(db, 'gastos', id);
         await updateDoc(gastoRef, {
            status: 'pendente',
            pagoEm: null,
         });

         // Atualizar o estado local
         const despesasAtualizadas = despesas.map((despesa) =>
            despesa.key === id ? { ...despesa, status: 'pendente' } : despesa,
         );

         setDespesas(despesasAtualizadas);
         setDespesasFiltradas(despesasAtualizadas);

         Alert.alert('Sucesso', 'Status revertido para pendente!');
      } catch (error) {
         console.error('Erro ao reverter status:', error);
         Alert.alert('Erro', 'Não foi possível reverter o status');
      }
   };

   const filtrarPorStatus = (status) => {
      if (status === 'todos') {
         setDespesasFiltradas(despesas);
      } else {
         const filtradas = despesas.filter((despesa) => despesa.status === status);
         setDespesasFiltradas(filtradas);
      }
   };

   const filtrarPorDevedor = (nomeDevedor) => {
      if (!nomeDevedor || nomeDevedor.trim() === '') {
         setDespesasFiltradas(despesas);
         return;
      }

      const filtradas = despesas.filter((despesa) =>
         despesa.nomeDevedor?.toLowerCase().includes(nomeDevedor.toLowerCase()),
      );
      setDespesasFiltradas(filtradas);
   };

   const calcularTotalDespesas = () => {
      return despesasFiltradas.reduce((total, despesa) => {
         return total + (despesa.valor || 0);
      }, 0);
   };

   const calcularTotalPendente = () => {
      return despesasFiltradas
         .filter((despesa) => despesa.status === 'pendente')
         .reduce((total, despesa) => total + (despesa.valor || 0), 0);
   };

   const calcularTotalPago = () => {
      return despesasFiltradas
         .filter((despesa) => despesa.status === 'pago')
         .reduce((total, despesa) => total + (despesa.valor || 0), 0);
   };

   // Carregar despesas automaticamente quando o hook for inicializado
   useEffect(() => {
      carregarDespesas();
   }, []);

   return {
      despesas,
      despesasFiltradas,
      loading,
      error,
      carregarDespesas,
      marcarComoPago,
      reverterParaPendente,
      filtrarPorStatus,
      filtrarPorDevedor,
      calcularTotalDespesas,
      calcularTotalPendente,
      calcularTotalPago,
   };
};
