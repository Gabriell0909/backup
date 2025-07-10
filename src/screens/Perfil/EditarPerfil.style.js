import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
   },

   bannerTitle: {
      transform: [{ rotate: '-3deg' }],
      marginTop: -35,
      minHeight: 170,
      width: '105%',
      right: 5,
      borderRadius: 25,
      justifyContent: 'center',
   },

   chieldContainer: {
      transform: [{ rotate: '3deg' }],
   },

   headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 42,
   },

   titulo: {
      color: 'white',
      textAlign: 'center',
      fontSize: 25,
      marginTop: 42,
   },

   backButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
   },

   saveButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
   },

   scrollView: {
      flex: 1,
      marginTop: 20,
   },

   photoSection: {
      alignItems: 'center',
      paddingVertical: 30,
   },

   photoContainer: {
      position: 'relative',
      marginBottom: 15,
   },

   photo: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: '#fff',
      elevation: 3,
   },

   photoPlaceholder: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#4ECDC4',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: '#fff',
      elevation: 3,
   },

   photoText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#fff',
   },

   editPhotoButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#333',
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: '#fff',
   },

   photoLabel: {
      fontSize: 14,
      color: '#666',
      fontStyle: 'italic',
   },

   divider: {
      width: '90%',
      marginVertical: 20,
      alignSelf: 'center',
   },

   section: {
      paddingHorizontal: 20,
      marginBottom: 20,
   },

   sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 15,
   },

   inputGroup: {
      marginBottom: 20,
   },

   inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 8,
   },

   disabledInput: {
      backgroundColor: '#f5f5f5',
      color: '#999',
   },

   disabledText: {
      fontSize: 12,
      color: '#999',
      marginTop: 5,
      fontStyle: 'italic',
   },

   settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 10,
      borderRadius: 12,
      elevation: 2,
   },

   settingInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
   },

   settingText: {
      fontSize: 16,
      color: '#333',
      marginLeft: 15,
      fontWeight: '500',
   },

   menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 10,
      borderRadius: 12,
      elevation: 2,
   },

   menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
   },

   menuText: {
      fontSize: 16,
      color: '#333',
      marginLeft: 15,
      fontWeight: '500',
   },

   deleteButton: {
      backgroundColor: '#fff',
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 10,
      borderRadius: 12,
      elevation: 2,
      borderWidth: 1,
      borderColor: '#FF6B6B',
   },
});
