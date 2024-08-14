// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL6wmgdxYIAKxoyS4vNHyONrHq1n2OqDQ",
  authDomain: "headstarter-project-4team.firebaseapp.com",
  projectId: "headstarter-project-4team",
  storageBucket: "headstarter-project-4team.appspot.com",
  messagingSenderId: "759175476228",
  appId: "1:759175476228:web:95148906a8a6930b243151",
  measurementId: "G-DDCN53PR5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);