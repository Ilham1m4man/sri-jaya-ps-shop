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
} from "firebase/firestore";
import { storage, firestore } from "@/app/(firebase)/firebase.config";
import MainImgInput from "../(components)/MainImgInput";
import OptImgInput from "../(components)/OptImgInput";
import BasicInfoInput from "../(components)/BasicInfoInput";
import MoreInfoInput from "../(components)/MoreInfoInput";
import storeProduk from "@/app/(services)/storeProduk";
import updateProduk from "@/app/(services)/updateProduk";

export default function TambahProduk() {
  const { isLoading, hideLoading, showLoading } = useAppContext();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mainImage, setMainImage] = useState();
  const [optImage1, setOptImage1] = useState();
  const [optImage2, setOptImage2] = useState();
  const router = useRouter();
  const homeAdminURL = "/bRs6mnRKvcRRXXAy886kIm1yXUxyBkK3/admin";

  const reducerProduct = (state, action) => {
    switch (action.type) {
      case "RESET":
        return null;
      case "CEK_MAIN_IMG":
        if (mainImage === undefined || mainImage === null) {
          setIsDisabled(true);
          return state;
        }
        setIsDisabled(false);
        return state;
      default:
        const result = { ...state };
        result[action.type] = action.value;
        return result;
    }
  };

  const [product, dispatchProduct] = useReducer(reducerProduct, {});

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatchProduct({ type: name, value });
  };

  const batalHandler = () => {
    router.push(homeAdminURL);
  };

  const uploadProductImg = async (idProduct) => {
    const imgRef = ref(
      storage,
      `images/product/${idProduct}/${mainImage.name}`
    );
    const imgRefOpt1 =
      optImage1 &&
      ref(storage, `images/product/${idProduct}/${optImage1.name}`);
    const imgRefOpt2 =
      optImage2 &&
      ref(storage, `images/product/${idProduct}/${optImage2.name}`);

    await uploadBytes(imgRef, mainImage);
    const mainImgURL = await getDownloadURL(imgRef);

    let optImg1URL = "";
    let optImg2URL = "";

    if (optImage1 && optImage2) {
      await uploadBytes(imgRefOpt1, optImage1);
      optImg1URL = await getDownloadURL(imgRefOpt1);

      await uploadBytes(imgRefOpt2, optImage2);
      optImg2URL = await getDownloadURL(imgRefOpt2);
    } else if (optImage1) {
      await uploadBytes(imgRefOpt1, optImage1);
      optImg1URL = await getDownloadURL(imgRefOpt1);
    } else if (optImage2) {
      await uploadBytes(imgRefOpt2, optImage2);
      optImg2URL = await getDownloadURL(imgRefOpt2);
    }
    return {
      mainImg: { name: mainImage.name, URL: mainImgURL },
      optImg1: { name: optImage1 ? optImage1.name : "", URL: optImg1URL },
      optImg2: { name: optImage2 ? optImage2.name : "", URL: optImg2URL },
    };
  };

  const uploadProduk = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    await storeProduk({
      ...product,
      productImg: {
        mainImg: { name: "", URL: "" },
        optImg1: { name: "", URL: "" },
        optImg2: { name: "", URL: "" },
      },
      imgFile: {
        mainImage,
        optImage1,
        optImage2,
      },
    });

    window.alert(`${product.name} berhasil ditambahkan`)
    router.push(homeAdminURL);
    setIsUploading(false);
  };

  useEffect(() => {
    dispatchProduct({ type: "CEK_MAIN_IMG" });
  }, [mainImage]);

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
                Tambah Produk
              </h1>
            </div>
            <div className="container  mx-auto mb-4 px-4">
              <form onSubmit={uploadProduk} className="grid gap-4">
                <section className="flex flex-wrap gap-4 w-full justify-around text-green-950">
                  {/* SECTION UNTUK INPUT NAMA, HARGA, KATEGORI, dan GAMBAR PRODUK */}
                  <BasicInfoInput
                    isDisabled={isUploading}
                    onChange={onChange}
                  />
                  <MoreInfoInput isDisabled={isUploading} onChange={onChange} />
                  {/* SECTION PETUNJUK PEMAKAIAN DAN KETERANGAN */}

                  <div className="bg-white flex flex-col gap-4 rounded-3xl shadow-xl p-4 grow">
                    <h3 className="font-bold text-base sm:text-xl">
                      Gambar Opsional Produk
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 h-full">
                      <OptImgInput
                        isDisabled={isUploading}
                        setOptImage1={setOptImage1}
                      />
                      <OptImgInput
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
                      onClick={uploadProduk}
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
