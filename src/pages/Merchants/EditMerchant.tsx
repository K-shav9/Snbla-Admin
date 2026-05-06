import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Row, Col, Select } from "antd";
import { useDispatch } from "react-redux";
import { updateMerchantDetails } from "../../actions/admin";
import { useLocation, useNavigate } from "react-router-dom";
import edit from "../../assets/img/edit.png";
import dummyUserImage from "../../images/user/userProfile.jpg";
import businessLogo from "../../assets/img/business.png";
import CustomPhoneNumber from "../../components/Comman/CustomPhoneNumber/CustomPhoneNumber";
import {
  categories,
  validateCRNumber,
  validateNoSpaces,
  validateSaudiIBAN,
  validateSaudiVAT,
  validateUnifiedNumber,
  validateWebsite,
} from "../../utils/constants";

import { UploadOutlined } from "@ant-design/icons";
import AddressAutocomplete from "../../utils/snippets/Addressdetail";
import BusinessAddressAutocomplete from "../../utils/snippets/BusinessAddressDetail";

interface EditMerchantProps {
  merchantData: any;
  fetchMerchantsList: any;
}

const EditMerchant: React.FC<EditMerchantProps> = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { merchantData } = location.state;
  const [uploadedImage, setUploadedImage] = useState<string>(); // State for the displayed image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const [crCertificate, setCrCertificate] = useState(null);
  const [bankCertificate, setBankCertificate] = useState(null);
  const [vatCertificate, setVatCertificate] = useState(null);
  const [delegationLetter, setDelegationLetter] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    document.title = "Edit Merchant | Snbla";
  }, []);

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

  const handleFileChange = (info, setFile) => {
    if (info.file) {
      setFile(info.file);
    }
  };

  const handleSubmit = (values: any) => {
    const formData = new FormData();

    // Extract merchant ID separately
    const merchantId = merchantData?.id;
    // Append form values to FormData
    // formData.append("fullName", values.fullName || "");
    formData.append("firstName", values.firstName || "");
    formData.append("lastName", values.lastName || "");
    formData.append("businessName", values.businessName || "");
    formData.append("description", values.description || "");
    formData.append("webUrl", values.website || "");
    formData.append(
      "whichBestDescribesYou",
      values.whichBestDescribesYou || ""
    );
    formData.append(
      "commercialRegistrationNumber",
      values.commercialRegistrationNumber || ""
    );
    formData.append("isActive", "true");
    formData.append("ibanNumber", values.ibanNumber || "");
    formData.append("unifiedNumber", values.unifiedNumber || "");
    formData.append("vatNumber", values.vatNumber || "");
    formData.append("mobileNumber", values.mobileNumber || "");
    formData.append("businessEmail", values.businessEmail || "");
    formData.append("businessAddress", values.businessAddress || "");
    if (typeof bankCertificate !== "string") formData.append("bankCertificate", bankCertificate);
    if (typeof crCertificate !== "string")
      formData.append("crCertificate", crCertificate);
    if (typeof delegationLetter !== "string")
      formData.append("delegationLetter", delegationLetter);
    if (typeof vatCertificate !== "string")
      formData.append("vatCertificate", vatCertificate);
    // Append the image file if it's updated
    if (imageFile) {
      formData.append("logo", imageFile);
    }

    // Log FormData for debugging
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    setIsSubmitting(true);

    // Dispatch the updateMerchantDetails API
    dispatch(
      updateMerchantDetails(formData, merchantId, (response: any) => {
        setIsSubmitting(false); // Set submitting state back to false after API response
        if (response.status === 200 || response.status === 201) {
          navigate("/admin/merchants");
        } else {
          // Handle failure (optional: add specific logic for errors)
          console.error(
            "Failed to update merchant details:",
            response?.message || "Unknown error"
          );
        }
      })
    );
  };
  const profilePhoto = merchantData?.merchant?.brandLogo;
  const { Option } = Select;

  return (
    <div className="w-full mt-5">
      <div className="d-flex align-items-center mb-6 mt-3">
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
        <h2 className="text-3xl font-bold text-left ms-2">Edit Merchant</h2>
      </div>
      <Form
        layout="vertical"
        form={form}
        className="form-wrapper"
        requiredMark={false} // 👈 This will hide the required asterisk (*)
        initialValues={{
          ...merchantData, // Spread the merchantData object
          fullName: merchantData?.name,
          businessName: merchantData?.merchant?.businessName,
          businessEmail: merchantData?.email,
          description: merchantData?.merchant?.description, // Ensure description is prefilled
          commercialRegistrationNumber:
            merchantData?.merchant?.commercialRegistrationNumber, // Ensure description is prefilled
          ibanNumber: merchantData?.merchant?.ibanNumber,
          unifiedNumber: merchantData?.merchant?.unifiedNumber,
          vatNumber: merchantData?.merchant?.vatNumber,
          mobileNumber: merchantData?.mobileNumber,
          brandLogo: merchantData?.merchant?.brandLogo || "",
          whichBestDescribesYou:
            merchantData?.merchant?.whichBestDescribesYou || "",
          website: merchantData?.merchant?.website || "",
          businessAddress: merchantData?.merchant?.businessAddress || "",
          category: merchantData?.merchant?.category || "",
        }}
        onFinish={handleSubmit}
      >
        <div className="row">
          <div className="uploadprofileimg">
            <div className="relative">
              <div className="textsides">
                <h6>Brand Logo</h6>
              </div>
              <Upload
                showUploadList={false}
                beforeUpload={handleUpload}
                accept="image/*"
              >
                <div className="relative cursor-pointer">
                  <img
                    src={uploadedImage || profilePhoto || businessLogo}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                    style={{
                      width: "120px",
                      height: "120px",
                    }}
                  />
                  <img
                    src={edit}
                    alt="Edit"
                    className="absolute left-0 right-0 bottom-[-12px] mx-auto cursor-pointer"
                    style={{ cursor: "pointer", width: "24px", height: "24px" }}
                  />
                </div>
              </Upload>
            </div>
          </div>
          {/* Contact Details Section */}
          <h2 className="text-lg font-medium mb-4">Contact Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* <Form.Item className="formControlDesign" label="Contact Name" name="fullName" rules={[{ required: true, message: "Please input the contact name!" }]}>
            <Input /> */}
            <Form.Item
              className="formControlDesign"
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input the first name!" },
                { validator: validateNoSpaces }, // Check for spaces
              ]}
            >
              <Input maxLength={25} placeholder="Enter Your First Name" />
            </Form.Item>
            <Form.Item
              className="formControlDesign"
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input the last name!" },
                { validator: validateNoSpaces },
              ]}
            >
              <Input maxLength={25} placeholder="Enter Your Last Name" />
            </Form.Item>
            <Form.Item
              className="formControlDesign"
              label="Business Email"
              name="businessEmail"
              rules={[
                { required: true, message: "Please input the business email!" },
                { validator: validateNoSpaces },
              ]}
            >
              <Input placeholder="Enter Your Business Email" />
            </Form.Item>
            {/* <Form.Item className="formControlDesign" label="Mobile Number" name="mobileNumber" rules={[{ required: true, message: "Please input the mobile number!" }]}>
            <Input />
          </Form.Item> */}
            {/* <div className="col-lg-6 col-sm-12"> */}
            <CustomPhoneNumber
              isRequired={true}
              label="Business Number"
              name="mobileNumber"
            />
            {/* </div> */}
          </div>

          <hr className="bg_grey h-[1px] my-4 border-0" />

          {/* Business Details Section */}
          <h2 className="text-lg font-medium mb-4">Business Details</h2>

          <div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <Form.Item
                  className="formControlDesign"
                  label="Business Name"
                  name="businessName"
                  rules={[
                    {
                      required: true,
                      message: "Please input the business name!",
                    },
                    { validator: validateNoSpaces },
                  ]}
                >
                  <Input
                    maxLength={50}
                    placeholder="Enter Your Business Name"
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6 col-sm-12">
                <Form.Item
                  className="formControlDesign"
                  label="Business Website"
                  name="website"
                  rules={[
                    { required: true, message: "Please input the website!" },
                    { validator: validateWebsite },
                  ]}
                >
                  <Input type="url" placeholder="Enter Your Business Website" />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <Form.Item
                  className="formControlDesign"
                  label="Industry"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please select the industry",
                    },
                  ]}
                >
                  <Select placeholder="Select Industry">
                    <Option value="">Select Industry</Option>
                    {categories.map((category, index) => (
                      <Option key={index} value={category.value}>
                        {category.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="col-lg-6 col-sm-12">
                <Form.Item
                  className="formControlDesign"
                  label="Business Address"
                  name="businessAddress"
                  rules={[
                    { required: true, message: "Please input the address!" },
                    { validator: validateNoSpaces },
                  ]}
                >
                  <BusinessAddressAutocomplete
                    value={form.getFieldValue("businessAddress")} // ✅ Pass form's address value
                    onBusinessAddressSelect={(value) =>
                      form.setFieldsValue({ businessAddress: value })
                    } // ✅ Update form on selection
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <Form.Item
                className="formControlDesign"
                label="Description"
                name="description"
              >
                <Input maxLength={200} placeholder="Enter Your Description" />
              </Form.Item>
            </div>
          </div>
        </div>

        <hr className="bg_grey h-[1px] my-4 border-0" />

        {/* KYB Section */}
        <h2 className="text-lg font-medium mb-4">KYB Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item
            className="formControlDesign"
            label="Commercial Registration Number"
            name="commercialRegistrationNumber"
            rules={[{ required: true, validator: validateCRNumber }]}
          >
            <Input
              maxLength={10}
              placeholder="Enter Your Commercial Registration Number"
            />
          </Form.Item>

          <Form.Item
            className="formControlDesign"
            label="IBAN Number"
            name="ibanNumber"
            rules={[{ required: true, validator: validateSaudiIBAN }]}
          >
            <Input maxLength={24} placeholder="Enter Your IBAN Number" />
          </Form.Item>

          <Form.Item
            className="formControlDesign"
            label="Unified Number"
            name="unifiedNumber"
            // rules={[{ required: true, validator: validateUnifiedNumber }]}
          >
            <Input maxLength={15} placeholder="Enter Your Unified Number" />
          </Form.Item>

          <Form.Item
            className="formControlDesign"
            label="VAT Number"
            name="vatNumber"
            // rules={[{ validator: validateSaudiVAT }]}
          >
            <Input maxLength={15} placeholder="Enter Your VAT Number" />
          </Form.Item>
        </div>

        <hr className="bg_grey h-[1px] my-4 border-0" />

        {/* Documents Section */}
        <h2 className="text-lg font-medium mb-4">Documents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item
            className="formControlDesign"
            label="CR Certificate"
            name="crCertificate"
            rules={[
              { required: false, message: "Please upload the CR certificate!" },
            ]}
          >
            {/* <Upload>
              <Button>Upload CR Certificate</Button>
            </Upload> */}
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              // accept=".jpeg, .jpg, .png"
              onChange={(info) => handleFileChange(info, setCrCertificate)}
            >
              <Button icon={<UploadOutlined />}> Upload Cr Certificate</Button>
            </Upload>
            {merchantData.merchant?.crCertificate && (
              <a
                href={merchantData?.merchant?.crCertificate}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#1890ff",
                  marginTop: "0px",
                  marginBottom: "0rem",
                }}
              >
                View CR Certificate
              </a>
            )}
          </Form.Item>
          <Form.Item
            className="formControlDesign"
            label="Bank Certificate"
            name="bankCertificate"
            rules={[
              {
                required: false,
                message: "Please upload the bank certificate!",
              },
            ]}
          >
            {/* <Upload>
              <Button>Upload Bank Certificate</Button>
            </Upload> */}
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              // accept=".jpeg, .jpg, .png"
              onChange={(info) => handleFileChange(info, setBankCertificate)}
            >
              <Button icon={<UploadOutlined />}>
                {" "}
                Upload Bank Certificate
              </Button>
            </Upload>
            {merchantData.merchant?.bankCertificate && (
              <a
                href={merchantData?.merchant?.bankCertificate}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#1890ff",
                  marginTop: "0px",
                  marginBottom: "0rem",
                }}
              >
                View Bank Certificate
              </a>
            )}
          </Form.Item>
          <Form.Item
            className="formControlDesign"
            label="VAT Certificate"
            name="vatCertificate"
            rules={[
              {
                required: false,
                message: "Please upload the VAT certificate!",
              },
            ]}
          >
            {/* <Upload>
              <Button>Upload VAT Certificate</Button>
            </Upload> */}
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              // accept=".jpeg, .jpg, .png"
              onChange={(info) => handleFileChange(info, setVatCertificate)}
            >
              <Button icon={<UploadOutlined />}> Upload VAT Certificate</Button>
            </Upload>
            {merchantData?.merchant?.vatCertificate && (
              <a
                href={merchantData?.merchant?.vatCertificate}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#1890ff",
                  marginTop: "0px",
                  marginBottom: "0rem",
                }}
              >
                View Vat Certificate
              </a>
            )}
          </Form.Item>
          <Form.Item
            className="formControlDesign"
            label="Delegation Letter"
            name="delegationLetter"
            rules={[
              {
                required: false,
                message: "Please upload the delegation letter!",
              },
            ]}
          >
            {/* <Upload>
              <Button>Upload Delegation Letter</Button>
            </Upload> */}
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              // accept=".jpeg, .jpg, .png"
              onChange={(info) => handleFileChange(info, setDelegationLetter)}
            >
              <Button icon={<UploadOutlined />}>
                Upload Delegation Letter
              </Button>
            </Upload>
            {merchantData?.merchant?.delegationLetter && (
              <a
                href={merchantData?.merchant?.delegationLetter}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#1890ff",
                  marginTop: "0px",
                  marginBottom: "0rem",
                }}
              >
                View Delegation Letter
              </a>
            )}
          </Form.Item>
        </div>

        <div className="col-span-full mt-6 text-right">
          <Button
            className="btn btn-outline-primary"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-primary no-hover ml-4"
            htmlType="submit"
            loading={isSubmitting}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditMerchant;
