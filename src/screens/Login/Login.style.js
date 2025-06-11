import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      width: '90%',
      height: '25%',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 15,
      marginTop: 15,
   },

   titulo: {
      fontSize: 30,
      textAlign: 'center',
   },

   button: {
      width: 250,
      height: 46,
      marginTop: 30,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
   },

   buttonDisabled: {
      opacity: 0.7,
      backgroundColor: '#f0f0f0',
   },

   recovery: {
      fontSize: 13,
      textDecorationLine: 'underline',
   },

   register: {
      fontSize: 15,
      textDecorationLine: 'underline',
   },
   containerInput: {
      flex: 1,
      width: '100%',
      height: 50,
      alignItems: 'center',
      flexDirection: 'row',
      paddingEnd: 15,
   },
});
