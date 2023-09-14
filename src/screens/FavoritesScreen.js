import React, {useState, useEffect} from "react";
import { ScrollView, Text } from "react-native";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {
    doc, 
    getDoc, 
    collection, 
    where, 
    query, 
    onSnapshot
} from "firebase/firestore";
import {size, map} from "lodash"
import {db} from "../utils"
import {Loading} from "../components/Shared"
import {UserNotLogged, NotFoundRestaurant, RestaurantFavorite} from "../components/Favorites"

export function FavoritesScreen(){
    const auth = getAuth();
    const [hasLogged, setHasLogged] = useState(null)
    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setHasLogged(user ? true : false);
        });
      }, []);

    useEffect(() => {
        if (auth?.currentUser) {
          const q = query(
            collection(db, "favorites"),
            where("idUser", "==", auth.currentUser.uid)
          );
          onSnapshot(q, async (snapshot) => {
            let restaurantArray = [];
            for await (const item of snapshot.docs) {
              const data = item.data();
              const docRef = doc(db, "restaurante", data.idRestaurant);
              const docSnap = await getDoc(docRef);
              const newData = docSnap.data();
              newData.idFavorite = data.id;
              restaurantArray.push(newData);
            }
            setRestaurants(restaurantArray);
          });
        }
      }, [auth]);     

    if(!hasLogged) return <UserNotLogged />;
    
    if(!restaurants) return <Loading show text="Cargando favoritos"/>;

    if(size(restaurants) === 0) return <NotFoundRestaurant />

    return (
        <ScrollView>
            {map (restaurants, (restaurant) => (
                <RestaurantFavorite 
                    key={restaurant.id}
                    restaurant={restaurant}
                />
            )) }
        </ScrollView>
    );
}