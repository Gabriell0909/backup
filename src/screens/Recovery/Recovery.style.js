import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
   container: {
      width: '100%',
      height: 'auto',
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
   },

   texto: {
      textAlign: 'center',
      marginTop: 30,
      fontSize: 15,
   },

   view: {
      width: '90%',
      marginTop: 150,
      alignItems: 'center',
      borderWidth:1,
      flexDirection:'row',
      borderRadius:10,
      justifyContent:'center',
      paddingStart:5
   },
   views: {
      width: '90%',
      marginTop: 130,
      alignItems: 'center',
      gap:20,
      flexDirection:'column',
      borderRadius:10,
      justifyContent:'center',
      paddingStart:5
   },

   pig: {
      position: 'relative',
      left: 100,
      top: 1,
   },
   
   input:{
    borderWidth:0,
    width:'85%'
   }
});
