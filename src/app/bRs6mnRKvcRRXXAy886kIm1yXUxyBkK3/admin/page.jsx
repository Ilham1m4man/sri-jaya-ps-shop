"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../(firebase)/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from "../../(firebase)/firebase.config";
import { useAppContext } from "@/app/(context)/AppWrapper";
import ModalProfile from "@/components/modals/ModalProfile";
import Navbar from "@/components/Navbar";
import ProductCatalogue from "@/components/ProductCatalogue";
import FilterBtn from "@/components/buttons/FilterBtn";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import Filters from "@/components/Filters";
import getUserData from "../../(services)/getUserData";
import Spinner from "@/components/loaders/Spinner";
import deleteProduk from "@/app/(services)/deleteProduk";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [modalCartOpen, setModalCartOpen] = useState(false);
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalRegisterOpen, setModalRegisterOpen] = useState(false);
  const [modalProductOpen, setModalProductOpen] = useState(false);
  const [userRole, setUserRole] = useState("Konsumer");
  const [filter, setFilter] = useState(false);
  const [minInput, setMinInput] = useState();
  const [maxInput, setMaxInput] = useState();
  const [keyword, setKeyword] = useState("");
  const [dataProduct, setDataProduct] = useState();
  const router = useRouter();
  const { isLoading, hideLoading, showLoading } = useAppContext();

  useEffect(() => {
    const cekAuth = () => {
      showLoading();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
          const uid = user.uid;
          getUserData(uid)
            .then((profile) => {
              setUserProfile(profile);
              setUserRole(profile.customClaims.role);
            })
            .catch((err) => {
              window.alert(err.message);
            });
        } else {
          setLoggedIn(false);
          router.push("/");
        }
      });
    };

    const cekProduk = async () => {
      showLoading();
      const colRef = collection(firestore, "products");

      onSnapshot(colRef, (doc) => {
        setDataProduct(
          doc.docs.map((item) => {
            return { ...item.data(), idProduct: item.id };
          })
        );
      });
    };

    cekAuth();
    cekProduk();
  }, []);

  const onCartOpen = () => {
    return setModalCartOpen(!modalCartOpen);
  };

  const onLogOutHandler = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
        window.alert("Berhasil logout");
        setUserRole("Konsumer");
        router.push("/");
      })
      .catch((err) => {
        window.alert(err);
      });
    return setModalProfileOpen(!modalProfileOpen);
  };

  const hapusHandler = (idProduct) => {
    dataProduct.find((product) => {
      if (product.idProduct === idProduct) {
        window.confirm(`Apakah anda yakin ingin menghapus ${product.name}?`) &&
          deleteProduk(product);
      }
    });
  };

  const onRegisterHandler = () => {
    setModalLoginOpen(!modalLoginOpen);
    return setModalRegisterOpen(!modalRegisterOpen);
  };

  const onLoginHandler = () => {
    setModalRegisterOpen(!modalRegisterOpen);
    return setModalLoginOpen(!modalLoginOpen);
  };

  const onChangeRoleHandler = () => {
    userRole === "Konsumer" ? setUserRole("Peretail") : setUserRole("Konsumer");
  };

  const onProfileOpen = () => {
    loggedIn
      ? setModalProfileOpen(!modalProfileOpen)
      : setModalLoginOpen(!modalLoginOpen);
  };

  const onLoginOpen = () => {
    return setModalLoginOpen(!modalLoginOpen);
  };

  const onRegisterOpen = () => {
    return setModalRegisterOpen(!modalRegisterOpen);
  };

  const onProductCardHandler = () => {
    return setModalProductOpen(!modalProductOpen);
  };

  const onKeranjangHandler = () => {
    return console.log("Keranjang handler");
  };

  const onFilterClickHandler = () => {
    return console.log("Filter Click Handler");
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
  };
  const minInputHandler = (e) => setMinInput(e);
  const maxInputHandler = (e) => setMaxInput(e);

  const customClass = "fill-grn-400 w-20 h-20";

  userProfile && dataProduct && hideLoading();

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen grid place-items-center bg-mainBg_clr">
          <Spinner customClass={customClass} />
        </div>
      ) : (
        <>
          <ModalProfile
            userProfile={userProfile}
            modal_profile={onProfileOpen}
            onLogOut={onLogOutHandler}
            currentRole={userRole}
            isModalProfileOpen={modalProfileOpen}
          />
          <header className="z-10 sticky top-0">
            <Navbar
              userProfile={userProfile}
              modal_cart={onCartOpen}
              statusCart={modalCartOpen}
              modal_profile={onProfileOpen}
              modal_login={onLoginOpen}
              modal_register={onRegisterOpen}
              statusProfile={modalProfileOpen}
              statusLoggedIn={loggedIn}
            />
            <section className="max-w-screen flex gap-4 md:gap-[30px] lg:gap-[55px] justify-between px-4 md:px-10 lg:px-20 pb-[30px] md:pb-[50px] bg-mainBg_clr">
              <FilterBtn filterClicked={() => setFilter(!filter)} />
              <SearchBar
                keyword={keyword}
                keywordChange={onKeywordChangeHandler}
              />
            </section>
          </header>
          <main className="relative flex bg-mainBg_clr min-h-screen gap-[55px] justify-between px-4 md:px-10 lg:px-20">
            {filter ? (
              <Filters
                minInputValue={minInput}
                onMinInput={minInputHandler}
                maxInputValue={maxInput}
                onMaxInput={maxInputHandler}
              />
            ) : null}
            <div className={`mb-[40px] ${filter ? "w-[73.85%]" : "w-full"}`}>
              {/* MAIN CONTENT */}
              {/* PRODUCT CATALOGUE */}

              <ProductCatalogue
                searchKeyword={keyword}
                hapusHandler={hapusHandler}
                currentRole={userRole}
                dataProduct={dataProduct}
                userProfile={userProfile}
                onProductCardHandler={onProductCardHandler}
                onKeranjangHandler={onKeranjangHandler}
                filterStat={filter}
              />
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
