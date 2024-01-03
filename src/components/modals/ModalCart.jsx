import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { React, Fragment, useState, useEffect } from "react";
import BackBtn from "../buttons/BackBtn";
import CartTable from "../CartTable";
import DeleteBtn from "../buttons/DeleteBtn";

export default function ModalCart({
  userProfile,
  currentRole,
  dataCart,
  modal_cart,
  isModalCartOpen,
}) {
  const [checkedItems, setCheckedItems] = useState();
  const [idProduct, setIdProduct] = useState([]);
  const [counter, setCounter] = useState([]);
  const [disabled, setDisabled] = useState([]);

  const objectMap = (obj, fn) => {
    dataCart &&
      Object.fromEntries(
        Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
      );
  };

  useEffect(() => {
    dataCart &&
      dataCart.map((item, index) => {
        setCheckedItems((prevState) => {
          return { ...prevState, [index]: false };
        });
        setIdProduct((prevState) => {
          return { ...prevState, [index]: item.idProduct };
        });
        setCounter((prevState) => {
          return { ...prevState, [index]: item.amount };
        });
        setDisabled((prevState) => {
          return { ...prevState, [index]: false };
        });
      });
  }, [dataCart]);

  useEffect(() => {
    !isModalCartOpen && setCheckedItems([]);
  }, [isModalCartOpen]);

  useEffect(() => {
    objectMap(checkedItems, (item, index) => {
      if (counter[index] === 1 || counter[index] <= 1) {
        return setDisabled((prevState) => {
          return { ...prevState, [index]: true };
        });
      }
      return setDisabled((prevState) => {
        return { ...prevState, [index]: false };
      });
    });
    /* checkedItems.map((item, index) => {
      if (counter[index] === 1 || counter[index] <= 1) {
        return setDisabled((true));
      }
      return setDisabled(false);
    }) */
  }, [counter]);

  const hapusHandler = () => {
    console.log("Hapus handler cart");
  };

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
                className={`w-full transform overflow-hidden rounded-[20px] bg-white p-6 text-left flex flex-col justify-between gap-[20px] lg:gap-[40px] items-center text-footer_fontClr shadow-xl transition-all`}
              >
                <div className="flex justify-end w-full relative items-center">
                  <Dialog.Title
                    as="h3"
                    className={`text-base md:text-lg px-3 py-1 md:px-6 md:py-2 rounded-[10px] mx-auto font-bold ${
                      currentRole === "Konsumer"
                        ? "text-grn-950 bg-grn-300"
                        : "text-ble-950 bg-ble-300"
                    }`}
                  >
                    {currentRole}
                  </Dialog.Title>
                  <BackBtn backFrom={modal_cart} />
                </div>
                <div className="grid grid-cols-12 w-full">
                  <div className="px-4 mr-4 col-span-8 rounded-xl">
                    <div className="flex justify-between">
                      <h3
                        className={`font-bold ${
                          currentRole === "Konsumer"
                            ? "text-grn-950"
                            : "text-ble-950"
                        } text-xl md:text-3xl`}
                      >
                        Keranjang
                      </h3>
                      <DeleteBtn hapusHandler={hapusHandler} />
                    </div>
                    <CartTable
                      objectMap={objectMap}
                      currentRole={currentRole}
                      checkedItems={checkedItems}
                      idProduct={idProduct}
                      counter={counter}
                      disabled={disabled}
                      setCheckedItems={setCheckedItems}
                      setIdProduct={setIdProduct}
                      setCounter={setCounter}
                      setDisabled={setDisabled}
                    />
                  </div>
                  <div className="p-6 col-span-4 flex flex-col gap-4 h-fit rounded-3xl border-2 border-footer_fontClr">
                    <div className="border-b-2 grid gap-4 pb-4 border-footer_fontClr">
                      <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>Rp. 9014901</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Biaya aplikasi</p>
                        <p>Rp. 9014901</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Ongkir</p>
                        <p>Rp. 9014901</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p>Total</p>
                      <p>Rp. 9014901</p>
                    </div>
                    <button className="rounded-[8px] bg-footer_fontClr text-white font-normal text-base md:text-lg px-[10px] md:px-[20px] py-2 hover:opacity-80 active:scale-95 transition-all whitespace-nowrap">
                      Bayar sekarang
                    </button>
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
