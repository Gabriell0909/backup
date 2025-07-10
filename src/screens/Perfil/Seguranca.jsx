import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/card';
import Divider from '../../components/divider';
import Input from '../../components/inputs';
import { styles } from './Seguranca.style';

export default function Seguranca({ navigation }) {
   // Estados para segurança
   const [biometricEnabled, setBiometricEnabled] = useState(false);
   const [requirePin, setRequirePin] = useState(false);
   const [pinCode, setPinCode] = useState('');
   const [showBalance, setShowBalance] = useState(true);

   const handleChangePassword = () => {
      // TODO: Implementar tela de alteração de senha
      Alert.alert('Em desenvolvimento', 'Funcionalidade de alteração de senha será implementada em breve!');
   };

   const handleBiometricToggle = () => {
      Alert.alert('Em desenvolvimento', 'Funcionalidade de login biométrico será implementada em breve!');
   };

   const handlePinToggle = () => {
      Alert.alert('Em desenvolvimento', 'Funcionalidade de PIN de acesso será implementada em breve!');
   };

   const handleSavePin = () => {
      Alert.alert('Em desenvolvimento', 'Funcionalidade de salvar PIN será implementada em breve!');
   };

   return (
      <View style={styles.container}>
         {/* Header */}
         <Card style={styles.bannerTitle}>
            <View style={styles.chieldContainer}>
               <View style={styles.headerContent}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                     <Ionicons name="arrow-back" size={24} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.titulo}>Segurança</Text>
                  <View style={styles.placeholderButton} />
               </View>
            </View>
         </Card>

         <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Autenticação */}
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Autenticação</Text>

               <TouchableOpacity style={styles.menuItem} onPress={handleChangePassword}>
                  <View style={styles.menuItemLeft}>
                     <Ionicons name="lock-closed-outline" size={20} color="#666" />
                     <Text style={styles.menuText}>Alterar Senha</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
               </TouchableOpacity>

               <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                     <Ionicons name="finger-print-outline" size={20} color="#666" />
                     <Text style={styles.settingText}>Login Biométrico</Text>
                     <Text style={styles.settingDescription}>Usar impressão digital ou Face ID</Text>
                  </View>
                  <Switch
                     value={biometricEnabled}
                     onValueChange={handleBiometricToggle}
                     trackColor={{ false: '#e0e0e0', true: '#e0e0e0' }}
                     thumbColor="#ccc"
                     disabled={true}
                  />
               </View>

               <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                     <Ionicons name="key-outline" size={20} color="#666" />
                     <Text style={styles.settingText}>PIN de Acesso</Text>
                     <Text style={styles.settingDescription}>Código PIN de 4 dígitos</Text>
                  </View>
                  <Switch
                     value={requirePin}
                     onValueChange={handlePinToggle}
                     trackColor={{ false: '#e0e0e0', true: '#e0e0e0' }}
                     thumbColor="#ccc"
                     disabled={true}
                  />
               </View>

               {requirePin && (
                  <View style={styles.pinSection}>
                     <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Código PIN</Text>
                        <Input
                           value={pinCode}
                           onChangeText={setPinCode}
                           placeholder="Digite um PIN de 4 dígitos"
                           keyboardType="numeric"
                           maxLength={4}
                           secureTextEntry
                        />
                     </View>
                     <TouchableOpacity style={styles.savePinButton} onPress={handleSavePin}>
                        <Text style={styles.savePinText}>Salvar PIN</Text>
                     </TouchableOpacity>
                  </View>
               )}
            </View>

            <Divider style={styles.divider} />

            {/* Privacidade */}
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Privacidade</Text>

               <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                     <Ionicons name="eye-outline" size={20} color="#666" />
                     <Text style={styles.settingText}>Mostrar Saldo</Text>
                     <Text style={styles.settingDescription}>Exibir valores na tela inicial</Text>
                  </View>
                  <Switch
                     value={showBalance}
                     onValueChange={setShowBalance}
                     trackColor={{ false: '#767577', true: '#4ECDC4' }}
                  />
               </View>
            </View>

            <Divider style={styles.divider} />

            {/* Informações de Segurança */}
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Informações</Text>

               <View style={styles.infoCard}>
                  <Ionicons name="shield-checkmark-outline" size={24} color="#4ECDC4" />
                  <Text style={styles.infoTitle}>Seus dados estão seguros</Text>
                  <Text style={styles.infoText}>
                     Todas as informações são criptografadas e armazenadas de forma segura em nossos
                     servidores.
                  </Text>
               </View>

               <View style={styles.infoCard}>
                  <Ionicons name="lock-closed-outline" size={24} color="#4ECDC4" />
                  <Text style={styles.infoTitle}>Autenticação em duas etapas</Text>
                  <Text style={styles.infoText}>
                     Recomendamos ativar o login biométrico ou PIN para maior segurança.
                  </Text>
               </View>
            </View>

            <View style={{ height: 40 }} />
         </ScrollView>
      </View>
   );
}
