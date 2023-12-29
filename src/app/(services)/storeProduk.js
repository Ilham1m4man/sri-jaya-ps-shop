import { addDoc, collection, Timestamp } from "firebase/firestore";
import { firestore } from "../(firebase)/firebase.config";

const storeProduk = async ({ name, priceEcer, priceBakul, category, desc, userGuide, productImgURLs }) => {
  const price = { priceEcer, priceBakul }

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
    window.alert(`${name} berhasil ditambahkan`)
  }).catch((err) => {
    window.alert(`${name} gagal ditambahkan, terjadi kesalahan dalam menambahkan produk \n \n Error: ${err}`)
  });
}

export default storeProduk