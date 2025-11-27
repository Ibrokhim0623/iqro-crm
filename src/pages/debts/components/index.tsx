import { useState, useMemo } from "react";
import { Select, Card, Table, Tag, Input, Button, Space } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useGetMonthlyDebts } from "../hooks";
import { useGetGroups } from "@pages/groups/hooks";
import type { IDebtData } from "../models";
import dayjs from "dayjs";

const DebtsPage = () => {
  const { data: debts, isLoading } = useGetMonthlyDebts();
  const { data: groups } = useGetGroups();

  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));

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
        <p className="font-semibold">{record?.student?.name}</p>
      ),
    },
    {
      title: "Guruh",
      render: (record: IDebtData) => <p>{record?.group?.name}</p>,
    },
    {
      title: "Oylik narx",
      dataIndex: "price_cource",
      render: (v: number) => v.toLocaleString("ru"),
    },
    {
      title: "To‘lagan",
      dataIndex: "paid_this_month",
      render: (v: number) => v.toLocaleString("ru"),
    },
    {
      title: "Qarzdorlik",
      dataIndex: "debt",
      render: (v: number) =>
        v > 0 ? (
          <Tag color="red">{v.toLocaleString("ru")}</Tag>
        ) : (
          <Tag color="green">0</Tag>
        ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Qarzdorliklar</h1>
          <p className="text-gray-500 text-sm">
            {dayjs(month).format("MMMM YYYY")}
          </p>
        </div>

        <Space>
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="O'quvchi qidirish..."
            style={{ width: 220 }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            placeholder="Guruh bo‘yicha"
            allowClear
            style={{ minWidth: 200 }}
            onChange={(v) => setSelectedGroup(v)}
            options={groups?.map((item) => ({
              value: item?.id,
              label: item?.name,
            }))}
          />
          <Select
            value={month}
            style={{ minWidth: 160 }}
            onChange={(v) => setMonth(v)}
            options={[
              {
                label: "Joriy oy",
                value: dayjs().format("YYYY-MM"),
              },
              {
                label: "O‘tgan oy",
                value: dayjs().subtract(1, "month").format("YYYY-MM"),
              },
            ]}
          />
          <Button icon={<ReloadOutlined />} onClick={() => setSearch("")}>
            Reset
          </Button>
        </Space>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card title="Joriy oy daromadi">
          <p className="text-2xl font-bold text-green-600">
            {debts
              ?.reduce((sum, i) => sum + i.paid_this_month, 0)
              .toLocaleString("ru")}{" "}
            so'm
          </p>
        </Card>

        <Card title="Umumiy qarzdorlik">
          <p className="text-2xl font-bold text-red-500">
            {debts?.reduce((sum, i) => sum + i.debt, 0).toLocaleString("ru")}{" "}
            so'm
          </p>
        </Card>

        <Card title="To‘lov qilganlar">
          <p className="text-2xl font-bold text-blue-600">
            {debts?.filter((i) => i.paid_this_month > 0).length} ta
          </p>
        </Card>

        <Card title="Qarzdorlar soni">
          <p className="text-2xl font-bold text-orange-500">
            {debts?.filter((i) => i.debt > 0).length} ta
          </p>
        </Card>
      </div>

      <Table
        loading={isLoading}
        rowKey={(r: IDebtData) => r.student?.student_id}
        columns={columns}
        dataSource={filtered}
        pagination={false}
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
};

export default DebtsPage;
