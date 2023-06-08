import firebase  from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF1KhJSaBc7Ti6BMDal4Z7pSOuxWn_pKM",
  authDomain: "krud-82ac2.firebaseapp.com",
  projectId: "krud-82ac2",
  storageBucket: "krud-82ac2.appspot.com",
  messagingSenderId: "100365397507",
  appId: "1:100365397507:web:e57535806af5500410e836"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();







































