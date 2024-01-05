import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
const admin = require("firebase-admin");

const serviceAccount = require('./service-account.json');

const alreadyCreatedApps = getApps();

const App = () => {
  try {
    return admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
  } catch {
    return alreadyCreatedApps[0]
  }
}

const auth = getAuth(App());

export { auth }