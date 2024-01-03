"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { auth } from './(firebase)/firebase.config';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAppContext } from './(context)/AppWrapper';
import { useState, useEffect } from 'react'
import { collection, onSnapshot, doc, setDoc, getDocs } from "firebase/firestore";
import { firestore } from './(firebase)/firebase.config';
import Navbar from '@/components/Navbar'
import ModalCart from '@/components/modals/ModalCart'
import ModalProfile from '@/components/modals/ModalProfile'
import ModalLogin from '@/components/modals/ModalLogin'
import ModalProductNew from '@/components/modals/ModalProductNew';
import ProductCatalogue from '@/components/ProductCatalogue'
import FilterBtn from '@/components/buttons/FilterBtn'
import SearchBar from '@/components/SearchBar'
import Spinner from '@/components/loaders/Spinner';
import Footer from '@/components/Footer'
import Filters from '@/components/Filters'
import ModalRegister from '@/components/modals/ModalRegister'
import getUserData from './(services)/getUserData';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [modalCartOpen, setModalCartOpen] = useState(false);
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalRegisterOpen, setModalRegisterOpen] = useState(false);
  const [modalProductOpen, setModalProductOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [userRole, setUserRole] = useState("Konsumer");
  const [filter, setFilter] = useState(false);
  const [minInput, setMinInput] = useState();
  const [maxInput, setMaxInput] = useState();
  const [keyword, setKeyword] = useState("");
  const [dataProduct, setDataProduct] = useState();
  const [dataCart, setDataCart] = useState();
  const [clickedProduct, setClickedProduct] = useState();
  const router = useRouter()
  const {
    isLoading,
    hideLoading,
    showLoading,
  } = useAppContext()

  useEffect(() => {
    const cekAuth = () => {
      showLoading();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true)
          const uid = user.uid;
          getUserData(uid).then((profile) => {
            setUserProfile(profile)
            setUserRole(profile.customClaims.role)
            if (profile.customClaims.role === "Admin") {
              router.push("bRs6mnRKvcRRXXAy886kIm1yXUxyBkK3/admin")
            }
          }).catch((err) => {
            window.alert(err.message)
          })
          hideLoading()
        } else {
          setLoggedIn(false)
          hideLoading()
        }
      });
    }

    cekAuth()
  }, [router])

  useEffect(() => {
    const cekProduk = async () => {
      const colRef = collection(firestore, "products");

      onSnapshot(colRef, (doc) => {
        setDataProduct(
          doc.docs.map((item) => {
            return { ...item.data(), idProduct: item.id };
          })
        );
      });
    };

    cekProduk()
  }, [])

  const onCartOpen = async () => {
    if (!modalCartOpen && loggedIn) {
      console.log("modalCart opened")
      const colRef = collection(firestore, "carts", userProfile.uid, "products")
      onSnapshot(colRef, (doc) => {
        setDataCart(doc.docs.map((item) => {
          const { amount } = item.data()
          return { idProduct: item.id, amount }
        }))
      });
    } else {
      console.log("modalCart closed")
    }
    return setModalCartOpen(!modalCartOpen)
  }

  const onLogOutHandler = () => {
    signOut(auth).then(() => {
      setLoggedIn(false)
      window.alert("Berhasil logout");
      setUserRole("Konsumer")
    })
      .catch((err) => {
        window.alert(err);
      });
    return setModalProfileOpen(!modalProfileOpen)
  }

  const onRegisterHandler = () => {
    setModalLoginOpen(!modalLoginOpen)
    return setModalRegisterOpen(!modalRegisterOpen)
  }

  const onLoginHandler = () => {
    setModalRegisterOpen(!modalRegisterOpen)
    return setModalLoginOpen(!modalLoginOpen)
  }

  const onChangeRoleHandler = () => {
    userRole === "Konsumer" ? setUserRole("Peretail") : setUserRole("Konsumer")
  }

  const onProfileOpen = () => {
    loggedIn ? setModalProfileOpen(!modalProfileOpen) : setModalLoginOpen(!modalLoginOpen)
  }

  const onLoginOpen = () => {
    return setModalLoginOpen(!modalLoginOpen)
  }

  const onRegisterOpen = () => {
    return setModalRegisterOpen(!modalRegisterOpen)
  }

  const onProductCardHandler = (idProduct) => {
    if (typeof idProduct === "string") {
      dataProduct.filter((item) => {
        if (item.idProduct == idProduct) {
          setClickedProduct(item)
        }
      })
    }
    return setModalProductOpen(!modalProductOpen)
  }

  const tambahKeranjangHandler = async (idProduct, counter) => {
    if (loggedIn && userRole !== "Admin") {
      setIsUploading(true)
      await setDoc(doc(firestore, "carts", userProfile.uid, "products", idProduct), {
        amount: counter ? counter : 1,
      });
    } else {
      window.alert("Anda belum login, silahkan login terlebih dahulu")
    }
    window.alert(`${counter ? counter : 1} ${idProduct} telah ditambahkan `)
    setIsUploading(false)
    return console.log(`${idProduct} ditambahkan sebanyak ${counter ? counter : 1}`)
  }

  const onFilterClickHandler = () => {
    return console.log("Filter Click Handler")
  }

  /* const coba = (length) => {
    const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  // Create an array of 32-bit unsigned integers
  const randomValues = new Uint32Array(length);
  
  // Generate random values
  window.crypto.getRandomValues(randomValues);
  randomValues.forEach((value) => {
    result += characters.charAt(value % charactersLength);
  });
  return(result)
  } */

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword)
  }
  const minInputHandler = (e) => setMinInput(e)
  const maxInputHandler = (e) => setMaxInput(e)

  const customClass = "fill-grn-400 w-20 h-20";

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen grid place-items-center bg-mainBg_clr">
          <Spinner customClass={customClass} />
        </div>
      ) : (
        <>
          <ModalCart userProfile={userProfile} currentRole={userRole} dataCart={dataCart} modal_cart={onCartOpen} isModalCartOpen={modalCartOpen} loggedIn={loggedIn} />
          <ModalProfile userProfile={userProfile} modal_profile={onProfileOpen} onLogOut={onLogOutHandler} currentRole={userRole} isModalProfileOpen={modalProfileOpen} />
          <ModalLogin modal_login={onLoginOpen} onRegister={onRegisterHandler} isModalLoginOpen={modalLoginOpen} />
          <ModalRegister modal_register={onRegisterOpen} onLogin={onLoginHandler} isModalRegisterOpen={modalRegisterOpen} />
          {clickedProduct && <ModalProductNew clickedProduct={clickedProduct} modal_product={onProductCardHandler} currentRole={userRole} isModalProductOpen={modalProductOpen} tambahKeranjangHandler={tambahKeranjangHandler} />}

          <header className="z-10 sticky top-0">
            <Navbar userProfile={userProfile} currentRole={userRole} modal_cart={onCartOpen} statusCart={modalCartOpen} modal_profile={onProfileOpen} modal_login={onLoginOpen} modal_register={onRegisterOpen} statusProfile={modalProfileOpen} statusLoggedIn={loggedIn} />
            <section className="max-w-screen flex gap-4 md:gap-[30px] lg:gap-[55px] justify-between px-4 md:px-10 lg:px-20 pb-[30px] md:pb-[50px] bg-mainBg_clr">
              <FilterBtn filterClicked={() => setFilter(!filter)} />
              <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
            </section>
          </header>
          <main className="relative flex bg-mainBg_clr min-h-screen gap-[55px] justify-between px-4 md:px-10 lg:px-20">
            {filter ? <Filters minInputValue={minInput} onMinInput={minInputHandler} maxInputValue={maxInput} onMaxInput={maxInputHandler} /> : null}
            <div className={`mb-[40px] ${filter ? "w-[73.85%]" : "w-full"}`}>
              {/* MAIN CONTENT */}
              {/* PRODUCT CATALOGUE */}

              <ProductCatalogue searchKeyword={keyword} currentRole={userRole} dataProduct={dataProduct} onProductCardHandler={onProductCardHandler} tambahKeranjangHandler={tambahKeranjangHandler} filterStat={filter} />
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  )
}


