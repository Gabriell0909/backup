import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

export default function BottomSheetCustom({ sheetRef, children }) {
   const snapPoints = useMemo(() => ['50%', '70%'], []);

   const renderBackDrop = useCallback(
      (props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />,
      [],
   );


   return (
      <BottomSheet
         ref={sheetRef}
         index={-1}
         snapPoints={snapPoints}
         enablePanDownToClose={true}
         handleIndicatorStyle={styles.handleIndicator}
         backgroundStyle={styles.bottomSheetCustom}
         backdropComponent={renderBackDrop}
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

   bottomSheetCustom: {
      borderRadius: 30,
   },
});
