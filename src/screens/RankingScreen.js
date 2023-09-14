import React, {useState, useEffect} from "react";
import {ScrollView} from "react-native";
import {collection,query,orderBy, limit,onSnapshot} from "firebase/firestore"
import { map } from "lodash"
import {RestaurantRanking} from "../components/Restaurant"
import {db} from "../utils"

export function RankingScreen(){
    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        const q = query(
            collection(db, "restaurante"),
            orderBy("ratingMedia", "desc"),
            limit(5)
        );

        onSnapshot(q, (snapshot) => {
            setRestaurants(snapshot.docs);
        })
    }, [])
    

    return (
        <ScrollView>
            {map(restaurants, (Restaurant, index) => (
                <RestaurantRanking 
                    key={index}
                    index= {index}
                    restaurant={Restaurant.data()}
                />
            ))}
        </ScrollView>
    );
}