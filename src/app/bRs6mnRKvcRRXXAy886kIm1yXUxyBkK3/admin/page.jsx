"use client"

import Image from 'next/image'
import Link from 'next/link'
import { auth } from '../../firebase/firebase.config';
import { onAuthStateChanged, signOut } from "firebase/auth";
import Navbar from '@/components/Navbar'
import ModalCart from '@/components/modals/ModalCart'
import ModalProfile from '@/components/modals/ModalProfile'
import ModalLogin from '@/components/modals/ModalLogin'
import ModalProduct from '@/components/modals/ModalProduct'
import ProductCatalogue from '@/components/ProductCatalogue'
import FilterBtn from '@/components/buttons/FilterBtn'
import SearchBar from '@/components/SearchBar'
import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import Filters from '@/components/Filters'
import ModalRegister from '@/components/modals/ModalRegister'
import getUserData from '../../services/getUserData';

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

  const cekAuth = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        const uid = user.uid;
        getUserData(uid).then((profile) => {
          setUserProfile(profile)
          setUserRole(profile.customClaims.role)
        }).catch((err) => {
          window.alert(err.message)
        })
      } else {
        setLoggedIn(false)
      }
    });
  }

  useEffect(() => {
    cekAuth()
  }, [])

  const onCartOpen = () => {
    return setModalCartOpen(!modalCartOpen)
  }

  const onLogOutHandler = () => {
    signOut(auth).then(() => {
      setLoggedIn(false)
      window.alert("Berhasil logout");
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

  const onProductCardHandler = () => {
    return setModalProductOpen(!modalProductOpen)
  }

  const onKeranjangHandler = () => {
    return console.log('Keranjang handler')
  }

  const onFilterClickHandler = () => {
    return console.log("Filter Click Handler")
  }

  const coba = (length) => {
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
  }

  const onKeywordChangeHandler = (keyword) => {
    console.log(coba(32))
    setKeyword(keyword)
  }
  const minInputHandler = (e) => setMinInput(e)
  const maxInputHandler = (e) => setMaxInput(e)

  return (
    <>
      <header className="z-10 sticky top-0">
        <Navbar userProfile={userProfile} modal_cart={onCartOpen} statusCart={modalCartOpen} modal_profile={onProfileOpen} modal_login={onLoginOpen} modal_register={onRegisterOpen} statusProfile={modalProfileOpen} statusLoggedIn={loggedIn} />
        <section className="max-w-screen flex gap-[55px] justify-between px-20 pb-[50px] bg-mainBg_clr">
          <FilterBtn filterClicked={() => setFilter(!filter)} />
          <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        </section>
      </header>
      <main className="relative flex bg-mainBg_clr min-h-screen gap-[55px] justify-between px-20">
        {filter ? <Filters minInputValue={minInput} onMinInput={minInputHandler} maxInputValue={maxInput} onMaxInput={maxInputHandler} /> : null}
        <div className={`mb-[40px] ${filter ? "w-[73.85%]" : "w-full"}`}>
          {/* MAIN CONTENT */}
          {/* PRODUCT CATALOGUE */}

          <ProductCatalogue onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler} filterStat={filter} />
        </div>
      </main>
      <Footer />
    </>
  )
}


