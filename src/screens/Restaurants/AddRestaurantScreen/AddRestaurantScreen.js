import React from "react";
import { View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik"; 
import {v4 as uuid} from "uuid";
import {doc, setDoc} from "firebase/firestore"
import {useNavigation} from "@react-navigation/native"
import {
    InfoForm, 
    UploadImageForm, 
    ImageRestaurant
} from "../../../components/Restaurant/AddRestaurant"
import {db} from "../../../utils"
import {initialValue, validationSchema} from "./AddRestaurantScreen.data"
import { styles } from "./AddRestaurantScreen.styles";

export function AddRestaurantScreen(){

    const navigation = useNavigation();

    const formik= useFormik({
        initialValues: initialValue(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const newData = formValue;
                newData.id = uuid();
                newData.createdAt = new Date();
                
                await setDoc(doc(db, "restaurante", newData.id), newData);

                navigation.goBack();

            } catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <ImageRestaurant formik={formik} />

            <InfoForm formik={formik} />

            <UploadImageForm formik={formik} />

            <Button 
                title="Crear restaurante" 
                buttonStyle={styles.addRestaurant} 
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </ScrollView>
    );
}