import { useState, useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StatusBar, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './Categorias.style';
import Card from '../../components/card';
import Input from '../../components/inputs';
import ButtonC from '../../components/customButton';
import { ListaItem } from '../../components/lista/listaItem';
import { buscarCategorias, cadastrarCategoria, editarCategoria, deletarCategoria } from '../../services/categoriaService';

export default function Categorias() {
   const [itens, setItens] = useState([]);
   const [nome, setNome] = useState('');
   const [categoriaEditando, setCategoriaEditando] = useState(null);

   const carregarCategorias = async () => {
      try {
         const dadosFormatados = await buscarCategorias();
         setItens(dadosFormatados);
      } catch (error) {
         console.error('Erro ao buscar categorias:', error);
         Alert.alert('Erro', 'Não foi possível carregar as categorias. Tente novamente.');
      }
   };

   useEffect(() => {
      carregarCategorias();
   }, []);

   const handleSalvar = async () => {
      try {
         if (nome.trim() === '') {
            Alert.alert('Atenção', 'Digite um nome para a categoria.');
            return;
         }
         if (categoriaEditando) {
            await editarCategoria(categoriaEditando.key, { nome });
            setCategoriaEditando(null);
         } else {
            await cadastrarCategoria({ nome });
         }
         setNome('');
         await carregarCategorias();
      } catch (error) {
         console.error('Erro ao salvar categoria:', error);
         Alert.alert('Erro', 'Não foi possível salvar a categoria. Tente novamente.');
      }
   };

   const handleEdit = (id) => {
      const categoria = itens.find(item => item.key === id);
      if (categoria) {
         setCategoriaEditando(categoria);
         setNome(categoria.nome);
      }
   };

   const handleDelete = (id) => {
      Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir esta categoria?', [
         { text: 'Cancelar', style: 'cancel' },
         {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
               try {
                  await deletarCategoria(id);
                  await carregarCategorias();
               } catch (error) {
                  console.error('Erro ao excluir categoria:', error);
                  Alert.alert('Erro', 'Não foi possível excluir a categoria. Tente novamente.');
               }
            },
         },
      ]);
   };

   return (
      <KeyboardAvoidingView
         style={{ flex: 1, alignItems: 'center' }}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
         <StatusBar translucent backgroundColor="transparent" />
         <Card style={styles.banner}>
            <Text style={styles.title}>Categorias</Text>
         </Card>

         <Input
            style={styles.inputs}
            placeholder="Digite um nome para a categoria"
            value={nome}
            onChangeText={setNome}
         />

         <View style={styles.containerButton}>
            <ButtonC style={styles.buttonC}>
               <Ionicons name="person-circle-outline" size={32} />
               <Text>Icone</Text>
            </ButtonC>
         </View>

         <ButtonC style={styles.btn} onPress={handleSalvar}>
            <Text>{categoriaEditando ? 'Atualizar' : 'Salvar'}</Text>
         </ButtonC>

         <View style={styles.containerLista}>
            <Text>Categorias</Text>
            <FlatList
               data={itens}
               ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
               renderItem={({ item }) => {
                  return (
                     <ListaItem 
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
