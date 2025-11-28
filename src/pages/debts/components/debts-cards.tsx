import { Card } from "antd";
import { useGetMonthlyDebts } from "../hooks";

const DebtsCards = () => {
  const { data: debts } = useGetMonthlyDebts();
  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      <Card title="Umumiy qarzdorlik">
        <p className="text-2xl font-bold text-red-500">
          {debts?.reduce((sum, i) => sum + i.debt, 0).toLocaleString("ru")} so'm
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
  );
};

export default DebtsCards;
