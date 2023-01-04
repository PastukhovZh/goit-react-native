import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBumE4855L8YzDlAuzlRFj4nmps6J9RfD0",
  authDomain: "react-native-f1d5a.firebaseapp.com",
  projectId: "react-native-f1d5a",
  storageBucket: "react-native-f1d5a.appspot.com",
  messagingSenderId: "723786424241",
  appId: "1:723786424241:web:999737459ba2ecaa8de790",
  measurementId: "G-THHHCBXV3Q"
};


export const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };

export const db = getFirestore(app);