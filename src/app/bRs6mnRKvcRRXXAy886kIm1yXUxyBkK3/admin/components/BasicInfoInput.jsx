export default function BasicInfoInput({ isDisabled, onChange }) {
  return (
    <div className="bg-white grid gap-6 rounded-3xl shadow-xl p-6 grow">
      <div className="grid">
        <label
          htmlFor="name"
          className="text-footer_fontClr font-normal text-sm md:text-base text-opacity-80"
        >
          Nama Produk
        </label>
        <input
          required
          disabled={isDisabled}
          type="text"
          name="name"
          id="name"
          onChange={onChange}
          className="w-full text-grn-950 font-normal text-sm md:text-base border-b-[1px] border-grn-950 p-[3px] md:p-[5px] outline-none"
        />
      </div>
      <div className="grid">
        <label
          htmlFor="price"
          className="text-footer_fontClr font-normal text-sm md:text-base text-opacity-80"
        >
          Harga Produk
        </label>
        <div className="flex items-center w-full">
          <h3 className="leading-3 font-bold text-sm md:text-base text-ble-950 px-2">
            Rp
          </h3>
          <input
          disabled={isDisabled}
            type="number"
            className="remove-arrow text-grn-950 resize-none w-full h-full border-b-[1px] border-grn-950 p-[3px] md:p-[5px] outline-none"
            id="price"
            name="price"
            onKeyDown={(e) => {
              if ([38, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
              }
            }}
            onWheel={(e) => e.target.blur()}
            onChange={onChange}
          />
        </div>
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
          disabled={isDisabled}
          type="text"
          name="category"
          id="category"
          onChange={onChange}
          className="w-full text-grn-950 font-normal text-sm md:text-base border-b-[1px] border-grn-950 p-[3px] md:p-[5px] outline-none"
        />
      </div>
    </div>
  );
}
