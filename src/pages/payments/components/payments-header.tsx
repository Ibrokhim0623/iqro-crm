import { useAppDispatch } from "@hooks/redux-hooks";
import { setPaymentVisible } from "@reducers/payments-slice";
import { Plus } from "lucide-react";

const PaymentsHeader = () => {
  const dispatch = useAppDispatch();

  const createGroupItem = () => {
    dispatch(setPaymentVisible(true));
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-gray-800">To'lovlar</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 cursor-pointer"
        onClick={createGroupItem}
      >
        <Plus size={20} />
        To'lov qilish
      </button>
    </div>
  );
};

export default PaymentsHeader;
