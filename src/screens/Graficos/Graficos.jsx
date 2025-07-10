import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { PieChart, BarChart } from 'react-native-gifted-charts';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/card';
import { useDespesas } from '../../Hooks/useDespesas';
import { useContas } from '../../Hooks/useContas';
import { buscarCategorias } from '../../services/categoriaService';
import { styles } from './Graficos.style';
import { useFocusEffect } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';

const { width } = Dimensions.get('window');

function parseDataBrasil(dataStr) {
   if (!dataStr) return null;
   if (dataStr.includes('-')) return dataStr;
   const [dia, mes, ano] = dataStr.split('/');
   return `${ano}-${mes}-${dia}`;
}

function getMesesComDespesasAnoAtual(despesas) {
   const anoAtual = new Date().getFullYear();
   const mesesSet = new Set();
   despesas.forEach((despesa) => {
      if (!despesa.data) return;
      const data = new Date(parseDataBrasil(despesa.data));
      if (data.getFullYear() === anoAtual) {
         mesesSet.add(data.getMonth());
      }
   });
   return Array.from(mesesSet).sort((a, b) => a - b);
}

export default function Graficos() {
   const [dadosCategorias, setDadosCategorias] = useState([]);
   const [dadosMensais, setDadosMensais] = useState([]);
   const [categorias, setCategorias] = useState([]);
   const { carregarContas } = useContas();
   const { despesasFiltradas, filtroAtivo, aplicarFiltroPeriodo, carregarDespesas } =
      useDespesas(carregarContas);
   const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

   // ALTERADO: O filtro 'ano' é o ideal para a navegação por meses
   useEffect(() => {
      aplicarFiltroPeriodo('ano');
   }, []);

   const mesesComDespesas = useMemo(
      () => getMesesComDespesasAnoAtual(despesasFiltradas),
      [despesasFiltradas],
   );

   const [indiceMes, setIndiceMes] = useState(() =>
      mesesComDespesas.length > 0 ? mesesComDespesas.length - 1 : 0,
   );

   const mesSelecionado = useMemo(
      () => (mesesComDespesas.length > 0 ? mesesComDespesas[indiceMes] : new Date().getMonth()),
      [indiceMes, mesesComDespesas],
   );

   const anoAtual = new Date().getFullYear();

   // NOVO: Filtra as despesas APENAS para o mês selecionado. O gráfico usará isso.
   const despesasDoMesParaGrafico = useMemo(() => {
      return despesasFiltradas.filter((despesa) => {
         if (!despesa.data) return false;
         const data = new Date(parseDataBrasil(despesa.data));
         return data.getMonth() === mesSelecionado && data.getFullYear() === anoAtual;
      });
   }, [despesasFiltradas, mesSelecionado, anoAtual]);

   useEffect(() => {
      carregarCategorias();
      carregarDespesas();
   }, []);

   // ALTERADO: Este useEffect agora depende do 'despesasDoMesParaGrafico'
   // para recalcular o gráfico de pizza sempre que o mês mudar.
   useEffect(() => {
      if (despesasDoMesParaGrafico.length > 0) {
         processarDadosCategorias(despesasDoMesParaGrafico); // Passa os dados do mês
      } else {
         setDadosCategorias([]);
      }

      if (despesasFiltradas.length > 0) {
         processarDadosMensais(); // O gráfico de barras continua com os dados do ano todo
      } else {
         setDadosMensais([]);
      }
   }, [despesasDoMesParaGrafico, despesasFiltradas]); // Re-executa ao mudar o mês ou o filtro geral

   useFocusEffect(
      React.useCallback(() => {
         carregarCategorias();
         carregarDespesas();
         // Força a visualização do ano para permitir a navegação por meses
         aplicarFiltroPeriodo('ano');
      }, []),
   );

   const carregarCategorias = async () => {
      try {
         const categoriasData = await buscarCategorias();
         setCategorias(categoriasData);
      } catch (error) {
         console.error('Erro ao carregar categorias:', error);
      }
   };

   // ALTERADO: A função agora recebe os dados a serem processados como um argumento.
   const processarDadosCategorias = (dadosParaProcessar) => {
      const gastosPorCategoria = {};
      dadosParaProcessar.forEach((despesa) => {
         let nome = 'Sem categoria';
         if (typeof despesa.categoria === 'object' && despesa.categoria?.nome) {
            nome = despesa.categoria.nome;
         } else if (typeof despesa.categoria === 'string') {
            nome = despesa.categoria;
         }
         const valor = parseFloat(despesa.valor) || 0;
         gastosPorCategoria[nome] = (gastosPorCategoria[nome] || 0) + valor;
      });

      const totalCategorias = Object.keys(gastosPorCategoria).length;
      const dados = Object.entries(gastosPorCategoria).map(([nome, valor], index) => {
         let maxLength;
         if (totalCategorias > 8) maxLength = 4;
         else if (totalCategorias > 6) maxLength = 6;
         else maxLength = 10;
         const nomeTruncado =
            nome.length > maxLength ? nome.substring(0, maxLength) + (maxLength > 6 ? '...' : '..') : nome;

         return {
            value: valor,
            text: nomeTruncado || nome,
            nomeCompleto: nome,
            color: getCorCategoria(index),
            textColor: '#333',
         };
      });
      setDadosCategorias(dados);
   };

   // Função processarDadosMensais continua igual
   const processarDadosMensais = () => {
      // ... (código original sem alterações)
   };

   const getCorCategoria = (index) => {
      const cores = [
         '#FF6B6B',
         '#4ECDC4',
         '#45B7D1',
         '#96CEB4',
         '#FFEAA7',
         '#DDA0DD',
         '#98D8C8',
         '#F7DC6F',
         '#BB8FCE',
         '#85C1E9',
      ];
      return cores[index % cores.length];
   };

   // ALTERADO: A função de filtro agora só tem 'ano' para simplificar.
   // Você pode reativar os outros botões se quiser, mas a navegação por mês funciona melhor no contexto do ano.
   const aplicarFiltro = (periodo) => {
      aplicarFiltroPeriodo(periodo);
      setCategoriaSelecionada(null);
   };

   // ALTERADO: Agora calcula o total do mês selecionado para o gráfico de pizza.
   const calcularTotalGastosMes = () => {
      return despesasDoMesParaGrafico.reduce((total, despesa) => {
         return total + (parseFloat(despesa.valor) || 0);
      }, 0);
   };

   const getResumoPeriodo = () => {
      return `Ano de ${new Date().getFullYear()}`;
   };

   const gestureConfig = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
   };

   // Funções de swipe para NAVEGAR NO MÊS. Estão corretas.
   const handleSwipeLeft = () => {
      if (indiceMes < mesesComDespesas.length - 1) {
         setIndiceMes(indiceMes + 1);
         setCategoriaSelecionada(null); // Limpa seleção ao trocar de mês
      }
   };
   const handleSwipeRight = () => {
      if (indiceMes > 0) {
         setIndiceMes(indiceMes - 1);
         setCategoriaSelecionada(null); // Limpa seleção ao trocar de mês
      }
   };

   return (
      <>
         <StatusBar barStyle={'light-content'} backgroundColor="transparent" translucent />
         <ScrollView
            contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
         >
            <Card style={styles.bannerTitle}>
               <View style={styles.chieldContainer}>
                  <Text style={styles.titulo}>Gráficos</Text>
               </View>
            </Card>

            {/* Filtro simplificado para 'Ano' para a navegação de mês funcionar melhor */}
            <View style={styles.containerFiltro}>
               <TouchableOpacity
                  style={[styles.filtroBtn, filtroAtivo === 'ano' && styles.filtroBtnAtivo]}
                  onPress={() => aplicarFiltro('ano')}
               >
                  <Text style={[styles.filtroText, filtroAtivo === 'ano' && styles.filtroTextAtivo]}>
                     Navegar por Mês
                  </Text>
               </TouchableOpacity>
            </View>

            {/* Total e Resumo do Período */}
            <View style={styles.totalContainer}>
               <Text style={styles.totalLabel}>Total no Mês</Text>
               <Text style={styles.totalValue}>R$ {calcularTotalGastosMes().toFixed(2)}</Text>
            </View>
            <Text
               style={{ textAlign: 'center', color: '#666', marginTop: 10, marginBottom: 0, fontSize: 14 }}
            >
               {getResumoPeriodo()}
            </Text>

            {/* Navegação de Mês */}
            <View
               style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
               }}
            >
               <TouchableOpacity
                  onPress={handleSwipeRight}
                  disabled={indiceMes === 0}
                  style={{ opacity: indiceMes === 0 ? 0.3 : 1, marginHorizontal: 10 }}
               >
                  <Ionicons name="chevron-back-outline" size={28} color="#333" />
               </TouchableOpacity>
               <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
                  {`${
                     mesesComDespesas.length
                        ? [
                             'Janeiro',
                             'Fevereiro',
                             'Março',
                             'Abril',
                             'Maio',
                             'Junho',
                             'Julho',
                             'Agosto',
                             'Setembro',
                             'Outubro',
                             'Novembro',
                             'Dezembro',
                          ][mesSelecionado]
                        : ''
                  }`}
               </Text>
               <TouchableOpacity
                  onPress={handleSwipeLeft}
                  disabled={indiceMes === mesesComDespesas.length - 1}
                  style={{
                     opacity: indiceMes === mesesComDespesas.length - 1 ? 0.3 : 1,
                     marginHorizontal: 10,
                  }}
               >
                  <Ionicons name="chevron-forward-outline" size={28} color="#333" />
               </TouchableOpacity>
            </View>

            <GestureRecognizer
               onSwipeLeft={handleSwipeLeft}
               onSwipeRight={handleSwipeRight}
               config={gestureConfig}
            >
               <View style={styles.cardGraficoPizza}>
                  <Text style={styles.tituloGrafico}>Gastos por Categoria no Mês</Text>
                  {dadosCategorias.length > 0 ? (
                     <View style={styles.chartContainer}>
                        <PieChart
                           data={dadosCategorias.map((item) => ({
                              ...item,
                              // ALTERADO: cálculo do percentual sobre o total do MÊS
                              text: `${((item.value / calcularTotalGastosMes()) * 100).toFixed(0)}%`,
                              onPress: () => setCategoriaSelecionada(item.nomeCompleto),
                              strokeWidth: categoriaSelecionada === item.nomeCompleto ? 1 : 0,
                              strokeColor: categoriaSelecionada === item.nomeCompleto ? '#000' : undefined,
                           }))}
                           donut
                           showText
                           textColor="black"
                           radius={120}
                           innerRadius={60}
                           centerLabelComponent={() => (
                              <View style={styles.centerLabel}>
                                 <Text style={styles.centerLabelText}>Total Mês</Text>
                                 <Text style={styles.centerLabelValue}>
                                    R$ {calcularTotalGastosMes().toFixed(0)}
                                 </Text>
                              </View>
                           )}
                           focusOnPress={false}
                           textSize={16}
                        />
                     </View>
                  ) : (
                     <View style={styles.emptyState}>
                        <Ionicons name="pie-chart-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>Sem despesas neste mês.</Text>
                     </View>
                  )}
                  {dadosCategorias.length > 0 && (
                     <View style={styles.legendaContainer}>
                        {dadosCategorias.map((item, idx) => (
                           <View key={idx} style={styles.legendaItem}>
                              <View style={[styles.legendaCor, { backgroundColor: item.color }]} />
                              <Text style={styles.legendaTexto}>{item.nomeCompleto}</Text>
                           </View>
                        ))}
                     </View>
                  )}
               </View>
            </GestureRecognizer>

            {/* Detalhes da categoria selecionada (agora filtra de `despesasDoMesParaGrafico`) */}
            {categoriaSelecionada && (
               <View
                  style={{
                     marginTop: 20,
                     backgroundColor: '#fff',
                     borderRadius: 12,
                     padding: 12,
                     width: '90%',
                     alignSelf: 'center',
                     elevation: 2,
                  }}
               >
                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: '#333' }}>
                     Detalhes - {categoriaSelecionada}
                  </Text>
                  <View
                     style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        marginBottom: 4,
                     }}
                  >
                     <Text style={{ fontWeight: 'bold', color: '#666' }}>Título</Text>
                     <Text style={{ fontWeight: 'bold', color: '#666' }}>Valor</Text>
                     <Text style={{ fontWeight: 'bold', color: '#666' }}>Data</Text>
                  </View>
                  {despesasDoMesParaGrafico
                     .filter(
                        (despesa) =>
                           (typeof despesa.categoria === 'object'
                              ? despesa.categoria?.nome
                              : despesa.categoria) === categoriaSelecionada,
                     )
                     .map((despesa, idx) => (
                        <View
                           key={idx}
                           style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              backgroundColor: '#f5f5f5',
                              marginVertical: 4,
                              padding: 10,
                              borderRadius: 8,
                           }}
                        >
                           <Text>{despesa.titulo || '-'}</Text>
                           <Text>R$ {parseFloat(despesa.valor).toFixed(2)}</Text>
                           <Text>
                              {despesa.data
                                 ? (() => {
                                      const d = new Date(parseDataBrasil(despesa.data));
                                      const dia = String(d.getDate()).padStart(2, '0');
                                      const mes = String(d.getMonth() + 1).padStart(2, '0');
                                      const ano = String(d.getFullYear()).slice(-2);
                                      return `${dia}/${mes}/${ano}`;
                                   })()
                                 : '-'}
                           </Text>
                        </View>
                     ))}
                  {despesasDoMesParaGrafico.filter(
                     (despesa) =>
                        (typeof despesa.categoria === 'object'
                           ? despesa.categoria?.nome
                           : despesa.categoria) === categoriaSelecionada,
                  ).length === 0 && (
                     <Text style={{ textAlign: 'center', color: '#888', marginTop: 10 }}>
                        Nenhuma despesa nesta categoria neste mês.
                     </Text>
                  )}
               </View>
            )}
         </ScrollView>
      </>
   );
}
