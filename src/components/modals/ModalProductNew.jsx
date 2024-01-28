import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BackBtn from "../buttons/BackBtn";
import Spinner from "../loaders/Spinner";

export default function ModalProductNew({
  isUploading,
  clickedProduct,
  modal_product,
  currentRole,
  isModalProductOpen,
  tambahKeranjangHandler,
}) {
  const { idProduct, name, price, category, desc, userGuide, productImg } =
    clickedProduct;
  const { priceEcer, priceBakul } = price;
  const { mainImg, optImg1, optImg2 } = productImg;
  const [counter, setCounter] = useState(1);
  const [disabled, setDisabled] = useState(false);
  
  useEffect(() => {
    if (counter === 1 || counter <= 1) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [counter]);

  function numberWithCommas(x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  }

  const customClass = `${currentRole === "Konsumer" ? "fill-grn-400" : "fill-ble-400"} w-24 h-6`;

  return (
    <>
      <Transition appear show={isModalProductOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={modal_product}>
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
                <Dialog.Panel className="w-full transform overflow-hidden rounded-[20px] bg-white p-6 text-left flex flex-col justify-between gap-[20px] lg:gap-[40px] items-center shadow-xl transition-all">
                  <div className="flex justify-end w-full relative items-center">
                    <Dialog.Title
                      as="h3"
                      className={`text-base md:text-lg px-3 py-1 md:px-6 md:py-2 rounded-[10px] mr-auto font-bold ${
                        currentRole === "Konsumer"
                          ? "text-grn-950 bg-grn-300"
                          : "text-ble-950 bg-ble-300"
                      }`}
                    >
                      {currentRole}
                    </Dialog.Title>
                    <BackBtn
                      backFrom={modal_product}
                      customClass={"absolute px-[2px]"}
                    />
                  </div>

                  <div className="flex flex-col xs:flex-row items-center w-full justify-between gap-4 h-fit">
                    <Carousel
                      additionalTransfrom={0}
                      arrows
                      autoPlay
                      autoPlaySpeed={10000}
                      centerMode={false}
                      className={`w-full xs:w-[350px] pr-4 border-8 ${
                        currentRole === "Konsumer"
                          ? "border-grn-500"
                          : "border-ble-500"
                      } rounded-3xl`}
                      containerClass="container-with-dots"
                      dotListClass=""
                      draggable
                      focusOnSelect={false}
                      infinite
                      itemClass=""
                      keyBoardControl
                      minimumTouchDrag={80}
                      pauseOnHover
                      renderArrowsWhenDisabled={false}
                      renderButtonGroupOutside={false}
                      renderDotsOutside={false}
                      responsive={{
                        desktop: {
                          breakpoint: {
                            max: 3000,
                            min: 1024,
                          },
                          items: 1,
                          partialVisibilityGutter: 40,
                        },
                        mobile: {
                          breakpoint: {
                            max: 464,
                            min: 0,
                          },
                          items: 1,
                          partialVisibilityGutter: 30,
                        },
                        tablet: {
                          breakpoint: {
                            max: 1024,
                            min: 464,
                          },
                          items: 1,
                          partialVisibilityGutter: 30,
                        },
                      }}
                      rewind={false}
                      rewindWithAnimation={false}
                      rtl={false}
                      shouldResetAutoplay
                      showDots={false}
                      sliderClass=""
                      slidesToSlide={1}
                      swipeable
                    >
                      <div className="flex max-h-[300px] h-[50vh] justify-center">
                        <img
                          className="max-h-[300px] w-10/12 pr-4 object-contain object-center"
                          src={mainImg.URL}
                          alt={name}
                        />
                      </div>
                      <div className={`${optImg1 === "" ? "block" : "hidden"} flex max-h-[300px] h-[50vh] justify-center`}>
                        <img
                          className={`max-h-[300px] w-10/12 pr-4 object-contain object-center`}
                          src={optImg1 && optImg1.URL}
                          alt={name}
                        />
                      </div>
                      <div className={`${optImg2 === "" ? "block" : "hidden"} flex max-h-[300px] h-[50vh] justify-center`}>
                        <img
                          className={`max-h-[300px] w-10/12 pr-4 object-contain object-center`}
                          src={optImg2 && optImg2.URL}
                          alt={name}
                        />
                      </div>
                    </Carousel>

                    {/* DESKRIPSI */}
                    <div className="w-full h-full flex flex-col gap-5 text-footer_fontClr">
                      <h1 className={`font-bold text-xl md:text-3xl `}>
                        {name}
                      </h1>
                      <h2
                        className={`${
                          currentRole === "Konsumer"
                            ? "border-grn-500"
                            : "border-ble-500"
                        } w-fit lg:hidden block font-bold text-base md:text-xl p-3 border-l-2 border-b-2 rounded-tl-none rounded-br-none rounded-xl`}
                      >
                        Rp.{" "}
                        {currentRole === "Konsumer"
                          ? numberWithCommas(priceEcer)
                          : numberWithCommas(priceBakul)}
                      </h2>
                      <div className="w-full h-[50vh] lg:h-full overflow-auto flex flex-col lg:flex-row gap-4 lg:gap-0 items-center lg:items-start justify-start lg:justify-around text-footer_fontClr">
                        <div className="min-h-[50vh] lg:min-h-full gap-5 flex items-start basis-[50%] text-base md:text-lg font-normal flex-col">
                          <h2
                            className={`${
                              currentRole === "Konsumer"
                                ? "border-grn-500"
                                : "border-ble-500"
                            } w-fit hidden lg:block font-bold text-base md:text-xl p-3 border-l-2 border-b-2 rounded-tl-none rounded-br-none rounded-xl`}
                          >
                            Rp.{" "}
                            {currentRole === "Konsumer"
                              ? numberWithCommas(priceEcer)
                              : numberWithCommas(priceBakul)}
                          </h2>
                          <div className="min-h-[50vh] lg:min-h-full flex items-start px-4 basis-[50%] border-l-4 text-base md:text-lg font-normal flex-col">
                            <h3 className="font-bold">Keterangan:</h3>
                            <div className="flex flex-col max-h-[53.5vh] lg:max-h-[40vh] overflow-auto">
                              <p
                                className={`keterangan text-justify text-sm md:text-base`}
                              >
                                {desc.split("\n").map((item) => {
                                  return (
                                    <>
                                      {item}
                                      <br />
                                    </>
                                  );
                                })}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="min-h-full basis-[48%] justify-start border-l-4 text-base md:text-lg font-normal px-4 flex flex-col items-start">
                          <h3 className="font-bold">Petunjuk Penggunaan:</h3>
                          <div className="flex flex-col max-h-[53.5vh] overflow-auto">
                            <p className="text-footer_fontClr text-justify text-sm md:text-base">
                              {userGuide.split("\n").map((item) => {
                                return (
                                  <>
                                    {item}
                                    <br />
                                  </>
                                );
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full text-sm md:text-base font-normal flex text-footer_fontClr justify-between items-center pt-[10px] border-t-2 border-footer_fontClr">
                    <div className="flex h-[40px] rounded-lg relative bg-transparent">
                      <button
                        onClick={() => setCounter((prevState) => prevState - 1)}
                        disabled={disabled}
                        className={`border-[2px] border-black bg-gry-counterClr text-black hover:text-gray-700 ${
                          currentRole === "Konsumer"
                            ? "hover:bg-grn-300"
                            : "hover:bg-ble-300"
                        } h-full w-[30px] sm:w-[40px] rounded-l-[8px] cursor-pointer outline-none`}
                      >
                        <span className="m-auto text-xl font-normal">−</span>
                      </button>
                      <input
                        type="text"
                        className="border-y-[2px] border-black focus:outline-none text-center w-[30px] sm:w-[40px] bg-white font-semibold hover:text-black focus:text-black text-base md:text-lg cursor-default flex items-center text-grn-950  outline-none"
                        name="custom-input-number"
                        value={counter}
                        disabled={true}
                      ></input>
                      <button
                        onClick={() => setCounter((prevState) => prevState + 1)}
                        className={`bg-gry-counterClr border-[2px] border-black text-black hover:text-gray-700 ${
                          currentRole === "Konsumer"
                            ? "hover:bg-grn-300"
                            : "hover:bg-ble-300"
                        } h-full w-[30px] sm:w-[40px] rounded-r-[8px] cursor-pointer`}
                      >
                        <span className="m-auto text-xl font-normal">+</span>
                      </button>
                    </div>
                    <div className="grid place-items-center">
                      <p className="text-sm sm:text-base font-light">
                        Subtotal
                      </p>
                      <h3 className="font-bold">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(
                          counter *
                            (currentRole === "Konsumer"
                              ? priceEcer
                              : priceBakul)
                        )}
                      </h3>
                    </div>
                    <button
                    disabled={isUploading ? true : false}
                      onClick={() => {
                        tambahKeranjangHandler(idProduct, counter);
                      }}
                      className="rounded-[8px] bg-footer_fontClr text-white font-normal text-base md:text-lg px-[10px] md:px-[20px] py-2 hover:opacity-80 active:scale-95 transition-all whitespace-nowrap"
                    >
                      {isUploading ? <Spinner customClass={customClass} /> : "+ Keranjang"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
