import PhoneInput from "react-phone-number-input";

export default function ProfileForm({
  editProfileHandler,
  userProfile,
  cekNoTelepon,
  onChange,
  state,
}) {
  const isKonsumer = userProfile?.customClaims?.role.includes("Konsumer");

  return (
    <form
      action={editProfileHandler}
      className={`flex flex-col w-full md:w-[60%] gap-5 border-2 ${
        isKonsumer ? "border-grn-950" : "border-ble-950"
      } rounded-xl p-5`}
    >
      <div className="grid">
        <label
          htmlFor="name"
          className="text-footer_fontClr font-normal text-base text-opacity-80"
        >
          Nama
        </label>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={onChange}
          defaultValue={userProfile && userProfile.displayName}
          className={`w-full font-normal text-base border-b-2 ${
            isKonsumer
              ? "border-grn-950 text-grn-950"
              : "border-ble-950 text-ble-950"
          } px-2 outline-none`}
        />
      </div>
      <div className="grid">
        <label
          htmlFor="email"
          className="text-footer_fontClr font-normal text-base text-opacity-80"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={onChange}
          defaultValue={userProfile && userProfile.email}
          className={`w-full font-normal text-base border-b-2 ${
            isKonsumer
              ? "border-grn-950 text-grn-950"
              : "border-ble-950 text-ble-950"
          } px-2 outline-none`}
        />
      </div>
      <div className="grid">
        <label
          htmlFor="phone"
          className="text-footer_fontClr font-normal text-base text-opacity-80"
        >
          No. Telepon{" "}
          <span className="text-xs opacity-70">
            {userProfile &&
              (cekNoTelepon() ? null : "(Disarankan untuk diisi)")}
          </span>
        </label>
        <PhoneInput
          name="phone"
          className={`font-normal text-base md:text-lg border-b-2 ${
            isKonsumer
              ? "border-grn-950 text-grn-950"
              : "border-ble-950 text-ble-950"
          } p-[5px] md:p-[10px] outline-none`}
          international
          countryCallingCodeEditable={false}
          defaultCountry="ID"
          value={state.phone}
          onChange={onChange}
        />
      </div>
    </form>
  );
}
