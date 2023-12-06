import { useState } from "react";
import PeekBtn from "../buttons/PeekBtn";

export default function RegistKonsumer({ inputHandler, setPW, setConfPW }) {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  return (
    <form
      onSubmit={inputHandler}
      className="flex flex-col gap-[30px] w-[80%] md:w-[60%]"
    >
      <div className="grid">
        <label
          htmlFor="name"
          className="text-footer_fontClr font-normal text-base md:text-xl text-opacity-80"
        >
          Nama
        </label>
        <input
          required
          type="text"
          name="name"
          className="w-full text-grn-950 font-normal text-base md:text-xl border-b-2 border-grn-950 p-[10px] outline-none"
        />
      </div>
      <div className="grid">
        <label
          htmlFor="email"
          className="text-footer_fontClr font-normal text-base md:text-xl text-opacity-80"
        >
          Email
        </label>
        <input
          required
          type="email"
          name="email"
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
            required
            type={isPasswordHidden ? "password" : "text"}
            name="password"
            onChange={(e) => setPW(e.target.value)}
            className="w-full text-grn-950 font-normal text-base md:text-xl border-b-2 border-grn-950 p-[10px] outline-none"
          />
        </div>
      </div>
      <div className="grid">
        <label
          htmlFor="confirm-password"
          className="text-footer_fontClr font-normal text-base md:text-xl text-opacity-80"
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
            className="w-full text-grn-950 font-normal text-base md:text-xl border-b-2 border-grn-950 p-[10px] outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        className="max-w-[176px] bg-footer_fontClr text-base md:text-xl font-normal text-grn-50 rounded-[10px] px-[30px] py-[10px] place-self-center"
      >
        Daftar
      </button>
    </form>
  );
}