import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   banner: {
      transform: [{ rotate: '-3deg' }],
      marginTop: -25,
      minHeight: 170,
      width: '105%',
      right: 5,
      borderRadius: 25,
      justifyContent: 'center',
   },

   title: {
      transform: [{ rotate: '3deg' }],
      textAlign: 'center',
      fontSize: 25,
      color: '#fff',
      marginTop: 30,
   },

   inputs: {
      width: '90%',
      paddingStart:10,
      marginTop:30
   },

   buttonC: {
      alignItems: 'center',
      justifyContent:'center',
      width: '25%',
      gap:5,
      flexDirection:'row',
   },

   btn:{
    marginTop:10,
   },

   containerButton: {
      width: '100%',
      alignItems: 'flex-start',
      paddingStart: 19,
      bottom: 30,
   },

   containerLista:{
      marginTop:40,
      width:'100%',
      height:'46%',
      alignItems:'center'
   }
});
