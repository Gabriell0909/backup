import { FlatList, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useRef, useState } from 'react';
import Card from '../../components/card';
import { styles } from './despesas.style';
import ButtonCustom from '../../components/customButton';
import Divider from '../../components/divider';
import { ListaItem } from '../../components/lista/despesasItem';
import { useDespesas } from '../../Hooks/useDespesas';
import { useContas } from '../../Hooks/useContas';
import BottomSheetCustom from '../../components/bottomSheet';
import { Ionicons } from '@expo/vector-icons';
import CustomModal from '../home/components/modal/modalDesable';
import CustomAlert from '../../components/modal';

export default function Despesa() {
   const { carregarContas } = useContas();

   const {
      despesasFiltradas,
      loading,
      filtroAtivo,
      carregarDespesas,
      marcarComoPago,
      reverterParaPendente,
      deletarDespesa,
      aplicarFiltroPeriodo,
      calcularTotalDespesas,
      calcularTotalPendente,
      calcularTotalPago,
   } = useDespesas(carregarContas);
   const bottomSheetRef = useRef(null);
   const [despesaSelecionada, setDespesaSelecionada] = useState(null);
   const [modalVisible, setModalVisible] = useState(false);
   const [alertVisible, setAlertVisible] = useState(false);
   const [alertMessage, setAlertMessage] = useState('');

   // Função para obter o estilo do botão de filtro
   const getFiltroButtonStyle = (periodo) => {
      return [styles.filtroBtn, filtroAtivo === periodo && styles.filtroBtnAtivo];
   };

   const abrirBottomSheet = (despesa) => {
      setDespesaSelecionada(despesa);
      bottomSheetRef.current?.expand();
   };

   const fecharBottomSheet = () => {
      bottomSheetRef.current?.close();
      setDespesaSelecionada(null);
   };

   const alterarStatus = (novoStatus) => {
      if (despesaSelecionada) {
         if (novoStatus === 'pago') {
            marcarComoPago(despesaSelecionada.key);
         } else if (novoStatus === 'pendente') {
            reverterParaPendente(despesaSelecionada.key);
         }
         fecharBottomSheet();
      }
   };

   const deletarDespesaSelecionada = () => {
      if (despesaSelecionada) {
         Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja deletar esta despesa? Esta ação não pode ser desfeita.',
            [
               {
                  text: 'Cancelar',
                  style: 'cancel',
               },
               {
                  text: 'Deletar',
                  style: 'destructive',
                  onPress: () => {
                     deletarDespesa(despesaSelecionada.key);
                     fecharBottomSheet();
                  },
               },
            ],
         );
      }
   };

   const formatarData = (data) => {
      if (!data) return 'Data não informada';

      try {
         const dataObj = new Date(data);

         // Verificar se a data é válida
         if (isNaN(dataObj.getTime())) {
            return 'Data inválida';
         }

         // Formatar a data no padrão brasileiro
         return dataObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
         });
      } catch (error) {
         console.error('Erro ao formatar data:', error);
         return 'Data inválida';
      }
   };

   const renderItem = ({ item }) => {
      // Debug: verificar estrutura dos dados
      console.log('Item da despesa:', JSON.stringify(item, null, 2));

      // Extrair dados corretamente, tratando casos onde podem vir como objetos
      const nomeDevedor =
         typeof item.nomeDevedor === 'object' ? item.nomeDevedor?.nome || 'Você' : item.nomeDevedor || 'Você';

      const categoria =
         typeof item.categoria === 'object'
            ? item.categoria?.nome || 'Sem categoria'
            : item.categoria || 'Sem categoria';

      const valor = item.valor ? Number(item.valor) : 0;
      const status = item.status || 'pendente';
      const titulo = item.titulo || '';

      return (
         <ListaItem
            icone={item.icone}
            nomeDevedor={nomeDevedor}
            categoria={categoria}
            valor={`R$ ${valor.toFixed(2)}`}
            status={status}
            titulo={titulo}
            onPress={() => abrirBottomSheet(item)}
         />
      );
   };

   const renderEmptyList = () => (
      <View style={styles.emptyContainer}>
         <Text style={styles.emptyText}>
            {loading ? 'Carregando despesas...' : 'Nenhuma despesa encontrada'}
         </Text>
      </View>
   );

   const renderBottomSheetContent = () => {
      if (!despesaSelecionada) return null;

      const nomeDevedor =
         typeof despesaSelecionada.nomeDevedor === 'object'
            ? despesaSelecionada.nomeDevedor?.nome || 'Você'
            : despesaSelecionada.nomeDevedor || 'Você';

      const categoria =
         typeof despesaSelecionada.categoria === 'object'
            ? despesaSelecionada.categoria?.nome || 'Sem categoria'
            : despesaSelecionada.categoria || 'Sem categoria';

      const valor = despesaSelecionada.valor ? Number(despesaSelecionada.valor) : 0;
      const status = despesaSelecionada.status || 'pendente';
      const titulo = despesaSelecionada.titulo || 'Sem título';

      return (
         <View style={[styles.bottomSheetContent, { paddingVertical: 10, paddingHorizontal: 0 }]}>
            <Text style={styles.bottomSheetTitle}>Detalhes da Despesa</Text>

            {/* Informações da Despesa */}
            <View style={styles.infoContainer}>
               <View style={styles.infoRow}>
                  <Ionicons name="person-outline" size={20} color="#666" />
                  <Text style={styles.infoLabel}>Devedor:</Text>
                  <Text style={styles.infoValue}>{nomeDevedor}</Text>
               </View>

               <View style={styles.infoRow}>
                  <Ionicons name="document-text-outline" size={20} color="#666" />
                  <Text style={styles.infoLabel}>Título:</Text>
                  <Text style={styles.infoValue}>{titulo}</Text>
               </View>

               <View style={styles.infoRow}>
                  <Ionicons name="layers-outline" size={20} color="#666" />
                  <Text style={styles.infoLabel}>Categoria:</Text>
                  <Text style={styles.infoValue}>{categoria}</Text>
               </View>

               <View style={styles.infoRow}>
                  <Ionicons name="cash-outline" size={20} color="#666" />
                  <Text style={styles.infoLabel}>Valor:</Text>
                  <Text style={styles.infoValue}>
                     {despesaSelecionada.tipo === 'parcelado' && despesaSelecionada.parcelas
                        ? `R$ ${(valor * despesaSelecionada.parcelas).toFixed(2)}`
                        : `R$ ${valor.toFixed(2)}`}
                  </Text>
               </View>

               {/* Se for parcelado, mostrar valor da parcela */}
               {despesaSelecionada.tipo === 'parcelado' &&
                  despesaSelecionada.parcelas &&
                  despesaSelecionada.parcelaAtual && (
                     <>
                        <View style={styles.infoRow}>
                           <Ionicons name="pricetag-outline" size={20} color="#666" />
                           <Text style={styles.infoLabel}>Valor da Parcela:</Text>
                           <Text style={styles.infoValue}>
                              R$ {valor.toFixed(2)} ({despesaSelecionada.parcelaAtual}/
                              {despesaSelecionada.parcelas})
                           </Text>
                        </View>
                     </>
                  )}

               <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                  <Text style={styles.infoLabel}>Data:</Text>
                  <Text style={styles.infoValue}>{formatarData(despesaSelecionada.data)}</Text>
               </View>
            </View>

            {/* descrição */}
            <View style={styles.descContainer}>
               <View style={styles.infoRowDesc}>
                  <View style={styles.descHeader}>
                     <Ionicons name="document-text-outline" size={20} color="#666" />
                     <Text style={styles.infoLabel}>Descrição:</Text>
                  </View>
                  <Text style={styles.descValue}>{despesaSelecionada.descricao || 'Sem descrição'}</Text>
               </View>
            </View>

            {/* Status Atual */}
            <View style={styles.statusContainer}>
               <Text style={styles.statusLabel}>Status Atual:</Text>
               <View
                  style={[styles.statusBadge, { backgroundColor: status === 'pago' ? '#4CAF50' : '#FF9800' }]}
               >
                  <Text style={styles.statusBadgeText}>{status === 'pago' ? 'Pago' : 'Pendente'}</Text>
               </View>
            </View>

            {/* Botões de Ação */}
            <View style={styles.actionButtons}>
               {status !== 'pago' ? (
                  <ButtonCustom
                     style={styles.actionButton}
                     title="Marcar como Pago"
                     onPress={() => alterarStatus('pago')}
                  >
                     <Text style={styles.actionButtonText}>Marcar como Pago</Text>
                  </ButtonCustom>
               ) : (
                  <ButtonCustom
                     style={styles.actionButton}
                     title="Reverter para Pendente"
                     onPress={() => alterarStatus('pendente')}
                  >
                     <Text style={styles.actionButtonText}>Reverter para Pendente</Text>
                  </ButtonCustom>
               )}

               {/* Botão de Deletar */}
               <ButtonCustom style={styles.deleteButton} onPress={deletarDespesaSelecionada}>
                  <Text style={styles.deleteButtonText}>Deletar Despesa</Text>
               </ButtonCustom>
            </View>
         </View>
      );
   };

   return (
      <View style={styles.container}>
         <Card style={styles.bannerTitle}>
            <View style={styles.chieldContainer}>
               <Text style={styles.titulo}>Despesas</Text>
            </View>
         </Card>

         <View style={styles.containerFiltro}>
            <ButtonCustom
               style={getFiltroButtonStyle('hoje')}
               title="FiltroHoje"
               onPress={() => aplicarFiltroPeriodo('hoje')}
            >
               <Text style={filtroAtivo === 'hoje' ? styles.filtroBtnAtivoText : {}}>Hoje</Text>
            </ButtonCustom>
            <ButtonCustom
               style={getFiltroButtonStyle('semana')}
               title="FiltroSemana"
               onPress={() => aplicarFiltroPeriodo('semana')}
            >
               <Text style={filtroAtivo === 'semana' ? styles.filtroBtnAtivoText : {}}>Esta semana</Text>
            </ButtonCustom>
            <ButtonCustom
               style={getFiltroButtonStyle('mes')}
               title="FiltroMes"
               onPress={() => aplicarFiltroPeriodo('mes')}
            >
               <Text style={filtroAtivo === 'mes' ? styles.filtroBtnAtivoText : {}}>Este mês</Text>
            </ButtonCustom>
            <ButtonCustom
               style={getFiltroButtonStyle('ano')}
               title="FiltroAno"
               onPress={() => aplicarFiltroPeriodo('ano')}
            >
               <Text style={filtroAtivo === 'ano' ? styles.filtroBtnAtivoText : {}}>Este ano</Text>
            </ButtonCustom>
         </View>

         {/* Total das Despesas */}
         <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total R$</Text>
            <Text style={styles.totalValue}>R$ {calcularTotalDespesas().toFixed(2)}</Text>
         </View>

         <Divider style={styles.divider} />

         <FlatList
            data={despesasFiltradas}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={renderEmptyList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            onRefresh={carregarDespesas}
            refreshing={loading}
         />

         <BottomSheetCustom sheetRef={bottomSheetRef}>{renderBottomSheetContent()}</BottomSheetCustom>
      </View>
   );
}
