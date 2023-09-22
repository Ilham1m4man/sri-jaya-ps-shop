export default function SearchBar({ keyword, keywordChange }) {
  return (
    <div id="search-bar" className="flex items-center w-[80%] gap-4 px-5 rounded-[15px] bg-white">
      <svg
        width="19"
        height="20"
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.319 13.4328C16.7628 10.2943 16.542 5.75371 13.6569 2.86853C10.5327 -0.255657 5.46734 -0.255657 2.34315 2.86853C-0.78105 5.99273 -0.78105 11.058 2.34315 14.1822C5.22833 17.0674 9.769 17.2881 12.9075 14.8444C12.921 14.8597 12.9351 14.8747 12.9497 14.8893L17.1924 19.1319C17.5829 19.5225 18.2161 19.5225 18.6066 19.1319C18.9971 18.7414 18.9971 18.1083 18.6066 17.7177L14.364 13.4751C14.3493 13.4605 14.3343 13.4464 14.319 13.4328ZM12.2426 4.28275C14.5858 6.62589 14.5858 10.4248 12.2426 12.768C9.8995 15.1111 6.1005 15.1111 3.75736 12.768C1.41421 10.4248 1.41421 6.62589 3.75736 4.28275C6.1005 1.9396 9.8995 1.9396 12.2426 4.28275Z"
          fill="#05150F"
        />
      </svg>

      <input
        className="w-[100%] h-[55px] text-footer_fontClr text-xl font-normal outline-none"
        type="text"
        placeholder={"Cari"}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}
