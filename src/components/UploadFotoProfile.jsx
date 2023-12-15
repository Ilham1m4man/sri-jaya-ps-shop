import React from "react";

export default function UploadFotoProfile({ data, dispatch, imagePreviews, previewsFromServer, customClass }) {
/*   // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add droped file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  }; */
  
  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];

    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add selected file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
  };

  return (
    <div
      className={`dropzone flex flex-col ${imagePreviews || previewsFromServer ? "opacity-0" : "opacity-100"} ${data.inDropZone ? "bg-ble-600 backdrop-blur-0 opacity-70" : "bg-ble-100 backdrop-blur-[21px] bg-opacity-0"} group justify-center cursor-pointer items-center border-ble-300 border-[3px] border-dashed rounded-[15px] ${customClass && customClass} hover:opacity-70 hover:backdrop-blur-0 hover:bg-ble-600 transition-all`}
    >
      <input
        id="fileSelect"
        type="file"
        multiple={false}
        className="border-0 hidden whitespace-nowrap p-0 overflow-hidden absolute"
        onChange={(e) => handleFileSelect(e)}
        accept="image/*"
      />
      <label htmlFor="fileSelect" className="p-0 w-full h-full absolute overflow-hidden cursor-pointer"></label>

      <h3 className={`group-hover:text-ble-50 group-hover:text-opacity-100`}>Edit</h3>
    </div>
  );
}