import React, { useEffect } from "react";
import { Modal, Form, Input, message, Button } from "antd";

interface UserSendNotificationProps {
  isVisible: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
  loading?: boolean;
  data: any;
  form: any;
}

const UserNotificationModal: React.FC<UserSendNotificationProps> = ({
  data,
  isVisible,
  onClose,
  onSubmit,
  loading,
  form,
}) => {

  useEffect(() => {
    if (isVisible && data?.deviceInfo) {
      form.setFieldsValue({
        platform: data?.deviceInfo?.platform || "", // Prefill platform
        appVersion: data?.deviceInfo?.app_version || "", // Prefill version
      });
    }
  }, [isVisible, data, form]);

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      className="p-6 w-full max-w-md md:max-w-lg lg:max-w-xl h-[200px] rounded-lg"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <h1 className="mb-4 text-lg">Send Notification</h1>
        <Form.Item
          label="Platform"
          name="platform"
          rules={[{ required: true, message: "Please enter platform" }]}
        >
          <Input type="text" disabled placeholder="Enter platform" />
        </Form.Item>

        <Form.Item
          label="App Version"
          name="appVersion"
          rules={[{ required: true, message: "Please enter app version" }]}
        >
          <Input disabled placeholder="Enter app version" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description_en"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input
            placeholder="Enter description"
          />
        </Form.Item>

        <div className="flex justify-end mt-4 gap-2">
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserNotificationModal;
