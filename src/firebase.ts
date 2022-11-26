// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRRsszI2qLpg9x-hCBUA7AJdwKEGH8LUs",
    authDomain: "avangardiotodoapp.firebaseapp.com",
    projectId: "avangardiotodoapp",
    storageBucket: "avangardiotodoapp.appspot.com",
    messagingSenderId: "340122843667",
    appId: "1:340122843667:web:55e19ebb7bac58b6af5de6"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
export const storage = getStorage(app);