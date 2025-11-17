import { Table } from "antd";
import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetStudents } from "../hooks";
import { cx } from "@utils/helpers";

const StudentsTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetStudents();

  const columns = [
    {
      key: "1",
      title: "To'liq ismi",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Telefon raqami",
      dataIndex: "phone",
    },
    {
      key: "3",
      title: "Guruhi",
      dataIndex: "group",
      render: (record: { name: string }) => <div>{record?.name}</div>,
    },
    {
      key: "4",
      title: "Balansi",
      dataIndex: "balance",
    },
    {
      key: "5",
      title: "Holati",
      dataIndex: "status",
      render: (record: "inactive" | "active") => (
        <div
          className={cx(
            record === "active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600",
            "w-max px-3 rounded-md font-medium"
          )}
        >
          {record === "active" ? "Faol" : "Faol emas"}
        </div>
      ),
    },
    {
      key: "6",
      title: "Amallar",
      render: () => (
        <div className="flex items-center gap-3">
          <Edit2 size={16} className="cursor-pointer" stroke="blue" />
          <Trash2 size={16} className="cursor-pointer" stroke="red" />
        </div>
      ),
    },
  ];

  const handleRowClick = (studentId: number) => {
    navigate(`/students/${studentId}`);
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
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
