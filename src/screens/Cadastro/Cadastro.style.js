import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
   },
   group: {
      width: '90%',
      height: '25%',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 15,
      marginTop: 30,
   },

   input: {
      width: '90%',
      height: 50,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
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

   titulo: {
      fontSize: 30,
   },
   errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 2,
   },
});
