export default function BasicInfoInput({ dataFromServer, isDisabled, onChange }) {
  
  
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
          defaultValue={dataFromServer && dataFromServer.name}
          onChange={onChange}
          className="w-full text-grn-950 font-normal text-sm md:text-base border-b-[1px] border-grn-950 p-[3px] md:p-[5px] outline-none"
        />
      </div>
      <div className="grid">
        <label
          htmlFor="priceEcer"
          className="text-footer_fontClr font-normal text-sm md:text-base text-opacity-80"
        >
          Harga Eceran
        </label>
        <div className="flex items-center w-full">
          <h3 className="leading-3 font-bold text-sm md:text-base text-ble-950 px-2">
            Rp
          </h3>
          <input
            required
            disabled={isDisabled}
            type="number"
            className="remove-arrow text-grn-950 resize-none w-full h-full border-b-[1px] border-grn-950 p-[3px] md:p-[5px] outline-none"
            id="priceEcer"
            defaultValue={dataFromServer && dataFromServer.price.priceEcer}
            name="priceEcer"
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
          htmlFor="priceBakul"
          className="text-footer_fontClr font-normal text-sm md:text-base text-opacity-80"
        >
          Harga Bakulan
        </label>
        <div className="flex items-center w-full">
          <h3 className="leading-3 font-bold text-sm md:text-base text-ble-950 px-2">
            Rp
          </h3>
          <input
            required
            disabled={isDisabled}
            type="number"
            className="remove-arrow text-grn-950 resize-none w-full h-full border-b-[1px] border-grn-950 p-[3px] md:p-[5px] outline-none"
            id="priceBakul"
            defaultValue={dataFromServer && dataFromServer.price.priceBakul}
            name="priceBakul"
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
          defaultValue={dataFromServer && dataFromServer.category}
          onChange={onChange}
          className="w-full text-grn-950 font-normal text-sm md:text-base border-b-[1px] border-grn-950 p-[3px] md:p-[5px] outline-none"
        />
      </div>
    </div>
  );
}
