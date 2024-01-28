import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { React, Fragment, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  documentId,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "@/app/(firebase)/firebase.config";
import BackBtn from "../buttons/BackBtn";
import CartTable from "../CartTable";
import DeleteBtn from "../buttons/DeleteBtn";
import getSnapToken from "@/app/(midtrans)/getSnapToken";
import Spinner from "../loaders/Spinner";
import getOngkir from "@/app/(rajaOngkir)/getOngkir";
const serviceMidtrans = require("../../app/(midtrans)/service-midtrans.json");

export default function ModalCart({
  userProfile,
  currentRole,
  dataCart,
  modal_cart,
  isModalCartOpen,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState();
  const [dataProduct, setDataProduct] = useState();
  const [checkedItems, setCheckedItems] = useState();
  const [idProduct, setIdProduct] = useState([]);
  const [counter, setCounter] = useState([]);
  const [disabled, setDisabled] = useState([]);
  const [isCheckoutDisabled, setIsChekoutDisabled] = useState();
  const [singularTotal, setSingularTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [appFee, setAppFee] = useState(500);
  const [shippingFee, setShippingFee] = useState({ value: 0, etd: "" });
  const [isFreeOngkir, setIsFreeOngkir] = useState();
  const [singularWeight, setSingularWeight] = useState();
  const [weightTotal, setWeightTotal] = useState();
  const [order, setOrder] = useState({
    paidProduct: "",
  });
  const dataOngkir = {
    origin: "375",
    destination: userProfile && userProfile?.customClaims?.cityAddress?.value,
    weight: 0,
  };

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

  const objectMap = (obj, fn) => {
    dataCart &&
      Object.fromEntries(
        Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
      );
  };

  const cobaBayar = (token) => {
    snap.pay(token, {
      // Optional
      onSuccess: function (result) {
        checkedItems &&
          Object.values(checkedItems).map((check, index) => {
            if (userProfile) {
              if (checkedItems[index]) {
                const firestoreRef = doc(
                  firestore,
                  "carts",
                  userProfile.uid,
                  "products",
                  idProduct[index]
                );
                console.log(idProduct[index]);
                deleteDoc(firestoreRef)
                  .then((res) => {
                    return res;
                  })
                  .catch((err) => {
                    window.alert(
                      "Terjadi kesalahan, mohon coba lagi \n \n" + err
                    );
                    return err;
                  });
              }
            }
          });

        window.alert(`Status pembayara: Berhasil`);
        window.location.reload();
      },
      onPending: function (result) {
        window.alert(`Status pembayara: Pending`);
        window.location.reload();
      },
      onError: function (result) {
        window.alert(`Status pembayara: Error`);
        window.location.reload();
      },
    });
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
    const cekProduk = async () => {
      setIsLoading(true);
      const colRef = collection(firestore, "products");
      Object.values(idProduct).map(async (productId, index) => {
        const q = query(colRef, where(documentId(), "==", productId));

        onSnapshot(q, (doc) => {
          doc.docs.map((item) => {
            setDataProduct((prevState) => {
              const infoProduct = { ...item.data(), idProduct: item.id };
              return { ...prevState, [index]: infoProduct };
            });
          });
        });
      });

      setIsLoading(false);
    };

    const cekPromo = async () => {
      setIsLoading(true);
      const colRef = collection(firestore, "promos");

      onSnapshot(colRef, (doc) => {
        doc.docs.map((item) => {
          setIsFreeOngkir(item.data());
        });
      });
      setIsLoading(false);
    };

    cekProduk();
    cekPromo();
  }, [idProduct]);

  useEffect(() => {
    objectMap(checkedItems, (item, index) => {
      userProfile &&
        setDoc(
          doc(
            firestore,
            "carts",
            userProfile.uid,
            "products",
            idProduct[index]
          ),
          {
            amount: counter[index] ? counter[index] : 1,
          }
        );
      if (counter[index] === 1 || counter[index] <= 1) {
        return setDisabled((prevState) => {
          return { ...prevState, [index]: true };
        });
      }
      return setDisabled((prevState) => {
        return { ...prevState, [index]: false };
      });
    });
  }, [counter]);

  useEffect(() => {
    checkedItems &&
      setIsChekoutDisabled(!Object.values(checkedItems).some(Boolean));
    checkedItems &&
      Object.values(checkedItems).map((check, index) => {
        if (dataProduct) {
          const prodArray = Object.values(dataProduct);
          if (prodArray[index]) {
            const { price, weight } = prodArray[index];
            const { priceEcer, priceBakul } = price;
            if (checkedItems[index]) {
              setSingularWeight((prevState) => {
                return {
                  ...prevState,
                  [index]: parseInt(counter[index]) * weight,
                };
              });
              setSingularTotal((prevState) => {
                return {
                  ...prevState,
                  [index]:
                    parseInt(counter[index]) *
                    (currentRole === "Konsumer"
                      ? parseInt(priceEcer)
                      : parseInt(priceBakul)),
                };
              });
            } else if (!checkedItems[index]) {
              setSingularWeight((prevState) => {
                return {
                  ...prevState,
                  [index]: 0,
                };
              });
              setSingularTotal((prevState) => {
                return {
                  ...prevState,
                  [index]: 0,
                };
              });
            }
          }
        }
      });
  }, [checkedItems, dataProduct, counter, currentRole]);

  useEffect(() => {
    singularTotal && setSubtotal(sumValues(singularTotal));
    singularTotal && setWeightTotal(sumValues(singularWeight));
  }, [singularTotal]);

  useEffect(() => {
    checkedItems &&
      Object.values(checkedItems).map((check, index) => {
        if (userProfile?.customClaims?.cityAddress?.value !== "") {
          check
            ? getOngkir({ ...dataOngkir, weight: weightTotal }).then((item) => {
                if (item.rajaongkir.status.code === 400) {
                  setCheckedItems((prevState) => {
                    return { ...prevState, [index]: false };
                  });
                  setShippingFee({ value: 0, etd: "" });
                  window.alert(item.rajaongkir.status.description);
                }
                const hasilAPI =
                  typeof item.rajaongkir.results == "object" &&
                  item.rajaongkir.results[0];
                const ongkir =
                  typeof hasilAPI == "object" && hasilAPI.costs[0].cost[0];
                setShippingFee(ongkir);
              })
            : setShippingFee({ value: 0, etd: "" });
        } else {
          window.alert("Mohon lengkapi alamat anda terlebih dahulu");
          window.location.reload();
        }
      });
  }, [weightTotal]);

  useEffect(() => {
    if (isFreeOngkir) {
      if (subtotal === 0) {
        isFreeOngkir.freeShip
          ? setTotal(() => {
              console.log(weightTotal);
              if (weightTotal < 5000) {
                return appFee + (shippingFee?.value - shippingFee?.value);
              } else {
                return appFee + (shippingFee?.value - shippingFee?.value * 0.5);
              }
            })
          : setTotal(appFee + shippingFee?.value);
      } else {
        isFreeOngkir.freeShip
          ? setTotal(() => {
              console.log(weightTotal);
              if (weightTotal < 5000) {
                return (
                  appFee + (shippingFee?.value - shippingFee?.value) + subtotal
                );
              } else {
                return (
                  appFee +
                  (shippingFee?.value - shippingFee?.value * 0.5) +
                  subtotal
                );
              }
            })
          : setTotal(appFee + shippingFee?.value + subtotal);
      }
    }

    if (currentRole === "Peretail") {
      if (subtotal < 100000) {
        setIsChekoutDisabled(true);
      } else {
        setIsChekoutDisabled(false);
      }
    }
  }, [subtotal, appFee, shippingFee, isFreeOngkir]);

  function numberWithCommas(x) {
    if (x) {
      const parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return parts.join(",");
    } else {
      return 0;
    }
  }

  const hapusHandler = () => {
    checkedItems &&
      Object.values(checkedItems).map((check, index) => {
        if (userProfile) {
          if (checkedItems[index]) {
            const firestoreRef = doc(
              firestore,
              "carts",
              userProfile.uid,
              "products",
              idProduct[index]
            );
            console.log(idProduct[index]);
            deleteDoc(firestoreRef)
              .then((res) => {
                window.alert("berhasil dihapus");
                window.location.reload();
                return res;
              })
              .catch((err) => {
                window.alert("Terjadi kesalahan, mohon coba lagi \n \n" + err);
                window.location.reload();
                return err;
              });
          }
        }
      });
    console.log("Hapus handler cart");
  };

  /* "clientKey": "SB-Mid-client-yHEvJy0kOinSsU_K",
  "serverKey": "SB-Mid-server-vuO6-HFb7RTBxEf1xSZquyH_" 

  "clientKey": "Mid-client-8AjhRj-9pGbg6zhv",
  "serverKey": "Mid-server-bVxH6Vxc8o5fb_771nGRtvne"
  */

  useEffect(() => {
    setIsLoading(true);
    const ambilSnap = async () => {
      return await getSnapToken(order);
    };

    !!order.paidProduct &&
      ambilSnap().then((token) => {
        cobaBayar(token);
      });
    setIsLoading(false);
  }, [order]);

  const onCheckoutHandler = async () => {
    const orderId = (length) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let result = "";

      // Create an array of 32-bit unsigned integers
      const randomValues = new Uint32Array(length);

      // Generate random values
      window.crypto.getRandomValues(randomValues);
      randomValues.forEach((value) => {
        result += characters.charAt(value % charactersLength);
      });
      return result;
    };

    Object.values(checkedItems).map((check, index) => {
      if (userProfile && dataProduct) {
        const prodArray = Object.values(dataProduct);
        const singularTotalArray = Object.values(singularTotal);
        if (prodArray[index]) {
          const { price } = prodArray[index];
          const { priceEcer, priceBakul } = price;
          if (checkedItems[index]) {
            const { name } = prodArray[index];
            const dataOrder = {
              id: idProduct[index],
              name,
              quantity: parseInt(counter[index]),
              price:
                currentRole === "Konsumer"
                  ? parseInt(priceEcer)
                  : parseInt(priceBakul),
            };
            setOrder((prevState) => {
              return {
                ...prevState,
                paidProduct: { ...prevState.paidProduct, [index]: dataOrder },
                Id: orderId(32),
                userId: userProfile.uid,
                userName: userProfile.displayName,
                userEmail: userProfile.email,
                userPhone: userProfile.phoneNumber,
                userAddress: userProfile.customClaims.address,
                userCityAddress: userProfile.customClaims.cityAddress.label,
                transactionTime: new Date(),
                appFee: parseInt(appFee),
                shippingFee: isFreeOngkir.freeShip
                  ? weightTotal < 5000
                    ? shippingFee.value - shippingFee.value
                    : shippingFee.value - shippingFee.value * 0.5
                  : shippingFee.value,
                subtotal,
                gross_amount: total,
              };
            });
          } else if (!checkedItems[index]) {
            setOrder((prevState) => {
              return {
                ...prevState,
                paidProduct: { ...prevState.paidProduct, [index]: "" },
                Id: orderId(32),
                userId: userProfile.uid,
                userName: userProfile.displayName,
                userEmail: userProfile.email,
                userPhone: userProfile.phoneNumber,
                userAddress: userProfile.customClaims.address,
                userCityAddress: userProfile.customClaims.cityAddress.label,
                transactionTime: new Date(),
                appFee: parseInt(appFee),
                shippingFee: isFreeOngkir.freeShip
                  ? weightTotal < 5000
                    ? shippingFee.value - shippingFee.value
                    : shippingFee.value - shippingFee.value * 0.5
                  : shippingFee.value,
                subtotal,
                gross_amount: total,
              };
            });
          }
        }
      }
    });
  };

  useEffect(() => {
    const midtransScriptUrl = "https://app.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", serviceMidtrans.clientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const customClass = `${
    currentRole === "Konsumer"
      ? "w-12 h-6 fill-grn-400"
      : "w-12 h-6 fill-ble-400"
  }`;

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
                <div className="grid grid-rows-2 lg:grid-rows-1 grid-cols-12 w-full">
                  <div className="px-4 mr-4 row-start-1 col-start-1 col-span-full lg:col-span-8 rounded-xl">
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
                      {isChecked && <DeleteBtn hapusHandler={hapusHandler} />}
                    </div>
                    {dataProduct ? (
                      <CartTable
                        isLoading={isLoading}
                        dataProduct={dataProduct}
                        currentRole={currentRole}
                        checkedItems={checkedItems}
                        counter={counter}
                        disabled={disabled}
                        setIsChecked={setIsChecked}
                        setCheckedItems={setCheckedItems}
                        setCounter={setCounter}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-between text-footer_fontClr p-8">
                        <img
                          className="rounded-xl w-[300px]"
                          src="https://firebasestorage.googleapis.com/v0/b/sri-jaya-shop.appspot.com/o/images%2Fillustration%2Fempty_cart.jpg?alt=media&token=e2bb091a-0be9-4f26-b3ca-7be5022c8e21"
                        />
                        <h3>Oop&apos;s, keranjangmu kosong</h3>
                      </div>
                    )}
                  </div>
                  <div className="p-2 sm:p-6 row-start-2 lg:row-start-1 col-span-full lg:col-span-4 flex flex-col gap-4 h-fit rounded-xl sm:rounded-3xl border-2 border-footer_fontClr">
                    <div className="border-b-2 grid gap-4 pb-4 border-footer_fontClr">
                      <div className="flex justify-between">
                        <p>Subtotal{currentRole === "Peretail" && "*"}</p>
                        <p>Rp. {numberWithCommas(subtotal)}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Biaya aplikasi</p>
                        <p>Rp. {numberWithCommas(appFee)}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Ongkir</p>
                        <p>
                          <span
                            className={`${
                              isFreeOngkir &&
                              (isFreeOngkir.freeShip && shippingFee.value
                                ? "line-through decoration-2 text-danger_clr"
                                : "hidden")
                            }`}
                          >
                            Rp. {numberWithCommas(shippingFee.value)}
                          </span>
                          {` Rp. ${numberWithCommas(weightTotal < 5000 ? shippingFee.value - shippingFee.value : shippingFee.value * 0.5)} `}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p>Total</p>
                      <p>Rp. {numberWithCommas(total)}</p>
                    </div>
                    <div className="grid">
                      <p>Estimasi tiba</p>
                      <p className={`text-footer_fontClr font-bold`}>
                        {shippingFee.value ? `${shippingFee.etd} hari` : `-`}
                      </p>
                    </div>
                    <button
                      onClick={onCheckoutHandler}
                      disabled={dataProduct ? isCheckoutDisabled : true}
                      className="rounded-[8px] bg-footer_fontClr text-white font-normal text-base md:text-lg px-[10px] md:px-[20px] py-2 hover:scale-[1.02] active:scale-100 disabled:hover:scale-100 disabled:active:scale-100 disabled:opacity-80 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                    >
                      {isLoading ? (
                        <Spinner customClass={customClass} />
                      ) : (
                        "Beli Sekarang"
                      )}
                    </button>
                    {currentRole === "Peretail" && (
                      <div className="text-sm">
                        <p>
                          *Minimal pembelian untuk wilayah Purbalingga adalah
                          Rp.100.000
                        </p>
                        <p>
                          *Minimal pembelian diluar wilayah Purbalingga adalah
                          Rp.20.000.000
                        </p>
                      </div>
                    )}
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
