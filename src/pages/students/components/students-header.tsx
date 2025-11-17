import { Plus, Search } from "lucide-react";
import { setOpen } from "@reducers/students-slice";
import { useAppDispatch } from "@hooks/redux-hooks";

const StudentsHeader = () => {
  const dispatch = useAppDispatch();
  const onOpen = () => dispatch(setOpen({ open: true, studentId: null }));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">O'quvchilar</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 cursor-pointer"
          onClick={onOpen}
        >
          <Plus size={20} />
          Yangi o'quvchi
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="O'quvchi qidirish..."
            className="flex-1 outline-none text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentsHeader;
