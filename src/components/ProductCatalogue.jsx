import AddProductCard from "@/app/bRs6mnRKvcRRXXAy886kIm1yXUxyBkK3/admin/(components)/AddProductCard";
import CardProduct from "./CardProduct";

export default function ProductCatalogue({
  searchKeyword,
  hapusHandler,
  currentRole,
  dataProduct,
  userProfile,
  onProductCardHandler,
  onKeranjangHandler,
  filterStat,
}) {
  const role = currentRole
    ? currentRole
    : userProfile && userProfile.customClaims.role;

  return (
    <section
      /* className={`grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 md:gap-[30px] lg:gap-[55px] w-full `} */
      className={`w-full`}
    >
      <div
        className={`flex flex-wrap justify-center gap-4 md:gap-[30px] lg:gap-[55px] w-full`}
      >
        {role === "Admin" && <AddProductCard />}
        {dataProduct &&
          dataProduct.map((item, index) => {
            if (item.name.toLowerCase().includes(searchKeyword)) {
              return (
                <CardProduct
                  key={index}
                  hapusHandler={hapusHandler}
                  dataProduct={item}
                  role={role}
                  onProductCardHandler={onProductCardHandler}
                  onKeranjangHandler={onKeranjangHandler}
                />
              );
            }
          })}
      </div>
      <button
        className={`load-more text-grn-950 max-w-[145px] place-self-center bg-white rounded-[10px] px-[20px] py-[10px] ${
          filterStat ? "col-span-3" : "col-start-2 col-end-4 col-span-1"
        }`}
      >
        Load more
      </button>
    </section>
  );
}
