"use server"

import { auth } from "../(firebase)/firebase.admin.config";

const editProfile = async (state) => {
  const { uid, name, phone, email, address, cityAddress, photo, businessName, role } = state

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
        address: address, cityAddress: cityAddress, businessName: businessName, role: role
      }
    }
    return {
      address: address, cityAddress: cityAddress, role: role
    }
  }

  try {
    const updatedUser = await auth.updateUser(uid, dataInputProfile())
    await auth.setCustomUserClaims(uid, dataInputClaims())

    return updatedUser.toJSON()
  } catch (err) {
    return err.toJSON();
  }
};

export default editProfile;
