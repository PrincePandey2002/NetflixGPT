// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvwCMXFl1e9n0pEDJTG3BIjtN30qb74fw",
  authDomain: "netflixgpt-95363.firebaseapp.com",
  projectId: "netflixgpt-95363",
  storageBucket: "netflixgpt-95363.firebasestorage.app",
  messagingSenderId: "660140373399",
  appId: "1:660140373399:web:7c0a743ddf18a7d30a00d2",
  measurementId: "G-98SQJL42EN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();