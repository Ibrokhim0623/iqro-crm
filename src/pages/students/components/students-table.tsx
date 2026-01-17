import { Table } from "antd";
import { Edit2, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeleteStudent, useGetStudents } from "../hooks";
import { cx } from "@utils/helpers";
import { useAppDispatch } from "@hooks/redux-hooks";
import { setOpen } from "@reducers/students-slice";
import ConfirmModal from "@components/confirm-modal/confirm-modal";

type StudentStatus = "trial" | "active" | "left";

const statusMap: Record<StudentStatus, { label: string; className: string }> = {
  active: {
    label: "Faol",
    className: "bg-green-100 text-green-600",
  },
  trial: {
    label: "Sinov",
    className: "bg-blue-100 text-blue-600",
  },
  left: {
    label: "Ketgan",
    className: "bg-red-100 text-red-600",
  },
};

const StudentsTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetStudents();

  const deleteStudent = useDeleteStudent();

  const openStudentModal = ({ studentId }: { studentId: number }) => {
    dispatch(setOpen({ open: true, studentId }));
  };

  const onDeleteStudent = ({ studentId }: { studentId: number }) => {
    deleteStudent.mutate(studentId);
  };

  const columns = [
    {
      key: "1",
      title: "To'liq ismi",
      dataIndex: "name",
      render: (record: string) => <p className="font-medium">{record}</p>,
    },
    {
      key: "2",
      title: "Telefon raqami",
      dataIndex: "phone",
      render: (record: number) => <p>{`+${record}`}</p>,
    },
    {
      key: "3",
      title: "Guruhi",
      dataIndex: "group",
      render: (record: { name: string }) => (
        <div className="font-medium">{record?.name}</div>
      ),
    },
    {
      key: "4",
      title: "Balansi",
      dataIndex: "balance",
      render: (record: number) => (
        <p className="font-medium">{`${record?.toLocaleString("ru")} so'm`}</p>
      ),
    },
    {
      key: "5",
      title: "Holati",
      dataIndex: "status",
      render: (status: StudentStatus) => {
        const config = statusMap[status];

        return (
          <div
            className={cx(
              config.className,
              "w-max px-3 py-1 rounded-md font-medium text-sm"
            )}
          >
            {config.label}
          </div>
        );
      },
    },
    {
      key: "6",
      title: "Amallar",
      render: (record: { id: number; status: StudentStatus }) => (
        <div
          className="flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {record?.status === "left" ? (
            <Eye
              size={16}
              className="cursor-pointer"
              stroke="blue"
              onClick={() => openStudentModal({ studentId: record?.id })}
            />
          ) : (
            <Edit2
              size={16}
              className="cursor-pointer"
              stroke="blue"
              onClick={() => openStudentModal({ studentId: record?.id })}
            />
          )}

          <ConfirmModal
            text="Haqiqatdan ham ushbu o'quvchini o'chirmoqchimisiz?"
            title="O'quvchini o'chirish"
            onConfirm={() => onDeleteStudent({ studentId: record?.id })}
            loading={deleteStudent.isPending}
          >
            <Trash2 size={16} className="cursor-pointer" stroke="red" />
          </ConfirmModal>
        </div>
      ),
    },
  ];

  const handleRowClick = (studentId: number) => {
    navigate(`/students/${studentId}`);
  };

  return (
    <div className="bg-[var(--bg)] border border-gray-200 rounded-lg overflow-hidden">
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="id"
        onRow={({ id }) => ({
          onClick: () => handleRowClick(id),
          className: "cursor-pointer",
        })}
        loading={isLoading}
      />
    </div>
  );
};

export default StudentsTable;
