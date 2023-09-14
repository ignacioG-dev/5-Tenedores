import React, {useState} from 'react'
import {  ScrollView, Alert } from 'react-native'
import {Icon, Avatar, Text} from "react-native-elements"
import * as ImagePicker from "expo-image-picker";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4 as uuid} from "uuid";
import {map, filter} from "lodash";
import {LoadingModal} from "../../../Shared"
import { styles } from './UploadImageForm.styles'; 


export function UploadImageForm(props) {
    const {formik} = props;

    const [isLoading, setIsLoading] = useState(false)

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
            setIsLoading(true);
            const url = await uploadImage(result.assets[0].uri);
        }
    }

    const uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function () {
            reject(new Error("uriToBlob failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
      };    

    const uploadImage = async (uri) => {
        const storage = getStorage();
        const storageRef = ref(storage, `restaurante/${uuid()}`);
        const blobFile = await uriToBlob(uri);
        try {
        const snapshot = await uploadBytes(storageRef, blobFile);
        updatePhotoUrl(snapshot.metadata.fullPath);
        const url = await getDownloadURL(snapshot.ref);
        return url;
        } catch (err) {
        console.log(err);
        return null;
        }
    };

    const updatePhotoUrl = async (imagePath) => {
        const storage = getStorage();
        const storageRef = ref(storage, imagePath);
    
        const imageUrl = await getDownloadURL(storageRef);

        formik.setFieldValue("images", [...formik.values.images, imageUrl]);

        setIsLoading(false);
    }    

    const removeImage = (img) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Estas seguro de eliminar ésta imagen?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    onPress: () =>{
                        const result = filter(
                            formik.values.images, 
                            (images) => images !== img
                        );
                        formik.setFieldValue("images", result);
                    },
                },
            ],
            {cancelable:false})
    }

    return (
        <>
            <ScrollView style={styles.viewImage} horizontal showsHorizontalScrollIndicator={false}>
                <Icon 
                    type="material-community" 
                    name="camera" 
                    color="#a7a7a7" 
                    containerStyle={styles.containerIcon}
                    onPress={openGallery}  
                />

                {map (formik.values.images, (images) => (
                    <Avatar
                        key={images}
                        source={{uri: images}}
                        containerStyle={styles.imageStyle}
                        onPress={() => removeImage(images)}
                    />
                ))}

            </ScrollView>

            <Text style={styles.error}>{formik.errors.images}</Text>

            <Text style={styles.nota}>Nota: Si desea eliminar una foto agregada solo debe pinchar en ella</Text>

            <LoadingModal show={isLoading} text = "Subiendo imagen" />
        </>
    );
}