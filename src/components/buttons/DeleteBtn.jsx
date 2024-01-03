import { GoTrash } from "react-icons/go";

export default function DeleteBtn({ hapusHandler }) {
  return (
    <button
      onClick={() => hapusHandler()}
      className="bg-transparent flex items-center gap-2 border-none text-red-500 hover:text-red-600 active:text-red-700 group hover:scale-95 active:scale-90 transition-all"
    >
      <GoTrash className="fill-red-500 bg-white rounded-full w-7 h-7 group-hover:fill-red-600 group-active:fill-red-700 transition-all" />
      Hapus
    </button>
  );
}
