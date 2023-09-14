import React, { useState } from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { styles } from "./InfoUser.styles";

export function InfoUser(props) {
  const {setLoading, setLoadingText} = props;

  const { uid, photoURL, displayName, email } = getAuth().currentUser;

  const [avatar, setAvatar] = useState(photoURL)

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const url = await uploadImage(result.assets[0].uri);
      if (url) {
        setAvatar(url);
      }
    }
  };

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
    if (!uid) return null;
    setLoadingText("Actualizando Avatar")
    setLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);
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

    const auth = getAuth();

    updateProfile(auth.currentUser, {photoURL: imageUrl});

    setAvatar(imageUrl);

    setLoading(false);
  }

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{uri: avatar}}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>

      <View>
        <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}
