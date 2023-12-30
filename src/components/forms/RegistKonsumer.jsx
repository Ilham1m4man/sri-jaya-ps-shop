import { useState } from "react";
import PeekBtn from "../buttons/PeekBtn";
import Spinner from "../loaders/Spinner";

export default function RegistKonsumer({
  isLoading,
  inputHandler,
  setPW,
  setConfPW,
}) {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  const customClass = "fill-grn-400 w-12 h-6";

  return (
    <form
      onSubmit={inputHandler}
      className={`${
        isLoading && "opacity-60 text-opacity-60"
      } flex flex-col gap-[30px] w-[85%] md:w-[70%]`}
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
          className="w-full text-grn-950 font-normal text-base md:text-lg border-b-2 border-grn-950 p-[5px] md:p-[10px] outline-none"
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
          className="w-full text-grn-950 font-normal text-base md:text-lg border-b-2 border-grn-950 p-[5px] md:p-[10px] outline-none"
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
            className="w-full text-grn-950 font-normal text-base md:text-lg border-b-2 border-grn-950 p-[5px] md:p-[10px] outline-none"
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
            className="w-full text-grn-950 font-normal text-base md:text-lg border-b-2 border-grn-950 p-[5px] md:p-[10px] outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        className="max-w-[176px] bg-footer_fontClr hover:opacity-90 active:scale-95 transition-all text-base md:text-lg font-normal text-grn-50 rounded-[10px] px-[30px] py-[10px] place-self-center"
      >
        {isLoading ? <Spinner customClass={customClass} /> : "Daftar"}
      </button>
    </form>
  );
}
