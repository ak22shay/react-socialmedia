// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAe64A1iP5Q9TfWzRqvbDhCF4LbyvehJo",
  authDomain: "react-socialmedia2.firebaseapp.com",
  projectId: "react-socialmedia2",
  storageBucket: "react-socialmedia2.appspot.com",
  messagingSenderId: "448243270534",
  appId: "1:448243270534:web:36e547350a005d69e0a207",
  measurementId: "G-CLG2SGBLSG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
