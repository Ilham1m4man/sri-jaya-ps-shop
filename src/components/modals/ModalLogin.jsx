import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { auth } from "@/app/(firebase)/firebase.config";
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import BackBtn from "../buttons/BackBtn";
import LoginForm from "../forms/LoginForm";

export default function ModalLogin({
  modal_login,
  onRegister,
  isModalLoginOpen,
}) {
  const [isLoading, setIsloading] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsloading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const name = userCredential.user.displayName;
        const isEmailVerified = userCredential.user.emailVerified;

        if (isEmailVerified) {
          window.alert(`Selamat berbelanja ${name} 😊`);
          modal_login();
        } else {
          window.alert(
            "Mohon verifikasi email terlebih dahulu, periksa email dan folder spam anda"
          );
          signOut(auth);
        }
      })
      .catch((error) => {
        window.alert("Email atau password tidak sesuai \n \n" + error.message);
      });

    setIsloading(false);
  };

  const resetPWHandler = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          window.alert(
            "Email reset password telah terkirim, mohon periksa email dan folder spam anda"
          );
          signOut(auth);
          window.location.reload();
        })
        .catch((err) => {
          window.alert(err);
        });
    } else {
      window.alert("Mohon isi email terlebih dahulu!");
    }
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
              <Dialog.Panel
                className={`w-[90%] sm:w-[70%] lg:w-[50%] transform overflow-hidden rounded-[20px] bg-white shadow-xl transition-all`}
              >
                <div
                  className={`${
                    isLoading && "opacity-60 text-opacity-60"
                  } text-left flex flex-col gap-[15px] md:gap-[40px] items-center p-8`}
                >
                  <div className="flex justify-end w-full relative items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-grn-950 text-2xl md:text-[2.3rem] rounded-[10px] mx-auto font-bold"
                    >
                      Masuk
                    </Dialog.Title>
                    <BackBtn isLoading={isLoading} backFrom={modal_login} />
                  </div>
                  <LoginForm
                    resetPWHandler={resetPWHandler}
                    isLoading={isLoading}
                    inputHandler={loginHandler}
                    setEmail={setEmail}
                    setPW={setPassword}
                  />
                  <p className="text-grn-950 font-normal text-base">
                    Belum punya akun?{" "}
                    <button
                      onClick={onRegister}
                      className="buat-akun ml-[20px]"
                    >
                      Buat di sini
                    </button>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
