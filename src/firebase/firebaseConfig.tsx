// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrNtPTqMyytJAt67fHNpdyq3IeXAswQ6I",
  authDomain: "persona-chatai.firebaseapp.com",
  projectId: "persona-chatai",
  storageBucket: "persona-chatai.firebasestorage.app",
  messagingSenderId: "653031227338",
  appId: "1:653031227338:web:767c54303880cbd3975933",
  measurementId: "G-8MCY4G5Q0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);