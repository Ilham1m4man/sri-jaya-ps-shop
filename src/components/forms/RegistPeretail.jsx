import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PeekBtn from "../buttons/PeekBtn";
import Spinner from "../loaders/Spinner";

export default function RegistPeretail({
  isLoading,
  inputHandler,
  setPW,
  setConfPW,
  phoneValue,
  setPhoneValue,
}) {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  const customClass = "fill-ble-400 w-12 h-6";

  return (
    <form
      onSubmit={inputHandler}
      className={`${
        isLoading && "opacity-60 text-opacity-60"
      } grid grid-cols-2 grid-rows-6 gap-x-[30px] gap-y-[15px] w-full`}
    >
      <div className="grid">
        <label
          htmlFor="name"
          className="text-footer_fontClr font-normal text-base md:text-lg text-opacity-80"
        >
          Nama
        </label>
        <input
          required
          type="text"
          name="name"
          className="w-full text-ble-950 font-normal text-base md:text-lg border-b-2 border-ble-950 p-[5px] md:p-[10px] outline-none"
        />
      </div>
      <div className="grid">
        <label
          htmlFor="business-name"
          className="text-footer_fontClr font-normal text-base md:text-lg text-opacity-80"
        >
          Nama Bisnis
        </label>
        <input
          required
          type="text"
          name="business-name"
          className="w-full text-ble-950 font-normal text-base md:text-lg border-b-2 border-ble-950 p-[5px] md:p-[10px] outline-none"
        />
      </div>
      <div className="grid">
        <label
          htmlFor="email"
          className="text-footer_fontClr font-normal text-base md:text-lg text-opacity-80"
        >
          Email
        </label>
        <input
          required
          type="email"
          name="email"
          className="w-full text-ble-950 font-normal text-base md:text-lg border-b-2 border-ble-950 p-[5px] md:p-[10px] outline-none"
        />
      </div>
      <div className="grid">
        <label
          htmlFor="phone"
          className="text-footer_fontClr font-normal text-base md:text-lg text-opacity-80"
        >
          No. Telepon
        </label>
        <PhoneInput
          className="text-ble-950 font-normal text-base md:text-lg border-b-2 border-ble-950 p-[5px] md:p-[10px] outline-none"
          international
          countryCallingCodeEditable={false}
          defaultCountry="ID"
          value={phoneValue}
          onChange={setPhoneValue}
        />
      </div>
      <div className="grid">
        <label
          htmlFor="password"
          className="text-footer_fontClr font-normal text-base md:text-lg text-opacity-80"
        >
          Password
        </label>
        <div className="relative w-full mt-2">
          <PeekBtn
            isPasswordHidden={isPasswordHidden}
            setPasswordHidden={setPasswordHidden}
          />
          <input
            required
            type={isPasswordHidden ? "password" : "text"}
            name="password"
            onChange={(e) => setPW(e.target.value)}
            className="w-full text-ble-950 font-normal text-base md:text-lg border-b-2 border-ble-950 p-[5px] md:p-[10px] outline-none"
          />
        </div>
      </div>
      <div className="grid">
        <label
          htmlFor="confirm-password"
          className="text-footer_fontClr font-normal text-base md:text-lg text-opacity-80"
        >
          Ulangi Password
        </label>
        <div className="relative w-full mt-2">
          <PeekBtn
            isPasswordHidden={isConfirmPasswordHidden}
            setPasswordHidden={setConfirmPasswordHidden}
          />
          <input
            required
            type={isConfirmPasswordHidden ? "password" : "text"}
            name="confirm-password"
            onChange={(e) => setConfPW(e.target.value)}
            className="w-full text-ble-950 font-normal text-base md:text-lg border-b-2 border-ble-950 p-[5px] md:p-[10px] outline-none"
          />
        </div>
      </div>
      <div className="col-span-2 row-span-2 self-end">
        <h5 className="text-ble-950 text-base md:text-xl font-bold mb-[20px]">
          Syarat & Ketentuan:
        </h5>
        <ul className="text-ble-950 text-xs font-normal list-disc list-inside flex flex-col gap-[15px]">
          <li>
            Untuk wilayah Purbalingga, minimal pembelian senilai Rp.100.000
          </li>
          <li>
            Untuk luar Purbalingga, minimal pembelian senilai Rp.20.000.000
          </li>
          <li>
            Setelah pendaftaran akun Peretail, anda{" "}
            <strong>wajib konfirmasi</strong> ke pihak Sri Jaya PS
          </li>
        </ul>
      </div>
      <button
        type="submit"
        className="col-span-2 max-w-[176px] hover:opacity-90 active:scale-95 transition-all bg-footer_fontClr text-base md:text-xl font-normal text-ble-50 rounded-[10px] px-[30px] py-[10px] place-self-center"
      >
        {isLoading ? <Spinner customClass={customClass} /> : "Daftar"}
      </button>
    </form>
  );
}
