import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select, Spin, Tooltip } from "antd";
import edit from "../../assets/img/edit.png";
import CustomPhoneNumber from "../../components/Comman/CustomPhoneNumber/CustomPhoneNumber";
import { useDispatch, useSelector } from "react-redux";
import {
  checkuser,
  updateAdminAndMerchantProfileDetails,
} from "../../actions/user";
import { useNavigate } from "react-router-dom";
import { updateMerchantKey } from "../../actions/merchant";
import { Upload } from "antd";
import userLogo from "../../assets/img/Avataaar.png";
import { gulfCountries } from "../../utils/constants";
import AddressAutocomplete from "../../utils/snippets/Addressdetail";

const Settings = () => {
  const [form] = Form.useForm();
  const user = useSelector((state: any) => state?.Auth);
  const [isKeyLoading, setIsKeyLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const [isKeySubmit, setIsKeySubmit] = useState(false); // Add state to manage loading button
  

  const { Option } = Select;

  let profileImage;
  if (user?.user?.data?.roleId === "2") {
    profileImage = user?.user?.data?.merchant?.brandLogo;
  } else {
    profileImage = user?.user?.data?.profilePhoto;
  }

  const [uploadedImage, setUploadedImage] = useState<string>(profileImage); // State for the displayed image
  const [imageFile, setImageFile] = useState<File | null>(null); // State for the uploaded file
  const { isLoading } = useSelector((state: any) => state.General);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Profile | Snbla";
  }, []);

  const fullName = user?.user?.data?.name;
  const firstName = user?.user?.data?.firstName || "";
  const lastName = user?.user?.data?.lastName || "";

  const initialValues = {
    name:
      fullName && fullName !== "undefined"
        ? fullName
        : `${firstName} ${lastName}`.trim() || "",
    // name: `${user?.user?.data?.firstName || ""} ${
    //   user?.user?.data?.lastName || ""
    // }`.trim(),
    email: user?.user?.data?.email || "",
    phoneNumber: user?.user?.data?.mobileNumber || "",
    city: user?.user?.data?.city || "",
    state: user?.user?.data?.state || "",
    country: user?.user?.data?.country || "",
    zipCode: user?.user?.data?.zipCode || "",
    address: user?.user?.data?.address || "",
    // deactivation: false,
  };

  const handleUpload = (file: any) => {
    handleImageChange(file);
    return false; // Prevent automatic upload
  };

  const handleImageChange = (file: File) => {
    const isValid = file.type.startsWith("image/");
    if (!isValid) {
      message.error("Please upload a valid image file!");
      return;
    }

    // Set the uploaded image
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (values: any) => {
       setIsSubmitting(true);

    const formData = new FormData();

    // Append non-empty form fields to FormData
    formData.append("name", values?.name || "");
    formData.append("phoneNumber", values?.phoneNumber || "");
    formData.append("state", values?.state || "");
    formData.append("city", values?.city || "");
    formData.append("country", values?.country || "");
    formData.append("zipCode", values?.zipCode || "");
    formData.append("address", values?.address || "");
    values?.email && formData.append("email", values?.email || "");

    // Append the image file to FormData if it exists
    if (imageFile) {
      formData.append("profilePhoto", imageFile);
    } else {
      console.error("No image file selected.");
    }

    // Dispatch your action to update the admin/merchant details
    dispatch(
      updateAdminAndMerchantProfileDetails(formData, (resp: any) => {
        setIsSubmitting(false);
        if (resp?.status === 200) {
          dispatch(
            checkuser((res: { status: number }) => {
              if (res?.status === 401) {
                localStorage.removeItem("token");
              } else {
                if (user?.user?.data?.roleId === 2) {
                  navigate("/merchant/settings");
                } else {
                  navigate("/dashboard/settings");
                }
              }
            })
          );
        }
      })
    );
  };

  const generateSecretKey = () => {
    setIsKeyLoading(true);
    const payload = {};
    dispatch(
      updateMerchantKey(payload, (resp: any) => {
        dispatch(
          checkuser((res: any) => {
            if (res?.status === 401) {
              localStorage.removeItem("token");
            }
            setIsKeyLoading(false);
          })
        );
      })
    );
  };

  useEffect(() => {
    dispatch(
      checkuser((res: any) => {
        if (res?.status === 401) {
          localStorage.removeItem("token");
        }
      })
    );
  }, []);

  const secretKey = user?.user?.data?.merchant?.secretKey;

  // Address selection function
  const handleAddressSelect = (selectedAddress: string) => {
    form.setFieldsValue({ address: selectedAddress }); // Auto-fill the form field
  };

  return (
    <div className="flex flex-col tab:gap-8 gap-4">
      <div className="flex items-center justify-between">
        <h1 className="tab:text-[28px] text-xl font-semibold text-black">
          Account Overview
        </h1>
      </div>

      {/* Profile Details */}
      <div className="bg-white p-6 rounded-2xl border border-[#E9EBF0] w-full">
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-lg font-medium text-black mb-3">
              Profile Details
            </h3>
            <div className="py-3 border-t pt-4 border-borderlight bg-white  tab:gap-8 gap-3 flex flex-wrap">
              <div className="lg:w-[256px] tab:w-[180px] w-full flex  justify-center">
                <div className="relative tab:py-10 py-4">
                  <Upload
                    showUploadList={false}
                    beforeUpload={handleUpload}
                    accept="image/*"
                  >
                    <div className="relative cursor-pointer">
                      {/* Avatar Image */}
                      <img
                        src={uploadedImage || profileImage || userLogo}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        style={{
                          borderRadius: "28px",
                          width: "160px",
                          height: "160px",
                          padding: "4px",
                          boxShadow:
                            "0px 1.75px 4px -1px rgba(15, 17, 20, 0.10)",
                        }}
                      />
                      {/* Edit Icon */}
                      <img
                        src={edit}
                        alt="Edit"
                        className="absolute left-0 right-0 bottom-[-12px] mx-auto cursor-pointer"
                        style={{
                          cursor: "pointer",
                          width: "24px",
                          height: "24px",
                        }}
                      />
                    </div>
                  </Upload>
                </div>
              </div>
              <Form
                form={form}
                name="settingsForm"
                layout="vertical"
                initialValues={initialValues}
                onFinish={handleSubmit}
                requiredMark={false} // 👈 This will hide the required asterisk (*)
                className="grid sm:grid-cols-2 grid-cols-1 tab:gap-6 gap-3 tab:pt-8 pt-0 lg:w-[calc(100%-290px)] tab:w-[calc(100%-220px)] w-full"
              >
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your full name",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your full name"
                    className="h-[44px] text-black placeholder-[#686E7D]"
                  />
                </Form.Item>
                <Form.Item
                  label="Business Email"
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
                  <Input
                    placeholder="name@business.com"
                    className="h-[44px] text-black placeholder-[#686E7D]"
                    disabled={user?.user?.data?.roleId !== 3}
                  />
                </Form.Item>
                <Form.Item name="phoneNumber">
                  <CustomPhoneNumber
                    isRequired={true}
                    isDisabled={user?.user?.data?.roleId === 3}
                    label="Mobile Number"
                    name="phoneNumber"
                  />
                </Form.Item>
                <Form.Item
                  label="ZipCode"
                  name="zipCode"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your zipcode",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your ZipCode"
                    className="h-[44px] text-black placeholder-[#686E7D]"
                  />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your address",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your Address"
                    className="h-[44px] text-black placeholder-[#686E7D]"
                  />
                  {/* <AddressAutocomplete onAddressSelect={handleAddressSelect} /> */}
                </Form.Item>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your city",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your city"
                    className="h-[44px] text-black placeholder-[#686E7D]"
                  />
                </Form.Item>
                <Form.Item
                  label="State"
                  name="state"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your state",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your State"
                    className="h-[44px] text-black placeholder-[#686E7D]"
                  />
                </Form.Item>
                <Form.Item
                  // className="formControlDesign"
                  className="h-[44px] text-black placeholder-[#686E7D]"
                  label="Country"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: "Please select the country",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Country"
                    style={{ height: "44px" }}
                  >
                    <Option value="">Select Country</Option>
                    {gulfCountries?.map((country, index) => (
                      <Option key={index} value={country?.value}>
                        {country?.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <div className="sm:col-span-2 flex justify-end gap-4 border-t pt-4 border-borderlight">
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
                    Save Changes
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          {/* Secret Key Management */}
          {user?.user?.data?.roleId === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-black mb-3">
                Secret Key Management
              </h2>
              <div className="py-4 bg-white border-y border-borderlight flex flex-wrap items-center gap-4">
                {!secretKey ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={generateSecretKey}
                    loading={isKeyLoading}
                  >
                    Generate Secret Key
                  </Button>
                ) : (
                  <div className="bg-gray-100 p-4 rounded-lg text-black w-full">
                    <span className="text-sm font-medium">Secret Key:</span>
                    <span className="text-base ml-5 font-semibold text-black">
                      {secretKey}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Deactivation */}
      <div className="bg-white p-6 rounded-2xl border border-[#E9EBF0] w-full">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-semibold text-black mb-3">
              Account Deactivation
            </h2>
            <div className="py-4 bg-white border-y border-borderlight gap-3 flex flex-wrap">
              <div className="py-5 px-4 rounded-xl bg-[#FEF3C7] flex gap-3 sm:flex-row flex-col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="min-w-[20px]"
                >
                  <path
                    d="M9.99967 5.4085L16.2747 16.2502H3.72467L9.99967 5.4085ZM9.99967 2.0835L0.833008 17.9168H19.1663L9.99967 2.0835Z"
                    fill="#86660E"
                  />
                  <path
                    d="M10.833 13.7502H9.16634V15.4168H10.833V13.7502Z"
                    fill="#86660E"
                  />
                  <path
                    d="M10.833 8.75016H9.16634V12.9168H10.833V8.75016Z"
                    fill="#86660E"
                  />
                </svg>
                <div className=" flex- flex-col gap-3">
                  <p className="text-sm text-[#86660E] font-medium">
                    You Are Deactivating Your Account
                  </p>
                  <p className="text-sm text-[#86660E]">
                    For extra security, your account will be deactivated and
                    your data will be retained at our servers for five years as
                    per SAMA and regulatory requirements. Any funds available on
                    your account will be withdrawn to your bank account. You can
                    regain access to your account via connecting our help center
                    and provide needed documents.
                  </p>
                  <a
                    href=""
                    className="text-blue text-sm font-medium mt-2 inline-block"
                  >
                    Learn more
                  </a>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="deactivation"
                  name="deactivation"
                  value="deactivation"
                  className="opacity-50 checked:opacity-100"
                />
                <label htmlFor="vehicle1" className="text-sm text-black !mb-0">
                  {" "}
                  I confirm my account deactivation
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-6 mt-4">
              {/* <Button
                type="primary"
                // onClick=
                className="bg-[#DC2626] border-[#DC2626]"
              >
                Deactivate Account
              </Button> */}
              <Button type="primary" htmlType="submit">
                Deactivate Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
