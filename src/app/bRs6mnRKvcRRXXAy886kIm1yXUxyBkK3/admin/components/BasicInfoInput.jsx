export default function BasicInfoInput({ onChange }) {
  return (
    <div className="bg-white grid gap-2 rounded-3xl shadow-xl p-6 grow">
      <div className="grid">
        <label
          htmlFor="name"
          className="text-footer_fontClr font-normal text-sm md:text-base text-opacity-80"
        >
          Nama Produk
        </label>
        <input
          required
          /* disabled={isLoading ? true : false} */
          type="name"
          name="name"
          id="name"
          onChange={onChange}
          className="w-full text-grn-950 font-normal text-sm md:text-base border-b-[1px] border-grn-950 p-[1px] md:p-[5px] outline-none"
        />
      </div>
      <div className="grid">
        <label
          htmlFor="price"
          className="text-footer_fontClr font-normal text-sm md:text-base text-opacity-80"
        >
          Harga Produk
        </label>
        <input
          required
          /* disabled={isLoading ? true : false} */
          type="price"
          name="price"
          id="price"
          onChange={onChange}
          className="w-full text-grn-950 font-normal text-sm md:text-base border-b-[1px] border-grn-950 p-[1px] md:p-[5px] outline-none"
        />
      </div>
      <div className="grid">
        <label
          htmlFor="category"
          className="text-footer_fontClr font-normal text-sm md:text-base text-opacity-80"
        >
          Kategori Produk
        </label>
        <input
          required
          /* disabled={isLoading ? true : false} */
          type="category"
          name="category"
          id="category"
          onChange={onChange}
          className="w-full text-grn-950 font-normal text-sm md:text-base border-b-[1px] border-grn-950 p-[1px] md:p-[5px] outline-none"
        />
      </div>
    </div>
  );
}
