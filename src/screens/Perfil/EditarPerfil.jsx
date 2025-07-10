import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../Hooks/useAuth';
import Card from '../../components/card';
import ButtonCustom from '../../components/customButton';
import Divider from '../../components/divider';
import Input from '../../components/inputs';
import { styles } from './EditarPerfil.style';
import { auth } from '../../Config/FirebaseConfig';
import { updateProfile } from 'firebase/auth';

export default function EditarPerfil({ navigation }) {
   const { user, refreshUser, updateUserDisplayName } = useAuth();

   // Estados para dados do usuário
   const [displayName, setDisplayName] = useState('');
   const [email, setEmail] = useState('');
   const [photoURL, setPhotoURL] = useState('');
   const [currency, setCurrency] = useState('BRL');
   const [language, setLanguage] = useState('pt-BR');

   useEffect(() => {
      if (user) {
         setDisplayName(user.displayName || '');
         setEmail(user.email || '');
         setPhotoURL(user.photoURL || '');
      }
   }, [user]);

   const handleSaveProfile = async () => {
      try {
         if (!user) {
            Alert.alert('Erro', 'Usuário não autenticado.');
            return;
         }

         // Verifica se há mudanças
         if (!hasChanges()) {
            Alert.alert('Aviso', 'Nenhuma alteração foi feita.');
            navigation.goBack();
            return;
         }

         // Validação do nome
         if (!displayName.trim()) {
            Alert.alert('Erro', 'Por favor, insira um nome válido.');
            return;
         }

         // Atualiza o perfil no Firebase
         await updateProfile(user, {
            displayName: displayName.trim(),
         });

         // Atualiza o estado local imediatamente
         console.log('EditarPerfil - chamando updateUserDisplayName com:', displayName.trim());
         updateUserDisplayName(displayName.trim());

         Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
         navigation.goBack();
      } catch (error) {
         console.error('Erro ao atualizar perfil:', error);
         Alert.alert('Erro', 'Não foi possível atualizar o perfil. Tente novamente.');
      }
   };

   const handleChangePhoto = () => {
      // Funcionalidade desabilitada por enquanto
   };

   const hasChanges = () => {
      const originalName = user?.displayName || '';
      return displayName.trim() !== originalName;
   };

   const getUserDisplayName = () => {
      if (user?.displayName) return user.displayName;
      if (user?.email) return user.email.split('@')[0];
      return 'Usuário';
   };

   const getUserInitials = (name) => {
      if (!name) return 'U';
      return name
         .split(' ')
         .map((word) => word.charAt(0))
         .join('')
         .toUpperCase()
         .slice(0, 2);
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
                  <Text style={styles.titulo}>Editar Perfil</Text>
                  <TouchableOpacity
                     onPress={handleSaveProfile}
                     style={[styles.saveButton, { opacity: hasChanges() ? 1 : 0.5 }]}
                  >
                     <Ionicons name="checkmark" size={24} color="#fff" />
                  </TouchableOpacity>
               </View>
            </View>
         </Card>

         {/* Foto de Perfil - Estática */}
         <View style={styles.photoSection}>
            <View style={styles.photoContainer}>
               {photoURL ? (
                  <Image style={styles.photo} source={{ uri: photoURL }} />
               ) : (
                  <View style={styles.photoPlaceholder}>
                     <Text style={styles.photoText}>{getUserInitials(getUserDisplayName())}</Text>
                  </View>
               )}
               <View style={[styles.editPhotoButton, { backgroundColor: '#ccc' }]}>
                  <Ionicons name="camera" size={16} color="#fff" />
               </View>
            </View>
            <Text style={[styles.photoLabel, { color: '#ccc' }]}>Alteração de foto em breve</Text>
         </View>

         <Divider style={styles.divider} />

         {/* Conteúdo Scrollável */}
         <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Dados Pessoais */}
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Dados Pessoais</Text>

               <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nome</Text>
                  <Input value={displayName} onChangeText={setDisplayName} placeholder="Digite seu nome" />
               </View>

               <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>E-mail</Text>
                  <Input
                     value={email}
                     editable={false}
                     placeholder="Seu e-mail"
                     style={styles.disabledInput}
                  />
                  <Text style={styles.disabledText}>E-mail não pode ser alterado</Text>
               </View>
            </View>

            <View style={{ height: 40 }} />
         </ScrollView>
      </View>
   );
}
