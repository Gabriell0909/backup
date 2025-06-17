import { StyleSheet } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 15,
   },

   containerContent:{
      // alignItems: 'center',
   },

   viewIcon: {
      width: '100%',
   },

   CardNoImage: {
      width: '100%',
      aspectRatio: 1.7,
      borderRadius: 35,
      backgroundColor: '#232323',
      alignItems: 'center',
      marginVertical: 10,
   },

   cardImage: {
      width: '100%',
      aspectRatio: 1.7,
      borderRadius: 35,
      overflow: 'hidden',
      alignItems: 'center',
      marginVertical: 10,
   },

   text: {
      color: '#000',
      marginBottom: 5,
      fontWeight: '300',
   },

   textWallet: {
      color: '#fff',
      marginBottom: 5,
      fontWeight: '300',
   },

   sectionBalance: {
      gap: 5,
      alignItems: 'flex-start',
   },

   sectionButton: {
      alignItems: 'center',
   },

   button: {
      width:'50%',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderColor: '#0dd',
      borderWidth: 0,
      marginTop: 10,
      elevation: 4,
      shadowColor: 'white',
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
      elevation: 8,
      shadowColor: '#000',
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
      gap: 40,
      marginTop: 30,
   },

   wallet: {
      width: '100%',
      borderWidth: 1,
   },

   dropdown: {
      backgroundColor: '#fff',
      borderColor: '#ccc',
      marginBottom: 10,
   },

   dropdownBox: {
      backgroundColor: '#fff',
      borderColor: '#ccc',
   },

   placeholder: {
      color: 'grey',
   },

   selectIcon: {
      marginTop: 0,
      alignSelf: 'flex-start',
      width: 90,
   },

   contaItem: {
      width: 314,
      height: 60,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 5,
   },

   currencyInput: {
      borderWidth: 1,
      borderColor: '#000',
      width: '100%',
      height: 50,
      borderRadius: 10,
      paddingStart: 10,
   },
});
