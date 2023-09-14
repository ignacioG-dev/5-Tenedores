

import * as React from "react";
import {View, ScrollView} from "react-native";
import {Text, Image, Button} from "react-native-elements";
import {useNavigation} from "@react-navigation/native"
import {LoginForm} from "../../../components/Auth"
import {screen} from "../../../utils"
import {styles} from "./LoginScreen.styles"
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from "@react-native-async-storage/async-storage"

WebBrowser.maybeCompleteAuthSession();

export function LoginScreen(){
    // Navegar entre paginas
    const navigation = useNavigation();

    const goToRegister = () => {
        navigation.navigate(screen.account.register);
    }

    // Vincular gmail de google
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "390319894228-964npb2gq5f60l87vv1ogv4v53jitgmv.apps.googleusercontent.com",
        iosClientId: "390319894228-73teohsao1q73le9mcgirmfoeevm7uuh.apps.googleusercontent.com",
        webClientId: "390319894228-jjklh2r50585qdogb71var102n3rdb69.apps.googleusercontent.com"
    })
    
    
    React.useEffect(() => {
        handleSingInWithGoogle();
    }, [response])
    
    async function handleSingInWithGoogle() {
        const user = await getLocalUser();
        if(!user){
            if(response?.type === "success"){
                getUserInfo(response.authentication.accessToken)
            }
        } else {
            setUserInfo(user);
        }
    }
    
    const getLocalUser = async () => {
        const data = await AsyncStorage.getItem("@user");
        if(!data) return null;
        return JSON.parse(data);
    }

    const getUserInfo = async (token) => {
        if(!token) return;
        try{
            const response = await fetch (
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
        } catch (error){

        }
    }

    return (
        <ScrollView>
            <Image source={require("../../../../assets/Img/5-tenedores-letras-icono-logo.png")} 
            style= {styles.image} 
            />
            <View style = {styles.content} >
                <LoginForm/>

                <View style={styles.contentText}>
                    <Text> o </Text>
                </View>
                
                <View style={styles.contentBtn}>
                    <Text>{JSON.stringify(userInfo)}</Text>
                    <Button
                        buttonStyle={styles.googleButton}
                        containerStyle={styles.btnContainer}
                        title="Iniciar sesión con Google"
                        icon={{ type: "entypo", name: "google--with-circle", color: "white" }}
                        disabled={!request}
                        onPress={() => {
                            promptAsync();
                        }}
                    />
                    <Text style={styles.textRegister} >
                        ¿Aún no tienes cuenta?  
                        <Text style={styles.btnRegister} onPress={goToRegister} >
                            Registrarse
                        </Text>
                    </Text>
                </View>
            </View>


        </ScrollView>
    )
}