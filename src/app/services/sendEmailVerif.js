"use client"

import firebase from "firebase/auth"

const sendEmailVerif = async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    // Send verification email
    /* let actionCodeSettings = {
      url: process.env.REACT_APP_URL,
      handleCodeInApp: true,
    }; */
    await user.sendEmailVerification().then(() => {
      console.log("email sent");
    }).catch((error) => {
      alert(error);
    });
  } else {
    alert('no user');
  }
}
export default sendEmailVerif
