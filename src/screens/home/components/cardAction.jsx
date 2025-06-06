import { StyleSheet, View } from 'react-native';

export default function CardAction({ children, style, ...props }) {
   return (
      <View style={[styles.container, style]} {...props}>
         {children}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      padding: 20,
      marginTop:30,
      backgroundColor: '#353535',
      borderRadius: 15,
      minHeight: 100,
      maxHeight: 300,
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
   },
});
