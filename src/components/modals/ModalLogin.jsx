import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import BackBtn from "../buttons/BackBtn";
import PeekBtn from "../buttons/PeekBtn";

export default function ModalLogin({
  modal_login,
  onRegister,
  isModalLoginOpen,
}) {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const formRef = useRef();

  const loginHandler = (e) => {
    e.preventDefault();

    email && console.log("ini email" + email);
    password && console.log("ini password" + password);
  };

  return (
    <Transition appear show={isModalLoginOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={modal_login}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-bg-blur-clr backdrop-blur bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[90%] sm:w-[70%] lg:w-[50%] transform overflow-hidden rounded-[20px] bg-white p-10 text-left flex flex-col gap-[20px] md:gap-[50px] items-center shadow-xl transition-all">
                <div className="flex justify-end w-full relative items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-grn-950 text-2xl md:text-[2.3rem] rounded-[10px] mx-auto font-bold"
                  >
                    Masuk
                  </Dialog.Title>
                  <BackBtn backFrom={modal_login} />
                </div>
                <form
                  ref={formRef}
                  onSubmit={loginHandler}
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
                        onChange={(e) => setPassword(e.target.value)}
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
                <p className="text-grn-950 font-normal text-base md:text-xl">
                  Belum punya akun?{" "}
                  <button onClick={onRegister} className="buat-akun ml-[30px]">
                    Buat di sini
                  </button>
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
