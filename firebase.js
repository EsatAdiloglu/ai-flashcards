// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY || "AIzaSyD-z-SnH2bW1og8PP-QOHT2c3VLMJDQXpw",
  authDomain: process.env.FB_AUTH_DOMAIN || "aiflashcards-c3edc.firebaseapp.com",
  projectId: process.env.FB_PROJECT_ID || "aiflashcards-c3edc",
  storageBucket: process.env.FB_STORAGE_BUCKET || "aiflashcards-c3edc.appspot.com",
  messagingSenderId: process.env.FB_SENDER_ID || "144975017126",
  appId: process.env.FB_APP_ID || "1:144975017126:web:2142a789a9189a909e3067",
  measurementId: process.env.FB_MEASURE_ID || "G-60BZ5RYVQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}