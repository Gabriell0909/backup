import { StyleSheet, TouchableOpacity, View  } from 'react-native';
export default function ButtonOpacity({ children, style, activeOpacity, Icon }) {
   return (
      <TouchableOpacity style={[styles.button, style]} activeOpacity={activeOpacity}>
         <View>
            {children}
            {Icon && <Icon></Icon>}
         </View>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   button: {
      width: 250,
      minHeight: 46,
      marginTop: 40,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
   },
});
