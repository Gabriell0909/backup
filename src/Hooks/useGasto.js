import { useState } from 'react';
import { cadastrarGasto } from '../services/gastoService';
import { editarConta } from '../services/editarConta';
import { buscarContas } from '../services/cadastroDeContas';
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

   // Função para converter dateString para data local
   const converterDataParaLocal = (dateString) => {
      if (!dateString) return null;

      console.log('Data original (dateString):', dateString);

      // dateString vem no formato "YYYY-MM-DD"
      const [ano, mes, dia] = dateString.split('-').map(Number);

      console.log('Ano, mês, dia:', ano, mes, dia);

      // Criar data no fuso horário local
      const dataLocal = new Date(ano, mes - 1, dia, 12, 0, 0, 0); // meio-dia para evitar problemas de fuso horário

      console.log('Data convertida (ISO):', dataLocal.toISOString());
      console.log('Data convertida (local):', dataLocal.toLocaleDateString('pt-BR'));

      return dataLocal.toISOString();
   };

   const handleSalvarGasto = async () => {
      if (!titulo || !descricao || !categoria || !data || !valor || !tipo) {
         Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
         return;
      }
      setLoading(true);
      try {
         // Converter a data para o formato correto
         const dataConvertida = converterDataParaLocal(data);

         // Se uma conta foi selecionada, buscar e atualizar saldo
         let contaSelecionada = null;
         if (conta) {
            const contas = await buscarContas();
            contaSelecionada = contas.find((c) => c.key === (conta.key || conta));
            if (!contaSelecionada) throw new Error('Conta não encontrada');
         }

         if (tipo === 'parcelado' && parcelas > 1) {
            const valorParcela = Number(valor) / parcelas;
            const dataInicial = new Date(dataConvertida);
            for (let i = 0; i < parcelas; i++) {
               const dataParcela = new Date(dataInicial);
               dataParcela.setMonth(dataParcela.getMonth() + i);
               const gastoParcela = {
                  titulo: `${titulo} (${i + 1}/${parcelas})`,
                  devedor: devedor ? devedor : 'proprio',
                  descricao,
                  conta: contaSelecionada ? contaSelecionada.key : null,
                  categoria,
                  data: dataParcela.toISOString(),
                  valor: Number(valorParcela),
                  tipo: 'parcelado',
                  parcelaAtual: i + 1,
                  parcelas,
                  criadoEm: new Date().toISOString(),
               };
               await cadastrarGasto(gastoParcela);

               // Descontar valor da parcela do saldo da conta apenas se uma conta foi selecionada
               if (contaSelecionada) {
                  await editarConta(contaSelecionada.key, {
                     ...contaSelecionada,
                     valor: Number(contaSelecionada.valor) - Number(valorParcela),
                  });
                  // Atualizar saldo local para as próximas parcelas
                  contaSelecionada.valor = Number(contaSelecionada.valor) - Number(valorParcela);
               }
            }
         } else {
            const gasto = {
               titulo,
               devedor: devedor ? devedor : 'proprio',
               descricao,
               conta: contaSelecionada ? contaSelecionada.key : null,
               categoria,
               data: dataConvertida,
               valor: Number(valor),
               tipo,
               recorrencia: tipo === 'recorrente' ? recorrencia : null,
               parcelas: tipo === 'parcelado' ? parcelas : null,
               criadoEm: new Date().toISOString(),
            };
            await cadastrarGasto(gasto);

            // Descontar valor do saldo da conta apenas se uma conta foi selecionada
            if (contaSelecionada) {
               await editarConta(contaSelecionada.key, {
                  ...contaSelecionada,
                  valor: Number(contaSelecionada.valor) - Number(valor),
               });
            }
         }
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

   const limparCampos = () => {
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
   };

   return {
      titulo,
      setTitulo,
      devedor,
      setDevedor,
      descricao,
      setDescricao,
      conta,
      setConta,
      categoria,
      setCategoria,
      data,
      setData,
      valor,
      setValor,
      tipo,
      setTipo,
      recorrencia,
      setRecorrencia,
      parcelas,
      setParcelas,
      loading,
      handleSalvarGasto,
      limparCampos,
   };
};
