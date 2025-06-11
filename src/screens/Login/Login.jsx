import {
    View,
    Text,
    Pressable,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';

import { styles } from './Login.style';
import { FazerLogin } from '../../Auth/AuthLogin';
import { ErrorBoundary } from '../../components/ErrorBoundary.jsx';
import { errorMessages } from '../../Utils/AuthRules/ErrosMenssages';
import { validarEmail, validarSenha } from '../../Utils/AuthRules/login/loginRules';

import SemiCirculo from '../../components/semicirculo';
import Icons from '../../constants/icons';
import InputAuth from '../../components/InputAuth/inputsAuth';
import CustomAlert from '../../components/modal';

export default function Login({ navigation }) {
    const [hidden, setHidden] = useState(true);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [erroEmail, setErroEmail] = useState(false);
    const [erroSenha, setErroSenha] = useState(false);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    

    const onBlurEmail = useCallback(() => {
        const erroMsg = validarEmail(email);
        setErroEmail(!!erroMsg);
    }, [email]);
    const onBlurSenha = useCallback(() => {
        const erroMsg = validarSenha(senha);
        setErroSenha(!!erroMsg);
    }, [senha]);

    const handleLogin = async () => {
        const erroMsgEmail = validarEmail(email);
        const erroMsgSenha = validarSenha(senha);

        setErroEmail(!!erroMsgEmail);
        setErroSenha(!!erroMsgSenha);

        if (erroMsgEmail || erroMsgSenha) {
            setAlertMessage(erroMsgEmail || erroMsgSenha);
            setAlertVisible(true);
            return;
        }

        try {
            setLoading(true);
            await FazerLogin(email, senha);
        } catch (error) {
            console.error('[handleLogin] Erro no login:', error);
            if (
                error.code === 'auth/invalid-credential' ||
                error.code === 'auth/wrong-password' ||
                error.code === 'auth/user-not-found'
            ) {
                setAlertMessage(errorMessages.invalidCredential);
            } else if (error.code === 'auth/too-many-requests') {
                setAlertMessage(errorMessages.tooManyRequests);
            } else if (error.code === 'auth/email-already-in-use') {
                setAlertMessage(errorMessages.emailAlreadyInUse);
            } else {
                setAlertMessage(error.message || 'Erro ao fazer login');
            }
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ErrorBoundary>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <StatusBar translucent backgroundColor="transparent" />
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1 }} 
                    keyboardShouldPersistTaps="always"
                >
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <SemiCirculo/>
                        <Icons.SecureLoginAmico width={360} height={360} />
                        <Text style={styles.titulo}>Login</Text>

                        <CustomAlert
                            visible={alertVisible}
                            message={alertMessage}
                            onClose={() => setAlertVisible(false)}
                        />
                        <View style={styles.container}>
                            <InputAuth
                                erro={erroEmail}
                                placeholder='Exemplo1234@gmail.com'
                                maxLength={40}
                                keyboardType="email-address"
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setErroEmail(false);
                                }}
                                onBlur={onBlurEmail}
                                editable={!loading}
                                pointerEvents={loading ? "none" : "auto"}
                                value={email}
                            >
                                <Ionicons name="mail-outline" size={24} color={'#000'} />
                            </InputAuth>

                            <InputAuth
                                placeholder='Digite sua senha'
                                erro={erroSenha}
                                maxLength={40}
                                secureTextEntry={hidden}
                                value={senha}
                                onChangeText={(text) => {
                                    setSenha(text);
                                    setErroSenha(false);
                                }}
                                onBlur={onBlurSenha}
                                editable={!loading}
                                pointerEvents={loading ? "none" : "auto"}
                                rightIcon={
                                    <Ionicons
                                        name={hidden ? 'eye-off-outline' : 'eye-outline'}
                                        size={24}
                                        color="#000"
                                        onPress={() => {
                                            if (!loading) setHidden(!hidden);
                                        }}
                                    />
                                }
                            >
                                <Ionicons name="lock-closed-outline" size={24} color={'#000'} />
                            </InputAuth>

                            <Pressable 
                                onPress={() => !loading && navigation.navigate('AuthRecovery')}
                                disabled={loading}
                            >
                                {({ pressed }) => (
                                    <Text style={[styles.recovery, pressed && { color: '#0077b6' }]}>
                                        Esqueceu a senha?
                                    </Text>
                                )}
                            </Pressable>

                            <Pressable 
                                onPress={() => !loading && navigation.navigate('AuthCadastro')}
                                disabled={loading}
                            >
                                {({ pressed }) => (
                                    <Text style={[styles.register, pressed && { color: '#0077b6' }]}>
                                        Não tenho conta
                                    </Text>
                                )}
                            </Pressable>

                            <TouchableOpacity 
                                style={[styles.button, loading && styles.buttonDisabled]} 
                                onPress={handleLogin}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#000" />
                                ) : (
                                    <Text>Login</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ErrorBoundary>
    );
}