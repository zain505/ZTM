// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDggAgsg6j7QyVpWVeLw3YaZSEgeEAGlQfw",
    authDomain: "clientpanel-cf444.firebsaseapp.com",
    databaseURL: "https://clientspanel-cf444.firebasseio.com",
    projectId: "clientpanel-cf444",
    storageBucket: "clientpanel-cf444.appspot.com",
    messagingSenderId: "7414015867521",
    appId: "1:74140251567521:web:4beb8030250dabe3fd5e60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export { storage , db};