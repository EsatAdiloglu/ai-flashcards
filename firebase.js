// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVG8r36bSqRnrxoaFe5W1s-CS1_iPCZ60",
  authDomain: "ai-flashcard-6f971.firebaseapp.com",
  projectId: "ai-flashcard-6f971",
  storageBucket: "ai-flashcard-6f971.appspot.com",
  messagingSenderId: "47402224466",
  appId: "1:47402224466:web:5a4316ee69ba5d6798888b",
  measurementId: "G-R3WTHZ91BT"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}