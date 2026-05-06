import React, { useState } from "react";
import homepageImage from "../../../assets/img/Homepage.png";
import Avatargroup from "../../../assets/img/Avatargroup.png";
import { Button, Form, Input } from "antd";
import CustomPhoneNumber from "../../Comman/CustomPhoneNumber/CustomPhoneNumber";
import { Link } from "react-router-dom";
import { useLanguagePicker } from "../../../hooks/useLanguagePicker";

interface AuthFormProps {
  formType: "signup" | "login";
  onSubmit: (payload: {
    fullName?: string;
    phoneNumber: string;
    otp?: string;
    email?: string;
    password?: string;
  }) => void;
  isSubmitting?: boolean;
  statsData?: any;
}

const AuthForm: React.FC<AuthFormProps> = ({
  formType,
  onSubmit,
  isSubmitting,
  statsData,
}) => {
  const lang = useLanguagePicker();
  const [form] = Form.useForm();
  // const [loginType, setLoginType] = useState("user");

  const handleFormSubmit = async (values: any) => {
    const payload = {
      // fullName: formType === "signup" ? values?.fullName : undefined,
      phoneNumber: values?.phoneNumber,
      otp: formType === "login" ? values?.otp : undefined,
      email: formType === "login" ? values?.email : undefined,
      password: formType === "login" ? values?.password : undefined,
    };
    onSubmit(payload);
  };

  return (
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
            {/* {formType === "signup"
              ? "The Savings Solution You’ve Been Waiting For!"
              : "Welcome Back!"} */}
            {/* {
              "The Savings Solution You’ve Been Waiting For!"
              } */}
            {formType === "signup"
              ? "The Savings Solution You’ve Been Waiting For!"
              : "Welcome to Merchant Login"}
          </h1>
          <div className="flex gap-4 items-center">
            {statsData?.users
              ?.slice(0, 1) // Get the first 3 users
              ?.map((user, index) => (
                <img
                  key={index}
                  src={user?.profilePhoto ? user?.profilePhoto : Avatargroup} // Use fallback
                  className="h-[40px]"
                  alt="User Avatar"
                />
              ))}
            <p className="text-sm">Join {statsData?.totalUsers} savers</p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="flex justify-center md:mt-0 md:w-1/2">
          <div className="md:w-[440px] w-full tab:px-8 tab:py-12 px-4 py-6 bg-white rounded-[20px] border border-bordercolor">
            {formType === "signup" ? (
              ""
            ) : (
              <div className="flex justify-between mb-8">
                {/* <Button
                  type={loginType === "user" ? "primary" : "default"}
                  onClick={() => setLoginType("user")}
                  className="w-1/2 mr-2"
                >
                  User Login
                </Button> */}
                {/* <Button
                  type={loginType === "merchant" ? "primary" : "default"}
                  onClick={() => setLoginType("merchant")}
                  className="w-1/2 ml-2 "
                >
                  Merchant Login
                </Button> */}
              </div>
            )}

            <h2 className="text-[32px] text-black text-center mb-6 leading-normal font-semibold">
              {formType === "signup"
                ? "Let’s get started "
                : "Login to your account"}
            </h2>
            {/* 
            {loginType === "user" ? (
              <p className="text-black text-center mb-6 font-medium">
                Your <span className="text-blue">savings journey</span> starts
                here!
              </p>
            ) : (
              <p></p>
            )} */}

            <Form
              form={form}
              name={`${formType}_form`}
              onFinish={handleFormSubmit}
              layout="vertical"
              initialValues={{ remember: true }}
            >
              {formType === "signup" ? (
                <>
                  {/* <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="eg. Abdullah Al Rajhi"
                      className="w-full px-2 py-2 h-[44px] text-black placeholder-[#686E7D] border rounded-lg shadow-shadow2 text-sm"
                    />
                  </Form.Item> */}

                  <CustomPhoneNumber
                    isRequired={true}
                    label="Mobile Number"
                    name="phoneNumber"
                  />
                </>
              ) : (
                <>
                  {/* {loginType === "user" && (
                    <CustomPhoneNumber
                      isRequired={true}
                      label="Mobile Number"
                      name="phoneNumber"
                    />
                  )} */}

                  {/* {loginType === "merchant" && ( */}
                  <>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Email"
                        className="w-full px-2 py-2 h-[44px] text-black placeholder-[#686E7D] border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Enter Password"
                        className="w-full px-2 py-2 h-[44px] text-black placeholder-[#686E7D] border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </Form.Item>

                    {/* Forgot Password Button */}
                    <div className="text-right mt-[-2px]">
                      <Link
                        to="/forgot-password"
                        className="text-blue-500 hover:text-blue hover:bg-transparent text-sm focus:outline-none"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </>
                  {/* )} */}
                </>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full mt-2 h-[44px] bg-[rgb(71,77,244)] text-white rounded-lg hover:bg-[rgb(59,63,202)]"
                  loading={isSubmitting}
                >
                  {/* {/* {formType === "signup"
                    ? "Register"
                    : loginType === "merchant"
                      ? "Log In as Merchant"
                      : "Log In as User"} */}
                  {/* {formType === "signup"
                    ? "Continue"
                    : 
                    "Log In as Merchant"}  */}
                  Continue{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9.99992 3.3335L8.82492 4.5085L13.4749 9.16683H3.33325V10.8335H13.4749L8.82492 15.4918L9.99992 16.6668L16.6666 10.0002L9.99992 3.3335Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </Form.Item>

              <p className="text-center text-xs text-[#4E5663] mt-6 px-5">
                By clicking &quot;Continue&quot; you agree to our
                <a
                  href="#"
                  className="text-xs text-[#4E5663] underline hover:text-blue"
                >
                  {" "}
                  {/* Code of Conduct */}
                </a>
                {/* , */}
                <Link
                  to="/terms-of-use"
                  className="text-xs text-[#4E5663] underline hover:text-blue"
                >
                  {" "}
                  Terms of Service
                </Link>
                , and
                <Link
                  to="/privacy-policy"
                  className="text-xs text-[#4E5663] underline hover:text-blue"
                >
                  {" "}
                  Privacy Policy
                </Link>
                .
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
