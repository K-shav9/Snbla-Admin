/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { changePassword } from "../../actions/user";
import { getUrlToken } from "../../utils/url-hash-params";
import { useDispatch } from "react-redux";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ChangePasswordForm: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const token = getUrlToken(location?.search);

  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onFinish = () => {
    const payload = {
      password,
    };

    dispatch(
      changePassword(
        payload,
        (response: any) => {
          if (response.status === 200 || response.status === 201) {
            navigate("/admin/login"); // Redirect on success
          } else {
            console.error(
              "Error changing password:",
              response.message || "Unknown error"
            );
          }
        },
        token
      )
    );
  };

  return (
    <div className="authforms">
      <div className="authHeadings">
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
              stroke="#0d6efd"
              strokeWidth="0.8"
            />
            <path
              d="M14 8L10 12L14 16"
              stroke="#0d6efd"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>{" "}
        </button>

        <div className="textAuthHeading ms-2">
          Change <span>Password</span>
        </div>
      </div>
      <Row className="w-100">
        <Col lg={24} md={24} sm={24}>
          <Form
            className="formControl"
            {...layout}
            form={form}
            name="email_password_form"
            onFinish={onFinish}
            layout="vertical"
            // onFinishFailed={onFinishFailed}
            initialValues={{ remember: true }}
            style={{ maxWidth: "600px", margin: "auto" }}
          >
            <Form.Item
              className="formControlDesign"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters, include one uppercase, one lowercase, one number, and one special character.",
                },
              ]}
            >
              <Input.Password
                value={password}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={handlePasswordChange}
                placeholder="Enter password"
                className="border-none-input"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="btn btn-primary w-100 mt-3"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePasswordForm;
