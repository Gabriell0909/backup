import { Alert, FlatList, KeyboardAvoidingView, Platform, StatusBar, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './Devedores.style';
import Card from '../../components/card';
import Input from '../../components/inputs';
import ButtonC from '../../components/customButton';
import { useEffect, useState } from 'react';
import { CadastrarDevedores } from '../../services/cadastroDeDevedores';
import { ListaItem } from '../../components/lista/listaItem';
import { buscarDevedores } from '../../services/devedoresService';
import { useDevedorForm } from '../../Hooks/useFormDevedor';

export default function Devedores() {
   const [items, setItems] = useState([]);

   const carregarDevedores = async () => {
      try {
         const dadosFormatados = await buscarDevedores();
         setItems(dadosFormatados);
      } catch (error) {
         console.log('erro ao buscar devedores', error);
      }
   };
   const { nome, setNome, handleCadastrarDevedor } = useDevedorForm(carregarDevedores);

   useEffect(() => {
      carregarDevedores();
   }, []);

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

         <Input
            style={styles.inputs}
            placeholder="Digite um nome para o devedor"
            value={nome}
            onChangeText={setNome}
         />

         <View style={styles.containerButton}>
            <ButtonC style={styles.buttonC}>
               <Ionicons name="person-circle-outline" size={32} />
               <Text>Icone</Text>
            </ButtonC>
         </View>

         <ButtonC style={styles.btn} onPress={handleCadastrarDevedor}>
            <Text>Salvar</Text>
         </ButtonC>

         <View style={styles.containerLista}>
            <Text>Devedores</Text>
            <FlatList
               ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
               data={items}
               renderItem={({ item }) => {
                  return <ListaItem nome={item.nome} />;
               }}
            />
         </View>
      </KeyboardAvoidingView>
   );
}
