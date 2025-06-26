import { FlatList, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import Card from '../../components/card';
import { styles } from './despesas.style';
import ButtonCustom from '../../components/customButton';
import Divider from '../../components/divider';
import { ListaItem } from '../../components/lista/despesasItem';
import { useDespesas } from '../../Hooks/useDespesas';
import BottomSheetCustom from '../../components/bottomSheet';
import { Ionicons } from '@expo/vector-icons';

export default function Despesa() {
   const { despesasFiltradas, loading, carregarDespesas, marcarComoPago, reverterParaPendente } =
      useDespesas();
   const bottomSheetRef = useRef(null);
   const [despesaSelecionada, setDespesaSelecionada] = useState(null);

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

   const formatarData = (data) => {
      if (!data) return 'Data não informada';

      try {
         const dataObj = new Date(data);
         return dataObj.toLocaleDateString('pt-BR');
      } catch (error) {
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
         <View style={styles.bottomSheetContent}>
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
                  <Text style={styles.infoValue}>R$ {valor.toFixed(2)}</Text>
               </View>

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
            <ButtonCustom style={styles.filtroBtn} title="FiltroHoje" onPress={() => {}}>
               <Text>Hoje</Text>
            </ButtonCustom>
            <ButtonCustom style={styles.filtroBtn} title="FiltroSemana" onPress={() => {}}>
               <Text>Esta semana</Text>
            </ButtonCustom>
            <ButtonCustom style={styles.filtroBtn} title="FiltroMes" onPress={() => {}}>
               <Text>Este mês</Text>
            </ButtonCustom>
            <ButtonCustom style={styles.filtroBtn} title="FiltroAno" onPress={() => {}}>
               <Text>Este ano</Text>
            </ButtonCustom>
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
