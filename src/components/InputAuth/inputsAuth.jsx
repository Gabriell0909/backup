import { StyleSheet, TextInput, View } from 'react-native';

function InputAuth({ value, erro, style, children, rightIcon, ...props }) {
   return (
      <View style={[styles.container, erro && styles.containerErro, style]}>
         {children}
         <TextInput value={value ?? ''} style={styles.input} {...props} />
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
      height: '100%',
      borderRadius: 10,
      paddingLeft: 8,
      fontSize: 16,
   },

   containerErro: {
      borderColor: 'red',
      borderWidth: 1,
   },
});

export default InputAuth;
