import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StatusBar } from "react-native";


import Icons from "../../constants/icons";
import {Styles} from "./Recovery.style.js";
import Input from "../../components/inputs.jsx"
import Button from "../../components/customButton.jsx"

export default function Recovery({navigation}) {
  return (
    <SafeAreaView style ={{flex:1}}>
        <StatusBar barStyle={"dark-content"}/>
        <View style={Styles.container}>
            <Icons.Face />

            <View style={Styles.view}>
                <Input style={Styles.input} placeholder="exemplo123@gmail.com" maxLength={40}/>
            </View>

            <Text style={Styles.texto}>
                Você receberá em instantes um e-mail {'\n'} para alteração da senha
            </Text>

            <Icons.Pig style={Styles.pig}/>

            <View style={{marginTop:140, flex:1}}>
                <Button onPress={()=>{navigation.navigate('')}}>
                    <Text>Enviar</Text>
                </Button>
            </View>
        </View>
    </SafeAreaView>
          
  );
}
