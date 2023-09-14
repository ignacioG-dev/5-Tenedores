import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AccountScreen} from "../screens/Account/AccountScreen";
import {LoginScreen} from "../screens/Account/LoginScreen"
import {screen} from "../utils"
import {RegisterScreen} from "../screens/Account/RegisterScreen"

const Stack = createNativeStackNavigator();

export function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name = {screen.account.account}
                component={AccountScreen} 
                options={{title: "Cuenta"}}
            />
            <Stack.Screen 
                name = {screen.account.login}
                component={LoginScreen} 
                options={{title: "Iniciar Sesión"}}
            />
            <Stack.Screen 
                name = {screen.account.register}
                component={RegisterScreen} 
                options={{title: "Crear Cuenta"}}
            />            
        </Stack.Navigator>
    );
}