import { updateDoc, doc, Timestamp } from "firebase/firestore";
import { firestore } from "../(firebase)/firebase.config";

const updateProduk = async ({ idProduct, name, price, category, desc, userGuide, productImg }) => {
  const ref = doc(firestore, "products", idProduct);
  updateDoc(ref, {
    name,
    price,
    category,
    desc,
    userGuide,
    productImg,
    sentAt: Timestamp.now().toDate(),
  }).then(() => {
    return {berhasil: "Berhasil diupdate"}
  }).catch((err) => {
    return {gagal: "Gagal diupdate", err}
  });
}

export default updateProduk