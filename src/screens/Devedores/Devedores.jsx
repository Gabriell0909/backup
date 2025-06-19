import { Alert, FlatList, KeyboardAvoidingView, Platform, StatusBar, Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './Devedores.style';
import Card from '../../components/card';
import Input from '../../components/inputs';
import ButtonC from '../../components/customButton';
import { useEffect, useState } from 'react';
import { DevedorItem } from '../../components/lista/devedorItem';
import { useDevedor } from '../../Hooks/useDevedor';

export default function Devedores() {
    const [items, setItems] = useState([]);
    const [devedorEditando, setDevedorEditando] = useState(null);

    // 1. Simplifique o callback e use os estados retornados pelo hook
    const {
        nome,
        setNome,
        loading, // Use o estado de loading
        error,   // Use o estado de erro
        handleCadastrarDevedor,
        handleEditDevedor,
        handleDeletarDevedor,
        handleBuscarDevedores
    } = useDevedor((devedores) => {
        // Callback de sucesso: SIMPLESMENTE atualiza a lista
        // Se a operação foi de busca, 'devedores' será um array.
        if (Array.isArray(devedores)) {
            setItems(devedores);
        } else {
            // Se foi cadastro, edição ou deleção, apenas recarregue a lista.
            handleBuscarDevedores(); 
        }
    });

    // 2. Chame a função do hook diretamente no useEffect
    useEffect(() => {
        handleBuscarDevedores();
    }, []);

    const handleDelete = (id) => {
        Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir este devedor?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: async () => {
                    await handleDeletarDevedor(id);
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
        if (devedorEditando) {
            await handleEditDevedor(devedorEditando.key, { nome });
        } else {
            await handleCadastrarDevedor();
        }
        // Limpa o estado local após a operação
        setDevedorEditando(null);
        setNome('');
    };
    
    // Função para renderizar o conteúdo da lista
    const renderContent = () => {
        if (loading && items.length === 0) {
            return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
        }

        if (error) {
            return <Text style={styles.errorText}>{error}</Text>;
        }

        if (items.length === 0) {
            return <Text style={styles.emptyText}>Nenhum devedor cadastrado.</Text>;
        }

        return (
            <FlatList
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                data={items}
                keyExtractor={(item) => item.key} // É uma boa prática usar keyExtractor
                renderItem={({ item }) => (
                    <DevedorItem 
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

            <ButtonC style={styles.btn} onPress={handleSalvar} disabled={loading}>
                <Text>{loading ? 'Salvando...' : (devedorEditando ? 'Atualizar' : 'Salvar')}</Text>
            </ButtonC>

            <View style={styles.containerLista}>
                <Text>Devedores</Text>
                {renderContent()}
            </View>
        </KeyboardAvoidingView>
    );
}