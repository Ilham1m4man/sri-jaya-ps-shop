export default function FilterBtn({ filterClicked }) {
  return (
    <button id="filter-btn" className="flex items-center gap-4 min-w-[21.5%] max-w-[250px] h-[55px] px-5 rounded-[15px] bg-white text-footer_fontClr text-opacity-60 text-xl font-normal" onClick={filterClicked}>
      <svg
        width="23"
        height="21"
        viewBox="0 0 23 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.6826 1.34473H1.68262L9.68262 10.8047V17.3447L13.6826 19.3447V10.8047L21.6826 1.34473Z"
          stroke="#05150F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Filter
    </button>
  );
}
