// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword,
    updateProfile, signInWithEmailAndPassword,
    onAuthStateChanged, signOut
} from "firebase/auth";
import { getDatabase, set, ref, push ,onValue} from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBZxbPtcV4ZM8kjvYqLHDhel-usqPjyUAk",
    authDomain: "first-chatting-app-dee38.firebaseapp.com",
    projectId: "first-chatting-app-dee38",
    storageBucket: "first-chatting-app-dee38.appspot.com",
    messagingSenderId: "915015279563",
    appId: "1:915015279563:web:ab065f323a3bf5ab478c4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);


export {
    auth, createUserWithEmailAndPassword,
    updateProfile, db, ref, set,
    signInWithEmailAndPassword,
    onAuthStateChanged, signOut,push,getDatabase,onValue
}