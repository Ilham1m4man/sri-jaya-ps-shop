import Image from "next/image";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import BackBtn from "../buttons/BackBtn";

export default function ModalProfile({ modal_profile, onLogOut, currentRole, isModalProfileOpen }) {
  return (
    <Transition appear show={isModalProfileOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={modal_profile}>
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
          <div className="flex min-h-full items-center justify-end pb-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[70%] transform overflow-hidden rounded-[20px] bg-white py-[34px] px-12 text-left flex flex-col gap-[70px] items-center shadow-xl transition-all">
                <div className="flex justify-between w-full">
                  <BackBtn backFrom={modal_profile} customClass={"px-[2px]"} />
                  {/* GANTI JENIS AKUN BERDASARKAN DATA PADA DATABASE */}
                  <div
                    className={`rounded-[15px] border-[2px] ${
                      currentRole === "konsumer"
                        ? "border-grn-800"
                        : "border-ble-800"
                    } px-2 py-2`}
                  >
                    <Dialog.Title
                      as="h3"
                      className={`text-grn-950 font-normal text-2xl px-10 py-4 ${
                        currentRole === "konsumer"
                          ? "bg-grn-300"
                          : "bg-ble-300"
                      } rounded-[10px]`}
                    >
                      {currentRole}
                    </Dialog.Title>
                  </div>
                  <button onClick={onLogOut}>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_395_1149)">
                        <path
                          d="M11 28H5C4.20435 28 3.44129 27.6956 2.87868 27.1539C2.31607 26.6121 2 25.8773 2 25.1111V4.88889C2 4.12271 2.31607 3.38791 2.87868 2.84614C3.44129 2.30436 4.20435 2 5 2H11"
                          stroke="#05150F"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M21 22L28 15L21 8"
                          stroke="#05150F"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M28 15H11"
                          stroke="#05150F"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_395_1149">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
                <div>
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M200 99.9C200 44.75 155.2 0 100 0C44.8 0 0 44.75 0 99.9C0 130.275 13.8 157.65 35.4 176.025C35.6 176.225 35.8 176.225 35.8 176.425C37.6 177.825 39.4 179.225 41.4 180.625C42.4 181.225 43.2 182.012 44.2 182.812C60.7258 194.017 80.2339 200.004 100.2 200C120.166 200.004 139.674 194.017 156.2 182.812C157.2 182.212 158 181.425 159 180.812C160.8 179.425 162.8 178.025 164.6 176.625C164.8 176.425 165 176.425 165 176.225C186.2 157.637 200 130.275 200 99.9ZM100 187.413C81.2 187.413 64 181.412 49.8 171.425C50 169.825 50.4 168.238 50.8 166.637C51.9917 162.301 53.7396 158.138 56 154.25C58.2 150.45 60.8 147.05 64 144.05C67 141.05 70.6 138.262 74.2 136.062C78 133.863 82 132.262 86.4 131.062C90.8342 129.867 95.4075 129.266 100 129.275C113.633 129.178 126.765 134.408 136.6 143.85C141.2 148.45 144.8 153.85 147.4 160.038C148.8 163.638 149.8 167.438 150.4 171.425C135.64 181.802 118.043 187.384 100 187.413ZM69.4 94.9125C67.6378 90.8777 66.7516 86.515 66.8 82.1125C66.8 77.725 67.6 73.325 69.4 69.325C71.2 65.325 73.6 61.7375 76.6 58.7375C79.6 55.7375 83.2 53.35 87.2 51.55C91.2 49.75 95.6 48.95 100 48.95C104.6 48.95 108.8 49.75 112.8 51.55C116.8 53.35 120.4 55.75 123.4 58.7375C126.4 61.7375 128.8 65.3375 130.6 69.325C132.4 73.325 133.2 77.725 133.2 82.1125C133.2 86.7125 132.4 90.9125 130.6 94.9C128.863 98.8408 126.423 102.433 123.4 105.5C120.332 108.519 116.74 110.954 112.8 112.688C104.535 116.084 95.2647 116.084 87 112.688C83.0602 110.954 79.4684 108.519 76.4 105.5C73.3727 102.477 70.9912 98.8836 69.4 94.9125ZM162.2 161.238C162.2 160.838 162 160.637 162 160.238C160.033 153.98 157.134 148.055 153.4 142.663C149.663 137.23 145.07 132.438 139.8 128.475C135.775 125.447 131.413 122.897 126.8 120.875C128.899 119.491 130.843 117.886 132.6 116.087C135.582 113.144 138.2 109.854 140.4 106.288C144.829 99.0101 147.117 90.6311 147 82.1125C147.062 75.8064 145.837 69.554 143.4 63.7375C140.994 58.133 137.531 53.0445 133.2 48.75C128.876 44.5004 123.786 41.1074 118.2 38.75C112.374 36.3174 106.113 35.0968 99.8 35.1625C93.4859 35.1007 87.2253 36.3256 81.4 38.7625C75.7657 41.1148 70.6639 44.5798 66.4 48.95C62.1505 53.2698 58.7574 58.3552 56.4 63.9375C53.9631 69.754 52.7381 76.0064 52.8 82.3125C52.8 86.7125 53.4 90.9125 54.6 94.9C55.8 99.1 57.4 102.9 59.6 106.488C61.6 110.088 64.4 113.288 67.4 116.288C69.2 118.088 71.2 119.675 73.4 121.075C68.7729 123.151 64.409 125.769 60.4 128.875C55.2 132.875 50.6 137.663 46.8 142.863C43.0282 148.233 40.126 154.164 38.2 160.438C38 160.837 38 161.238 38 161.438C22.2 145.45 12.4 123.875 12.4 99.9C12.4 51.75 51.8 12.3875 100 12.3875C148.2 12.3875 187.6 51.75 187.6 99.9C187.574 122.899 178.441 144.953 162.2 161.238Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <form className="grid grid-cols-2 grid-rows-3 gap-x-[70px] gap-y-16 w-full">
                  <div className="grid h-[86px]">
                    <label
                      htmlFor="name"
                      className="text-footer_fontClr font-normal text-2xl text-opacity-80"
                    >
                      Nama
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full text-grn-950 font-normal text-2xl border-b-2 border-grn-950 p-[10px] outline-none"
                    />
                  </div>
                  <div className="grid h-[86px]">
                    <label
                      htmlFor="email"
                      className="text-footer_fontClr font-normal text-2xl text-opacity-80"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full text-grn-950 font-normal text-2xl border-b-2 border-grn-950 p-[10px] outline-none"
                    />
                  </div>
                  <div className="grid h-[86px]">
                    <label
                      htmlFor="phone"
                      className="text-footer_fontClr font-normal text-2xl text-opacity-80"
                    >
                      No. Telepon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full text-grn-950 font-normal text-2xl border-b-2 border-grn-950 p-[10px] outline-none"
                    />
                  </div>
                  <div className="grid h-[86px] relative">
                    <label
                      htmlFor="password"
                      className="text-footer_fontClr font-normal text-2xl text-opacity-80"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="w-full text-grn-950 font-normal text-2xl border-b-2 border-grn-950 p-[10px] outline-none"
                    />
                    <button className="absolute text-danger_clr font-normal text-2xl bottom-[5px] right-0 py-[5px] bg-white">
                      Ubah
                    </button>
                  </div>
                  <div className="grid col-span-2 pb-12">
                    <label
                      htmlFor="address"
                      className="text-footer_fontClr font-normal text-2xl text-opacity-80"
                    >
                      Alamat
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="w-full text-grn-950 font-normal text-2xl border-b-2 border-grn-950 p-[10px] outline-none"
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
