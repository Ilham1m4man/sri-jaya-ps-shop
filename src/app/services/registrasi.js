"use server"

import { auth } from "../firebase/firebase.admin.config";

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
      const customToken = await auth.createCustomToken(uid)
      return customToken;
    } catch (error) {
      return error.errorInfo;
    }
  } else {
    try {
      // Buat pengguna Peretail baru
      const user = await auth.createUser({ displayName: name, email: email, phoneNumber: phone, password: password });

      // Menambah data sesuai jenis akun
      const uid = user.uid
      await auth.setCustomUserClaims(uid, { businessName: businessName, role: role });

      const customToken = await auth.createCustomToken(uid)
      return customToken;
    } catch (error) {
      return error.errorInfo;
    }
  }
};

export default registrasi;
