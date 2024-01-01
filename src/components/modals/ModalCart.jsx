import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { React, Fragment, useState } from "react";
import BackBtn from "../buttons/BackBtn";

export default function ModalCart({ userProfile, dataCart, modal_cart, isModalCartOpen }) {
  console.log(dataCart)
  return (
    <Transition appear show={isModalCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={modal_cart}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-bg-blur-clr backdrop-blur bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-[90%] sm:w-[70%] lg:w-[50%] transform overflow-hidden rounded-[20px] bg-white shadow-xl transition-all`}
              >
                <div
                  className={` text-left flex flex-col gap-[15px] md:gap-[40px] items-center p-8`}
                >
                  <div className="flex justify-end w-full relative items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-grn-950 text-2xl md:text-[2.3rem] rounded-[10px] mx-auto font-bold"
                    >
                      Masuk
                    </Dialog.Title>
                    <BackBtn backFrom={modal_cart} />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
