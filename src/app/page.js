"use client"

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ModalCart from '@/components/ModalCart'
import ModalProfile from '@/components/ModalProfile'
import ProductCatalogue from '@/components/ProductCatalogue'
import FilterBtn from '@/components/FilterBtn'
import SearchBar from '@/components/SearchBar'
import { useState } from 'react'

export default function Home() {
  const [modalCartOpen, setModaCartOpen] = useState(false);
  const [modalProfileOpen, setModaProfileOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const onCartOpen = () => {
    return setModaCartOpen(!modalCartOpen)
  }

  const onProfileOpen = () => {
    return setModaProfileOpen(!modalProfileOpen)
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

  return (
    <>
      {modalCartOpen ? <ModalCart modal_cart={onCartOpen} /> : <></>}
      {modalProfileOpen ? <ModalProfile modal_profile={onProfileOpen} /> : <></>}
      <header className="z-50 sticky top-0">
        <Navbar modal_cart={onCartOpen} statusCart={modalCartOpen} modal_profile={onProfileOpen} statusProfile={modalProfileOpen} />
        <section className="max-w-screen flex gap-[55px] justify-between px-20 pb-[50px] bg-mainBg_clr">
          <FilterBtn filterClicked={onFilterClickHandler} />
          <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        </section>
      </header>
      <main className="relative flex bg-mainBg_clr min-h-screen flex-col items-center justify-between">
      
        <div className="mb-28 w-full px-20">
          {/* MAIN CONTENT */}
          {/* PRODUCT CATALOGUE */}
          <ProductCatalogue onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler} />
        </div>
      </main>
    </>
  )
}


