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
      width: '85%',
      height: '20%',
      padding: 0,
      marginStart:12,
      marginTop: 30,
      backgroundColor: '#353535',
      borderRadius: 20,
      minHeight: 100,
      maxHeight: 300,
      flexDirection: 'column',
      position: 'absolute',
      transform:[{rotate:'-6deg'}],
   },
   // backgroundColor: '#353535',
});
