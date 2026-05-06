import React, { useEffect, useState } from "react";
import homepageImage from "../../../assets/img/Homepage.png";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../actions/user";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { getUrlToken } from "../../../utils/url-hash-params";
import { useNavigate } from "react-router-dom";
import { useLanguagePicker } from "../../../hooks/useLanguagePicker";

const MerchantResetPassword: React.FC = () => {
  const dispatch: any = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const token = getUrlToken(location?.search);

  useEffect(() => {
    document.title = "Reset Password | Snbla";
  }, []);

  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (values: { email: string }) => {
    const payload = {
      password,
    };

    dispatch(
      changePassword(
        payload,
        (response: any) => {
          if (response.status === 200 || response.status === 201) {
            navigate("/login"); // Redirect on success
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
  const lang = useLanguagePicker();

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
              Change Your Password?
            </h1>
          </div>

          {/* Right Form Section */}
          <div className="flex justify-center md:mt-0 md:w-1/2 lg:justify-end">
            <div className="md:w-[440px] w-full tab:px-8 tab:py-12 px-4 py-6 bg-white rounded-[20px] border border-bordercolor">
              <h2 className="text-[32px] text-black text-center mb-6 font-semibold">
                Change Password
              </h2>

              <Form
                form={form}
                name="forgot_password_form"
                onFinish={handleFormSubmit}
                layout="vertical"
              >
                <Form.Item
                  className="formControlDesign"
                  label="Password"
                  name="password" // Add the name property here
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
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
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full mt-6 h-[44px] bg-[rgb(71,77,244)] text-white rounded-lg hover:bg-[rgb(59,63,202)]"
                  >
                    Submit
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

export default MerchantResetPassword;
