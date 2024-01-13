import Image from "next/image";
import React, { useState, useReducer, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth, storage } from "@/app/(firebase)/firebase.config";
import BackBtn from "../buttons/BackBtn";
import LogoutBtn from "../buttons/LogoutBtn";
import ProfileForm from "../forms/ProfileForm";
import UploadFotoProfile from "../UploadFotoProfile";
import editProfile from "@/app/(services)/editProfile";

export default function ModalProfile({
  userProfile,
  modal_profile,
  onLogOut,
  currentRole,
  isModalProfileOpen,
}) {
  const [isLoading, setIsLoading] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [image, setImage] = useState();
  const [imagePreviews, setImagePreviews] = useState();
  const [previewsFromServer, setPreviewsFromServer] = useState();

  /* ================================================= INITIALSTATE OBJECT ================================================= */
  const initialState = {
    uid: userProfile && userProfile.uid,
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
    businessName: userProfile && userProfile.customClaims.businessName,
    role: userProfile && userProfile.customClaims.role,
    photo:
      userProfile &&
      (userProfile.photoURL === undefined ? "" : userProfile.photoURL),
  };

  /* ================================================= REDUCER FUNC FOR IMAGE ================================================= */
  const reducer = (state, action) => {
    switch (action.type) {
      case "RESET":
        return { ...state, fileList: [] };
      case "ADD_FILE_TO_LIST":
        if (state.fileList.length > 0) {
          state.fileList.shift();
        }
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  /* ================================================= REDUCER FOR IMAGE ================================================= */
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  /* ================================================= REDUCER FUNC FOR STATE ================================================= */
  const reducerState = (state, action) => {
    const { name, email, phone, address } = initialState;
    switch (action.type) {
      case "RESET":
        return initialState;
      case "SET_DATA":
        return initialState;
      case "SET_IMG_PROFILE":
        const url = action.url;
        return { ...state, photo: url };
      case "CEK_EDIT":
        if (
          state?.name == name &&
          state?.email == email &&
          state?.phone == phone &&
          state?.address == address &&
          data.fileList.length === 0
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
  };

  /* ================================================= REDUCER FOR STATE ================================================= */
  const [state, dispatchState] = useReducer(reducerState, {});
  const { uid, name, email, phone, address, photo } = state;

  /* ================================================= PREVIEW IMG AND SETIMAGE ================================================= */
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

  /* ================================================= CEK TELEPON ================================================= */
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

  /* ================================================= CEK ALAMAT ================================================= */
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

  /* ================================================= BATAL HANDLER ================================================= */
  const batalHandler = () => {
    dispatchState({ type: "RESET" });
    dispatch({ type: "RESET" });
    setImage(null);
    setImagePreviews(null);
    console.log("form have been reset");
  };

  /* ================================================= RESET PW HANDLER ================================================= */
  const resetPWHandler = () => {
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
  };

  /* ================================================= ONCHANGE HANDLER ================================================= */
  const onChange = (e) => {
    if (typeof e == "string" || e == undefined) {
      const value = e;
      dispatchState({ type: "phone", value });
    } else {
      const { name, value } = e.target;
      dispatchState({ type: name, value });
    }
  };

  /* ================================================= ONSUBMIT HANDLER ================================================= */
  const editProfileHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const imgRef = ref(storage, `images/profile/${uid}`);
    if (image) {
      uploadBytes(imgRef, image)
        .then(() => {
          getDownloadURL(imgRef)
            .then((url) => {
              setPreviewsFromServer(url);
              if (name && email && phone) {
                editProfile({
                  ...state,
                  photo: url,
                  businessName: state.businessName,
                  role: state.role,
                }).then((response) => {
                  if (response?.code) {
                    window.alert(
                      `${response?.code} \n \n ${response?.message}`
                    );
                  } else {
                    window.alert("Edit profil berhasil");
                  }
                });
              } else {
                window.alert("Nama atau email tidak boleh kosong!");
              }
            })
            .catch((err) => {
              window.alert(err.message);
            });
        })
        .catch((err) => {
          window.alert(err.message);
        });
    } else {
      if (name && email && phone) {
        editProfile({
          ...state,
          businessName: state.businessName,
          role: state.role,
        }).then((response) => {
          if (response?.code) {
            window.alert(`${response?.code} \n \n ${response?.message}`);
          } else {
            window.alert("Edit profil berhasil");
          }
          window.location.reload();
        });
      } else {
        window.alert("Nama, email, dan no. telepon tidak boleh kosong!");
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    userProfile && dispatchState({ type: "SET_DATA" });
    userProfile && setPreviewsFromServer(initialState.photo);
  }, [userProfile]);

  useEffect(() => {
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
          <div className="flex min-h-full items-center justify-end p-2 md:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full sm:w-[80%] md:w-[90%] lg:w-[60%] transform overflow-hidden rounded-[20px] bg-white py-4 md:py-[25px] px-4 md:px-10 text-left flex flex-col gap-[50px] items-center shadow-xl transition-all">
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
                          src={`${previewsFromServer}`}
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
                    currentRole={currentRole}
                    editProfileHandler={editProfileHandler}
                    userProfile={userProfile}
                    cekNoTelepon={cekNoTelepon}
                    onChange={onChange}
                    state={state}
                    dispatchState={dispatchState}
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
                      className="bg-footer_fontClr text-white hover:opacity-90 active:scale-95 transition-all text-base px-4 py-2 rounded-lg"
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
