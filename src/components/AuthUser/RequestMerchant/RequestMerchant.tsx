import React from "react";
import { Modal, Form, Input, Select, Button, message, Row, Col } from "antd";
import CustomPhoneNumber from "../../Comman/CustomPhoneNumber/CustomPhoneNumber";
import { useDispatch } from "react-redux";
import { merchantRequest } from "../../../actions/merchant";

const { TextArea } = Input;
const { Option } = Select;

interface RequestMerchantModalProps {
  openModal: boolean; // Visibility of the modal
  closeModal: () => void; // Function to close the modal
}

const RequestMerchant: React.FC<RequestMerchantModalProps> = ({
  openModal,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const dispatch: any = useDispatch();

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      phoneNumber: values?.phoneNumber.toString().trim().startsWith("+")
        ? values?.phoneNumber.toString().trim()
        : `+${values?.phoneNumber.toString().trim()}`,
    };

    dispatch(
      merchantRequest(payload, (response: any) => {
        if (response.status === 200 || response.status === 201) {
          form.resetFields();
          closeModal(); // Close modal on success
        } else {
          message.error("Failed to create Merchant and User");
        }
      })
    );
  };

  return (
    <Modal
      title="Request Merchant Registration"
      open={openModal}
      onCancel={closeModal}
      footer={null} // No default footer
      width={800} // Set modal width
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-full bg-white p-4"
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Please enter the full name" }]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter the first name" }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please enter the last name" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Business Email"
              name="businessEmail"
              rules={[
                { required: true, message: "Please enter the business email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Business Email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <CustomPhoneNumber
              isRequired={true}
              label="Mobile Number"
              name="phoneNumber"
            />
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Which Best Describes You"
              name="whichBestDescribesYou"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select placeholder="Select an option">
                <Option value="Merchant">Merchant</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <TextArea rows={4} placeholder="Describe your inquiry..." />
        </Form.Item>

        <Form.Item>
          <Row gutter={16} justify="end">
            <Col>
              <Button
                type="default"
                onClick={closeModal}
                className="py-2"
                size="large"
              >
                Close
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                className="py-2"
                size="large"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

    </Modal>
  );
};

export default RequestMerchant;


