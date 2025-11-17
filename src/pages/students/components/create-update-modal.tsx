import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { useGetGroups } from "@pages/groups/hooks";
import { setOpen } from "@reducers/students-slice";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useGetStudents, useUpsertStudent } from "../hooks";
import type { IStudentCreate } from "../models";
import { useEffect } from "react";

const { Option } = Select;

const CreateUpdateModal = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const { data: groups } = useGetGroups();
  const { data: students } = useGetStudents();
  const createStudent = useUpsertStudent();

  const open = useAppSelector((state) => state.studentsSlice.studentModal.open);

  const studentId = useAppSelector(
    (state) => state.studentsSlice.studentModal.studentId
  );

  const onCancel = () => {
    form.resetFields();
    dispatch(setOpen({ open: false, studentId: null }));
  };

  const onFinish = (values: IStudentCreate) => {
    createStudent
      .mutateAsync({ ...values, ...(studentId !== null && { id: studentId }) })
      .then(onCancel);
  };

  useEffect(() => {
    if (studentId !== null && open) {
      const currentStudent = students?.find((item) => item?.id === studentId);
      form.setFieldsValue({
        ...currentStudent,
        phone: String(currentStudent?.phone)?.includes("+")
          ? currentStudent?.phone
          : `+${currentStudent?.phone}`,
        group_id: currentStudent?.group?.id,
      });
    }
  }, [studentId, open]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="O'quvchi qo'shish"
      okText="Saqlash"
      cancelText="Bekor qilish"
      onOk={() => form.submit()}
      okButtonProps={{ loading: createStudent.isPending }}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="To'liq ism familiya"
          rules={[
            { required: true, message: "Ism familiyani kiriting!" },
            { min: 3, message: "Kamida 3 ta harf!" },
          ]}
        >
          <Input placeholder="Masalan: Ali Valiyev" size="large" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon raqami"
          rules={[
            { required: true, message: "Telefon raqamini kiriting!" },
            {
              pattern: /^\+998[0-9]{9}$/,
              message: "Format: +998901234567",
            },
          ]}
        >
          <Input placeholder="+998901234567" size="large" />
        </Form.Item>

        <Form.Item
          name="group_id"
          label="Guruh"
          rules={[{ required: true, message: "Guruhni tanlang!" }]}
        >
          <Select placeholder="Guruhni tanlang" size="large" showSearch>
            {groups?.map((group) => (
              <Option key={group.id} value={group.id}>
                {group.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Holat">
          <Select size="large">
            <Option value="active">✓ Faol</Option>
            <Option value="inactive">✗ Nofaol</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="balance"
          label="Balans (so'm)"
          tooltip="Musbat - ortiqcha, Manfiy - qarz"
        >
          <InputNumber
            size="large"
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }
            parser={(value) => value!.replace(/\s/g, "")}
            placeholder="0"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUpdateModal;
