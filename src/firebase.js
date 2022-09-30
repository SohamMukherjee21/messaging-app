import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDVSHKnk_kvnlqclFe6yAYKsgQURC5NMc8",
  authDomain: "messenger-clone-b6afd.firebaseapp.com",
  projectId: "messenger-clone-b6afd",
  storageBucket: "messenger-clone-b6afd.appspot.com",
  messagingSenderId: "480220761368",
  appId: "1:480220761368:web:4e210d9d547c128307226d",
  measurementId: "G-MJJ9L1T49V",
});

const db = firebaseApp.firestore();

export default db;
