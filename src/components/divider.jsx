import { StyleSheet, View } from 'react-native';

export default function Divider({style}) {
   return <View style={[styles.line, style]}></View>;
}

const styles = StyleSheet.create({
   line: {
      width: '100%',
      height: 2,
      backgroundColor: '#8E8E8E',
      marginTop:10,
   },
});
