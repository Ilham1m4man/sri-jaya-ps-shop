"use server"

import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import sendEmailVerif from "./sendEmailVerif";
const admin = require("firebase-admin");
const fireUser = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyASH-InjMS8MggycH1knfADrCZSSnzD6Vo",
  authDomain: "sri-jaya-shop.firebaseapp.com",
  projectId: "sri-jaya-shop",
  storageBucket: "sri-jaya-shop.appspot.com",
  messagingSenderId: "444887601758",
  appId: "1:444887601758:web:88e43db11d68684d529acf",
  measurementId: "G-M0N07F1YHY"
};

const serviceAccount = require('G:\\Per-kuli-ahan\\SKRIPSI\\Final Project\\sri-jaya-ps-shop\\src\\app\\firebase\\service-account.json');

/* // Hapus FirebaseApp default
admin.app().delete();
 */
const alreadyCreatedApps = getApps();
/* const app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) }) */
const App = () => {
  try {
    return admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
  } catch {
    return alreadyCreatedApps[0]
  }
}
/* const App =
  admin.app.length === 0
    ? admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
    :  alreadyCreatedAps[0]; */
/* const userRecord = getAuth(App()).getUserByEmail("ilham141623@gmail.com")
userRecord.then((item) => {
  console.log(item.toJSON())
}) */
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for
  // this URL must be whitelisted in the Firebase Console.
  url: 'http://localhost:3000/',
  // This must be true for email link sign-in.
  handleCodeInApp: true,
  /* iOS: {
    bundleId: 'com.example.ios',
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12',
  },
  // FDL custom domain.
  dynamicLinkDomain: 'coolapp.page.link', */
};


const user = admin.auth(App()).getUser("IKSenEFUJZgP0HhCaKqD5D2j22J3")

/* user.then((item) => {
  console.log(item);
}) */

const auth = getAuth(App);

/* const credential = App.auth.GoogleAuthProvider.credential(serviceAccount); */

/* import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { app, auth } from '../firebase/firebase.config'; */

// Fungsi registrasi
const registrasi = async ({ name, businessName, phone, email, password, role }) => {
  if (role === "konsumer") {
    try {
      // Buat pengguna Konsumer baru
      /* const user = await createUserWithEmailAndPassword(auth, email, password); */
      const user = await auth.createUser({ displayName: name, email: email, password: password });

      // Menambah data sesuai jenis akun
      /* await setCustomClaims(user.user.uid, { displayName: name, role }); */
      /* await updateProfile(auth.currentUser, { displayName: name, role }); */
      const uid = user.uid
      await auth.setCustomUserClaims(uid, { role: role });
      return user;
    } catch (error) {
      window.alert(error.message);
      return error.message;
    }
  } else {
    try {
      // Buat pengguna Peretail baru
      const user = await auth.createUser({ displayName: name, email: email, phoneNumber: phone, password: password });

      // Menambah data sesuai jenis akun
      const uid = user.uid
      await auth.setCustomUserClaims(uid, { businessName: businessName, role: role });

      return user;
    } catch (error) {
      window.alert(error.message);
      return error.message;
    }
  }
};

export default registrasi;
