import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native"; // Añadido TouchableOpacity
import { Icon } from "react-native-elements";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {collection, onSnapshot, orderBy, query} from "firebase/firestore"
import {LoadingModal} from "../../../components/Shared"
import {ListRestaurants} from "../../../components/Restaurant"
import { screen, db } from "../../../utils";
import { styles } from "./RestaurantScreen.styles";

export function RestaurantScreen(props) {
    const { navigation } = props;
    const [currentUser, setCurrentUser] = useState(null)

    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) =>{
        setCurrentUser(user);
      });
    }, [])

    useEffect(() => {
        const q = query(
            collection(db, "restaurante"),
            orderBy("createdAt", "desc"),
            );

        onSnapshot(q, (snapshot) => {
            setRestaurants(snapshot.docs);
        })
    }, [])
    
    

    const goToAddRestaurant = () => {
        navigation.navigate(screen.restaurant.addRestaurant);
    };

    return (
        <View style={styles.content}>
            {!restaurants ? (
                <LoadingModal show text="Cargando" />
            ) : (
                <ListRestaurants restaurants  = {restaurants}/>
            )}

            
            
            {currentUser && (
                <TouchableOpacity style={styles.btnContainer}>
                <Icon
                    reverse
                    type="material-community"
                    name="plus"
                    color="#00a680"
                    onPress={goToAddRestaurant}
                    />
            </TouchableOpacity>
            )}
        </View>
    );
}
