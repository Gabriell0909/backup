import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

export default function BottomSheetCustom({ sheetRef, children }) {
   const snapPoints = useMemo(() => ['50%', '70%'], []);

   return (
      <BottomSheet
         ref={sheetRef}
         index={-1}
         snapPoints={snapPoints}
         style={styles.sheetView}
         enablePanDownToClose={true}
         handleIndicatorStyle={styles.handleIndicator}
         backgroundStyle = {styles.bottomSheetCustom}
      >
         <BottomSheetView>
            <View style={styles.contentContainer}>{children}</View>
         </BottomSheetView>
      </BottomSheet>
   );
}

const styles = StyleSheet.create({
   contentContainer: {
      alignItems: 'center',
      padding: 35,
      gap: 20,
   },

   handleIndicator: {
      backgroundColor: '#999',
      width: 45,
      height: 7,
   },

   bottomSheetCustom:{
      borderRadius:30,
   }
});
