import AddProductCard from "@/app/bRs6mnRKvcRRXXAy886kIm1yXUxyBkK3/admin/(components)/AddProductCard";
import CardProduct from "./CardProduct";

export default function ProductCatalogue({
  hapusHandler,
  currentRole,
  dataProduct,
  userProfile,
  onProductCardHandler,
  onKeranjangHandler,
  filterStat,
}) {
  const role = currentRole ? currentRole : userProfile && userProfile.customClaims.role;

  return (
    <section
      className={`grid gap-[55px] max-w-full ${
        filterStat ? "grid-cols-3" : "grid-cols-4"
      }`}
    >
      {role === "Admin" && <AddProductCard />}
      {dataProduct && dataProduct.map((item, index) => {
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
      })}
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
