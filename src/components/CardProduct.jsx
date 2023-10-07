export default function CardProduct({ onProductCardHandler, onKeranjangHandler }) {
  return (
    <div
      id="card-product"
      className="relative max-w-[250px] max-h-[320px] z-0 rounded-[15px]"
    >
      <button
        onClick={onProductCardHandler}
        className="w-full h-full bg-white rounded-[15px]"
      >
        <div className="flex justify-center border-blue-500">
          <img
            className="max-h-[165px] w-8/12 object-cover object-bottom"
            src="../../images/A594K-removebg-preview.jpg"
            alt="Photo of A594K 1kg"
          />
        </div>
        <div className=" border-green-500 mt-2 text-left px-[25px] mb-20">
          <p className={`m-0 text-grn-950 font-medium max-w-[30ch] text-lg`}>
            A594K 1kg
          </p>
          <h2 className={`text-lg text-grn-950 font-bold mt-[15px]`}>
            Rp. 12.000
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
