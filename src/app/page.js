"use client"

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ModalCart from '@/components/ModalCart'
import ModalProfile from '@/components/ModalProfile'
import ProductCatalogue from '@/components/ProductCatalogue'
import { useState } from 'react'

export default function Home() {
  const [modalCartOpen, setModaCartOpen] = useState(false);
  const [modalProfileOpen, setModaProfileOpen] = useState(false);

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

  return (
    <>
      <header className="z-50 sticky top-0">
        <Navbar modal_cart={onCartOpen} statusCart={modalCartOpen} modal_profile={onProfileOpen} statusProfile={modalProfileOpen} />
      </header>
      <main className="flex bg-mainBg_clr min-h-screen flex-col items-center justify-between p-5">
        {modalCartOpen ? <ModalCart /> : <></>}
        {modalProfileOpen ? <ModalProfile /> : <></>}
        <div className="mb-28 lg:max-w-5xl lg:w-full lg:mb-0">
          {/* MAIN CONTENT */}
          {/* PRODUCT CATALOGUE */}
          <ProductCatalogue onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
        </div>
      </main>
    </>
  )
}
