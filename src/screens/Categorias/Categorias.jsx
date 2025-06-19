import { useState, useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StatusBar, Text, View, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './Categorias.style';
import Card from '../../components/card';
import Input from '../../components/inputs';
import ButtonC from '../../components/customButton';
import { ListaItem } from '../../components/lista/listaItem';
import { useCategoriaForm } from '../../Hooks/useCategoria';

export default function Categorias() {
    const [itens, setItens] = useState([]);
    const [categoriaEditando, setCategoriaEditando] = useState(null);

    const {
        nome,
        setNome,
        loading, 
        error,   
        handleCadastrarCateg,
        handleEditarCategoria,
        handleDeletarCategoria,
        handleBuscarCategorias
    } = useCategoriaForm((categorias) => {
        // Callback de sucesso:
        // Se a operação foi uma busca, o array 'categorias' é recebido.
        if (Array.isArray(categorias)) {
            setItens(categorias);
        } else {
            handleBuscarCategorias();
        }
    });
    
    // 2. Chame a função do hook diretamente no useEffect.
    // A função local 'buscarCategorias' foi removida.
    useEffect(() => {
        handleBuscarCategorias();
    }, []);

    const handleSalvar = async () => {
        if (nome.trim() === '') {
            Alert.alert('Atenção', 'Digite um nome para a categoria.');
            return;
        }
        if (categoriaEditando) {
            await handleEditarCategoria(categoriaEditando.key, { nome });
        } else {
            await handleCadastrarCateg();
        }
        setCategoriaEditando(null);
        setNome('');
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
                    await handleDeletarCategoria(id);
                },
            },
        ]);
    };

    const renderContent = () => {
        if (loading && itens.length === 0) {
            return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
        }

        if (error) {
            return <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>;
        }
        
        if (itens.length === 0) {
            return <Text style={{ marginTop: 10 }}>Nenhuma categoria cadastrada.</Text>;
        }

        return (
            <FlatList
                data={itens}
                keyExtractor={(item) => item.key}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                renderItem={({ item }) => (
                    <ListaItem 
                        nome={item.nome} 
                        onDelete={() => handleDelete(item.key)}
                        onEdit={() => handleEdit(item.key)}
                    />
                )}
            />
        );
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
                    <Ionicons name="pricetag-outline" size={32} />
                    <Text>Icone</Text>
                </ButtonC>
            </View>

            <ButtonC style={styles.btn} onPress={handleSalvar} disabled={loading}>
                <Text>{loading ? 'Salvando...' : (categoriaEditando ? 'Atualizar' : 'Salvar')}</Text>
            </ButtonC>

            <View style={styles.containerLista}>
                <Text>Categorias</Text>
                {renderContent()}
            </View>
        </KeyboardAvoidingView>
    );
}