import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   bannerTitle: {
      transform: [{ rotate: '-3deg' }],
      marginTop: -35,
      marginStart:19,
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
      marginTop:40,
      fontSize: 25,
   },

   containerViews: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
   },

   inputTitle: {
      width: '60%',
      paddingStart: 10,
   },
   inputP: {
      width: '95%',
      paddingStart: 10,
   },

   inputDescricao: {
      height: 115,
      width: '95%',
      textAlignVertical: 'top',
      padding: 10,
      paddingTop: 5,
   },

   button: {
      marginTop: 0,
      width: '30%',
      height: 50,
      justifyContent:'center',
      alignItems:'center',
      gap:10,
      flexDirection:'row',

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
      flexDirection:'row',
      gap:10
   },

   textDescription: {
      fontSize:15,
   },

   typeOfExpense:{
      minHeight:35,
      width:100,
      borderRadius:20,
      marginTop:10,
   }
});
