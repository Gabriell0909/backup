import { FlatList, KeyboardAvoidingView, Platform, StatusBar, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './Categorias.style';
import { useCategoriaForm } from '../../Hooks/useFormCateg';
import Card from '../../components/card';
import Input from '../../components/inputs';
import ButtonC from '../../components/customButton';
import { ListaItem } from '../../components/lista/listaItem';
import { useState, useEffect } from 'react';
import { buscarCategorias } from '../../services/categoriaService';
import { useDeleteCateg } from '../../Hooks/useDeleteCateg';

export default function Categorias() {
   
   const [itens, setItens] = useState([]);
   const carregarCategorias = async () => {
      try {
         const dadosFormatados = await buscarCategorias();
         console.log('Dados recebidos:', dadosFormatados);
         setItens(dadosFormatados);
      } catch (error) {
         console.error('Erro ao buscar categorias:', error);
         Alert.alert(
            'Erro',
            'Não foi possível carregar as categorias. Por favor, tente novamente.'
         );
      }
   };

   const { nome, setNome, handleCadastrarCateg } = useCategoriaForm(carregarCategorias);
   const { deletarCategoria } = useDeleteCateg();

   const handleDelete = (id) => {
      Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir esta categoria?', [
         { text: 'Cancelar', style: 'cancel' },
         {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
               try {
                  const sucesso = await deletarCategoria(id);
                  if (sucesso) {
                     await carregarCategorias();
                  }
               } catch (error) {
                  console.error('Erro ao excluir categoria:', error);
               }
            },
         },
      ]);
   };

   const handleEdit = (id) => {
      // TODO: Implementar edição
      console.log('Editar categoria:', id);
   };

   useEffect(() => {
      carregarCategorias();
   }, []);

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

         <ButtonC style={styles.btn} onPress={handleCadastrarCateg}>
            <Text>Salvar</Text>
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
