import React, { useEffect, useState } from "react";
import homepageImage from "../../../assets/img/Homepage.png";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../actions/user";
import { useLanguagePicker } from "../../../hooks/useLanguagePicker";

const MerchantForgotPassword: React.FC = () => {
  const lang = useLanguagePicker();
  const dispatch: any = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const [form] = Form.useForm();

  useEffect(() => {
    document.title = "Forget-Password | Snbla";
  }, []);

  const handleFormSubmit = async (values: { email: string }) => {
    // Set submitting state to true when API is called
    setIsSubmitting(true);
    const payload = {
      email: values?.email,
    };

    dispatch(
      forgotPassword(payload, (resp: any) => {
        setIsSubmitting(false); // Set submitting state back to false after API response
        if (resp) {
          // navigate('/setup');
        }
      })
    );
  };

  return (
    <>
      <section
        className="relative bg-cover bg-no-repeat lg:pt-[160px] md:pt-secpadding pt-[80px] tab:pb-96 pb-40"
        style={{
          backgroundImage: `url(${homepageImage})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="container mx-auto 2xl:max-w-screen-xl flex md:flex-row flex-col md:items-center lg:gap-12 gap-6 sm:px-5 px-2">
          {/* Left Text Section */}
          <div
            className={`flex flex-col xl:gap-12 gap-4 ${
              lang === "ar" ? "lg:pl-10" : "lg:pr-10"
            } pr-0 md:w-1/2`}
          >
            <h1 className="mb-1 xl:text-[60px] lg:text-[40px] md:text-4xl text-2xl lg:font-extrabold font-bold xl:leading-[72px] lg:leading-[52px] text-black tracking-[-1px]">
              Forgot Your Password?
            </h1>
            <p className="text-sm text-black">
              Enter your registered email address and we will send you a link to
              reset your password.
            </p>
          </div>

          {/* Right Form Section */}
          <div className="flex justify-center md:mt-0 md:w-1/2 lg:justify-end">
            <div className="md:w-[440px] w-full tab:px-8 tab:py-12 px-4 py-6 bg-white rounded-[20px] border border-bordercolor">
              <h2 className="text-[32px] text-black text-center mb-6 font-semibold">
                Reset Password
              </h2>

              <Form
                form={form}
                name="forgot_password_form"
                onFinish={handleFormSubmit}
                layout="vertical"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    placeholder="Enter your registered email"
                    className="w-full px-2 py-2 h-[44px] text-black placeholder-[#686E7D] border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full mt-6 h-[44px] bg-[rgb(71,77,244)] text-white rounded-lg hover:bg-[rgb(59,63,202)]"
                    loading={isSubmitting}
                  >
                    Send Reset Link
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MerchantForgotPassword;
