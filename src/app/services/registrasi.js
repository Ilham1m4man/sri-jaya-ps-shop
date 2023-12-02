"use server"

import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import firebase from "firebase/auth";
var admin = require("firebase-admin");

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
const alreadyCreatedAps = getApps();
/* const app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) }) */
const App =
  !admin.app.length
    ? admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
    : alreadyCreatedAps[0];

    const userRecord = getAuth(App).getUserByEmail("ilham141623@gmail.com") 
userRecord.then((item) => {
  console.log(item.toJSON())
})

/* const auth = getAuth(App); */

/* const credential = App.auth.GoogleAuthProvider.credential(serviceAccount); */

/* import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { app, auth } from '../firebase/firebase.config'; */

// Fungsi registrasi
const registrasi = async ({ name, businessName, phone, email, password, role }) => {
  if (role === "konsumer") {
    try {
      // Buat pengguna Konsumer baru
      /* const user = await createUserWithEmailAndPassword(auth, email, password); */
      const user = await auth.createUser({ displayName:name ,email: email, password: password });

      // Menambah data sesuai jenis akun
      /* await setCustomClaims(user.user.uid, { displayName: name, role }); */
      /* await updateProfile(auth.currentUser, { displayName: name, role }); */
      const uid = user.uid
      await auth.setCustomUserClaims(uid, { role: role });

      // Kirim email verifikasi
      const userEmail = user.email
      
      await firebase.sendEmailVerification(userEmail)
      /* await sendEmailVerification(); */

      window.alert(
        "Email verifikasi telah dikirim ke email anda, lihat inbox atau folder spam anda!"
      );
      return user;
    } catch (error) {
      /* window.alert(error.message); */
      console.log(error.message)
      return error.message;
    }
  } else {
    try {
      // Buat pengguna Peretail baru
      const user = await app.auth().createUserWithEmailAndPassword(email, password);

      // Menambah data sesuai jenis akun
      await user.user.updateProfile({ displayName: name, businessName: businessName, phoneNumber: phone, role });

      // Kirim email verifikasi
      await user.sendEmailVerification();

      window.alert(
        "Email verifikasi telah dikirim ke email anda, lihat inbox atau folder spam anda!"
      );
      return user;
    } catch (error) {
      console.log(error.message);
      /* window.alert(error.message); */
      return error.message;
    }
  }
};

// Contoh penggunaan fungsi registrasi
export default registrasi;
