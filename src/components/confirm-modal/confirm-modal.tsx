import { Button, Modal } from "antd";
import { useState, type ReactElement } from "react";

interface IProps {
  title: string;
  text: string;
  children?: ((props: { onOpen: () => void }) => ReactElement) | ReactElement;
  onConfirm?: () => void;
  loading: boolean;
}

const ConfirmModal: React.FC<IProps> = ({
  title,
  children,
  text,
  onConfirm: onConfirmProp,
  loading,
}) => {
  const [visible, setVisible] = useState(false);

  const child = () => {
    if (typeof children === "function") {
      return children({ onOpen: () => setVisible(true) });
    }
    return children ? (
      <div onClick={() => setVisible(true)}>{children}</div>
    ) : null;
  };

  const onClose = () => {
    setVisible(false);
  };

  const onConfirm = async () => {
    if (onConfirmProp) {
      await onConfirmProp();

      onClose();
    } else {
      onClose();
    }
  };

  return (
    <div>
      {child()}
      <Modal
        open={visible}
        title={title}
        onCancel={onClose}
        footer={false}
        centered
      >
        <div className="py-2">
          <p className="text-[16px]">{text}</p>
        </div>
        <div className="w-full flex items-center justify-end">
          <Button
            className="shadow-none! border-none! bg-red-600! text-white!"
            onClick={onConfirm}
            loading={loading}
            type="default"
          >
            O'chirish
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
