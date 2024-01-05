export default function Filters({
  minInputValue,
  onMinInput,
  maxInputValue,
  onMaxInput,
}) {
  return (
    <section className="filters flex flex-col gap-[30px] max-w-[250px] h-fit bg-white rounded-[15px] py-[30px] px-[27px]">
      <div className="flex flex-col gap-[30px]">
        <h3 className="font-bold text-xl text-grn-950">kategori</h3>
        <ul className="grid gap-[20px] font-normal text-xl text-grn-950">
          <li>
            <button className="flex gap-[10px] text-left items-center">
              <svg
                className="min-w-[24px]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#05150F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Pakan Burung
            </button>
          </li>
          <li>
            <button className="flex gap-[10px] text-left items-center">
              <svg
                className="min-w-[24px]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#05150F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Pakan Ternak
            </button>
          </li>
          <li>
            <button className="flex gap-[10px] text-left items-center">
              <svg
                className="min-w-[24px]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#05150F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Sangkar
            </button>
          </li>
          <li>
            <button className="flex gap-[10px] text-left items-center">
              <svg
                className="min-w-[24px]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#05150F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Obat Hewan
            </button>
          </li>
          <li>
            <button className="flex gap-[10px] text-left items-center">
              <svg
                className="min-w-[24px]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#05150F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Pakan Peliharaan
            </button>
          </li>

          <li>
            <button className="flex gap-[10px] text-left items-center">
              <svg
                className="min-w-[24px]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#05150F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Suplemen Peliharaan
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
