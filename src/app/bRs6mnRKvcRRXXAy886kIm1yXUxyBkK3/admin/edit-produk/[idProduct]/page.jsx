"use client";

import Link from "next/link";
import Spinner from "@/components/loaders/Spinner";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";
import { useAppContext } from "@/app/(context)/AppWrapper";
import { useEffect, useReducer, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  query,
  where,
  onSnapshot,
  documentId,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/app/(firebase)/firebase.config";
import MainImgInput from "../../(components)/MainImgInput";
import OptImgInput from "../../(components)/OptImgInput";
import BasicInfoInput from "../../(components)/BasicInfoInput";
import MoreInfoInput from "../../(components)/MoreInfoInput";
import storeProduk from "@/app/(services)/storeProduk";

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

  const reducerProduct = (state, action) => {
    switch (action.type) {
      case "RESET":
        return null;
      case "SET_INITIAL_DATA":
        return action.value;
      case "SET_PRICE_ECER":
        const resultPriceEcer = { ...state, price: { ...state.price, priceEcer: action.value }};
        return resultPriceEcer;
      case "SET_PRICE_BAKUL":
        const resultPriceBakul = { ...state, price: { ...state.price, priceBakul: action.value }};
        return resultPriceBakul;
      default:
        const result = { ...state };
        result[action.type] = action.value;
        return result;
    }
  };

  const [product, dispatchProduct] = useReducer(reducerProduct, {});

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "priceEcer") {
      dispatchProduct({ type: "SET_PRICE_ECER", name, value });
    } else if (name === "priceBakul") {
      dispatchProduct({ type: "SET_PRICE_BAKUL", name, value });
    } else {
      dispatchProduct({ type: name, value });
    }
  };

  const batalHandler = () => {
    router.push(homeAdminURL);
  };

  const uploadProductImg = async () => {
    const imgRef = ref(
      storage,
      `images/product/${product.name}/${mainImage.name}`
    );
    const imgRefOpt1 =
      optImage1 &&
      ref(storage, `images/product/${product.name}/${optImage1.name}`);
    const imgRefOpt2 =
      optImage2 &&
      ref(storage, `images/product/${product.name}/${optImage2.name}`);

    let mainImgURL = "";
    let optImg1URL = "";
    let optImg2URL = "";

    if (mainImage && optImage1 && optImage2) {
      await uploadBytes(imgRef, mainImage);
      mainImgURL = await getDownloadURL(imgRef);

      await uploadBytes(imgRefOpt1, optImage1);
      optImg1URL = await getDownloadURL(imgRefOpt1);

      await uploadBytes(imgRefOpt2, optImage2);
      optImg2URL = await getDownloadURL(imgRefOpt2);
    } else if (mainImage && optImage1) {
      await uploadBytes(imgRef, mainImage);
      mainImgURL = await getDownloadURL(imgRef);

      await uploadBytes(imgRefOpt1, optImage1);
      optImg1URL = await getDownloadURL(imgRefOpt1);
    } else if (mainImage && optImage2) {
      await uploadBytes(imgRef, mainImage);
      mainImgURL = await getDownloadURL(imgRef);

      await uploadBytes(imgRefOpt2, optImage2);
      optImg2URL = await getDownloadURL(imgRefOpt2);
    } else if (optImage1 && optImage2) {
      await uploadBytes(imgRefOpt1, optImage1);
      optImg1URL = await getDownloadURL(imgRefOpt1);

      await uploadBytes(imgRefOpt2, optImage2);
      optImg2URL = await getDownloadURL(imgRefOpt2);
    } else if (mainImage) {
      await uploadBytes(imgRef, mainImage);
      mainImgURL = await getDownloadURL(imgRef);
    } else if (optImage1) {
      await uploadBytes(imgRefOpt1, optImage1);
      optImg1URL = await getDownloadURL(imgRefOpt1);
    } else if (optImage2) {
      await uploadBytes(imgRefOpt2, optImage2);
      optImg2URL = await getDownloadURL(imgRefOpt2);
    }
    return { mainImgURL, optImg1URL, optImg2URL };
  };

  const updateProduk = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const { name, price, category, desc, userGuide, productImgURLs } =
      dataFromServer;

    console.log(product);
    console.log(mainImage);
    console.log(optImage1);
    console.log(optImage2);

    /* if (mainImage || optImage1 || optImage2) {
      console.log("harusnya gk jalan");
      const imgURLs = await uploadProductImg();
      const { mainImgURL, optImg1URL, optImg2URL } = imgURLs
      if (mainImgURL === "") {
        await storeProduk({ ...product, productImgURLs: { ...product.productImgURLs, mainImgURL: productImgURLs.mainImgURL } });
      } else if (optImg1URL === "") {
        await storeProduk({ ...product, productImgURLs: { ...product.productImgURLs, optImg1URL: productImgURLs.optImg1URL } });
      } else if (optImg2URL === "") {
        await storeProduk({ ...product, productImgURLs: { ...product.productImgURLs, optImg2URL: productImgURLs.optImg2URL } });
      } else if (optImg1URL === "" && optImg2URL === "") {
        await storeProduk({ ...product, productImgURLs: { ...product.productImgURLs, optImg1URL: productImgURLs.optImg1URL, optImg2URL: productImgURLs.optImg2URL  } });
      } else if (optImg1URL === "" && mainImgURL === "") {
        await storeProduk({ ...product, productImgURLs: { ...product.productImgURLs, optImg1URL: productImgURLs.optImg1URL, mainImgURL: productImgURLs.mainImgURL  } });
      } else if (mainImgURL === "" && optImg2URL === "") {
        await storeProduk({ ...product, productImgURLs: { ...product.productImgURLs, mainImgURL: productImgURLs.mainImgURL, optImg2URL: productImgURLs.optImg2URL  } });
      } else if (optImg1URL === "" && optImg2URL === "" && mainImgURL === "") {
        await storeProduk({ ...product, productImgURLs: productImgURLs});
      }
    } */
    console.log("harusnya jalan");

    /* const imgURLs = await uploadProductImg();
    await storeProduk({ ...product, productImgURLs: imgURLs });

    router.push(homeAdminURL); */
    setIsUploading(false);
  };

  /*   useEffect(() => {
    dispatchProduct({ type: "CEK_MAIN_IMG" });
  }, [mainImage]); */

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
              <form onSubmit={updateProduk} className="grid gap-4">
                <section className="flex flex-wrap gap-4 w-full justify-around text-green-950">
                  {/* SECTION UNTUK INPUT NAMA, HARGA, KATEGORI, dan GAMBAR PRODUK */}
                  <BasicInfoInput
                    dataFromServer={dataFromServer}
                    isDisabled={isUploading}
                    onChange={onChange}
                  />
                  <MoreInfoInput
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
                        dataFromServer={dataFromServer}
                        isDisabled={isUploading}
                        setOptImage1={setOptImage1}
                      />
                      <OptImgInput
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
                      onClick={updateProduk}
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
