import React from "react";
import { Modal, Form, Input, Button } from "antd";
import CustomPhoneNumber from "../../components/Comman/CustomPhoneNumber/CustomPhoneNumber";
import { createUser } from "../../actions/admin";
import { useDispatch } from "react-redux";

interface CreateUserProps {
  visible: boolean;
  onClose: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ visible, onClose }) => {
  const dispatch: any = useDispatch();
  const handleSubmit = (values: any) => {
    // Prepare the data object for the API call
    const formData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobileNumber: values.mobileNumber,
      // Add any additional fields required by your API
    };

    // Dispatch the createUser API action
    dispatch(
      createUser(formData, (response: any) => {
        if (response.status === 200 || response.status === 201) {
          console.log("User created successfully:", response?.message);
          onClose(); // Close modal on success
        } else {
          console.error("Failed to create Merchant and User:", response);
        }
      })
    );
  };

  return (
   <div className="container mt-5">
      <h2 className="mb-4">Create User</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input the first name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Last Name"
              name="lastName"
            >
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input the email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="col-lg-6 col-sm-12">
            <CustomPhoneNumber
              isRequired={true}
              label="Phone Number"
              name="mobileNumber"
            />
          </div>
        </div>

        <div className="col-lg-12 mt-15">
          <div className="btn-groups-Forms text-end">
            <Button className="btn btn-outline-primary" onClick={onClose}>
              Cancel
            </Button>
            <Button className="btn btn-primary" htmlType="submit">
              Create
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateUser;

