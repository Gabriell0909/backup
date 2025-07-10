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

   placeholderButton: {
      width: 40,
      height: 40,
   },

   scrollView: {
      flex: 1,
      marginTop: 20,
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
      flexDirection: 'column',
      flex: 1,
   },

   settingText: {
      fontSize: 16,
      color: '#333',
      marginLeft: 15,
      fontWeight: '500',
      marginBottom: 2,
   },

   settingDescription: {
      fontSize: 12,
      color: '#666',
      marginLeft: 15,
   },

   pinSection: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 12,
      marginTop: 10,
      elevation: 2,
   },

   inputGroup: {
      marginBottom: 15,
   },

   inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 8,
   },

   savePinButton: {
      backgroundColor: '#4ECDC4',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
   },

   savePinText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
   },

   divider: {
      width: '90%',
      marginVertical: 20,
      alignSelf: 'center',
   },

   infoCard: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 12,
      marginBottom: 15,
      elevation: 2,
      alignItems: 'center',
   },

   infoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 10,
      marginBottom: 8,
      textAlign: 'center',
   },

   infoText: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      lineHeight: 20,
   },
});
