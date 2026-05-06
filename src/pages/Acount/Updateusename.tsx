import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { changeAccountPassword } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';

export const Updateusename = () => {
    const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  

  useEffect(() => {
    document.title = "Change Password | Snbla";
  }, []);
  

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onFinish = (values: any) => {
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
            navigate("/admin/account/profile");
          }
        })
      );
    };


  const validatePassword = (_: any, value: string) => {
    if (value.length < 8) {
      return Promise.reject('Password must be at least 8 characters');
    }
    if (!/[a-zA-Z]/.test(value)) {
      return Promise.reject('Password must contain at least one letter');
    }
    if (!/\d/.test(value)) {
      return Promise.reject('Password must contain at least one number');
    }
    return Promise.resolve();
  };

  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        className="formControl"
        requiredMark={false} // 👈 This will hide the required asterisk (*)
        autoComplete="off"
      >
        <div className="d-flex align-items-center mb-6 mt-3">
          <button
            onClick={() => {
              navigate("/admin/dashboard");
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
                stroke="blue"
                strokeWidth="0.8"
              />
              <path
                d="M14 8L10 12L14 16"
                stroke="blue"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>{" "}
          </button>
          <h2 className="text-3xl font-bold text-left ms-2">Change Password</h2>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <Form.Item
                className="formControlDesign passwordinputs"
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
                  placeholder="Enter current password"
                  type="text"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="none"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <Form.Item
                className="formControlDesign passwordinputs"
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter a new password",
                  },
                  {
                    validator: validatePassword,
                  },
                ]}
              >
                <Input.Password
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="none"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-12">
              <div className="text-end btn-groups-Forms">
                <Button
                  className="btn btn-outline-primary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  className="btn btn-primary"
                  htmlType="submit"
                  loading={isSubmitting}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};