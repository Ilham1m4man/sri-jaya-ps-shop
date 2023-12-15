export default function ProfileForm({ editProfileHandler, userProfile, cekNoTelepon, setName, setEmail, setPhone }) {
  return (
    <form
    action={editProfileHandler} 
    className="flex flex-col w-full md:w-[60%] gap-5 border-2 border-grn-950 rounded-xl p-5">
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
          defaultValue={userProfile && userProfile.displayName}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-grn-950 font-normal text-base border-b-2 border-grn-950 px-2 outline-none"
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
          defaultValue={userProfile && userProfile.email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-grn-950 font-normal text-base border-b-2 border-grn-950 px-2 outline-none"
        />
      </div>
      <div className="grid">
        <label
          htmlFor="phone"
          className="text-footer_fontClr font-normal text-base text-opacity-80"
        >
          No. Telepon
        </label>
        <input
          type="tel"
          name="phone"
          defaultValue={userProfile && cekNoTelepon()}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full text-grn-950 font-normal text-base border-b-2 border-grn-950 px-2 outline-none placeholder:text-grn-800"
        />
      </div>
    </form>
  );
}
