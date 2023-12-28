import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/firebase.config";
import {
  signInWithCustomToken,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import BackBtn from "../buttons/BackBtn";
import RegistKonsumer from "../forms/RegistKonsumer";
import registrasi from "@/app/services/registrasi";
import RegistPeretail from "../forms/RegistPeretail";
import Spinner from "../loaders/Spinner";

export default function ModalRegister({
  modal_register,
  onLogin,
  isModalRegisterOpen,
}) {
  const [isLoading, setIsLoading] = useState();
  const [role, setRole] = useState("Konsumer");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phone, setPhone] = useState();
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let dataInput;

    if (role === "Konsumer") {
      dataInput = {
        name: e.target[0].value,
        email: e.target[1].value,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
      };
    } else if (role === "Peretail") {
      dataInput = {
        name: e.target[0].value,
        businessName: e.target[1].value,
        email: e.target[2].value,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
      };
    } else {
      return window.alert(
        "Terjadi kesalahan dalam registrasi akun, mohon coba lagi!"
      );
    }

    /* if (dataInput.password === dataInput.confirmPassword) {
      try {
        await registrasi(dataInput)
          .then((response) => {
            if (!response.code) {
              signInWithCustomToken(auth, response)
                .then((user) => {
                  sendEmailVerification(user.user);
                  signOut(auth)
                    .then((respon) => {
                      window.alert(
                        "Email verifikasi telah dikirim, periksa email dan folder spam anda!"
                      );
                      onLogin();
                    })
                    .catch((err) => {
                      window.alert(err);
                    });
                })
                .catch((err) => window.alert(err));
            } else {
              window.alert(response.message);
            }
            router.refresh();
          })
          .catch((error) => {
            window.alert(error);
          });
      } catch (err) {
        window.alert(err);
      }
    } else {
      window.alert("Password tidak sesuai!");
    } */
    setTimeout(() => {
      setIsLoading(false);
    }, 5000)
    /* setIsloading(false); */
  };

  const customClass = role === "Konsumer" ? "fill-grn-400" : "fill-ble-400";

  return (
    <Transition appear show={isModalRegisterOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={modal_register}>
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
              <Dialog.Panel className="w-full sm:w-[70%] lg:w-[50%] transform overflow-hidden rounded-[20px] bg-white p-8 text-left flex flex-col gap-[15px] md:gap-[40px] items-center shadow-xl transition-all">
                <div className="flex justify-end w-full relative items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-grn-950 text-2xl md:text-[2.3rem] rounded-[10px] mx-auto font-bold"
                  >
                    Daftar
                  </Dialog.Title>
                  <BackBtn backFrom={modal_register} />
                </div>
                <div className="flex items-center max-w-[228px] max-h-[45px] rounded-[10px] overflow-hidden bg-footer_fontClr border-2 border-black">
                  <button
                    onClick={() => setRole("Konsumer")}
                    className={`rounded-[10px] text-base md:text-xl font-normal p-[10px] ${
                      role === "Konsumer"
                        ? "bg-grn-300 text-grn-950 "
                        : "bg-transparent text-grn-50 hover:bg-grn-950"
                    }`}
                  >
                    Konsumer
                  </button>
                  <button
                    onClick={() => setRole("Peretail")}
                    className={`rounded-[10px] text-base md:text-xl font-normal py-[10px] px-[19px] ${
                      role === "Peretail"
                        ? "bg-ble-300 text-ble-950"
                        : "bg-transparent text-ble-50 hover:bg-ble-950"
                    }`}
                  >
                    Peretail
                  </button>
                </div>
                {isLoading ? (
                  <Spinner customClass={customClass} />
                ) : role === "Konsumer" ? (
                  <RegistKonsumer
                    isLoading={isLoading}
                    inputHandler={register}
                    setPW={setPassword}
                    setConfPW={setConfirmPassword}
                  />
                ) : (
                  <RegistPeretail
                    isLoading={isLoading}
                    inputHandler={register}
                    setPW={setPassword}
                    setConfPW={setConfirmPassword}
                    phoneValue={phone}
                    setPhoneValue={setPhone}
                  />
                )}
                <p className="text-grn-950 font-normal text-base">
                  Sudah punya akun?{" "}
                  <button onClick={onLogin} className="buat-akun ml-[20px]">
                    Masuk
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
