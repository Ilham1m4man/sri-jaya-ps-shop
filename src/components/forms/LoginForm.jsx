import Link from "next/link";
import { useState } from "react";
import PeekBtn from "../buttons/PeekBtn";
import Spinner from "../loaders/Spinner";

export default function LoginForm({
  isLoading,
  inputHandler,
  setEmail,
  setPW,
}) {
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const customClass = "fill-grn-400 w-12 h-6";

  return (
    <form
      onSubmit={inputHandler}
      className="flex flex-col gap-[15px] md:gap-[40px] w-[90%] md:w-[70%]"
    >
      <div className="grid">
        <label
          htmlFor="email"
          className="text-footer_fontClr font-normal text-base md:text-xl text-opacity-80"
        >
          Email
        </label>
        <input
          disabled={isLoading ? true : false}
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-grn-950 font-normal text-base md:text-xl border-b-2 border-grn-950 p-[5px] md:p-[10px] outline-none"
        />
      </div>
      <div className="grid">
        <label
          htmlFor="password"
          className="text-footer_fontClr font-normal text-base md:text-xl text-opacity-80"
        >
          Password
        </label>
        <div className="relative w-full mt-2">
          <PeekBtn
            isPasswordHidden={isPasswordHidden}
            setPasswordHidden={setPasswordHidden}
          />
          <input
            disabled={isLoading ? true : false}
            type={isPasswordHidden ? "password" : "text"}
            id="password"
            name="password"
            onChange={(e) => setPW(e.target.value)}
            className="w-full text-grn-950 font-normal text-base md:text-xl border-b-2 border-grn-950 p-[5px] md:p-[10px] outline-none"
          />
        </div>
        <Link
          href={`/`}
          className="text-sm font-normal text-footer_fontClr place-self-end mt-[30px]"
        >
          Lupa Password
        </Link>
      </div>
      <button
        disabled={isLoading ? true : false}
        type="submit"
        className="max-w-[176px] disabled:cursor-not-allowed disabled:active:scale-100 bg-footer_fontClr hover:opacity-90 active:scale-95 text-base md:text-xl font-normal text-grn-50 rounded-[10px] px-[25px] py-[8px] md:px-[30px] md:py-[10px] place-self-center transition-all"
      >
        {isLoading ? <Spinner customClass={customClass} /> : "Masuk"}
      </button>
    </form>
  );
}
