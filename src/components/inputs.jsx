import { StyleSheet, TextInput, View } from 'react-native';

function Input({ value, erro, style, children,rightIcon, ...props }) {
   return (
      <View style={styles.container}>
         {children}
         <TextInput value={value} style={[styles.input, erro && styles.inputErro, style]} {...props} />
         {rightIcon}
      </View>
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
      paddingHorizontal: 10,
   },

   input: {
      flex: 1,
      height:'100%',
      borderRadius: 10,
      paddingLeft: 8,
      fontSize: 16,
   },

   inputErro: {
      borderColor: 'red',
   },
});

export default Input;
