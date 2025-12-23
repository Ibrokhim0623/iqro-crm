import { Calendar, DollarSign, Edit2, Trash2, Users } from "lucide-react";
import React from "react";
import type { IGroup } from "../models";
import dayjs from "dayjs";
import { daysOfWeek } from "../helpers";
import { useAppDispatch } from "@hooks/redux-hooks";
import { setOpen } from "@reducers/groups-slice";
import { useDeleteGroup } from "../hooks";
import ConfirmModal from "@components/confirm-modal/confirm-modal";

interface IProps {
  group: IGroup;
}

const GroupItem: React.FC<IProps> = ({ group }) => {
  const dispatch = useAppDispatch();
  const deleteGroup = useDeleteGroup();

  const days = daysOfWeek
    ?.filter((item) => group?.days?.includes(item?.id))
    ?.map((elem) => elem?.short)
    ?.join(", ");

  return (
    <div className="bg-[var(--bg)] border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-[var(--text-default)]">
          {group.name}
        </h3>
        <div className="flex gap-2">
          <button
            className="p-2 rounded-lg hover:bg-[var(--bg-blue-soft)] text-blue-600 transition cursor-pointer"
            onClick={() =>
              dispatch(setOpen({ groupId: group?.id, open: true }))
            }
          >
            <Edit2 size={18} />
          </button>
          <ConfirmModal
            title="Guruhni o'chirish"
            text={`Siz ${group.name} guruhini o'chirmoqchimisiz?`}
            onConfirm={() => deleteGroup.mutateAsync(group.id)}
            loading={deleteGroup.isPending}
          >
            {({ onOpen }) => (
              <button
                className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition cursor-pointer"
                onClick={onOpen}
              >
                <Trash2 size={18} />
              </button>
            )}
          </ConfirmModal>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gray-500" />
          <span>{group.student_count} o'quvchi</span>
        </div>
        {group?.days && group?.end_time && (
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <span>{days}</span>
              <span>
                {`${dayjs(group?.start_time).format("HH:mm")} - ${dayjs(
                  group?.end_time
                ).format("HH:mm")}`}
              </span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-gray-500" />
          <span className="font-semibold text-[var(--text-default)]">
            {(group.price_cource / 1000).toFixed(0)}k so'm/oy
          </span>
        </div>
        <p>
          <span className="font-medium text-[var(--text-default)]">
            O'qituvchi: {group.teacher?.full_name}
          </span>
        </p>
      </div>

      <button className="mt-3 w-full py-2 rounded-lg bg-[var(--bg-blue-soft)] text-blue-600 font-medium hover:bg-blue-100 transition cursor-pointer">
        Batafsil
      </button>
    </div>
  );
};

export default GroupItem;
