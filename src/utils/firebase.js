
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCxRCHfvq6vNOEHEOLONYyMEnn03e5zaL4",
  authDomain: "tenedores-141a9.firebaseapp.com",
  projectId: "tenedores-141a9",
  storageBucket: "tenedores-141a9.appspot.com",
  messagingSenderId: "1012916595332",
  appId: "1:1012916595332:web:55a5c3d7e4ed05ba3970d1"
};

export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);