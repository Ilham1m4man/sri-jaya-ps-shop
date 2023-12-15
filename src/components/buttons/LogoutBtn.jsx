export default function LogoutBtn({ onLogOut }) {
  return (
    <button
      onClick={onLogOut}
      className="hover:opacity-90 active:scale-95 transition-all text-footer_fontClr font-normal text-base flex gap-2 mr-auto"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_395_1149)">
          <path
            d="M11 28H5C4.20435 28 3.44129 27.6956 2.87868 27.1539C2.31607 26.6121 2 25.8773 2 25.1111V4.88889C2 4.12271 2.31607 3.38791 2.87868 2.84614C3.44129 2.30436 4.20435 2 5 2H11"
            stroke="#05150F"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 22L28 15L21 8"
            stroke="#05150F"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M28 15H11"
            stroke="#05150F"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_395_1149">
            <rect width="30" height="30" fill="white" />
          </clipPath>
        </defs>
      </svg>
      Keluar
    </button>
  );
}
