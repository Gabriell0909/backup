import { View,Text } from "react-native";
import Semicirculo from "../../components/semicirculo"
import Icons from "../../constants/icons";
import { styles } from "../Splash/Splash.style";
import * as Progress from 'react-native-progress';

export default function Splash(){

    return(
        <View style = {{flex:1, alignItems:"center"}}>
            <Semicirculo/>
            <Icons.PieChartPana/>

            <View style={{alignItems:"center", gap:50, }}>
                <Text style={styles.appName}>Economiza</Text>
                <Icons.Economiza/>

                <Progress.Bar progress={0.7} width={200} color="#0077b6"/>
            </View>
        </View>
    )
}