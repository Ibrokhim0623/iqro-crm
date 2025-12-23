import { Table, Tag } from "antd";
import { useMemo } from "react";
import { useGetMonthlyDebts } from "../hooks";
import type { IDebtData } from "../models";

interface IProps {
  selectedGroup: number | null;
  search: string;
}

const DebtsTable: React.FC<IProps> = ({ search, selectedGroup }) => {
  const { data: debts, isLoading } = useGetMonthlyDebts();

  const filtered = useMemo(() => {
    return debts
      ?.filter((d) => (selectedGroup ? d.group?.id === selectedGroup : true))
      ?.filter((d) =>
        search
          ? d.student?.name.toLowerCase().includes(search.toLowerCase())
          : true
      );
  }, [debts, selectedGroup, search]);

  const columns = [
    {
      title: "O'quvchi",
      render: (record: IDebtData) => (
        <p className="font-medium">{record?.student?.name}</p>
      ),
    },
    {
      title: "Guruh",
      render: (record: IDebtData) => (
        <p className="font-medium">{record?.group?.name}</p>
      ),
    },
    {
      title: "Oylik narx",
      dataIndex: "price_cource",
      render: (v: number) => (
        <p className="font-medium">{`${v.toLocaleString("ru")} so'm`}</p>
      ),
    },
    {
      title: "To‘lagan",
      dataIndex: "paid_this_month",
      render: (v: number) => (
        <p className="font-medium">{`${v.toLocaleString("ru")} so'm`}</p>
      ),
    },
    {
      title: "Qarzdorlik",
      dataIndex: "debt",
      render: (v: number) =>
        v > 0 ? (
          <Tag color="red" className="font-medium">
            {`${v.toLocaleString("ru")} so'm`}
          </Tag>
        ) : (
          <Tag color="green" className="font-medium">
            0
          </Tag>
        ),
    },
  ];

  return (
    <div className="bg-[var(--bg)] border border-gray-200 rounded-lg overflow-hidden">
      <Table
        loading={isLoading}
        rowKey={(r: IDebtData) => r.student?.student_id}
        columns={columns}
        dataSource={filtered}
        pagination={false}
        className="bg-[var(--bg)] rounded-lg shadow"
      />
    </div>
  );
};

export default DebtsTable;
