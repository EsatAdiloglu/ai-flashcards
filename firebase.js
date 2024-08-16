// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-z-SnH2bW1og8PP-QOHT2c3VLMJDQXpw",
  authDomain: "aiflashcards-c3edc.firebaseapp.com",
  projectId: "aiflashcards-c3edc",
  storageBucket: "aiflashcards-c3edc.appspot.com",
  messagingSenderId: "144975017126",
  appId: "1:144975017126:web:2142a789a9189a909e3067",
  measurementId: "G-60BZ5RYVQ5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}