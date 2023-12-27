import React from "react";

export default function UploadFotoProfile({
  data,
  dispatch,
  imagePreviews,
  previewsFromServer,
  customClass,
}) {

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
      className={`dropzone flex flex-col ${
        imagePreviews || previewsFromServer ? "opacity-0" : "opacity-100"
      } group justify-center cursor-pointer items-center border-ble-300 border-[3px] border-dashed rounded-full ${
        customClass && customClass
      }`}
    >
      <input
        id="fileSelect"
        type="file"
        multiple={false}
        className="border-0 hidden whitespace-nowrap p-0 overflow-hidden absolute"
        onChange={(e) => handleFileSelect(e)}
        accept="image/*"
      />
      <label
        htmlFor="fileSelect"
        className="p-0 w-full h-full absolute overflow-hidden cursor-pointer"
      ></label>
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
  );
}