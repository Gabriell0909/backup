import { StyleSheet, TextInput, View } from 'react-native';

function Input({ value, erro, style, children, rightIcon, ...props }) {
   return <TextInput value={value ?? ''} style={[styles.input, erro && styles.inputErro, style]} {...props} />;
}

const styles = StyleSheet.create({
   input: {
      width: '100%',
      height: 50,
      borderRadius: 10,
      paddingLeft: 8,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#000',
   },

   inputErro: {
      borderColor: 'red',
   },
});

export default Input;
