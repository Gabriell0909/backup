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

   titulo: {
      color: 'white',
      textAlign: 'center',
      fontSize: 25,
      marginTop: 42,
   },

   containerFiltro: {
      flexDirection: 'row',
      marginHorizontal: 10,
      marginTop: 10,
      gap: 15,
   },

   filtroBtn: {
      width: 'auto',
      paddingHorizontal: 10,
      minHeight: 40,
      borderRadius: 30,
      marginTop: 10,
   },

   filtroBtnAtivo: {
      backgroundColor: 'gray',
   },

   filtroBtnAtivoText: {
      color: 'white',
   },

   totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 20,
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: 'white',
      borderRadius: 12,
      elevation: 2,
   },

   totalLabel: {
      fontSize: 18,
      fontWeight: '400',
   },

   totalValue: {
      fontSize: 20,
      fontWeight: '500',
   },

   divider: {
      marginTop: 10,
      width: '90%',
      alignSelf: 'center',
   },

   listContainer: {
      paddingHorizontal: 15,
      paddingBottom: 20,
   },

   emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 50,
   },

   emptyText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
   },

   // Bottom Sheet Styles
   bottomSheetContent: {
      width: '100%',
      paddingHorizontal: 20,
   },

   bottomSheetTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 20,
   },

   infoContainer: {
      width: '100%',
      backgroundColor: 'white',
      elevation: 4,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
   },

   descContainer: {
      width: '100%',
      backgroundColor: 'white',
      elevation: 4,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
   },

   infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      gap: 15,
   },

   infoRowDesc: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 8,
      width: '100%',
   },

   descHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 6,
   },

   descValue: {
      fontSize: 16,
      color: '#666',
      lineHeight: 22,
      textAlign: 'left',
      paddingLeft: 30,
   },

   infoLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      minWidth: 80,
   },

   infoValue: {
      fontSize: 16,
      color: '#666',
      flex: 1,
   },

   statusContainer: {
      elevation: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
   },

   statusLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
   },

   statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
   },

   statusBadgeText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
   },

   actionButtons: {
      gap: 12,
      alignItems: 'center',
   },

   actionButton: {
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
   },

   actionButtonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: '600',
   },

   deleteButton: {
      borderColor: '#f44336',
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      marginTop: 8,
   },

   deleteButtonText: {
      fontSize: 16,
      fontWeight: '600',
   },
});
