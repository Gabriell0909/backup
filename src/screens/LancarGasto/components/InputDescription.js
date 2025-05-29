import { StyleSheet, TextInput, View } from 'react-native';

function InputDescription({ value, erro, style, children, rightIcon, ...props }) {
   return (
      <TextInput
         value={value}
         style={[styles.input, erro && styles.inputErro, style]}
         {...props}
      />
   );
}

const styles = StyleSheet.create({
   input: {
      height: '100%',
      borderRadius: 10,
      paddingLeft: 8,
      fontSize: 16,
   },

   inputErro: {
      borderColor: 'red',
   },
});

export default InputDescription;
