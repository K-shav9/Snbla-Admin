import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../actions/admin";
import { useLocation, useNavigate } from "react-router-dom";
import AddressAutocomplete from "../../utils/snippets/Addressdetail";

interface EditUserProps {
  user: any; // The user object containing the details to be edited
  fetchUsersList: any;
}

const EditUser: React.FC<EditUserProps> = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const [form] = Form.useForm();

  useEffect(() => {
    document.title = "Edit User | Snbla";
  }, []);

  const handleSubmit = (values: any) => {
    // Prepare data for the API call
    const updatedData = {
      id: user.id, // Include the user ID for the API
      ...values,
    };

    // Set submitting state to true when API is called
    setIsSubmitting(true);

    // Dispatch the update API action
    dispatch(
      updateUserDetails(updatedData, (response: any) => {
        setIsSubmitting(false); // Set submitting state back to false after API response
        if (response.status === 200 || response.status === 201) {
          navigate("/admin/users");
        } else {
          // Handle failure (optional: add specific logic for errors)
          console.error(
            "Failed to update user details:",
            response?.message || "Unknown error"
          );
        }
      })
    );
  };

  const handleAddressSelect = (selectedAddress: string) => {
     form.setFieldsValue({ address: selectedAddress }); // Auto-fill the form field
   };

  return (
    <div className="w-full mt-5">
      <div className="d-flex align-items-center mb-6 mt-3">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn textAuthHeading"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="0.4"
              y="0.4"
              width="23.2"
              height="23.2"
              rx="11.6"
              stroke="#474df4"
              strokeWidth="0.8"
            />
            <path
              d="M14 8L10 12L14 16"
              stroke="#474df4"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>{" "}
        </button>
        <h2 className="text-3xl font-bold text-left ms-2">Edit User</h2>
      </div>
      <Form
        layout="vertical"
        form={form}
        className="form-wrapper"
        initialValues={user} // Pre-fill form with existing user details
        requiredMark={false} // 👈 This will hide the required asterisk (*)
        onFinish={handleSubmit}
      >
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
              label="Contact Name"
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-lg-6 col-sm-12">
            <Form.Item className="formControlDesign" label="Email" name="email">
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input the address!",
                },
              ]}
            >
              {/* <Input /> */}
              {/* <AddressAutocomplete
                onAddressSelect={handleAddressSelect}
               
              /> */}
              <AddressAutocomplete
                value={form.getFieldValue("address")} // ✅ Pass form's address value
                onAddressSelect={(value) =>
                  form.setFieldsValue({ address: value })
                } // ✅ Update form on selection
              />
            </Form.Item>
          </div>
        </div>

        <div className="col-lg-12 mt-15">
          <div className="btn-groups-Forms text-end">
            <Button
              className="btn btn-outline-primary"
              onClick={() => window.history.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-primary no-hover"
              htmlType="submit"
              loading={isSubmitting}
            >
              Update
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditUser;
