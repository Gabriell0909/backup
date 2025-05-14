import { NavigationContainer } from "@react-navigation/native";
import NavigateStacks from "./stack.routes";

export default function Routes() {
    return (
        <NavigationContainer>
            <NavigateStacks />
        </NavigationContainer>
    );
}