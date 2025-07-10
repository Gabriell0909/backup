import { styles } from './Perfil.style';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState, useEffect } from 'react';

import Card from '../../components/card';
import icons from '../../constants/icons';
import Divider from '../../components/divider';
import { Deslogar } from '../../Auth/AuthLogout';
import { useAuth } from '../../Hooks/useAuth';

export default function Perfil({ navigation }) {
   const { user, refreshUser, updateUserDisplayName } = useAuth();
   const [imagem, setImagem] = useState({ uri: '' });

   // Atualiza o usuário quando a tela volta ao foco
   useFocusEffect(
      useCallback(() => {
         refreshUser();
      }, [refreshUser]),
   );

   // Monitora mudanças no usuário
   useEffect(() => {
      console.log('Perfil - useEffect user mudou:', user?.displayName);
   }, [user]);

   const handleLogoutSucess = () => {
      Alert.alert('Sair da Conta', 'Tem certeza que deseja sair?', [
         {
            text: 'Cancelar',
            style: 'cancel',
         },
         {
            text: 'Sair',
            style: 'destructive',
            onPress: () => Deslogar(),
         },
      ]);
   };

   const handleEditProfile = () => {
      // Navegar para o StackNavigator pai
      navigation.getParent()?.navigate('EditarPerfil');
   };

   const handleSecurity = () => {
      Alert.alert('Em desenvolvimento', 'Configurações de segurança serão implementadas em breve!');
   };

   const handlePrivacySettings = () => {
      // TODO: Implementar configurações de privacidade
      Alert.alert('Em desenvolvimento', 'Configurações de privacidade serão implementadas em breve!');
   };

   const handleHelpSupport = () => {
      // TODO: Implementar ajuda e suporte
      Alert.alert('Em desenvolvimento', 'Sistema de ajuda e suporte será implementado em breve!');
   };

   const handleAboutApp = () => {
      Alert.alert(
         'Sobre o Economiza',
         'Versão 1.0.0\n\nUm aplicativo para ajudar você a controlar suas finanças pessoais de forma simples e eficiente.',
         [{ text: 'OK' }],
      );
   };

   const handleDeleteAccount = () => {
      Alert.alert('Em desenvolvimento', 'Exclusão de conta será implementada em breve!');
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

   const getUserDisplayName = () => {
      console.log('Perfil - getUserDisplayName chamado, user:', user?.displayName);
      if (user?.displayName) return user.displayName;
      if (user?.email) return user.email.split('@')[0];
      return 'Usuário';
   };

   const getUserEmail = () => {
      return user?.email || 'email@exemplo.com';
   };

   return (
      <View style={styles.container}>
         <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <Card style={styles.bannerTitle}>
               <View style={styles.chieldContainer}>
                  <Text style={styles.titulo}>Sua Conta</Text>
                  <TouchableOpacity onPress={handleLogoutSucess} style={styles.logoutButton}>
                     <Ionicons name="exit-outline" size={24} color="#fff" />
                  </TouchableOpacity>
               </View>
            </Card>

            {/* User Info Section */}
            <View style={styles.containerUser}>
               <View style={styles.avatarContainer}>
                  {user?.photoURL ? (
                     <Image style={styles.avatar} source={{ uri: user.photoURL }} />
                  ) : (
                     <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>{getUserInitials(getUserDisplayName())}</Text>
                     </View>
                  )}
                  <TouchableOpacity style={styles.editAvatarButton}>
                     <Ionicons name="camera" size={16} color="#fff" />
                  </TouchableOpacity>
               </View>

               <Text style={styles.userName}>{getUserDisplayName()}</Text>
               <Text style={styles.userEmail}>{getUserEmail()}</Text>

               <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
                  <Ionicons name="create-outline" size={16} color="#333" />
                  <Text style={styles.editProfileText}>Editar Perfil</Text>
               </TouchableOpacity>
            </View>

            <Divider style={styles.divider} />

            {/* Menu Options */}
            <View style={styles.menuContainer}>
               <TouchableOpacity style={styles.menuItem} onPress={handleSecurity}>
                  <View style={styles.menuItemLeft}>
                     <View style={[styles.menuIcon, { backgroundColor: '#FF6B6B' }]}>
                        <Ionicons name="shield-checkmark-outline" size={20} color="#fff" />
                     </View>
                     <Text style={styles.menuText}>Segurança</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
               </TouchableOpacity>

               <TouchableOpacity style={styles.menuItem} onPress={handlePrivacySettings}>
                  <View style={styles.menuItemLeft}>
                     <View style={[styles.menuIcon, { backgroundColor: '#4ECDC4' }]}>
                        <Ionicons name="shield-checkmark-outline" size={20} color="#fff" />
                     </View>
                     <Text style={styles.menuText}>Privacidade</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
               </TouchableOpacity>

               <TouchableOpacity style={styles.menuItem} onPress={handleHelpSupport}>
                  <View style={styles.menuItemLeft}>
                     <View style={[styles.menuIcon, { backgroundColor: '#45B7D1' }]}>
                        <Ionicons name="help-circle-outline" size={20} color="#fff" />
                     </View>
                     <Text style={styles.menuText}>Ajuda e Suporte</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
               </TouchableOpacity>

               <TouchableOpacity style={styles.menuItem} onPress={handleAboutApp}>
                  <View style={styles.menuItemLeft}>
                     <View style={[styles.menuIcon, { backgroundColor: '#96CEB4' }]}>
                        <Ionicons name="information-circle-outline" size={20} color="#fff" />
                     </View>
                     <Text style={styles.menuText}>Sobre o App</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
               </TouchableOpacity>

               <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
                  <View style={styles.menuItemLeft}>
                     <View style={[styles.menuIcon, { backgroundColor: '#FF6B6B' }]}>
                        <Ionicons name="trash-outline" size={20} color="#fff" />
                     </View>
                     <Text style={[styles.menuText, { color: '#FF6B6B' }]}>Excluir Conta</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
               </TouchableOpacity>
            </View>

            {/* App Version */}
            <View style={styles.versionContainer}>
               <Text style={styles.versionText}>Versão 1.0.0</Text>
            </View>
         </ScrollView>
      </View>
   );
}
