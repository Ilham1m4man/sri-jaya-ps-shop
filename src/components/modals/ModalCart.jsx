import Image from "next/image";
import React from "react";
import BackBtn from "../buttons/BackBtn";

export default function ModalCart({ modal_cart }) {
  return (
    <section className="modal absolute top-0 bg-bg-blur-clr backdrop-blur bg-opacity-40 w-full flex justify-center">
      <div className="rounded-[20px] mb-auto py-8 px-12 bg-white opacity-100 flex flex-col gap-[68px] items-center justify-center w-[95%]">
        <div className="flex justify-end w-full">
          <h3 className="text-grn-950 text-2xl px-10 py-4 bg-grn-300 rounded-[10px] mx-auto font-bold">
            Konsumer
          </h3>
          <BackBtn backFrom={modal_cart} customClass={"px-[2px]"} />
        </div>
        <div className="w-full">
          <div className="w-[55%]">
            <div className="flex justify-between">
              <h3 className="text-4xl text-grn-950 font-bold">Keranjang</h3>
              <button className="text-base text-danger_clr font-normal flex gap-[10px] items-center">
                <svg
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.43848 7.5H6.93848H26.9385"
                    stroke="#D81010"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M24.4385 7.50015L22.5635 25.0002C22.5635 25.6632 22.3001 26.2991 21.8312 26.7679C21.3624 27.2368 20.7265 27.5002 20.0635 27.5002H11.3135C10.6504 27.5002 10.0146 27.2368 9.54571 26.7679C9.07687 26.2991 8.81348 25.6632 8.81348 25.0002L6.93848 7.50015M10.6885 7.50015V5.74219C10.6885 5.07915 10.9519 4.44326 11.4207 3.97442C11.8896 3.50558 12.5254 3.24219 13.1885 3.24219H18.1885C18.8515 3.24219 19.4874 3.50558 19.9562 3.97442C20.4251 4.44326 20.6885 5.07915 20.6885 5.74219V7.50015"
                    stroke="#D81010"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.8613 13.7646L13.515 21.2361"
                    stroke="#D81010"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.5151 13.7646L17.8615 21.2361"
                    stroke="#D81010"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Hapus
              </button>
            </div>
            <table class="table-auto">
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>Witchy Woman</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>Shining Star</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}
