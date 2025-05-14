import { SafeAreaView } from "react-native-safe-area-context"
import { View,Text } from "react-native"


import Icons from "../../constants/icons"
import { Styles } from "./Recovery.style.js"
import Input from "../../components/inputs"
import ButtonC from "../../components/customButton.jsx"


export default function ResetPassword(){
    return(
        <SafeAreaView style={{flex:1}}>
            <View style ={Styles.container}>
                <Icons.Face/>

                <View style={Styles.view}>
                    <Input placeholder="digite sua nova senha" maxLength={20} keyboardType="default" secureTextEntry={true}/>
                    <Input placeholder="repita sua nova senha" maxLength={20} keyboardType="default"/>
                    <ButtonC>
                        <Text>Confirmar</Text>    
                    </ButtonC> 
                </View>
            </View>
        </SafeAreaView>
    )
}