import { addDoc, collection, Timestamp, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase.config";

const storeProduk = async ({ name, price, category, desc, userGuide, productImgURLs }) => {
  const ref = collection(firestore, "products");
  await addDoc(ref, {
    name,
    price,
    category,
    desc,
    userGuide,
    productImgURLs,
    sentAt: Timestamp.now().toDate(),
  }).then((response) => {
    return response
  }).catch((err) => {
    return err
  });
}

export default storeProduk