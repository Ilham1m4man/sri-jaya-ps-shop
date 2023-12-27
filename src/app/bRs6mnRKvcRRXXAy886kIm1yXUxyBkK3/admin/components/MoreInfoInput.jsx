export default function MoreInfoInput({ onChange }) {
  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl p-4 grow">
        <label htmlFor="desc" className="font-bold text-sm sm:text-lg">
          Keterangan
        </label>
        <textarea
          required
          rows={7}
          name="desc"
          /* value={state.address}
                      defaultValue={userProfile && cekAlamat()} */
          onChange={onChange}
          className="w-full resize-none mt-4 rounded-xl text-grn-950 font-normal text-base border-[1px] border-grn-950 p-[10px] outline-none"
        />
      </div>
      <div className="bg-white rounded-3xl shadow-xl p-4 grow">
        <label htmlFor="userGuide" className="font-bold text-sm sm:text-lg">
          Petunjuk Pemakaian
        </label>
        <textarea
          required
          rows={7}
          name="userGuide"
          /* value={state.address}
                      defaultValue={userProfile && cekAlamat()} */
          onChange={onChange}
          className="w-full resize-none mt-4 rounded-xl text-grn-950 font-normal text-base border-[1px] border-grn-950 p-[10px] outline-none"
        />
      </div>
    </>
  );
}
