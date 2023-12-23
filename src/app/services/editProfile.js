"use server"

import { auth } from "../firebase/firebase.admin.config";

const editProfile = async (state) => {
  const { uid, name, phone, email, address, photo, businessName, role } = state
  console.log(state)

  const dataInputProfile = () => {
    if (photo) {
      return {
        email: email,
        phoneNumber: phone,
        displayName: name,
        photoURL: photo,
      }
    }
    return {
      email: email,
      phoneNumber: phone,
      displayName: name,
    }
  }

  const dataInputClaims = () => {
    if (role === "Peretail") {
      return {
        address: address, businessName: businessName, role: role
      }
    }
    return {
      address: address, role: role
    }
  }

  try {
      const updatedUser = await auth.updateUser(uid, dataInputProfile())
      const coba = await auth.setCustomUserClaims(uid, dataInputClaims())

      return updatedUser.toJSON()
  } catch (err) {
    return err;
  }
};

export default editProfile;
