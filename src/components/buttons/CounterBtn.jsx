import { useState, useEffect } from "react";

export default function CounterBtn({ currentRole, counter, setCounter, disabled }) {
  /* const [counter, setCounter] = useState(1);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (counter === 1 || counter <= 1) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [counter]); */

  return (
    <div className="flex h-[40px] rounded-lg relative bg-transparent">
      <button
        onClick={() => setCounter((prevState) => prevState - 1)}
        disabled={disabled}
        className={`border-[2px] border-black bg-gry-counterClr text-black hover:text-gray-700 ${
          currentRole === "Konsumer" ? "hover:bg-grn-300" : "hover:bg-ble-300"
        } h-full w-[30px] sm:w-[40px] rounded-l-[8px] cursor-pointer outline-none`}
      >
        <span className="m-auto text-xl font-normal">−</span>
      </button>
      <input
        type="text"
        className="border-y-[2px] border-black focus:outline-none text-center w-[30px] sm:w-[40px] bg-white font-semibold hover:text-black focus:text-black text-base md:text-lg cursor-default flex items-center text-grn-950  outline-none"
        name="custom-input-number"
        value={counter}
        disabled={true}
      ></input>
      <button
        onClick={() => setCounter((prevState) => prevState + 1)}
        className={`bg-gry-counterClr border-[2px] border-black text-black hover:text-gray-700 ${
          currentRole === "Konsumer" ? "hover:bg-grn-300" : "hover:bg-ble-300"
        } h-full w-[30px] sm:w-[40px] rounded-r-[8px] cursor-pointer`}
      >
        <span className="m-auto text-xl font-normal">+</span>
      </button>
    </div>
  );
}
