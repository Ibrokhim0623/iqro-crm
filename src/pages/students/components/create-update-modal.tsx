import { useAppSelector } from "@hooks/redux-hooks";
import { Modal } from "antd";

const CreateUpdateModal = () => {
  const open = useAppSelector((state) => state.studentsSlice.open);
  return <Modal open={open}>salom</Modal>;
};

export default CreateUpdateModal;
