import Link from "next/link";

export default function ModalLogin({ modal_login, onRegister }) {
  return (
    <section className="modal absolute top-0 bg-bg-blur-clr backdrop-blur bg-opacity-40 w-full flex justify-center">
      <div className="rounded-[20px] mb-auto py-8 px-12 bg-white opacity-100 flex flex-col gap-[70px] items-center justify-center w-[75%]">
        <div className="flex justify-end w-full">
          <h3 className="text-grn-950 text-[2.5rem] px-10 py-4 rounded-[10px] mx-auto font-bold">
            Masuk
          </h3>
          <button onClick={modal_login} className="px-[2px]">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.2433 13L25.3214 3.9219C25.7522 3.49181 25.9946 2.90819 25.9951 2.29942C25.9956 1.69065 25.7543 1.1066 25.3242 0.675758C24.8942 0.244913 24.3105 0.00256513 23.7018 0.00202751C23.093 0.00148988 22.5089 0.242807 22.0781 0.672891L13 9.751L3.9219 0.672891C3.49105 0.242046 2.9067 0 2.29739 0C1.68809 0 1.10374 0.242046 0.672891 0.672891C0.242046 1.10374 0 1.68809 0 2.29739C0 2.9067 0.242046 3.49105 0.672891 3.9219L9.751 13L0.672891 22.0781C0.242046 22.5089 0 23.0933 0 23.7026C0 24.3119 0.242046 24.8963 0.672891 25.3271C1.10374 25.758 1.68809 26 2.29739 26C2.9067 26 3.49105 25.758 3.9219 25.3271L13 16.249L22.0781 25.3271C22.5089 25.758 23.0933 26 23.7026 26C24.3119 26 24.8963 25.758 25.3271 25.3271C25.758 24.8963 26 24.3119 26 23.7026C26 23.0933 25.758 22.5089 25.3271 22.0781L16.2433 13Z"
                fill="#05150F"
              />
            </svg>
          </button>
        </div>
        <form className="flex flex-col gap-[70px] w-[50%]">
          <div className="grid h-[86px]">
            <label htmlFor="email" className="text-footer_fontClr font-normal text-2xl text-opacity-80">Email</label>
            <input type="email" name="email" className="w-full text-grn-950 font-normal text-2xl border-b-2 border-grn-950 p-[10px] outline-none" />
          </div>
          <div className="grid">
            <label htmlFor="password" className="text-footer_fontClr font-normal text-2xl text-opacity-80">Password</label>
            <input type="password" name="password" className="w-full text-grn-950 font-normal text-2xl border-b-2 border-grn-950 p-[10px] outline-none" />
            <Link href={`/`} className="text-base font-normal text-footer_fontClr place-self-end mt-[30px]">
              Lupa Password
            </Link>
          </div>
          <button type="submit" className="max-w-[176px] bg-footer_fontClr text-2xl font-normal text-grn-50 rounded-[15px] px-[50px] py-[15px] place-self-center">Masuk</button>
        </form>
        <p className="text-grn-950 font-normal text-2xl mb-[70px]">Belum punya akun? <button onClick={onRegister} className="buat-akun ml-[30px]">Buat di sini</button></p>
      </div>
    </section>
  );
}
