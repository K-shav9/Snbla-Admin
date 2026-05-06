import React, { useState } from "react";
// import { userRegister } from '../../actions';
import { Button, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../actions/user";
import { useDispatch } from "react-redux";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ForgotPasswordForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch: any = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    const payload = {
      email: values?.email,
    };
    // Set submitting state to true when API is called
    setIsSubmitting(true);

    dispatch(
      forgotPassword(payload, (resp: any) => {
        setIsSubmitting(false); // Set submitting state back to false after API response
        console.log("resp :::::::::::::", resp);
        if (resp) {
          // navigate('/setup');
        }
      })
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

        <div className="textAuthHeading ms-2">
          Forgot <span>Password</span>
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
            requiredMark={false} // 👈 This will hide the required asterisk (*)
            // onFinishFailed={onFinishFailed}
            initialValues={{ remember: true }}
            style={{ maxWidth: "600px", margin: "auto" }}
          >
            <Form.Item
              label="Email"
              className="formControlDesign"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>

            <Form.Item>
              <Button
                className="btn btn-primary w-100 mt-3"
                type="primary"
                loading={isSubmitting}
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

export default ForgotPasswordForm;
