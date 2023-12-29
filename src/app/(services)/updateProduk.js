import { updateDoc, collection, Timestamp, query, where, documentId } from "firebase/firestore";
import { firestore } from "../(firebase)/firebase.config";

const updateProduk = async ({ idProduct, name, price, category, desc, userGuide, productImgURLs }) => {
  const ref = collection(firestore, "products");
  const q = query(ref, where(documentId(), "==", idProduct));
  await updateDoc(q, {
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

export default updateProduk