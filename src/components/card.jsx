import { StyleSheet, View } from 'react-native';

export default function Card({ children, style, f }) {
   return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      padding: 20,
      marginTop: 25,
      backgroundColor: '#232323',
      borderRadius: 15,
      minHeight: 100,
      maxHeight: 300,
      flexDirection: 'column',
      justifyContent: 'space-between',
   },
});
