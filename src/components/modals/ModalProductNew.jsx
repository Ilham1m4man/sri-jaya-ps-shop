import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BackBtn from "../buttons/BackBtn";

export default function ModalProductNew({
  clickedProduct,
  modal_product,
  currentRole,
  isModalProductOpen,
}) {
  const { idProduct, name, price, category, desc, userGuide, productImg } =
    clickedProduct;
  const { priceEcer, priceBakul } = price;
  const { mainImg, optImg1, optImg2 } = productImg;
  const [counter, setCounter] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [isReadMoreVisible, setIsReadMoreVisible] = useState(true);
  const [textCoba, setTextCoba] =
    useState(`Bolt Tuna Cat Food Kibble Ikan merupakan pakan kucing yang diperkaya dengan taurine, antioksidan, vitamin dan mineral. Bermanfaat untuk membuat kulit sehat dan bulu berkilau, serta mengurangi resiko FLUTD (penyakit saluran kemih pada kucing).

    Untuk segala jenis kucing dengan usia diatas 1 tahun
    
    Komposisi :
    Jagung, Tepung Daging Unggas, Tepung Terigu, Isolat Protein Kedelai, Tepung Tuna, Lemak Unggas, Pencernaan Hati Ayam, Vitamin dan Mineral, (Vitamin A Palmitat, D3, E, L-ascorbyl-2-polyphosphate, Thiamin, Ribloflavin, Asam Pantotenat , Pyridoxine, Biotin, Choline Chloride, Ferrous Sulfate, Zinc Sulfate, Copper Sulfate, Manganese Sulfate, Sodium Selenite, Calcium Iodate), Taurine, Antioxidant.
    
    Nilai gizi :
    Protein min.28%, lemak min.9%, serat max.4%, kadar air max.10%
    
    Keunggulan produk :
    Membuat kulit sehat dan bulu berkilau, mempertajam penglihatan, membantu menjaga kesehatan gigi, mengurangi resiko FLUTD ( penyakit saluran kemih pada kucing ), dan meningkatkan sistem imunitas
    
    Berat bersih : 8kg dan 20kg
    Kemasan : Bulky`);

  useEffect(() => {
    if (counter === 1 || counter <= 1) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [counter]);

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
            <div className="flex min-h-full items-center justify-center py-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[98%] transform overflow-hidden rounded-[20px] bg-gradient-to-b from-mainBg_clr to-white py-[50px] px-12 text-left flex flex-col gap-[20px] items-center shadow-xl transition-all">
                  <div className="flex justify-end w-full relative items-center">
                    <Dialog.Title
                      as="h3"
                      className={`text-lg md:text-xl px-3 py-1 md:px-6 md:py-2 rounded-[10px] mx-auto font-bold ${
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

                  <div className="flex">
                    <Carousel
                      additionalTransfrom={0}
                      arrows
                      autoPlay
                      autoPlaySpeed={10000}
                      centerMode={false}
                      className="w-[300px] border-2 border-red-500"
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
                          className="max-h-[300px] w-8/12 object-contain object-center"
                          src={mainImg.URL}
                          alt={name}
                        />
                      </div>
                      <div className="flex max-h-[300px] h-[50vh] justify-center">
                        <img
                          className="max-h-[300px] w-8/12 object-contain object-center"
                          src={optImg1.URL}
                          alt={name}
                        />
                      </div>
                      <div className="flex max-h-[300px] h-[50vh] justify-center">
                        <img
                          className="max-h-[300px] w-8/12 object-contain object-center"
                          src={optImg2.URL}
                          alt={name}
                        />
                      </div>
                    </Carousel>

                    {/* DESKRIPSI */}
                    <div className="w-full flex flex-col relative z-50 items-center justify-center gap-[70px] text-footer_fontClr">
                      <h1 className="font-bold text-lg md:text-2xl">{name}</h1>
                      <div className="w-[90%] grid gap-y-[50px]">
                        <h2 className="font-bold text-base md:text-xl">
                          Rp.{" "}
                          {currentRole === "Konsumer" ? priceEcer : priceBakul}
                        </h2>
                        <div className="flex flex-col gap-[30px]">
                          <div className="text-sm md:text-lg font-normal">
                            <p>
                              Kategori
                              <span className="pr-[10px] pl-[20px]">:</span>
                            </p>
                            <p>{category}</p>
                          </div>
                          <div className="text-base md:text-lg font-normal flex flex-col items-start">
                            <div className="flex">
                              <p>
                                Keterangan<span className="px-[10px]">:</span>
                              </p>
                              <p
                                className={`keterangan text-justify ${
                                  isReadMoreVisible
                                    ? "line-clamp-3"
                                    : "line-clamp-none"
                                } text-justify`}
                              >
                                {desc.split("\n").map((item, key) => {
                                  return (
                                    <>
                                      {item}
                                      <br />
                                    </>
                                  );
                                })}
                              </p>
                            </div>
                            {isReadMoreVisible ? (
                              <button
                                className={`text-grn-600 font-bold ml-[57px]`}
                                onClick={() =>
                                  setIsReadMoreVisible(!isReadMoreVisible)
                                }
                              >
                                Baca Selengkapnya
                              </button>
                            ) : (
                              <button
                                className={`text-grn-600 font-bold ml-[57px]`}
                                onClick={() =>
                                  setIsReadMoreVisible(!isReadMoreVisible)
                                }
                              >
                                Baca Lebih Sedikit
                              </button>
                            )}
                          </div>
                          <div className="text-sm md:text-base font-normal flex justify-between pt-[10px] pb-[20px] border-t-2 border-footer_fontClr">
                            <div className="flex h-[30px] rounded-lg relative bg-transparent">
                              <button
                                onClick={() =>
                                  setCounter((prevState) => prevState - 1)
                                }
                                disabled={disabled}
                                className="border-[2px] border-black bg-gry-counterClr text-black hover:text-gray-700 hover:bg-grn-300 h-full w-[20px] rounded-l-[8px] cursor-pointer outline-none"
                              >
                                <span className="m-auto text-3xl font-normal">
                                  −
                                </span>
                              </button>
                              <input
                                type="text"
                                className="border-y-[2px] border-black focus:outline-none text-center w-[20px] bg-white font-semibold text-3xl hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-grn-950  outline-none"
                                name="custom-input-number"
                                value={counter}
                                disabled={true}
                              ></input>
                              <button
                                onClick={() =>
                                  setCounter((prevState) => prevState + 1)
                                }
                                className="bg-gry-counterClr border-[2px] border-black text-black hover:text-gray-700 hover:bg-grn-300 h-full w-[20px] rounded-r-[8px] cursor-pointer"
                              >
                                <span className="m-auto text-xl font-normal">
                                  +
                                </span>
                              </button>
                            </div>
                            <div className="grid place-items-center">
                              <p className="text-base font-light">Subtotal</p>
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
                            <button className="rounded-[8px] bg-footer_fontClr text-white font-normal text-base md:text-lg px-[20px] whitespace-nowrap">
                              Masukkan ke keranjang
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
