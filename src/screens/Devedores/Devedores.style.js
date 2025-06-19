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
      marginTop:10,
      marginBottom:40,
      flexDirection:'row',
      // borderWidth:0,
      // elevation:8,
   },

   btn:{
    marginTop:10,
   },

   containerButton: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent:'center',
      paddingStart: 19,
      bottom: 30,
      top: 10,
      
   },

   containerLista:{
      marginTop:40,
      width:'100%',
      height:'46%',
      alignItems:'center'
   }
});
