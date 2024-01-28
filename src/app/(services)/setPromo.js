import { doc, setDoc, Timestamp } from "firebase/firestore";
import { firestore } from "../(firebase)/firebase.config";

const setPromo = async (freeShip) => {

  await setDoc(doc(firestore, "promos", "freeShip"), {
    freeShip,
    sentAt: Timestamp.now().toDate(),
  });
}

export default setPromo