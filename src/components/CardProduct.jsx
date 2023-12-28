import { FaMinusCircle } from "react-icons/fa";

export default function CardProduct({
  dataProduct,
  role,
  onProductCardHandler,
  onKeranjangHandler,
}) {
  const { idProduct, name, price, productImgURLs } = dataProduct;

  function numberWithCommas(x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  }

  const hapusHandler = () => {
    console.log(idProduct + " telah dihapus")
  }

  return (
    <div
      id="card-product"
      className="relative max-w-[250px] max-h-[320px] z-0 rounded-[15px] bg-black"
    >
      {role === "Admin" && (
        <button
          onClick={hapusHandler}
          className="z-20 bg-transparent border-none rounded-full absolute -right-4 top-3 group hover:scale-95 active:scale-90 transition-all"
        >
          <FaMinusCircle className="fill-red-500 bg-white rounded-full w-7 h-7 group-hover:fill-red-600 group-active:fill-red-700 transition-all" />
        </button>
      )}
      <button
        onClick={onProductCardHandler}
        className="w-full h-full bg-white rounded-[15px] hover:opacity-90 transition-all"
      >
        <div className="flex justify-center">
          <img
            className="max-h-[165px] w-8/12 object-cover object-bottom"
            src={productImgURLs.mainImgURL}
            alt="Photo of A594K 1kg"
          />
        </div>
        <div className=" mt-2 text-left px-[25px] mb-20">
          <p className={`m-0 text-grn-950 font-medium max-w-[30ch] text-lg`}>
            {name}
          </p>
          <h2 className={`text-lg text-grn-950 font-bold mt-[15px]`}>
            Rp. {numberWithCommas(price)}
          </h2>
        </div>
      </button>
      <div className="absolute w-full flex justify-center bottom-5 left-0">
        <button
          onClick={onKeranjangHandler}
          className="text-grn-950 bg-green_cardClr rounded-lg px-3 py-2"
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
}
