import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
  const firebaseConfig = {

// Your web app's Firebase configuration
  apiKey: "AIzaSyCF1KhJSaBc7Ti6BMDal4Z7pSOuxWn_pKM",
  authDomain: "krud-82ac2.firebaseapp.com",
  projectId: "krud-82ac2",
  storageBucket: "krud-82ac2.appspot.com",
  messagingSenderId: "100365397507",
  appId: "1:100365397507:web:e57535806af5500410e836"
};

// Initialize Firebase



firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };




































