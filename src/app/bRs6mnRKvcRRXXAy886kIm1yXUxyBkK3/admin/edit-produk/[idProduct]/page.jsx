"use client";

import Link from "next/link";
import Spinner from "@/components/loaders/Spinner";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";
import { useAppContext } from "@/app/(context)/AppWrapper";
import { useEffect, useReducer, useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  query,
  where,
  onSnapshot,
  documentId,
} from "firebase/firestore";
import { firestore, storage } from "@/app/(firebase)/firebase.config";
import MainImgInput from "../../(components)/MainImgInput";
import OptImgInput from "../../(components)/OptImgInput";
import BasicInfoInput from "../../(components)/BasicInfoInput";
import MoreInfoInput from "../../(components)/MoreInfoInput";
import updateProduk from "@/app/(services)/updateProduk";

export default function EditProduk({ params }) {
  const { isLoading, hideLoading, showLoading } = useAppContext();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mainImage, setMainImage] = useState();
  const [optImage1, setOptImage1] = useState();
  const [optImage2, setOptImage2] = useState();
  const [dataFromServer, setDataFromServer] = useState();
  const router = useRouter();
  const homeAdminURL = "/bRs6mnRKvcRRXXAy886kIm1yXUxyBkK3/admin";

  useEffect(() => {
    const cekProduk = async () => {
      showLoading();
      const colRef = collection(firestore, "products");
      const q = query(colRef, where(documentId(), "==", params.idProduct));

      onSnapshot(q, (doc) => {
        doc.docs.map((item) => {
          setDataFromServer({ ...item.data(), idProduct: item.id });
          return dispatchProduct({
            type: "SET_INITIAL_DATA",
            value: { ...item.data(), idProduct: item.id },
          });
        });
      });
    };

    cekProduk();
  }, []);

  const reducerProduct = (state, action) => {
    switch (action.type) {
      case "RESET":
        return null;
      case "SET_INITIAL_DATA":
        return action.value;
      case "CEK_EDIT":
        if (dataFromServer) {
          const { name, price, category, desc, userGuide, productImg } =
            dataFromServer;
          const { priceBakul, priceEcer } = price;
          const { mainImg, optImg1, optImg2 } = productImg;

          if (
            state?.name == name &&
            state?.price?.priceEcer == priceEcer &&
            state?.price?.priceBakul == priceBakul &&
            state?.category == category &&
            state?.desc == desc &&
            state?.userGuide == userGuide &&
            mainImage == mainImg.URL &&
            optImage1 == optImg1.URL &&
            optImage2 == optImg2.URL
          ) {
            setIsDisabled(true);
            return state;
          }
          setIsDisabled(false);
          return state;
        }
      case "SET_PRICE_ECER":
        const resultPriceEcer = {
          ...state,
          price: { ...state.price, priceEcer: action.value },
        };
        return resultPriceEcer;
      case "SET_PRICE_BAKUL":
        const resultPriceBakul = {
          ...state,
          price: { ...state.price, priceBakul: action.value },
        };
        return resultPriceBakul;
      default:
        const result = { ...state };
        result[action.type] = action.value;
        return result;
    }
  };

  const [product, dispatchProduct] = useReducer(reducerProduct, {});
  const { name, price, category, desc, userGuide } = product;
  let priceBakul;
  let priceEcer;
  price && (priceEcer = price.priceEcer);
  price && (priceBakul = price.priceBakul);

  useEffect(() => {
    dispatchProduct({ type: "CEK_EDIT" });
  }, [
    name,
    priceBakul,
    priceEcer,
    category,
    desc,
    userGuide,
    mainImage,
    optImage1,
    optImage2,
  ]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "priceEcer") {
      dispatchProduct({ type: "SET_PRICE_ECER", value });
    } else if (name === "priceBakul") {
      dispatchProduct({ type: "SET_PRICE_BAKUL", value });
    } else {
      dispatchProduct({ type: name, value });
    }
  };

  const batalHandler = () => {
    router.push(homeAdminURL);
  };

  const uploadImage = async (dataImg) => {
    const imgRef = ref(
      storage,
      `images/product/${product.name}/${dataImg.name}`
    );
    await uploadBytes(imgRef, dataImg);
    const imgURL = await getDownloadURL(imgRef);
    return imgURL;
  };

  const deleteImg = async (imgName) => {
    const imgRef = ref(storage, `images/product/${product.name}/${imgName}`);

    await deleteObject(imgRef)
      .then(() => {})
      .catch((error) => {
        window.alert(
          `Terjadi kesalahan, mohon coba lagi \n \n Error: ${error}`
        );
      });
  };

  const updateProduks = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const { name, productImg } = dataFromServer;

    if (product.name !== name) {
      
    }

    if (optImage1 !== productImg.optImg1.URL && optImage1 === "") {
      console.log("ini 1");
      await deleteImg(product.productImg.optImg1.name);
      await updateProduk({
        ...product,
        productImg: {
          ...product.productImg,
          optImg1: {
            ...product.productImg.optImg1,
            name: "",
            URL: "",
          },
        },
      });
    } else if (optImage2 !== productImg.optImg2.URL && optImage2 === "") {
      console.log("ini 2");
      await deleteImg(product.productImg.optImg2.name);
      await updateProduk({
        ...product,
        productImg: {
          ...product.productImg,
          optImg2: {
            ...product.productImg.optImg2,
            name: "",
            URL: "",
          },
        },
      });
    } else if (
      optImage1 !== productImg.optImg1.URL &&
      optImage1 === "" &&
      optImage2 !== productImg.optImg2.URL &&
      optImage2 === ""
    ) {
      console.log("ini 3");
      await deleteImg(product.productImg.optImg1.name);
      await deleteImg(product.productImg.optImg2.name);
      await updateProduk({
        ...product,
        productImg: {
          ...product.productImg,
          optImg1: {
            ...product.productImg.optImg1,
            name: "",
            URL: "",
          },
          optImg2: {
            ...product.productImg.optImg2,
            name: "",
            URL: "",
          },
        },
      });
    }

    if (typeof mainImage === "object") {
      console.log("ini 4");
        await deleteImg(product.productImg.mainImg.name);
      const mainImgURL = await uploadImage(mainImage);
      await updateProduk({
        ...product,
        productImg: {
          ...product.productImg,
          mainImg: {
            ...product.productImg.mainImg,
            name: mainImage.name,
            URL: mainImgURL,
          },
        },
      });
    } else if (typeof optImage1 === "object") {
      console.log("ini 5");
      if (productImg.optImg1.URL !== "") {
        await deleteImg(product.productImg.optImg1.name);
      }
      const optImgURL1 = await uploadImage(optImage1);
      await updateProduk({
        ...product,
        productImg: {
          ...product.productImg,
          optImg1: {
            ...product.productImg.optImg1,
            name: optImage1.name,
            URL: optImgURL1,
          },
        },
      });
    } else if (typeof optImage2 === "object") {
      console.log("ini 6");
      if (productImg.optImg2.URL !== "") {
        await deleteImg(product.productImg.optImg2.name);
      }
      const optImgURL2 = await uploadImage(optImage2);
      await updateProduk({
        ...product,
        productImg: {
          ...product.productImg,
          optImg2: {
            ...product.productImg.optImg2,
            name: optImage2.name,
            URL: optImgURL2,
          },
        },
      });
    } else if (typeof optImage2 === "object" && typeof optImage1 === "object") {
      console.log("ini 7");
      if (productImg.optImg1.URL !== "" && productImg.optImg2.URL !== "") {
        await deleteImg(product.productImg.optImg1.name);
        await deleteImg(product.productImg.optImg2.name);
      }
      const optImgURL1 = await uploadImage(optImage1);
      const optImgURL2 = await uploadImage(optImage2);
      await updateProduk({
        ...product,
        productImg: {
          ...product.productImg,
          optImg1: {
            ...product.productImg.optImg1,
            name: optImage1.name,
            URL: optImgURL1,
          },
          optImg2: {
            ...product.productImg.optImg2,
            name: optImage2.name,
            URL: optImgURL2,
          },
        },
      });
    } else if (typeof optImage2 === "object" && typeof mainImage === "object") {
      console.log("ini 8");
      await deleteImg(product.productImg.mainImg.name);
      if (productImg.optImg2.URL !== "") {
        await deleteImg(product.productImg.optImg2.name);
      }
      const maimImgURL = await uploadImage(mainImage);
      const optImgURL2 = await uploadImage(optImage2);
      await updateProduk({
        ...product,
        productImg: {
          ...product.productImg,
          mainImg: {
            ...product.productImg.mainImg,
            name: mainImage.name,
            URL: maimImgURL,
          },
          optImg2: {
            ...product.productImg.optImg2,
            name: optImage2.name,
            URL: optImgURL2,
          },
        },
      });
    } else if (typeof optImage1 === "object" && typeof mainImage === "object") {
      console.log("ini 9");
      await deleteImg(product.productImg.mainImg.name);
      if (productImg.optImg1.URL !== "") {
        await deleteImg(product.productImg.optImg1.name);
      }
      const maimImgURL = await uploadImage(mainImage);
      const optImgURL1 = await uploadImage(optImage1);
      await updateProduk({
        ...product,
        productImg: {
          ...product.productImg,
          mainImg: {
            ...product.productImg.mainImg,
            name: mainImage.name,
            URL: maimImgURL,
          },
          optImg1: {
            ...product.productImg.optImg1,
            name: optImage1.name,
            URL: optImgURL1,
          },
        },
      });
    } else if (
      typeof optImage2 === "object" &&
      typeof optImage1 === "object" &&
      typeof mainImage === "object"
    ) {
      console.log("ini 10");
      await deleteImg(product.productImg.mainImg.name);
      if (productImg.optImg1.URL !== "" && productImg.optImg2.URL === "") {
        await deleteImg(product.productImg.optImg1.name);
        await deleteImg(product.productImg.optImg2.name);
      }
      const maimImgURL = await uploadImage(mainImage);
      const optImgURL1 = await uploadImage(optImage1);
      const optImgURL2 = await uploadImage(optImage2);
      await updateProduk({
        ...product,
        productImg: {
          ...product.productImg,
          mainImg: {
            ...product.productImg.mainImg,
            name: mainImage.name,
            URL: maimImgURL,
          },
          optImg1: {
            ...product.productImg.optImg1,
            name: optImage1.name,
            URL: optImgURL1,
          },
          optImg2: {
            ...product.productImg.optImg2,
            name: optImage2.name,
            URL: optImgURL2,
          },
        },
      });
    }
    
    window.alert(`Data produk ${product.name} berhasil diupdate`)
    router.push(homeAdminURL);
    setIsUploading(false);
  };

  const customClassSpinner = "fill-grn-400 w-20 h-20";
  const customClassMiniSpinner = "fill-grn-600 w-12 h-6";

  hideLoading();

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen grid place-items-center bg-mainBg_clr">
          <Spinner customClass={customClassSpinner} />
        </div>
      ) : (
        <>
          <main
            className={`relative flex flex-col gap-0 md:gap-8 bg-mainBg_clr min-h-screen ${
              isUploading && "opacity-70 cursor-not-allowed"
            }`}
          >
            <div className="z-10 w-full h-[20vw] max-h-[70px] pl-[10px] sm:pl-[40px] md:pl-[80px] bg-title-grey justify-start items-center gap-2 md:gap-4 inline-flex">
              <Link href={"/bRs6mnRKvcRRXXAy886kIm1yXUxyBkK3/admin"}>
                <FaChevronLeft className="w-4 h-4 md:w-7 md:h-7 fill-ble-950 text-ble-950" />
              </Link>
              <h1 className="text-ble-900 text-lg md:text-3xl font-bold">
                Edit Produk {dataFromServer && dataFromServer.name}
              </h1>
            </div>
            <div className="container  mx-auto mb-4 px-4">
              <form onSubmit={updateProduks} className="grid gap-4">
                <section className="flex flex-wrap gap-4 w-full justify-around text-green-950">
                  {/* SECTION UNTUK INPUT NAMA, HARGA, KATEGORI, dan GAMBAR PRODUK */}
                  <BasicInfoInput
                    dataFromServer={dataFromServer}
                    isDisabled={isUploading}
                    onChange={onChange}
                  />
                  <MoreInfoInput
                    mainImage={mainImage}
                    dataFromServer={dataFromServer}
                    isDisabled={isUploading}
                    onChange={onChange}
                  />
                  {/* SECTION PETUNJUK PEMAKAIAN DAN KETERANGAN */}
                  <div className="bg-white flex flex-col gap-4 rounded-3xl shadow-xl p-4 grow">
                    <h3 className="font-bold text-base sm:text-xl">
                      Gambar Opsional Produk
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 h-full">
                      <OptImgInput
                        optImage1={optImage1}
                        dataFromServer={dataFromServer}
                        isDisabled={isUploading}
                        setOptImage1={setOptImage1}
                      />
                      <OptImgInput
                        optImage2={optImage2}
                        dataFromServer={dataFromServer}
                        isDisabled={isUploading}
                        setOptImage2={setOptImage2}
                      />
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl shadow-xl p-4 grow">
                    <h3 className=" font-bold text-base sm:text-xl mb-4">
                      Gambar Utama Produk
                    </h3>
                    <MainImgInput
                      dataFromServer={dataFromServer}
                      isDisabled={isUploading}
                      mainImage={mainImage}
                      setMainImage={setMainImage}
                    />
                  </div>
                </section>
                {/* SECTION TOMBOL BATAL & TOMBOL SIMPAN */}
                <section className="flex flex-wrap gap-4 w-full justify-end text-green-950">
                  <div className="flex gap-4">
                    <button
                      disabled={isUploading}
                      className="shadow-xl bg-footer_fontClr text-white hover:opacity-80 active:scale-95 transition-all text-base px-4 py-2 rounded-lg"
                      type="button"
                      onClick={batalHandler}
                    >
                      Batal
                    </button>
                    <button
                      disabled={isDisabled}
                      className={`shadow-xl bg-white hover:bg-gray-100 active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:bg-white transition-all text-base px-4 py-2 rounded-lg`}
                      type="submit"
                      onClick={updateProduks}
                    >
                      {isUploading ? (
                        <Spinner customClass={customClassMiniSpinner} />
                      ) : (
                        "Simpan"
                      )}
                    </button>
                  </div>
                </section>
              </form>
            </div>
          </main>
        </>
      )}
    </>
  );
}
