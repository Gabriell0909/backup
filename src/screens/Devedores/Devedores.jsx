import { Alert, FlatList, KeyboardAvoidingView, Platform, StatusBar, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './Devedores.style';
import Card from '../../components/card';
import Input from '../../components/inputs';
import ButtonC from '../../components/customButton';
import { useEffect, useState } from 'react';
import { DevedorItem } from '../../components/lista/devedorItem';
import { buscarDevedores } from '../../services/devedoresService';
import { useDevedorForm } from '../../Hooks/useFormDevedor';
import { useDeleteDevedor } from '../../Hooks/useDeleteDevedores';
import { useEditDevedor } from '../../Hooks/useEditDevedor';

export default function Devedores() {
   const [items, setItems] = useState([]);
   const [devedorEditando, setDevedorEditando] = useState(null);

   const carregarDevedores = async () => {
      try {
         const dadosFormatados = await buscarDevedores();
         setItems(dadosFormatados);
      } catch (error) {
         console.error('Erro ao buscar devedores:', error);
         Alert.alert('Erro', 'Não foi possível carregar os devedores. Tente novamente.');
      }
   };

   const { nome, setNome, handleCadastrarDevedor } = useDevedorForm(carregarDevedores);
   const { deletarDevedor } = useDeleteDevedor();
   const { handleEditDevedor } = useEditDevedor(carregarDevedores);

   useEffect(() => {
      carregarDevedores();
   }, []);

   const handleDelete = (id) => {
      Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir este devedor?', [
         { text: 'Cancelar', style: 'cancel' },
         {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
               try {
                  const sucesso = await deletarDevedor(id);
                  if (sucesso) {
                     await carregarDevedores();
                  }
               } catch (error) {
                  console.error('Erro ao excluir devedor:', error);
                  Alert.alert('Erro', 'Não foi possível excluir o devedor. Tente novamente.');
               }
            },
         },
      ]);
   };

   const handleEdit = (id) => {
      const devedor = items.find(item => item.key === id);
      if (devedor) {
         setDevedorEditando(devedor);
         setNome(devedor.nome);
      }
   };

   const handleSalvar = async () => {
      try {
         if (devedorEditando) {
            await handleEditDevedor(devedorEditando.key, { nome });
            setDevedorEditando(null);
         } else {
            await handleCadastrarDevedor();
         }
         setNome('');
      } catch (error) {
         console.error('Erro ao salvar devedor:', error);
         Alert.alert('Erro', 'Não foi possível salvar o devedor. Tente novamente.');
      }
   };

   return (
      <KeyboardAvoidingView
         style={{ flex: 1, alignItems: 'center' }}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
         <StatusBar translucent backgroundColor="transparent" />
         <Card style={styles.banner}>
            <Text style={styles.title}>Devedores</Text>
         </Card>

         <View style={styles.containerButton}>
         <Input
            style={styles.inputs}
            placeholder="Digite um nome para o devedor"
            value={nome}
            onChangeText={setNome}
         />

            <ButtonC style={styles.buttonC}>
               <Ionicons name="person-circle-outline" size={32} />
               <Text>Icone</Text>
            </ButtonC>
         </View>

         <ButtonC style={styles.btn} onPress={handleSalvar}>
            <Text>{devedorEditando ? 'Atualizar' : 'Salvar'}</Text>
         </ButtonC>

         <View style={styles.containerLista}>
            <Text>Devedores</Text>
            <FlatList
               ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
               data={items}
               renderItem={({ item }) => {
                  return (
                     <DevedorItem 
                        nome={item.nome} 
                        onDelete={() => handleDelete(item.key)}
                        onEdit={() => handleEdit(item.key)}
                     />
                  );
               }}
            />
         </View>
      </KeyboardAvoidingView>
   );
}
