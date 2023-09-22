import CardProduct from "./CardProduct";

export default function ProductCatalogue({ onProductCardHandler, onKeranjangHandler }) {
  return (
    <section className="grid grid-cols-4 gap-[55PX] w-full">
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
    </section>
  )
}