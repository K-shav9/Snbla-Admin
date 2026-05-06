import React from "react";
import { Modal } from "antd";

interface PaymentConfirmationModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    content?: string;
}

const PaymentConfirmationModal = ({
    isOpen,
    onClose,
    content,
}: PaymentConfirmationModalProps) => {
    console.log("Payment Modal Open:", isOpen, content);

    return (
        <Modal
            title="Secure Payment"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={window.innerWidth > 768 ? 600 : "90vw"} // Adjust width based on screen size
            style={{ zIndex: 1500, mask: 1400 }} // Ensures it appears on top of other modals
        >
            <iframe
                srcDoc={content}
                style={{
                    width: "100%",
                    height: "80vh",
                    border: "none",
                    background: "white",
                    borderRadius: "16px",
                }}
            />
        </Modal>
    );
};

export default PaymentConfirmationModal;
