import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../(firebase)/firebase.config";
import updateProduk from "./updateProduk";

const storeProduk = async (product) => {
  const { name, priceEcer, priceBakul, category, weight, desc, userGuide, productImg, imgFile } = product
  const price = { priceEcer, priceBakul }
  const { mainImage, optImage1, optImage2 } = imgFile

  const colRef = collection(firestore, "products");
  await addDoc(colRef, {
    name,
    price,
    category,
    weight,
    desc,
    userGuide,
    productImg,
    sentAt: Timestamp.now().toDate(),
  }).then(async (response) => {
    const idProduct = response.id
    let mainImgData = {name: "", URL: ""}
    let optImgData1 = {name: "", URL: ""}
    let optImgData2 = {name: "", URL: ""}

    const uploadProductImg = async (img) => {
      const imgRef = ref(
        storage,
        `images/product/${idProduct}/${img.name}`
      );

      await uploadBytes(imgRef, img);
      const imgURL = await getDownloadURL(imgRef);

      return {
        name: img.name, URL: imgURL
      };
    };

    if (mainImage && optImage1 && optImage2) {
      console.log("semua gambar")
      mainImgData = await uploadProductImg(mainImage)
      optImgData1 = await uploadProductImg(optImage1)
      optImgData2 = await uploadProductImg(optImage2)
    } else if (mainImage && optImage2) {
      console.log("main & opt2")
      mainImgData = await uploadProductImg(mainImage)
      optImgData2 = await uploadProductImg(optImage2)
    } else if (optImage1 && mainImage) {
      console.log("main & opt1")
      mainImgData = await uploadProductImg(mainImage)
      optImgData1 = await uploadProductImg(optImage1)
    } else if (optImage1 && optImage2) {
      console.log("opt1 & opt2")
      optImgData1 = await uploadProductImg(optImage1)
      optImgData2 = await uploadProductImg(optImage2)
    } else if (mainImage) {
      console.log("main")
      mainImgData = await uploadProductImg(mainImage)
    } else if (optImage1) {
      console.log("opt1")
      optImgData1 = await uploadProductImg(optImage1)
    } else if (optImage2) {
      console.log("opt2")
      optImgData2 = await uploadProductImg(optImage2)
    }

    await updateProduk({ ...product, price, idProduct, productImg: { ...product.productImg, mainImg: { ...product.productImg.mainImg, name: mainImgData.name, URL: mainImgData.URL }, optImg1: { ...product.productImg.optImg1, name: optImgData1.name, URL: optImgData1.URL }, optImg2: { ...product.productImg.optImg2, name: optImgData2.name, URL: optImgData2.URL } } })
  }).catch((err) => {
    window.alert(`${name} gagal ditambahkan, terjadi kesalahan dalam menambahkan produk \n \n Error: ${err}`)
    return `${name} gagal ditambahkan, terjadi kesalahan dalam menambahkan produk \n \n Error: ${err}`
  });
}

export default storeProduk