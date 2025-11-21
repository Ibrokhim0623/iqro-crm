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
    ?.join("-");

  return (
    <div
      key={group.id}
      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{group.name}</h3>
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
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
                className="text-red-600 hover:text-red-800 cursor-pointer"
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
          <Users size={16} />
          <span>{group.student_count} o'quvchi</span>
        </div>
        {group?.days && group?.end_time ? (
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <div className="flex items-center gap-2">
              <span>{group?.days ? days : ""}</span>
              <span>
                {group?.end_time &&
                  `${dayjs(group?.start_time).format("HH:mm")} - ${dayjs(
                    group?.end_time
                  ).format("HH:mm")}`}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
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
  );
};

export default GroupItem;
