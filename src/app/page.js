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
import Footer from '@/components/Footer'
import Filters from '@/components/Filters'

export default function Home() {
  const [modalCartOpen, setModaCartOpen] = useState(false);
  const [modalProfileOpen, setModaProfileOpen] = useState(false);
  const [filter, setFilter] = useState(false);
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
      {modalCartOpen ? <ModalCart modal_cart={onCartOpen} /> : null}
      {modalProfileOpen ? <ModalProfile modal_profile={onProfileOpen} /> : null}
      <header className="z-50 sticky top-0">
        <Navbar modal_cart={onCartOpen} statusCart={modalCartOpen} modal_profile={onProfileOpen} statusProfile={modalProfileOpen} />
        <section className="max-w-screen flex gap-[55px] justify-between px-20 pb-[50px] bg-mainBg_clr">
          <FilterBtn filterClicked={() => setFilter(!filter)} />
          <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        </section>
      </header>
      <main className="relative flex bg-mainBg_clr min-h-screen gap-[55px] justify-between px-20">
        {filter ? <Filters /> : null}
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


