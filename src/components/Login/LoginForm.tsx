/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
// import { userRegister } from '../../actions';
import { Button, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../actions/admin";
// import {  message } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LoginFrom = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button

  const onFinish = async (values: any) => {
    // Set submitting state to true when API is called
    setIsSubmitting(true);
    const payload = {
      email: values?.email,
      password: values?.password,
      // role: 'admin',
    };

    dispatch(
      adminLogin(payload, (response) => {
        setIsSubmitting(false); // Set submitting state back to false after API response
        if (response.status === 200 || response.status === 201) {
          localStorage.setItem("token", JSON.stringify(response.token));
          navigate("/admin/dashboard");
        }
      })
    );

  };

  return (
    <div className="authforms">
      <div className="authHeadings">
        <button
          onClick={() => window.open(`${""}`, "_self")}
          className="btn textAuthHeading"
        ></button>

        <div className="textAuthHeading">
          Log <span>In</span>
        </div>
      </div>

      <div className="row w-100">
        <div className="col-12">
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
          >
            <Form.Item
              className="formControlDesign"
              label="Email"
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
              <Input autoComplete="new-email" />
            </Form.Item>

            <Form.Item
              className="formControlDesign passwordinputs mb-0"
              label="Password"
              name="password"
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
              <Input.Password autoComplete="new-password" />
            </Form.Item>
            <div className="">
              <Row
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <Col>
                  <Link to="/admin/forgot-password">
                    <Button
                      className="px-0"
                      style={{
                        color: "#474df4",
                        border: "none",
                        fontWeight: "bold",
                      }}
                    >
                      <u>Forgot Password</u>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>

            <Form.Item>
              <Button
                className="btn btn-primary mt-15 w-100 text-right"
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
