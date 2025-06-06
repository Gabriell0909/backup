import { StyleSheet, View } from 'react-native';

export default function Wallet({ children, style, ...props }) {
   return (
      <View style={[styles.container, style]} {...props}>
         {children}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      width: '90%',
      height: '20%',
      padding: 20,
      marginStart:3,
      marginTop: 30,
      backgroundColor: '#353535',
      borderRadius: 20,
      minHeight: 100,
      maxHeight: 300,
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'absolute',
      transform:[{rotate:'-6deg'}],
   },
});
