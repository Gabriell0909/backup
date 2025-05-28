import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   SafeArea: {
      flex: 1,
   },

   container: {
      flex: 1,
   },

   linear1: {
      flexDirection: 'row',
      marginTop: 25,
      justifyContent: 'space-between',
      marginHorizontal: 15,
   },
   linear2: {
      marginTop: 25,
      justifyContent: 'space-between',
      marginHorizontal: 15,
   },

   titulo: {
      fontSize: 25,
   },
   cardImage: {
      width: '100%',
      aspectRatio: 1.7,
      borderRadius: 35,
      overflow: 'hidden',
      alignItems: 'center',
      marginVertical: 10,
   },

   circle: {
      width: 120,
      height: 120,
      borderRadius: 90,
      backgroundColor: '#363636',
      alignSelf: 'center',
      margin: 15,
      borderColor: '#363636',
      borderWidth: 1,
   },

   containerUser: {
      alignItems: 'center',
      gap: 10,
      marginTop: 30,
   },

   divider: {
      width: '92%',
      marginTop: 20,
   },

});
