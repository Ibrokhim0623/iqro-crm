import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { useGetTeachers } from "@pages/teachers/hooks";
import { setOpen } from "@reducers/groups-slice";
import { Checkbox, Form, Input, Modal, Select, Space, TimePicker } from "antd";
import type { IGroupInput } from "../models";
import { useGetGroups, useUpsertGroup } from "../hooks";
import { daysOfWeek } from "../helpers";
import { useEffect } from "react";
import dayjs from "dayjs";
import GlobalInput from "@components/global-input/global-input";

const { Option } = Select;

const CreateUpdateModal = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const open = useAppSelector((state) => state.groupsSlice.groupModal.open);
  const groupId = useAppSelector(
    (state) => state.groupsSlice.groupModal.groupId
  );

  const createUpdateGroup = useUpsertGroup();

  const { data: teachers } = useGetTeachers();
  const { data: groups } = useGetGroups();

  const onClose = () => {
    dispatch(setOpen({ groupId: null, open: false }));
    form.resetFields();
  };

  const onFinish = (values: IGroupInput) => {
    createUpdateGroup
      .mutateAsync({ ...values, ...(groupId && { id: groupId }) })
      .then(onClose);
  };

  useEffect(() => {
    if (open && groupId) {
      const currentGroup = groups?.find((item) => item?.id === groupId);
      form.setFieldsValue({
        ...currentGroup,
        start_time: currentGroup?.start_time
          ? dayjs(currentGroup?.start_time)
          : null,
        end_time: currentGroup?.end_time ? dayjs(currentGroup?.end_time) : null,
        teacher_id: currentGroup?.teacher?.id,
      });
    }
  }, [open, groupId]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={groupId ? "Guruhni tahrirlash" : "Guruh yaratish"}
      centered
      okText="Saqlash"
      cancelText="Bekor qilish"
      onOk={() => form.submit()}
      okButtonProps={{ loading: createUpdateGroup.isPending }}
    >
      <Form
        autoComplete="off"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
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
          <GlobalInput
            placeholder="To'lov miqdorini kiriting"
            type="currency"
            returnType="number"
          />
        </Form.Item>
        <Form.Item
          name="teacher_id"
          label="Guruh o'qituvchisi"
          rules={[{ required: true, message: "" }]}
        >
          <Select placeholder="O'qituvchi tanlang">
            {teachers?.map((item) => (
              <Option key={item?.id} value={item?.id}>
                {item?.full_name}
              </Option>
            ))}
          </Select>
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
