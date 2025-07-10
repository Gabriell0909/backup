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
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
   },

   filtroBtnAtivo: {
      backgroundColor: '#000',
      borderColor: '#000',
   },

   filtroText: {
      fontSize: 14,
      color: '#000',
   },

   filtroTextAtivo: {
      color: '#fff',
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

   cardGraficoPizza: {
      marginHorizontal: 15,
      marginTop: 20,
      marginBottom: 15,
      padding: 15,
      backgroundColor: 'white',
      borderRadius: 12,
      elevation: 2,
      alignItems: 'center',
      width: '90%',
      alignSelf: 'center',
      minHeight: 320,
   },

   cardGrafico: {
      marginHorizontal: 15,
      marginTop: 20,
      marginBottom: 50,
      padding: 15,
      backgroundColor: 'white',
      borderRadius: 12,
      elevation: 2,
      alignItems: 'center',
      width: '90%',
      alignSelf: 'center',
      minHeight: 350,
   },

   tituloGrafico: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
   },

   chartContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      width: '100%',
   },

   centerLabel: {
      alignItems: 'center',
      justifyContent: 'center',
   },

   centerLabelText: {
      fontSize: 14,
      color: '#666',
      fontWeight: '500',
   },

   centerLabelValue: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'bold',
   },

   emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
   },

   emptyText: {
      fontSize: 16,
      color: '#666',
      marginTop: 10,
      textAlign: 'center',
   },

   legendaContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 18,
      gap: 12,
   },
   legendaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
      marginBottom: 8,
   },
   legendaCor: {
      width: 18,
      height: 18,
      borderRadius: 5,
      marginRight: 7,
      borderWidth: 1,
      borderColor: '#bbb',
   },
   legendaTexto: {
      fontSize: 13,
      color: '#333',
      maxWidth: 90,
   },
});
