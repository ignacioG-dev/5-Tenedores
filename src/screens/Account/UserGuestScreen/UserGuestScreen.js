import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, Image } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import {screen} from "../../../utils/"
import {styles} from "./UserGuestScreen.styles"

export function UserGuestScreen(){

    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate(screen.account.login);
    }

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.content}>
                <Image 
                    source={require("../../../../assets/Img/user-guest.png")} 
                    style={styles.image} 
                />
                <Text style={styles.title}>Consultar tu perfil de 5 tenedores</Text>
                <Text style={styles.description}>
                    ¿Cómo describirias tu mejor restaurante? Busca y visualiza los mejores
                    restaurantes de una forma sencilla, vota cúal te ha gustado más y
                    comenta como ha sido tu experiencia.
                </Text>

                <Button title="Ver tu perfil" onPress= {goToLogin} buttonStyle={styles.btnStyle} />
            </View>
        </ScrollView>
    )
}

