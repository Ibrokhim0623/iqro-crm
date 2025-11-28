import { Table } from "antd";
import { useGetPayments } from "../hooks";
import dayjs from "dayjs";

const PaymentsTable = () => {
  const { data: payments, isLoading } = useGetPayments();

  const columns = [
    {
      key: "1",
      title: "O'quvchi ismi",
      dataIndex: "student_name",
      render: (record: string) => <p className="font-medium">{record}</p>,
    },
    {
      key: "2",
      title: "To'lov summasi",
      dataIndex: "amount",
      render: (record: number) => (
        <p className="font-medium">{`${record?.toLocaleString("ru")} so'm`}</p>
      ),
    },
    {
      key: "3",
      title: "To'lov vaqti",
      dataIndex: "payment_date",
      render: (record: string) => (
        <p>{dayjs(record).format("DD.MM.YYYY HH:mm")}</p>
      ),
    },
    {
      key: "4",
      title: "Izoh",
      dataIndex: "description",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={payments}
        pagination={false}
        loading={isLoading}
      />
    </div>
  );
};

export default PaymentsTable;
