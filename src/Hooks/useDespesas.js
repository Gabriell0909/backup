import { useState, useEffect } from 'react';
import { buscarGastos, deletarGasto } from '../services/gastoService';
import { editarConta } from '../services/editarConta';
import { buscarContas } from '../services/cadastroDeContas';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const useDespesas = (onContasUpdate) => {
   const [despesas, setDespesas] = useState([]);
   const [despesasFiltradas, setDespesasFiltradas] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [filtroAtivo, setFiltroAtivo] = useState('mes'); // 'hoje', 'semana', 'mes', 'ano'

   // Função auxiliar para aplicar filtro do mês atual
   const aplicarFiltroMesAtual = (listaDespesas) => {
      const hoje = new Date();
      const mesAtual = hoje.getMonth();
      const anoAtual = hoje.getFullYear();
      return listaDespesas.filter((despesa) => {
         if (!despesa.data) return false;
         const dataDespesa = new Date(despesa.data);
         return dataDespesa.getMonth() === mesAtual && dataDespesa.getFullYear() === anoAtual;
      });
   };

   // Função para aplicar filtros por período
   const aplicarFiltroPeriodo = (periodo, listaDespesas = despesas) => {
      setFiltroAtivo(periodo);

      const hoje = new Date();
      // Zerar as horas para comparação apenas da data
      const hojeInicio = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
      let despesasFiltradas = [];

      switch (periodo) {
         case 'hoje':
            despesasFiltradas = listaDespesas.filter((despesa) => {
               if (!despesa.data) return false;
               const dataDespesa = new Date(despesa.data);
               const dataDespesaInicio = new Date(
                  dataDespesa.getFullYear(),
                  dataDespesa.getMonth(),
                  dataDespesa.getDate(),
               );
               return dataDespesaInicio.getTime() === hojeInicio.getTime();
            });
            break;

         case 'semana':
            const inicioSemana = new Date(hoje);
            inicioSemana.setDate(hoje.getDate() - hoje.getDay()); // Domingo
            inicioSemana.setHours(0, 0, 0, 0);

            const fimSemana = new Date(inicioSemana);
            fimSemana.setDate(inicioSemana.getDate() + 6); // Sábado
            fimSemana.setHours(23, 59, 59, 999);

            despesasFiltradas = listaDespesas.filter((despesa) => {
               if (!despesa.data) return false;
               const dataDespesa = new Date(despesa.data);
               return dataDespesa >= inicioSemana && dataDespesa <= fimSemana;
            });
            break;

         case 'mes':
            despesasFiltradas = listaDespesas.filter((despesa) => {
               if (!despesa.data) return false;
               const dataDespesa = new Date(despesa.data);
               return (
                  dataDespesa.getMonth() === hoje.getMonth() &&
                  dataDespesa.getFullYear() === hoje.getFullYear()
               );
            });
            break;

         case 'ano':
            despesasFiltradas = listaDespesas.filter((despesa) => {
               if (!despesa.data) return false;
               const dataDespesa = new Date(despesa.data);
               return dataDespesa.getFullYear() === hoje.getFullYear();
            });
            break;

         default:
            despesasFiltradas = listaDespesas;
      }

      setDespesasFiltradas(despesasFiltradas);
      return despesasFiltradas;
   };

   const carregarDespesas = async () => {
      setLoading(true);
      setError(null);

      try {
         const dados = await buscarGastos();
         setDespesas(dados);
         // Aplicar filtro atual
         aplicarFiltroPeriodo(filtroAtivo, dados);
      } catch (error) {
         console.error('Erro ao carregar despesas:', error);
         setError('Erro ao carregar despesas');
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

         // Aplicar filtro atual novamente
         aplicarFiltroPeriodo(filtroAtivo, despesasAtualizadas);

         return { success: true, message: 'Despesa marcada como paga!' };
      } catch (error) {
         console.error('Erro ao marcar como pago:', error);
         return { success: false, message: 'Não foi possível marcar como pago' };
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

         // Aplicar filtro atual novamente
         aplicarFiltroPeriodo(filtroAtivo, despesasAtualizadas);

         return { success: true, message: 'Status revertido para pendente!' };
      } catch (error) {
         console.error('Erro ao reverter status:', error);
         return { success: false, message: 'Não foi possível reverter o status' };
      }
   };

   const deletarDespesa = async (id) => {
      try {
         // Buscar a despesa antes de deletar para obter informações da conta
         const despesaParaDeletar = despesas.find((despesa) => despesa.key === id);

         if (!despesaParaDeletar) {
            throw new Error('Despesa não encontrada');
         }

         // Deletar do Firebase
         await deletarGasto(id);

         // Se a despesa tem uma conta associada, restaurar o saldo
         if (despesaParaDeletar.conta) {
            try {
               // Buscar contas atualizadas
               const contas = await buscarContas();
               const contaAssociada = contas.find((c) => c.key === despesaParaDeletar.conta);

               if (contaAssociada) {
                  // Calcular o valor a ser restaurado
                  let valorParaRestaurar = Number(despesaParaDeletar.valor || 0);

                  // Se for parcelado, calcular o valor total das parcelas
                  if (despesaParaDeletar.tipo === 'parcelado' && despesaParaDeletar.parcelas) {
                     valorParaRestaurar = valorParaRestaurar * despesaParaDeletar.parcelas;
                  }

                  // Restaurar o saldo da conta
                  await editarConta(contaAssociada.key, {
                     ...contaAssociada,
                     valor: Number(contaAssociada.valor) + valorParaRestaurar,
                  });

                  // Notificar que as contas foram atualizadas
                  if (onContasUpdate) {
                     onContasUpdate();
                  }
               }
            } catch (error) {
               console.error('Erro ao restaurar saldo da conta:', error);
               // Não interromper o processo de deletar se falhar ao restaurar saldo
            }
         }

         // Atualizar o estado local removendo a despesa
         const despesasAtualizadas = despesas.filter((despesa) => despesa.key !== id);
         setDespesas(despesasAtualizadas);

         // Aplicar filtro atual novamente
         aplicarFiltroPeriodo(filtroAtivo, despesasAtualizadas);

         return { success: true, message: 'Despesa deletada com sucesso!' };
      } catch (error) {
         console.error('Erro ao deletar despesa:', error);
         return { success: false, message: 'Não foi possível deletar a despesa' };
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
      filtroAtivo,
      carregarDespesas,
      marcarComoPago,
      reverterParaPendente,
      deletarDespesa,
      aplicarFiltroPeriodo,
      filtrarPorStatus,
      filtrarPorDevedor,
      calcularTotalDespesas,
      calcularTotalPendente,
      calcularTotalPago,
   };
};
