import { ref, deleteObject } from "firebase/storage";
import { deleteDoc, doc, } from "firebase/firestore";
import { firestore, storage } from "../(firebase)/firebase.config";

const deleteProduk = async ({ idProduct, name, price, category, desc, userGuide, productImg }) => {
  const { mainImg, optImg1, optImg2 } = productImg
  const firestoreRef = doc(firestore, "products", idProduct);
  const deleteImg = async (imgName) => {
    const imgRef = ref(storage, `images/product/${name}/${imgName}`);

    await deleteObject(imgRef)
      .then(() => { })
      .catch((error) => {
        window.alert(
          `Terjadi kesalahan, mohon coba lagi \n \n Error: ${error}`
        );
      });
  };

  !!mainImg.URL && deleteImg(mainImg.name)
  !!optImg1.URL && deleteImg(optImg1.name)
  !!optImg2.URL && deleteImg(optImg2.name)

  deleteDoc(firestoreRef).then((res) => {
    window.alert(`${name} (${idProduct}) berhasil dihapus`)
    return (res)
  }).catch((err) => {
    window.alert("Terjadi kesalahan, mohon coba lagi \n \n" + err)
    return err
  })

}

export default deleteProduk