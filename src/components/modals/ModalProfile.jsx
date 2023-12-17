import Image from "next/image";
import React, { useState, useReducer, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import BackBtn from "../buttons/BackBtn";
import LogoutBtn from "../buttons/LogoutBtn";
import ProfileForm from "../forms/ProfileForm";
import UploadFotoProfile from "../UploadFotoProfile";

export default function ModalProfile({
  userProfile,
  modal_profile,
  onLogOut,
  currentRole,
  isModalProfileOpen,
}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [image, setImage] = useState();
  const [imagePreviews, setImagePreviews] = useState();
  const [previewsFromServer, setPreviewsFromServer] = useState();
  /* const [name, setName] = useState(userProfile && userProfile.displayName);
  const [email, setEmail] = useState(userProfile && userProfile.email);
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState(); */

  const initialState = {
    name: userProfile && userProfile.displayName,
    email: userProfile && userProfile.email,
    phone:
      userProfile &&
      (userProfile.phoneNumber == undefined ? "" : userProfile.phoneNumber),
    address:
      userProfile &&
      (userProfile.customClaims.address === ""
        ? "Mohon isi alamat anda untuk tujuan pengiriman"
        : userProfile.customClaims.address),
    photo:
      userProfile &&
      (userProfile.photoUrl === undefined ? "" : userProfile.photoUrl),
  };

  const reducerState = (state, action) => {
    const { name, email, phone, address } = initialState;
    switch (action.type) {
      case "RESET":
        return initialState;
      case "SET_DATA":
        return initialState;
      case "CEK_EDIT":
        if (
          state?.name?.includes(name) &&
          state?.email?.includes(email) &&
          state?.phone?.includes(phone) &&
          state?.address?.includes(address)
        ) {
          setIsDisabled(true);
          return state;
        }
        setIsDisabled(false);
        return state;
      default:
        const result = { ...state };
        result[action.type] = action.value;
        return result;
    }
    /* if (action.type === "RESET") {
      return initialState;
    } else if (action.type === "SET_DATA") {
      return initialState;
    }

    const result = { ...state };
    result[action.type] = action.value;
    return result; */
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_FILE_TO_LIST":
        if (state.fileList.length > 0) {
          state.fileList.shift();
        }
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [state, dispatchState] = useReducer(reducerState, {});
  const { name, email, phone, address, photo } = state;
  console.log(state);

  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  data.fileList.map((item) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImagePreviews(reader.result);
      setImage(item);
    };

    if (item) {
      reader.readAsDataURL(item);
    }
  });

  const cekNoTelepon = () => {
    if (
      userProfile.phoneNumber == null ||
      userProfile.phoneNumber === "" ||
      userProfile.phoneNumber == undefined
    ) {
      return false;
    } else {
      return true;
    }
  };

  const cekAlamat = () => {
    if (
      userProfile.customClaims.address == null ||
      userProfile.customClaims.address === "" ||
      userProfile.customClaims.address == undefined
    ) {
      return `Mohon isi alamat anda untuk tujuan pengiriman`;
    } else {
      return userProfile.customClaims.address;
    }
  };

  const batalHandler = () => {
    dispatchState({ type: "RESET" });
    /* userProfile && console.log(userProfile.phoneNumber)
    setName(userProfile.displayName);
    setEmail(userProfile.email);
    setPhone(userProfile.phoneNumber);
    setAddress(userProfile.customClaims.address); */
    data.fileList = [];
    setImage();
    setImagePreviews();
    console.log("form have been reset");
  };

  const resetPWHandler = () => {
    console.log("reset PW");
  };

  const onChange = (e) => {
    if (typeof e == "string" || e == undefined) {
      const value = e;
      dispatchState({ type: "phone", value });
    } else {
      const { name, value } = e.target;
      dispatchState({ type: name, value });
    }
  };

  const editProfileHandler = (e) => {
    /* e.preventDefault(); */
    console.log("edit handler");
    name && console.log(name, email, phone, address);
  };

  const cekEdit = () => {
    name && console.log(name);
    email && console.log(email);
    if (name && name.includes(userProfile.displayName)) {
      console.log("iya sama");
      setIsDisabled(true);
    } else {
      console.log("beda cuk");
      setIsDisabled(false);
    }

    /* if (email && email.includes(userProfile.email)) {
      console.log("iya sama");
      setIsDisabled(true);
    } else {
      console.log("beda cuk");
      setIsDisabled(false);
    } */

    /* if ((phone && phone.includes(cekNoTelepon()))) {
      console.log("iya sama");
      setIsDisabled(true);
    } else {
      console.log("beda cuk");
      setIsDisabled(false);
    }

    if ((address && address.toLowerCase().includes(cekAlamat().toLowerCase()))) {
      console.log("iya sama");
      setIsDisabled(true);
    } else {
      console.log("beda cuk");
      setIsDisabled(false);
    } */
  };

  useEffect(() => {
    userProfile && dispatchState({ type: "SET_DATA" });
  }, [userProfile]);

  useEffect(() => {
    /* userProfile && cekEdit(); */
    dispatchState({ type: "CEK_EDIT" });
  }, [name, email, phone, address, imagePreviews]);

  const customClass = "";
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
          <div className="flex min-h-full items-center justify-end p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full sm:w-[80%] lg:w-[60%] transform overflow-hidden rounded-[20px] bg-white py-[25px] px-10 text-left flex flex-col gap-[50px] items-center shadow-xl transition-all">
                <div className="flex justify-between w-full relative">
                  <div
                    className={`rounded-[13px] mx-auto border-[2px] ${
                      currentRole === "Konsumer"
                        ? "border-grn-800"
                        : "border-ble-800"
                    } px-2 py-2`}
                  >
                    <Dialog.Title
                      as="h3"
                      className={`text-grn-950 font-normal text-lg md:text-xl px-3 py-1 md:px-6 md:py-2 ${
                        currentRole === "Konsumer" ? "bg-grn-300" : "bg-ble-300"
                      } rounded-[8px]`}
                    >
                      {currentRole}
                    </Dialog.Title>
                  </div>
                  <BackBtn
                    backFrom={modal_profile}
                    customClass={"absolute -translate-y-1/2 top-1/2 right-0"}
                  />
                </div>
                {currentRole === "Peretail" && (
                  <h3 className="text-ble-950 text-lg md:text-2xl font-bold">
                    {userProfile && userProfile.customClaims.businessName}
                  </h3>
                )}
                <div className="flex flex-col md:flex-row justify-around items-center w-full gap-7 md:gap-10">
                  <div className="relative rounded-[15px] overflow-hidden">
                    {previewsFromServer ? (
                      <div className="absolute w-full top-1/2 -translate-y-1/2">
                        <img
                          priority
                          className={`${
                            imagePreviews ? "hidden" : "block"
                          } object-cover h-full rounded-[15px]`}
                          src={`http://127.0.0.1:8000/images/${previewsFromServer}`}
                          alt={`Preview`}
                        />
                        <img
                          className={`${
                            !imagePreviews ? "hidden" : "block"
                          } object-cover rounded-[15px]`}
                          src={imagePreviews}
                          alt={`Preview`}
                        />
                      </div>
                    ) : (
                      <div className="absolute w-full top-1/2 -translate-y-1/2">
                        <img
                          className={`${
                            !imagePreviews ? "hidden" : "block"
                          } object-cover rounded-[15px]`}
                          src={imagePreviews}
                          alt={`Preview`}
                        />
                      </div>
                    )}
                    <UploadFotoProfile
                      data={data}
                      dispatch={dispatch}
                      imagePreviews={imagePreviews}
                      previewsFromServer={previewsFromServer}
                      customClass={customClass}
                      currentRole={currentRole}
                    />
                  </div>
                  <ProfileForm
                    editProfileHandler={editProfileHandler}
                    userProfile={userProfile}
                    cekNoTelepon={cekNoTelepon}
                    onChange={onChange}
                    state={state}
                    dispatchState={dispatchState}
                    phoneValue={phone}
                    /* setName={setName}
                    setEmail={setEmail}
                    setPhoneValue={setPhone} */
                  />
                </div>

                <form action={editProfileHandler} className="flex w-full">
                  <div className="grid gap-4 w-full">
                    <label
                      htmlFor="address"
                      className="text-footer_fontClr font-normal text-base text-opacity-80"
                    >
                      Alamat
                    </label>
                    <textarea
                      rows={3}
                      name="address"
                      value={state.address}
                      defaultValue={userProfile && cekAlamat()}
                      /* onChange={(e) => setAddress(e.target.value)} */
                      onChange={onChange}
                      className="w-full resize-none rounded-xl text-grn-950 font-normal text-base border-2 border-grn-950 p-[10px] outline-none"
                    />
                  </div>
                </form>
                <div className="flex flex-col gap-4 w-full">
                  <button
                    type="button"
                    onClick={resetPWHandler}
                    className="text-danger_clr hover:opacity-90 active:scale-95 transition-all font-normal text-base mr-auto"
                  >
                    Ubah password
                  </button>
                  <LogoutBtn onLogOut={onLogOut} />
                  <div className="flex gap-4 justify-end w-full">
                    <button
                      className="bg-footer_fontClr hover:opacity-90 active:scale-95 transition-all text-base px-4 py-2 rounded-lg"
                      type="button"
                      onClick={batalHandler}
                    >
                      Batal
                    </button>
                    <button
                      disabled={isDisabled}
                      className={`${
                        currentRole === "Konsumer"
                          ? " bg-grn-500 text-grn-950"
                          : "bg-ble-500 text-ble-950"
                      } hover:opacity-90 active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed disabled:active:scale-100 transition-all text-base px-4 py-2 rounded-lg`}
                      type="submit"
                      onClick={editProfileHandler}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
