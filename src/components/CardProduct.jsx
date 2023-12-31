import { FaMinusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CardProduct({
  hapusHandler,
  dataProduct,
  role,
  onProductCardHandler,
  onKeranjangHandler,
}) {
  const { idProduct, name, price, productImg } = dataProduct;
  const router = useRouter()

  function numberWithCommas(x) {
    let priceType = "";
    if (role === "Konsumer") {
      priceType = x.priceEcer;
    } else if(role === "Peretail") {
      priceType = x.priceBakul;
    } else if(role === "Admin") {
      const ecer = x.priceEcer.toString().split(".");
      ecer[0] = ecer[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const bakul = x.priceBakul.toString().split(".");
      bakul[0] = bakul[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return (`${bakul.join(",")} (bakul) - ${ecer.join(",")} (ecer)`);  
    }

    const parts = priceType.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  }

  const editProduk = () => {
    if (role === "Admin") {
      router.push(`/bRs6mnRKvcRRXXAy886kIm1yXUxyBkK3/admin/edit-produk/${idProduct}`)
    } else {
      onProductCardHandler()
    }
  }

  return (
    <div
      id="card-product"
      className="relative min-w-[250px] max-w-[250px] max-h-[320px] z-0 rounded-[15px] bg-black"
    >
      {role === "Admin" && (
        <button
          onClick={() => hapusHandler(idProduct)}
          className="z-20 bg-transparent border-none rounded-full absolute -right-4 top-3 group hover:scale-95 active:scale-90 transition-all"
        >
          <FaMinusCircle className="fill-red-500 bg-white rounded-full w-7 h-7 group-hover:fill-red-600 group-active:fill-red-700 transition-all" />
        </button>
      )}
      <button
        onClick={editProduk}
        className="w-full h-full bg-white rounded-[15px] hover:opacity-90 transition-all"
      >
        <div className="flex max-h-[165px] h-[50vh] justify-center">
          <img
            className="max-h-[165px] w-8/12 object-contain object-center"
            src={productImg.mainImg.URL}
            alt={name}
          />
        </div>
        <div className={`${role === "Admin" ? "mb-5" : "mb-20" } mt-2 text-left px-[25px]`}>
          <p
            className={`m-0 text-grn-950 font-medium text-lg line-clamp-1`}
          >
            {name}
          </p>
          <h2 className={`text-lg text-grn-950 font-bold mt-[15px]`}>
            Rp. {numberWithCommas(price)}
          </h2>
        </div>
      </button>
      <div className={`${role === "Admin" && "hidden"} absolute w-full flex justify-center bottom-5 left-0`}>
        <button
          onClick={onKeranjangHandler}
          className={`${
            role === "Konsumer"
              ? "text-grn-950 bg-green_cardClr"
              : "text-ble-950 bg-ble-200"
          } rounded-lg px-3 py-2`}
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
}
