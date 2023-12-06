import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import BackBtn from "../buttons/BackBtn";
import RegistKonsumer from "../forms/RegistKonsumer";
import registrasi from "@/app/services/registrasi";
import RegistPeretail from "../forms/RegistPeretail";

export default function ModalRegister({
  modal_register,
  onLogin,
  isModalRegisterOpen,
}) {
  const [role, setRole] = useState("konsumer");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();

    let dataInput;

    if (role === "konsumer") {
      dataInput = {
        name: e.target[0].value,
        email: e.target[1].value,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
      };
    } else if(role === "peretail") {
      dataInput = {
        name: e.target[0].value,
        businessName: e.target[1].value,
        email: e.target[2].value,
        phone: e.target[3].value,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
      };
    } else {
      return window.alert("Terjadi kesalahan dalam registrasi akun, mohon coba lagi!")
    }

    if (dataInput.password === dataInput.confirmPassword) {
      registrasi(dataInput);
      router.refresh();
    } else {
      window.alert("Password tidak sesuai!");
    }
  };

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
              <Dialog.Panel className="w-[90%] sm:w-[70%] lg:w-[50%] transform overflow-hidden rounded-[20px] bg-white p-10 text-left flex flex-col gap-[20px] md:gap-[50px] items-center shadow-xl transition-all">
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
                    onClick={() => setRole("konsumer")}
                    className={`rounded-[10px] text-base md:text-xl font-normal p-[10px] ${
                      role === "konsumer"
                        ? "bg-grn-300 text-grn-950 "
                        : "bg-transparent text-grn-50 hover:bg-grn-600"
                    }`}
                  >
                    Konsumer
                  </button>
                  <button
                    onClick={() => setRole("peretail")}
                    className={`rounded-[10px] text-base md:text-xl font-normal py-[10px] px-[19px] ${
                      role === "peretail"
                        ? "bg-ble-300 text-ble-950"
                        : "bg-transparent text-ble-50 hover:bg-ble-600"
                    }`}
                  >
                    Peretail
                  </button>
                </div>
                {role === "konsumer" ? (
                  <RegistKonsumer
                    inputHandler={register}
                    setPW={setPassword}
                    setConfPW={setConfirmPassword}
                  />
                ) : (
                  <RegistPeretail
                    inputHandler={register}
                    setPW={setPassword}
                    setConfPW={setConfirmPassword}
                  />
                )}
                <p className="text-grn-950 font-normal text-base md:text-xl">
                  Sudah punya akun?{" "}
                  <button onClick={onLogin} className="buat-akun ml-[30px]">
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