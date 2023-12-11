import Link from "next/link";
import { useState } from "react";
import PeekBtn from "../buttons/PeekBtn";

export default function LoginForm({ inputHandler, setEmail, setPW }) {
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  return (
    <form
      onSubmit={inputHandler}
      className="flex flex-col gap-[20px] md:gap-[50px] w-[90%] md:w-[65%]"
    >
      <div className="grid">
        <label
          htmlFor="email"
          className="text-footer_fontClr font-normal text-base md:text-xl text-opacity-80"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-grn-950 font-normal text-base md:text-xl border-b-2 border-grn-950 p-[10px] outline-none"
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
            type={isPasswordHidden ? "password" : "text"}
            id="password"
            name="password"
            onChange={(e) => setPW(e.target.value)}
            className="w-full text-grn-950 font-normal text-base md:text-xl border-b-2 border-grn-950 p-[10px] outline-none"
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
        type="submit"
        className="max-w-[176px] bg-footer_fontClr text-base md:text-xl font-normal text-grn-50 rounded-[10px] px-[30px] py-[10px] place-self-center"
      >
        Masuk
      </button>
    </form>
  );
}
