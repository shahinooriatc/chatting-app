// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword,
    updateProfile, signInWithEmailAndPassword,
    onAuthStateChanged, signOut
} from "firebase/auth";
import { getDatabase, set, ref, push ,onValue} from "firebase/database";


const firebaseConfig = {
    // Here Set your configuration files...
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
