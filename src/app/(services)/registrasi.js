"use server"

import { auth } from "../(firebase)/firebase.admin.config";

const registrasi = async ({ name, businessName, phone, email, password, role }) => {
  if (role === "Konsumer") {
    try {
      // Buat pengguna Konsumer baru
      const user = await auth.createUser({ displayName: name, email: email, password: password });

      // Menambah data sesuai jenis akun
      const uid = user.uid
      await auth.setCustomUserClaims(uid, { address: "", cityAddress: { value: "", label: "" }, role: role });
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
      await auth.setCustomUserClaims(uid, { address: "", cityAddress: { value: "", label: "" }, businessName: businessName, role: role });

      const customToken = await auth.createCustomToken(uid)
      return customToken;
    } catch (error) {
      return error.errorInfo;
    }
  }
};

export default registrasi;
