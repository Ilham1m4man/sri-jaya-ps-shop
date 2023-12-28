import { useState, useReducer, useEffect } from "react";
import DropZone from "./DropZone";
import { FaMinusCircle } from "react-icons/fa";

export default function OptImgInput({
  isDisabled,
  setOptImage1,
  setOptImage2,
}) {
  const [imagePreviews, setImagePreviews] = useState();

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
      setOptImage1(undefined);
    } else if (typeof setOptImage2 === "function") {
      setOptImage2(undefined);
    }
  };

  const customClassDPOpsional = "w-full h-[90vh]";

  return (
    <div className="relative w-full rounded-[15px]">
      {imagePreviews && (
        <button
          onClick={hapusHandler}
          className="z-20 bg-transparent border-none rounded-full absolute -right-3 -top-3 group hover:scale-95 active:scale-90 transition-all"
        >
          <FaMinusCircle className="fill-red-500 bg-white rounded-full w-7 h-7 group-hover:fill-red-600 group-active:fill-red-700 transition-all" />
        </button>
      )}
      <div className="relative w-full h-full rounded-[15px] top-0 -translate-y-0 xs:top-1/2 xs:-translate-y-1/2 overflow-hidden">
        <div className="absolute w-full top-1/2 -translate-y-1/2">
          <img
            className={`${
              !imagePreviews ? "hidden" : "block"
            } object-cover max-w-[300px] mx-auto object-center rounded-[15px]`}
            src={imagePreviews}
            alt={`Preview`}
          />
        </div>
        <DropZone
          isDisabled={isDisabled}
          roleInput={typeof setOptImage1 === "function" ? "Opt1" : "Opt2"}
          isRequired={false}
          data={dataOpt}
          dispatch={dispatchOpt}
          imagePreviews={imagePreviews}
          customClass={customClassDPOpsional}
        />
      </div>
    </div>
  );
}
