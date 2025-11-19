import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { setOpen } from "@reducers/groups-slice";
import { Checkbox, Form, Input, Modal, Select, Space, TimePicker } from "antd";

const daysOfWeek = [
  { id: 1, name: "Dushanba", short: "Du" },
  { id: 2, name: "Seshanba", short: "Se" },
  { id: 3, name: "Chorshanba", short: "Chor" },
  { id: 4, name: "Payshanba", short: "Pay" },
  { id: 5, name: "Juma", short: "Ju" },
  { id: 6, name: "Shanba", short: "Sha" },
  { id: 7, name: "Yakshanba", short: "Yak" },
];

const CreateUpdateModal = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const open = useAppSelector((state) => state.groupsSlice.groupModal.open);

  const onClose = () => {
    dispatch(setOpen({ groupId: null, open: false }));
  };

  const onFinish = (values: unknown) => {
    console.log(values, "values");
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Guruh yaratish"
      centered
      okText="Saqlash"
      cancelText="Bekor qilish"
      onOk={() => form.submit()}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Guruh nomi"
          rules={[{ required: true, message: "" }]}
        >
          <Input placeholder="Guruh nomi" />
        </Form.Item>
        <Form.Item
          name="price_cource"
          label="Kurs uchun to'lov miqdori"
          rules={[{ required: true, message: "" }]}
        >
          <Input placeholder="Guruh nomi" />
        </Form.Item>
        <Form.Item
          name="teacher_id"
          label="Guruh o'qituvchisi"
          rules={[{ required: true, message: "" }]}
        >
          <Select></Select>
        </Form.Item>
        <Form.Item
          name="days"
          label="Dars kunlari"
          rules={[{ required: true, message: "dars kunlarini tanlang" }]}
        >
          <Checkbox.Group>
            {daysOfWeek.map((day) => (
              <Checkbox key={day.id} value={day.id}>
                {day.short}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="Dars vaqti">
          <Space>
            <Form.Item
              name="start_time"
              noStyle
              rules={[{ required: true, message: "" }]}
            >
              <TimePicker format="HH:mm" placeholder="14:00" />
            </Form.Item>
            <span>-</span>
            <Form.Item
              name="end_time"
              noStyle
              rules={[{ required: true, message: "" }]}
            >
              <TimePicker format="HH:mm" placeholder="16:00" />
            </Form.Item>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUpdateModal;
