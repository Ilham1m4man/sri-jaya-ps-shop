"use client"

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ModalCart from '@/components/ModalCart'
import ModalProfile from '@/components/ModalProfile'
import ModalLogin from '@/components/ModalLogin'
import ProductCatalogue from '@/components/ProductCatalogue'
import FilterBtn from '@/components/FilterBtn'
import SearchBar from '@/components/SearchBar'
import { useState } from 'react'
import Footer from '@/components/Footer'
import Filters from '@/components/Filters'
import ModalRegister from '@/components/ModalRegister'

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalCartOpen, setModaCartOpen] = useState(false);
  const [modalProfileOpen, setModaProfileOpen] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalRegisterOpen, setModalRegisterOpen] = useState(false);
  const [userRole, setUserRole] = useState("konsumer");
  const [filter, setFilter] = useState(false);
  const [minInput, setMinInput] = useState();
  const [maxInput, setMaxInput] = useState();
  const [keyword, setKeyword] = useState("");

  const onCartOpen = () => {
    return setModaCartOpen(!modalCartOpen)
  }

  const onLogOutHandler = () => {
    return setLoggedIn(!loggedIn)
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
    userRole === "konsumer" ? setUserRole("peretail") : setUserRole("konsumer")
  }

  const onProfileOpen = () => {
    loggedIn ? setModaProfileOpen(!modalProfileOpen) : setModalLoginOpen(!modalLoginOpen)  
  }

  const onLoginOpen = () => {
    return setModalLoginOpen(!modalLoginOpen)
  }

  const onRegisterOpen = () => {
    return setModalRegisterOpen(!modalRegisterOpen)
  }
  
  const onProductCardHandler = () => {
    return console.log('product card handler')
  }

  const onKeranjangHandler = () => {
    return console.log('Keranjang handler')
  }

  const onFilterClickHandler = () => {
    return console.log("Filter Click Handler")
  }

  const onKeywordChangeHandler = (keyword) => setKeyword(keyword)
  const minInputHandler = (e) => setMinInput(e)
  const maxInputHandler = (e) => setMaxInput(e)

  return (
    <>
      {modalCartOpen ? <ModalCart modal_cart={onCartOpen} /> : null}
      {modalProfileOpen ? <ModalProfile modal_profile={onProfileOpen} onLogOut={onLogOutHandler} /> : null}
      {modalLoginOpen ? <ModalLogin modal_login={onLoginOpen} onRegister={onRegisterHandler} /> : null}
      {modalRegisterOpen ? <ModalRegister modal_register={onRegisterOpen} onLogin={onLoginHandler} changeRole={onChangeRoleHandler} currentRole={userRole} /> : null}
      <header className="z-50 sticky top-0">
        <Navbar modal_cart={onCartOpen} statusCart={modalCartOpen} modal_profile={onProfileOpen} modal_login={onLoginOpen} modal_register={onRegisterOpen} statusProfile={modalProfileOpen} statusLoggedIn={loggedIn} />
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


