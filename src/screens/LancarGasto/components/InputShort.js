import { StyleSheet, TextInput, View } from 'react-native';

function InputShort({ value, erro, style, children, rightIcon, ...props }) {
   // ...
   return (
      // ...
      <TextInput
         value={value}
         style={[styles.input, erro && styles.inputErro, style]}
         {...props} // <--- Este é o ponto crucial. Deveria funcionar.
      />
      // ...
   );
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      height: 50,
      paddingHorizontal: 5,
   },

   input: {
      height: '50%',
      borderRadius: 10,
      paddingLeft: 8,
      fontSize: 16,
   },

   inputErro: {
      borderColor: 'red',
   },
});

export default InputShort;
