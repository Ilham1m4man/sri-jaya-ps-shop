import { useState, useEffect } from "react";

export default function ModalProduct({ modal_product, currentRole }) {
  const [counter, setCounter] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [isV2, setIsV2] = useState(false);
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

  function showReadMoreButton(element) {
    if (
      element.offsetHeight < element.scrollHeight ||
      element.offsetWidth < element.scrollWidth
    ) {
      setIsReadMoreVisible(true);
    } else {
      setIsReadMoreVisible(false);
    }
  }

  useEffect(() => {
    showReadMoreButton(document.querySelector(".keterangan"));
    if (counter === 1 || counter <= 1) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [counter]);

  const ModalProductV1 = () => {
    return (
      <section className="modal absolute top-0 bg-bg-blur-clr backdrop-blur bg-opacity-40 w-full flex justify-center">
        <div className="rounded-[20px] mb-auto bg-white opacity-100 flex flex-col gap-[68px] items-center justify-center w-[98%]">
          <div className="flex justify-end w-full pt-8 px-12">
            <h3
              className={`text-2xl px-10 py-4 rounded-[10px] mx-auto font-bold ${
                currentRole === "konsumer"
                  ? "text-grn-950 bg-grn-300"
                  : "text-ble-950 bg-ble-300"
              }`}
            >
              {currentRole}
            </h3>
            <button onClick={modal_product} className="px-[2px]">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2433 13L25.3214 3.9219C25.7522 3.49181 25.9946 2.90819 25.9951 2.29942C25.9956 1.69065 25.7543 1.1066 25.3242 0.675758C24.8942 0.244913 24.3105 0.00256513 23.7018 0.00202751C23.093 0.00148988 22.5089 0.242807 22.0781 0.672891L13 9.751L3.9219 0.672891C3.49105 0.242046 2.9067 0 2.29739 0C1.68809 0 1.10374 0.242046 0.672891 0.672891C0.242046 1.10374 0 1.68809 0 2.29739C0 2.9067 0.242046 3.49105 0.672891 3.9219L9.751 13L0.672891 22.0781C0.242046 22.5089 0 23.0933 0 23.7026C0 24.3119 0.242046 24.8963 0.672891 25.3271C1.10374 25.758 1.68809 26 2.29739 26C2.9067 26 3.49105 25.758 3.9219 25.3271L13 16.249L22.0781 25.3271C22.5089 25.758 23.0933 26 23.7026 26C24.3119 26 24.8963 25.758 25.3271 25.3271C25.758 24.8963 26 24.3119 26 23.7026C26 23.0933 25.758 22.5089 25.3271 22.0781L16.2433 13Z"
                  fill="#05150F"
                />
              </svg>
            </button>
          </div>
          <div className="w-full flex gap-[50px]">
            <div className="relative z-50">
              <div className="w-[580px] h-[560px] bg-grn-300 flex justify-center items-center rounded-r-[60px] pl-[20px]">
                <div className="aspect-square rounded-[30px] w-[500px] bg-white overflow-hidden flex justify-center items-center">
                  <img
                    className="w-[490px] h-[500px] object-cover object-bottom"
                    src="../../images/A594K-removebg-preview.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="before:absolute -z-10 before:w-[540px] before:h-[200px] before:left-0 before:bottom-[20px] before:bg-grn-200 before:rounded-r-[60px] absolute w-[500px] h-[200px] -bottom-[40px] left-0 bg-mainBg_clr rounded-r-[60px]"></div>
            </div>
            <div className="max-w-[620px] text-grn-950 flex flex-col gap-[70px]">
              <h3 className="text-[40px] font-bold">Bolt Kibble Ikan</h3>
              <div className="flex flex-col gap-[30px]">
                <div className="text-[24px] font-normal flex flex-col items-start">
                  <div className="flex">
                    <p>
                      Keterangan<span className="px-[20px]">:</span>
                    </p>
                    <p
                      className={`keterangan text-justify ${
                        isReadMoreVisible ? "line-clamp-3" : "line-clamp-none"
                      } text-justify`}
                    >
                      {textCoba.split("\n").map((item, key) => {
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
                      className={`text-grn-600 font-bold ml-[177px]`}
                      onClick={() => setIsReadMoreVisible(!isReadMoreVisible)}
                    >
                      Baca Selengkapnya
                    </button>
                  ) : (
                    <button
                      className={`text-grn-600 font-bold ml-[177px]`}
                      onClick={() => setIsReadMoreVisible(!isReadMoreVisible)}
                    >
                      Baca Lebih Sedikit
                    </button>
                  )}
                </div>
                <div className="text-[24px] font-normal flex">
                  <p>
                    Kategori<span className="pr-[20px] pl-[54px]">:</span>
                  </p>
                  <p>Pakan</p>
                </div>
                <div className="text-[24px] font-normal flex">
                  <p>
                    Harga<span className="pr-[20px] pl-[83px]">:</span>
                  </p>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(counter * 22000)}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex h-[65px] w-[50%] rounded-lg relative bg-transparent">
                  <button
                    onClick={() => setCounter((prevState) => prevState - 1)}
                    disabled={disabled}
                    className="border-[2px] border-black bg-gry-counterClr text-black hover:text-gray-700 hover:bg-grn-300 h-full w-[76.5px] rounded-l-[15px] cursor-pointer outline-none"
                  >
                    <span className="m-auto text-3xl font-normal">−</span>
                  </button>
                  <input
                    type="text"
                    className="border-y-[2px] border-black focus:outline-none text-center w-[76px] bg-white font-semibold text-3xl hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-grn-950  outline-none"
                    name="custom-input-number"
                    value={counter}
                    disabled={true}
                  ></input>
                  <button
                    onClick={() => setCounter((prevState) => prevState + 1)}
                    className="bg-gry-counterClr border-[2px] border-black text-black hover:text-gray-700 hover:bg-grn-300 h-full w-[76.5px] rounded-r-[15px] cursor-pointer"
                  >
                    <span className="m-auto text-3xl font-normal">+</span>
                  </button>
                </div>
                <button className="rounded-[15px] bg-footer_fontClr text-white font-normal text-2xl px-[40px] whitespace-nowrap">
                  Masukkan ke keranjang
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-[50px] relative z-50 justify-center pb-[101px]">
            <div className="w-[575px] aspect-square bg-gradient-to-b from-grn-300 flex justify-center items-center rounded-[37px]">
              <div className="aspect-square rounded-[30px] w-[560px] bg-white overflow-hidden flex justify-center items-center">
                <img
                  className="w-[490px] h-[570px] object-cover object-bottom"
                  src="../../images/A594K_Front-removebg-preview.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="w-[575px] aspect-square bg-gradient-to-b from-grn-300 flex justify-center items-center rounded-[37px]">
              <div className="aspect-square rounded-[30px] w-[560px] bg-white overflow-hidden flex justify-center items-center">
                <img
                  className="w-[430px] object-cover object-bottom"
                  src="../../images/A594K_Back-removebg-preview.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="before:absolute -z-10 before:w-[1213px] before:h-[306px] before:right-0 before:bottom-[20px] before:bg-grn-200 before:rounded-l-[60px] absolute w-[1158px] right-0 h-[200px] bottom-[40px] bg-mainBg_clr rounded-l-[60px] after:absolute after:w-[1268px] after:h-[306px] after:right-0 after:bottom-[40px] after:bg-grn-300 after:rounded-l-[60px]"></div>
          </div>
        </div>
      </section>
    );
  };

  const ModalProductV2 = () => {
    return (
      <section className="modal absolute top-0 bg-bg-blur-clr backdrop-blur bg-opacity-40 w-full flex justify-center">
        <div className="rounded-[20px] mb-auto bg-gradient-to-b from-mainBg_clr to-white opacity-100 flex flex-col gap-[60px] items-center justify-center w-[98%]">
          <div className="flex justify-end w-full pt-8 px-12 relative items-center">
            <h3
              className={`text-2xl px-10 py-4 rounded-[10px] mx-auto font-bold ${
                currentRole === "konsumer"
                  ? "text-grn-950 bg-grn-300"
                  : "text-ble-950 bg-ble-300"
              }`}
            >
              {currentRole}
            </h3>
            <button onClick={modal_product} className="absolute px-[2px]">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2433 13L25.3214 3.9219C25.7522 3.49181 25.9946 2.90819 25.9951 2.29942C25.9956 1.69065 25.7543 1.1066 25.3242 0.675758C24.8942 0.244913 24.3105 0.00256513 23.7018 0.00202751C23.093 0.00148988 22.5089 0.242807 22.0781 0.672891L13 9.751L3.9219 0.672891C3.49105 0.242046 2.9067 0 2.29739 0C1.68809 0 1.10374 0.242046 0.672891 0.672891C0.242046 1.10374 0 1.68809 0 2.29739C0 2.9067 0.242046 3.49105 0.672891 3.9219L9.751 13L0.672891 22.0781C0.242046 22.5089 0 23.0933 0 23.7026C0 24.3119 0.242046 24.8963 0.672891 25.3271C1.10374 25.758 1.68809 26 2.29739 26C2.9067 26 3.49105 25.758 3.9219 25.3271L13 16.249L22.0781 25.3271C22.5089 25.758 23.0933 26 23.7026 26C24.3119 26 24.8963 25.758 25.3271 25.3271C25.758 24.8963 26 24.3119 26 23.7026C26 23.0933 25.758 22.5089 25.3271 22.0781L16.2433 13Z"
                  fill="#05150F"
                />
              </svg>
            </button>
          </div>
          <div className="w-full flex pt-[40px] gap-[50px] justify-between items-end overflow-hidden">
            <button className="relative group -left-[70px] z-50 aspect-square w-[300px] overflow-hidden flex justify-start items-center hover:left-0 transition-all">
              <img
                className="w-[200px] object-cover object-bottom drop-shadow-[0_15px_10px_rgba(0,0,0,0.45)] group-hover:w-[240px] group-hover:rotate-12 group-hover:translate-x-10 transition-all"
                src="../../images/A594K_Front-removebg-preview.jpg"
                alt=""
              />
              <div className="absolute -z-10 -left-[20px] w-[225px] h-[130px] bottom-0 bg-grn-300 rounded-r-[15px] group-hover:left-0"></div>
            </button>
            <div className="relative z-50 flex justify-center bottom-[40px]">
              <div className="aspect-square h-[560px] bg-grn-300 flex justify-center items-center rounded-[60px]">
                <div className="aspect-square rounded-[30px] w-[500px] bg-white overflow-hidden flex justify-center items-center">
                  <img
                    className="w-[490px] h-[500px] object-cover object-bottom"
                    src="../../images/A594K-removebg-preview.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="absolute -z-10 w-[480px] h-[200px] -bottom-[20px] bg-grn-200 rounded-[60px]"></div>
              <div className="absolute -z-20 w-[400px] h-[200px] -bottom-[40px] bg-grn-100 rounded-[60px]"></div>
            </div>
            <button className="relative group z-50 -right-[70px] aspect-square w-[300px] overflow-hidden flex justify-end items-center hover:right-0 transition-all">
              <img
                className="w-[180px] object-cover object-bottom drop-shadow-[0_15px_10px_rgba(0,0,0,0.45)] group-hover:w-[220px] group-hover:-rotate-12 group-hover:-translate-x-10 transition-all"
                src="../../images/A594K_Back-removebg-preview.jpg"
                alt=""
              />
              <div className="absolute -z-10 -right-[20px] w-[240px] h-[130px] bottom-0 bg-grn-300 rounded-l-[15px] group-hover:right-0"></div>
            </button>
          </div>
          {/* DESKRIPSI */}
          <div className="w-full flex flex-col relative z-50 items-center justify-center gap-[70px] text-footer_fontClr">
            <h1 className="font-bold text-[4rem]">Bolt Kibble Ikan</h1>
            <div className="w-[90%] grid gap-y-[50px]">
              <h2 className="font-bold text-[3rem]">Rp 22.000</h2>
              <div className="flex flex-col gap-[30px]">
                <div className="text-[24px] font-normal flex">
                  <p>
                    Kategori<span className="pr-[20px] pl-[54px]">:</span>
                  </p>
                  <p>Pakan</p>
                </div>
                <div className="text-[24px] font-normal flex flex-col items-start">
                  <div className="flex">
                    <p>
                      Keterangan<span className="px-[20px]">:</span>
                    </p>
                    <p
                      className={`keterangan text-justify ${
                        isReadMoreVisible ? "line-clamp-3" : "line-clamp-none"
                      } text-justify`}
                    >
                      {textCoba.split("\n").map((item, key) => {
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
                      className={`text-grn-600 font-bold ml-[177px]`}
                      onClick={() => setIsReadMoreVisible(!isReadMoreVisible)}
                    >
                      Baca Selengkapnya
                    </button>
                  ) : (
                    <button
                      className={`text-grn-600 font-bold ml-[177px]`}
                      onClick={() => setIsReadMoreVisible(!isReadMoreVisible)}
                    >
                      Baca Lebih Sedikit
                    </button>
                  )}
                </div>
                <div className="text-[24px] font-normal flex justify-between pt-[20px] pb-[50px] border-t-2 border-footer_fontClr">
                  <div className="flex h-[65px] rounded-lg relative bg-transparent">
                    <button
                      onClick={() => setCounter((prevState) => prevState - 1)}
                      disabled={disabled}
                      className="border-[2px] border-black bg-gry-counterClr text-black hover:text-gray-700 hover:bg-grn-300 h-full w-[76.5px] rounded-l-[15px] cursor-pointer outline-none"
                    >
                      <span className="m-auto text-3xl font-normal">−</span>
                    </button>
                    <input
                      type="text"
                      className="border-y-[2px] border-black focus:outline-none text-center w-[76px] bg-white font-semibold text-3xl hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-grn-950  outline-none"
                      name="custom-input-number"
                      value={counter}
                      disabled={true}
                    ></input>
                    <button
                      onClick={() => setCounter((prevState) => prevState + 1)}
                      className="bg-gry-counterClr border-[2px] border-black text-black hover:text-gray-700 hover:bg-grn-300 h-full w-[76.5px] rounded-r-[15px] cursor-pointer"
                    >
                      <span className="m-auto text-3xl font-normal">+</span>
                    </button>
                  </div>
                  <div className="grid place-items-center">
                    <p className="text-xl font-light">Subtotal</p>
                    <h3 className="font-bold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(counter * 22000)}
                    </h3>
                  </div>
                  <button className="rounded-[15px] bg-footer_fontClr text-white font-normal text-2xl px-[40px] whitespace-nowrap">
                    Masukkan ke keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return <>{isV2 ? <ModalProductV2 /> : <ModalProductV1 />}</>;
}
