import { Calendar, DollarSign, Edit2, Plus, Trash2, Users } from "lucide-react";
import { useGetGroups } from "../hooks";

const Groups = () => {
  const { data } = useGetGroups();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Guruhlar</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} />
          Yangi guruh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((group) => (
          <div
            key={group.id}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {group.name}
              </h3>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit2 size={18} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{group.student_count} o'quvchi</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Se-Pay-Ju 16:00</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                <span className="font-semibold text-gray-800">
                  {(group.price_cource / 1000).toFixed(0)}k so'm/oy
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-medium">O'qituvchi:</span>{" "}
                {group.teacher?.full_name}
              </p>
            </div>

            <button className="mt-4 w-full bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 font-medium">
              Batafsil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
