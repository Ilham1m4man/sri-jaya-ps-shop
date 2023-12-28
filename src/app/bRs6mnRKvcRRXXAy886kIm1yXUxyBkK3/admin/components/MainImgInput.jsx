import { useState, useReducer } from "react";
import DropZone from "./DropZone";

export default function MainImgInput({ isDisabled, setMainImage }) {
  const [imagePreviews, setImagePreviews] = useState();

  // reducer function to handle state changes
  const reducer = (state, action) => {
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
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  data.fileList.map((item) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImagePreviews(reader.result);
      setMainImage(item);
    };

    if (item) {
      reader.readAsDataURL(item);
    }
  });

  const customClassDPUtama = "w-full h-[90vh]";

  return (
    <div className="relative w-full rounded-[15px] overflow-hidden">
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
        roleInput={"Main"}
        isRequired={true}
        data={data}
        dispatch={dispatch}
        imagePreviews={imagePreviews}
        customClass={customClassDPUtama}
      />
    </div>
  );
}
