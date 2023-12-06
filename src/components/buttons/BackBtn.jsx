export default function BackBtn({ backFrom, customClass }) {
  return (
    <button onClick={backFrom} className={`${customClass ? customClass : "absolute" }`}>
      <svg
        width="15"
        height="15"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.2433 13L25.3214 3.9219C25.7522 3.49181 25.9946 2.90819 25.9951 2.29942C25.9956 1.69065 25.7543 1.1066 25.3242 0.675758C24.8942 0.244913 24.3105 0.00256513 23.7018 0.00202751C23.093 0.00148988 22.5089 0.242807 22.0781 0.672891L13 9.751L3.9219 0.672891C3.49105 0.242046 2.9067 0 2.29739 0C1.68809 0 1.10374 0.242046 0.672891 0.672891C0.242046 1.10374 0 1.68809 0 2.29739C0 2.9067 0.242046 3.49105 0.672891 3.9219L9.751 13L0.672891 22.0781C0.242046 22.5089 0 23.0933 0 23.7026C0 24.3119 0.242046 24.8963 0.672891 25.3271C1.10374 25.758 1.68809 26 2.29739 26C2.9067 26 3.49105 25.758 3.9219 25.3271L13 16.249L22.0781 25.3271C22.5089 25.758 23.0933 26 23.7026 26C24.3119 26 24.8963 25.758 25.3271 25.3271C25.758 24.8963 26 24.3119 26 23.7026C26 23.0933 25.758 22.5089 25.3271 22.0781L16.2433 13Z"
          fill="#05150F"
        />
      </svg>
    </button>
  );
}