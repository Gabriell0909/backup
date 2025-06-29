import { StyleSheet, View } from 'react-native';

export default function WalletDetail({ children, style, ...props }) {
   return (
      <View style={[styles.container, style]} {...props}>
         {children}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      width: 288,
      height: 50,
      padding: 0,
      marginStart: 12,
      marginTop: 7,
      backgroundColor: 'rgba(108, 108, 108, 0.5)',
      borderRadius: 18,
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'absolute',
      transform: [{ rotate: '0deg' }],
    
   },
});
