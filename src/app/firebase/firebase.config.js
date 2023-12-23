// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASH-InjMS8MggycH1knfADrCZSSnzD6Vo",
  authDomain: "sri-jaya-shop.firebaseapp.com",
  projectId: "sri-jaya-shop",
  storageBucket: "sri-jaya-shop.appspot.com",
  messagingSenderId: "444887601758",
  appId: "1:444887601758:web:88e43db11d68684d529acf",
  measurementId: "G-M0N07F1YHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const storage = getStorage(app)

export { app, auth, storage }