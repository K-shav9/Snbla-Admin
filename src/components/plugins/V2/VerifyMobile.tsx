import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, Row, Col, Button } from 'antd';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Form, message } from "antd";
import { loginUser, registerUser, resendOtp } from '../../../actions/user';

const VerifyMobile: React.FC = (): any => {
  // const location = useLocation();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button

  // const { phoneNumber, merchantPlan } = location?.state || {};
  // const { merchantPlan } = location?.state || {};
  const phoneNumber = localStorage.getItem("web-phoneNumber");
  const merchantId = localStorage.getItem("merchantId");

  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [form] = Form.useForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value.match(/^[0-9]$/)) {
      otp[index] = value;
      setOtp([...otp]);

      // Move to next input if filled
      if (index < otp.length - 1 && value) {
        const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace to go to the previous input and clear current value
    if (e.key === "Backspace") {
      if (!otp[index]) {
        const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
        prevInput?.focus();
      } else {
        otp[index] = "";
        setOtp([...otp]);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    const pastedText = e.clipboardData.getData("Text");
    if (pastedText.length === otp.length) {
      setOtp(pastedText.split(""));
    }
  };

  const handleSubmit = () => {
    // Set submitting state to true when API is called
    setIsSubmitting(true);
    if (otp.every((digit) => digit !== "")) {
      const otpCode = otp.join("");

      const values = {
        phoneNumber: phoneNumber,
        otp: otpCode,
        isPlugin: true,
        name: null,
        merchantId,
      };
      // navigate("#pick-goal", { state: { merchantPlan } });

      dispatch(
        registerUser(values, (response) => {
          setIsSubmitting(false); // Set submitting state back to false after API response
          // if (response.status === 200 || response.status === 201) {
          if (response.success === true) {
            localStorage.setItem("u_id", response?.data?.id);
            localStorage.removeItem("web-phoneNumber");

            console.log("response---", response)
            const { email, address } = response?.data
            if (!email || !address) {
              navigate("#basic-details", { replace: true });
            }
            else {
              navigate("#pick-goal", { replace: true });
            }


          } else {
            console.error(
              "Sign-up failed:",
              response.message || "Unknown error"
            );
          }
        })
      );
    } else {
      // Show validation error using Ant Design's message component
      message.error("Please fill all OTP fields.");
    }
  };

  const handleResendCode = (e: React.MouseEvent) => {
    e.preventDefault();
    const data = {
      phoneNumber,
    };

    // Dispatch resend OTP logic here
    dispatch(
      resendOtp(data, (response) => {
        if ([200, 201].includes(response.status)) {
          console.log("OTP resent successfully:", response);
        } else {
          console.error("Request OTP failed:", response.message || "Unknown error");
        }
      })
    );
  };

  return (
    <div className="plugin-body">
      <p className="verifcodetext">
        We have sent an SMS to <span>{phoneNumber}</span> with a verification
        code.
      </p>
      <Form form={form} onFinish={handleSubmit}>
        <div className="form-group">
          <div className="otp">
            <Row gutter={8}>
              {otp.map((_, index) => (
                <Col key={index}>
                  <Form.Item
                    name={`otp-${index}`}
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                      {
                        pattern: /^[0-9]$/, // Ensures only single-digit numbers (0-9)
                        message: "",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      id={`otp-${index}`}
                      value={otp[index]}
                      maxLength={1}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={(e) => handlePaste(e, index)}
                      style={{ width: "40px", textAlign: "center" }}
                      inputMode="numeric" // Ensures mobile devices show a numeric keyboard
                      pattern="[0-9]*" // Ensures only numbers are entered
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""); // Removes non-numeric characters
                      }}
                    />
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </div>

          <p className="resend">
            Do not receive a code?{" "}
            <button type="button" onClick={(e) => handleResendCode(e)}>
              Resend
            </button>
          </p>
        </div>
        <Button className="submitbtn" htmlType="submit" loading={isSubmitting}>
          Verify
        </Button>
      </Form>
      <p className="verify">
        By clicking Verify you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default VerifyMobile;