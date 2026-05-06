import React from "react";
import { Modal, Button, Spin } from "antd";
import { useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";  

interface CommonModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void; // Optional confirm handler for actions like delete
  description?: string; // Optional description text inside the modal
  confirmText?: string; // Custom text for the confirm button
  cancelText?: string; // Custom text for the cancel button
  confirmButtonType?: "primary" | "default" | "link" | "text" | "dashed"; // Valid Ant Design button types
  isDanger?: boolean; // Custom flag for 'danger' button
  children?: React.ReactNode; // Optional dynamic content inside the modal
  width?: number; // Optional custom width
}

const CommonModal: React.FC<CommonModalProps> = ({
  title,
  open,
  onClose,
  onConfirm,
  description,
  confirmText = "Confirm",
  confirmButtonType = "primary",
  isDanger = false, // Use the `isDanger` prop to control the 'danger' styling
  children,
  width = 600,
}) => {
  const { isLoading } = useSelector((state: any) => state.General);

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      width={width}
      className="model_bg_remove" // Ensure modal background is solid white
      closeIcon={
        <CloseOutlined className="text-gray-700 hover:text-gray-900" />
      } // Custom close icon (cross)
    >
      <div className="p-4">
        {description && <p className="text-gray-700">{description}</p>}
        {children && <div>{children}</div>}

        <div className="flex justify-end mt-4 gap-2">
          {onConfirm && (
            <Button
              onClick={onConfirm}
              type={confirmButtonType}
              className={`${
                confirmButtonType === "primary"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : confirmButtonType === "default"
                  ? "bg-gray-500 hover:bg-gray-600 text-white"
                  : confirmButtonType === "dashed"
                  ? "bg-gray-200 hover:bg-gray-300 text-black border border-gray-400"
                  : "" // This will handle "link" and "text" styles if needed
              } ${isDanger ? "bg-red-500 hover:bg-red-600 text-white" : ""}`} // Apply red styling if isDanger is true
            >
              {isLoading ? <Spin size="small" /> : confirmText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CommonModal;


