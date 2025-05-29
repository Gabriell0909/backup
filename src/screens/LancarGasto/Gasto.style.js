import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   bannerTitle: {
      transform: [{ rotate: '-3deg' }],
      marginTop: -35,
      marginStart: 19,
      minHeight: 170,
      width: '105%',
      right: 5,
      borderRadius: 25,
      justifyContent: 'center',
   },

   group: {
      width: '90%',
      height: '100%',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 15,
      marginTop: 10,
   },

   chieldContainer: {
      transform: [{ rotate: '3deg' }],
   },

   titulo: {
      color: 'white',
      textAlign: 'center',
      marginTop: 40,
      fontSize: 25,
   },

   containerViews: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
      flexDirection: 'row',
      width: '100%',
   },
   containerGroupButton: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 26,
      flexDirection: 'row',
   },

   containerGastos: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 22,
      flexDirection: 'row',
   },

   inputTitle: {
      width: '65%',
      height: 50,
      paddingStart: 10,
      borderWidth: 1,
      borderColor: 'black',
   },
   inputP: {
      width: '100%',
      paddingStart: 10,
   },

   inputDescricao: {
      height: 150,
      width: '100%',
      textAlignVertical: 'top',
      padding: 10,
      paddingTop: 5,

      borderWidth: 1,
      borderColor: 'black',
   },

   button: {
      marginTop: 0,
      width: '30%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      flexDirection: 'row',
   },

   calendario: {
      width: '20%',
      height: 50,
      marginTop: 0,
   },

   categoria: {
      width: '35%',
      height: 50,
      marginTop: 0,
      flexDirection: 'row',
      gap: 10,
   },

   textDescription: {
      fontSize: 15,
   },

   typeOfExpense: {
      minHeight: 35,
      width: 100,
      borderRadius: 20,
      marginTop: 10,
   },
   typeOfExpenseButton: {
      borderRadius: 25,
      minHeight: 40,
      width: 120,
   },
   titleTypeOfExpense: {
      textAlign: 'center',
      fontSize: 20,
   },
});
