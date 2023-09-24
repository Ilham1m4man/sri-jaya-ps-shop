import CardProduct from "./CardProduct";

export default function ProductCatalogue({ onProductCardHandler, onKeranjangHandler, filterStat }) {
  return (
    <section className={`grid gap-[55px] max-w-full ${filterStat ? "grid-cols-3" : "grid-cols-4"}`}>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <CardProduct onProductCardHandler={onProductCardHandler} onKeranjangHandler={onKeranjangHandler}/>
      <button className={`load-more text-grn-950 max-w-[145px] place-self-center bg-white rounded-[10px] px-[20px] py-[10px] ${filterStat ? "col-span-3" : "col-start-2 col-end-4 col-span-1"}`}>
        Load more
      </button>
    </section>
  )
}