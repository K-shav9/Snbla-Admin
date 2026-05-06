import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeAccountPassword } from "../../../actions/user";

const MerchantChangePassword = () => {
  const [form] = Form.useForm();
const [password, setPassword] = useState('');
  const user = useSelector((state: any) => state?.Auth);
  const dispatch: any = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Change Password | Snbla";
  }, []);
    
    const handlePasswordChange = (e: any) => {
      setPassword(e.target.value);
    };


  const handleSubmit = (values: any) => {
    setIsSubmitting(true);
    // Prepare payload with oldPassword and newPassword
    const payload = {
      oldPassword: values?.oldPassword,
      newPassword: password,
    };

    // Dispatch the changeAccountPassword action with payload
    dispatch(
      changeAccountPassword(payload, (resp: any) => {
           setIsSubmitting(false);
        if (resp) {
            form.resetFields();
          // Proceed after successful password change
          navigate("/merchant/change-password");
        }
      })
    );
  };

  return (
    <div className="flex flex-col tab:gap-8 gap-4">
      <div className="flex items-center justify-between">
        <h1 className="tab:text-[28px] text-xl font-semibold text-black">
          Account Overview
        </h1>
      </div>

     
        <div className="bg-white p-6 rounded-2xl border border-[#E9EBF0] w-full">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold text-black mb-3">
                Change Your Password
              </h2>
              <div className="py-4 bg-white border-y border-borderlight gap-3 flex flex-wrap">
                <Form
                  form={form}
                  name="changePasswordForm"
                  layout="vertical"
                  requiredMark={false} // 👈 This will hide the required asterisk (*)
                  onFinish={handleSubmit}
                  className="w-[80%] sm:w-[60%]" // Adjust width as needed
                >
                  <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your old password",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Enter your old password"
                      className="h-[44px] text-black placeholder-[#686E7D]"
                    />
                  </Form.Item>

                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a new password",
                      },
                      {
                        min: 8,
                        message: "Password must be at least 8 characters",
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={handlePasswordChange}
                      value={password}
                      placeholder="Enter your new password"
                      className="h-[44px] text-black placeholder-[#686E7D]"
                    />
                  </Form.Item>

                  <div className="flex justify-end gap-4">
                    <Button
                      htmlType="button"
                      onClick={() => form.resetFields()}
                      disabled={isSubmitting}
                    >
                      Discard
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isSubmitting}
                    >
                      Update
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default MerchantChangePassword;
