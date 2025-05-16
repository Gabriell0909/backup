import { StyleSheet, TextInput } from 'react-native';

function Input({ placeholder, maxLength, keyboardType, secureTextEntry, numberOfLines, onChangeText, erro, style, multiline }) {
   return (
      <>
         <TextInput
            onChangeText={onChangeText}
            editable
            keyboardType={keyboardType}
            placeholder={placeholder}
            maxLength={maxLength}
            numberOfLines={numberOfLines}
            multiline = {multiline}
            secureTextEntry={secureTextEntry}
            style={[styles.input, erro && styles.inputErro, style]}
         ></TextInput>
      </>
   );
}

const styles = StyleSheet.create({
   input: {
      width: '100%',
      height: 50,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
   },

   inputErro: {
      borderColor: 'red',
   },
});

export default Input;
