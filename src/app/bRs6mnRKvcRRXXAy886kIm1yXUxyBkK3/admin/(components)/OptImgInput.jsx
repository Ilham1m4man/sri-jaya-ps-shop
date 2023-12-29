import { useState, useReducer, useEffect } from "react";
import DropZone from "./DropZone";
import { FaMinusCircle } from "react-icons/fa";

export default function OptImgInput({
  dataFromServer,
  isDisabled,
  setOptImage1,
  setOptImage2,
}) {
  const [imagePreviews, setImagePreviews] = useState();
  const previewsFromServer = dataFromServer && dataFromServer.productImgURLs;
  const [previewsFromServer1, setPreviewsFromServer1] = useState();
  const [previewsFromServer2, setPreviewsFromServer2] = useState();

  useEffect(() => {
    setPreviewsFromServer1(
      dataFromServer &&
        previewsFromServer.optImg1URL !== "" &&
        previewsFromServer.optImg1URL
    );
    setPreviewsFromServer2(
      dataFromServer &&
        previewsFromServer.optImg2URL !== "" &&
        previewsFromServer.optImg2URL
    );
  }, [dataFromServer]);

  // reducer function to handle state changes
  const reducerOpt = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
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
  const [dataOpt, dispatchOpt] = useReducer(reducerOpt, {
    inDropZone: false,
    fileList: [],
  });

  dataOpt.fileList.map((item) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImagePreviews(reader.result);
      if (typeof setOptImage1 === "function") {
        setOptImage1(item);
      } else if (typeof setOptImage2 === "function") {
        setOptImage2(item);
      }
    };

    if (item) {
      reader.readAsDataURL(item);
    }
  });

  const hapusHandler = () => {
    dataOpt.fileList = [];
    setImagePreviews(undefined);
    if (typeof setOptImage1 === "function") {
      setPreviewsFromServer1(undefined);
      setOptImage1(undefined);
    } else if (typeof setOptImage2 === "function") {
      setPreviewsFromServer2(undefined);
      setOptImage2(undefined);
    }
  };

  const deleteIcon = () => {
    const hapusBtn = (
      <button
        type="button"
        onClick={hapusHandler}
        className="z-20 bg-transparent border-none rounded-full absolute -right-3 -top-3 group hover:scale-95 active:scale-90 transition-all"
      >
        <FaMinusCircle className="fill-red-500 bg-white rounded-full w-7 h-7 group-hover:fill-red-600 group-active:fill-red-700 transition-all" />
      </button>
    );

    if (imagePreviews) {
      return hapusBtn;
    } else if (typeof setOptImage1 === "function" && previewsFromServer1) {
      return hapusBtn;
    } else if (typeof setOptImage2 === "function" && previewsFromServer2) {
      return hapusBtn;
    }
  };

  const cekPreview = () => {
    const imgElm = (
      <img
        priority
        className={`${
          imagePreviews ? "hidden" : "block"
        } object-cover object-center max-w-[300px] mx-auto rounded-[15px]`}
        src={
          typeof setOptImage1 === "function"
            ? previewsFromServer1
            : previewsFromServer2
        }
        alt={`Preview`}
      />
    );

    if (typeof setOptImage1 === "function" && previewsFromServer1) {
      return imgElm;
    } else if (typeof setOptImage2 === "function" && previewsFromServer2) {
      return imgElm;
    }
  };

  const customClassDPOpsional = "w-full h-[90vh]";

  return (
    <div className="relative w-full rounded-[15px]">
      {deleteIcon()}
      <div className="relative w-full h-full rounded-[15px] top-0 -translate-y-0 xs:top-1/2 xs:-translate-y-1/2 overflow-hidden">
        {dataFromServer ? (
          <div className="absolute w-full top-1/2 -translate-y-1/2">
            {cekPreview()}
            <img
              className={`${
                !imagePreviews ? "hidden" : "block"
              } object-cover object-center max-w-[300px] mx-auto rounded-[15px]`}
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
        <DropZone
          isDisabled={isDisabled}
          roleInput={typeof setOptImage1 === "function" ? "Opt1" : "Opt2"}
          isRequired={false}
          data={dataOpt}
          dispatch={dispatchOpt}
          previewsFromServer={
            typeof setOptImage1 === "function"
              ? previewsFromServer1
              : previewsFromServer2
          }
          imagePreviews={imagePreviews}
          customClass={customClassDPOpsional}
        />
      </div>
    </div>
  );
}
