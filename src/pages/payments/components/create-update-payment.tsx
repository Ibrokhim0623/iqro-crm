import GlobalInput from "@components/global-input/global-input";
import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { useGetStudents } from "@pages/students/hooks";
import { setPaymentVisible } from "@reducers/payments-slice";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import { useAddPayment } from "../hooks";

const CreateUpdatePayment = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const { data: students } = useGetStudents();
  const createPayment = useAddPayment();

  const open = useAppSelector(
    (state) => state.paymentsSlice.paymentVisible.open
  );

  const onClose = () => {
    dispatch(setPaymentVisible(false));
    form.resetFields();
  };

  const onFinish = (values: {
    student_id: number;
    amount: number;
    payment_date: string;
    description?: string;
  }) => {
    createPayment.mutateAsync(values).then(onClose);
  };

  return (
    <Modal
      open={open}
      title="To'lov qilish"
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Saqlash"
      okButtonProps={{ loading: createPayment.isPending }}
      cancelText="Bekor qilish"
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="O‘quvchi"
          name="student_id"
          rules={[{ required: true, message: "O‘quvchini tanlang" }]}
        >
          <Select
            placeholder="O‘quvchini tanlang"
            options={students?.map((s) => ({
              value: s.id,
              label: s.name,
            }))}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          label="To‘lov summasi"
          name="amount"
          rules={[{ required: true, message: "Summani kiriting" }]}
        >
          <GlobalInput
            type="currency"
            returnType="number"
            placeholder="1 000 000"
          />
        </Form.Item>

        <Form.Item
          label="To‘lov sanasi"
          name="payment_date"
          rules={[{ required: true, message: "Sanani tanlang" }]}
        >
          <DatePicker className="w-full" format="DD-MMM YYYY" />
        </Form.Item>

        <Form.Item label="Izoh (ixtiyoriy)" name="description">
          <Input.TextArea
            rows={3}
            placeholder="Masalan: noyabr oyi uchun to‘lov"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUpdatePayment;
