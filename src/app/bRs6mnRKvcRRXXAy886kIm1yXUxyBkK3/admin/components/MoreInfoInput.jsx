export default function MoreInfoInput({ isDisabled, onChange }) {
  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl p-4 grow">
        <label
          htmlFor="desc"
          className="font-bold text-base sm:text-xl text-grn-950"
        >
          Keterangan
        </label>
        <textarea
          disabled={isDisabled}
          required
          rows={10}
          name="desc"
          /* value={state.address}
                      defaultValue={userProfile && cekAlamat()} */
          onChange={onChange}
          className="w-full resize-none mt-4 rounded-xl text-grn-950 font-normal text-base border-[1px] border-grn-950 p-[10px] outline-none"
        />
      </div>
      <div className="bg-white rounded-3xl shadow-xl p-4 grow">
        <label
          htmlFor="userGuide"
          className="font-bold text-base sm:text-xl text-grn-950"
        >
          Petunjuk Pemakaian
        </label>
        <textarea
          disabled={isDisabled}
          required
          rows={10}
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
