import { StyleSheet } from 'react-native';
import Card from './card';
import Wallet from './wallet';
import WalletDetail from './walletDetail';

export const OpenWallet = () => {
   return (
      <>
         <Wallet>
            <WalletDetail/>
         </Wallet>
      <Card>

      </Card>
      </>
   );
};

const styles = StyleSheet.create({
   card: {
      // backgroundColor:LinearGradient( to top right,   )
   },
});
