import AddProductCard from "@/app/bRs6mnRKvcRRXXAy886kIm1yXUxyBkK3/admin/(components)/AddProductCard";
import CardProduct from "./CardProduct";

export default function ProductCatalogue({
  searchKeyword,
  checkedItems,
  catProd,
  hapusHandler,
  currentRole,
  dataProduct,
  userProfile,
  onProductCardHandler,
  tambahKeranjangHandler,
  filterStat,
}) {
  let isLoading
  const role = currentRole
    ? currentRole
    : userProfile && userProfile.customClaims.role;

  const filteredProduct = () => {
    const cat = catProd.map((prod, index) => {
      const checkedArray = Object.values(checkedItems);
      if (checkedArray[index] === true) {
        return prod;
      }
    });

    return cat.filter(Boolean)
  };

  const renderProduct = () => {
    isLoading = true
    const searchedProduct =
      dataProduct &&
      dataProduct.filter((item) => {
        if (
          checkedItems &&
          Object.values(checkedItems).find((item) => item === true)
        ) {
          return item.category.toLowerCase().includes(filteredProduct(item).toString().toLowerCase());
        } else {
          return item.name.toLowerCase().includes(searchKeyword.toLowerCase());
        }
      });

    if (searchedProduct && searchedProduct.length === 0) {
      isLoading = false
      return (
        <div className="flex items-center">
          <h3
            className={`${
              role === "Konsumer" ? "text-grn-950" : "text-ble-950"
            } text-sm md:text-base bg-white rounded-[10px] px-[20px] py-[10px]`}
          >
            Maaf tidak ada produk yang terkait
          </h3>
        </div>
      );
    } else {
      isLoading = false
      if (searchedProduct) {
        return (
          searchedProduct &&
          searchedProduct.map((item, index) => {
            return (
              <CardProduct
                key={index}
                hapusHandler={hapusHandler}
                dataProduct={item}
                role={role}
                onProductCardHandler={onProductCardHandler}
                tambahKeranjangHandler={tambahKeranjangHandler}
              />
            );
          })
        );
      }
    }
  };

  return (
    <section
      /* className={`grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 md:gap-[30px] lg:gap-[55px] w-full `} */
      className={`w-full flex flex-col gap-8 lg:gap-[55px]`}
    >
      <div
        className={`flex flex-wrap justify-center gap-4 md:gap-[30px] lg:gap-[55px] w-full`}
      >
        {role === "Admin" && <AddProductCard />}
        {renderProduct()}
      </div>
      {/* <button
        className={`load-more text-grn-950 max-w-[145px] place-self-center text-sm md:text-base bg-white rounded-[10px] px-[20px] py-[10px] ${
          filterStat ? "col-span-3" : "col-start-2 col-end-4 col-span-1"
        }`}
      >
        Load more
      </button> */}
    </section>
  );
}
