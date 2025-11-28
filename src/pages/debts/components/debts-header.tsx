import { useGetGroups } from "@pages/groups/hooks";
import { Button, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

interface IProps {
  setSelectedGroup: React.Dispatch<React.SetStateAction<number | null>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const DebtsHeader: React.FC<IProps> = ({ setSearch, setSelectedGroup }) => {
  const { data: groups } = useGetGroups();
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  return (
    <div className="flex justify-between items-center mb-4">
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
  );
};

export default DebtsHeader;
