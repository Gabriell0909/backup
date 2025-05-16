import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 15,
   },

   CardNoImage: {
      width: '100%',
      aspectRatio: 1.7,
      borderRadius: 15,
      backgroundColor: '#232323',
      alignItems: 'center',
      marginVertical: 10,
   },

   cardImage: {
      width: '100%',
      aspectRatio: 1.7,
      borderRadius: 15,
      overflow: 'hidden',
      alignItems: 'center',
      marginVertical: 10,
   },

   text: {
      color: '#fff',
   },

   sectionBalance: {
      gap: 5,
      alignItems: 'flex-start',
   },

   sectionButton: {
      alignItems: 'center',
   },

   button: {
      alignItems: 'center',
      backgroundColor: '#fff',
      borderColor: '#0dd',
      borderWidth: 0,
      //borderColor:'#0dd'
   },
   cardOptions: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
   },

   cardActionButton: {
      width: 80,
      height: 60,
      borderWidth: 0,
      marginTop: '0',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
   },

   circle: {
      width: 80,
      height: 80,
      borderRadius: 90,
      backgroundColor: '#363636',
      alignSelf: 'flex-end',
      margin: 15,
      borderColor: '#363636',
      borderWidth: 1,
   },

   containerActions: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 30,
   },
});
