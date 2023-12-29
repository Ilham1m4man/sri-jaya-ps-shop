"use server"

import { auth } from "../(firebase)/firebase.admin.config";

const getUserData = async (uid) => {
  const userRecord = await auth.getUser(uid)
  return userRecord.toJSON()
};

export default getUserData;
