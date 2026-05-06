import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import CustomPhoneNumber from "../../components/Comman/CustomPhoneNumber/CustomPhoneNumber";
import { useDispatch } from "react-redux";
import { createMerchant } from "../../actions/admin";
import { useNavigate } from "react-router-dom";
import edit from "../../assets/img/edit.png";
import dummyUserImage from "../../images/user/userProfile.jpg";
import businessLogo from "../../assets/img/business.png";
import { categories, validateCRNumber, validateNoSpaces, validateSaudiIBAN, validateSaudiVAT, validateUnifiedNumber, validateWebsite } from "../../utils/constants";
import { UploadOutlined } from "@ant-design/icons";
import AddressAutocomplete from "../../utils/snippets/Addressdetail";
import BusinessAddressAutocomplete from "../../utils/snippets/BusinessAddressDetail";


const CreateMerchant = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string>(); // State for the displayed image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const [crCertificate, setCrCertificate] = useState(null);
  const [bankCertificate, setBankCertificate] = useState(null);
  const [vatCertificate, setVatCertificate] = useState(null);
  const [delegationLetter, setDelegationLetter] = useState(null);
  const [form] = Form.useForm();

  const handleUpload = (file: any) => {
    handleImageChange(file);
    return false; // Prevent automatic upload
  };

  useEffect(() => {
    document.title = "Create Merchant | Snbla";
  }, []);

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

     formData.append("firstName", values.firstName || "");
     formData.append("lastName", values.lastName || "");
     formData.append("businessName", values.businessName || "");
     formData.append("businessAddress", values.businessAddress || "");
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
     formData.append("category", values.category || "");
     formData.append("businessEmail", values.businessEmail || "");
     formData.append("bankCertificate", bankCertificate);
     formData.append("crCertificate", crCertificate);
     formData.append("delegationLetter", delegationLetter);
     formData.append("vatCertificate", vatCertificate);


    // Append the image file if it's updated
    if (imageFile) {
      formData.append("logo", imageFile);
    }


    // Set submitting state to true when API is called
    setIsSubmitting(true);
    // console.log("submitting", isSubmitting)
    values.defaultTabKey = "3"
    // dispatch(createMerchantSuccess(values))

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }


    // Dispatch the createMerchant API action
    dispatch(
      createMerchant(formData, (response: any) => {
        setIsSubmitting(false); // Set submitting state back to false after API response
        if (response.status === 200 || response.status === 201) {
          const { data } = response
          console.log("resp", response.data);
          

          const merchantData = {
            merchant: {
              id: data?.id,
              brandLogo: data?.brandLogo,
              businessName: data?.businessName,
              commercialRegistrationNumber: data?.commercialRegistrationNumber,
              description: data?.description,
              website: data?.website,
              email: data?.email,
              roleId: data?.roleId,
              name: data?.name,
              firstName: data?.firstName,
              lastName: data?.lastName,
              mobileNumber: data?.mobileNumber,
              profilePhoto: data?.profilePhoto,
              createdAt: data?.createdAt,
              merchantKey: data?.merchantKey,
              whichBestDescribesYou: data?.whichBestDescribesYou,
              ibanNumber: data?.ibanNumber,
              unifiedNumber: data?.unifiedNumber,
              vatNumber: data?.vatNumber,
              businessEmail: data?.businessEmail,
              category: data?.category,
              businessAddress: data?.businessAddress,
              plan: {
                id: null,
                merchantId: null,
                pageTitle: null,
                demoVideo: null,
                everyTimeDeposit: null,
                everyDepositEarn: null,
                promoPicture: null,
                thumbNailImage: null,
                offerEarning: null,
                category: null,
                groupBy: null
              }
            }
          };

          // navigate("/admin/merchants");
          navigate("/admin/merchant/details", { state: { merchantData, tab: "5" } });
          localStorage.setItem("merchantId", data?.id);
          localStorage.setItem("mobileNumber", data?.mobileNumber);

        } else {
          console.error("Failed to create Merchant and User:", response);
        }
      })
    );
  };

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
        <h2 className="text-3xl font-bold text-left ms-2">Create Merchant</h2>
      </div>

      <Form
        layout="vertical"
        className="form-wrapper"
        form={form}
        requiredMark={false} // 👈 This will hide the required asterisk (*)
        onFinish={handleSubmit}
        initialValues={{
          firstName: "",
          lastName: "",
          businessName: "",
          businessEmail: "",
          mobileNumber: "",
          description: "",
          category: "",
          isAdmin: "true",
          isActive: "true",
          website: "",
          commercialRegistrationNumber: "",
          whichBestDescribesYou: "yes",
          ibanNumber: "",
          unifiedNumber: "",
          vatNumber: "",
          businessAddress: "",
          bankCertificate: "",
          crCertificate: "",
          delegationLetter: "",
          vatCertificate: "",
          logo: "", // Image file
        }}
      >
        <div className="row">
          <div className="uploadprofileimg">
            <div className="relative">
              <Upload
                showUploadList={false}
                beforeUpload={handleUpload}
                accept=".jpeg, .jpg, .png"
              >
                <div className="relative cursor-pointer">
                  {/* Avatar Image */}
                  <img
                    src={uploadedImage || businessLogo}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    style={{
                      width: "120px",
                      height: "120px",
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

            <div className="textsides">
              <h6>Brand Logo</h6>
            </div>
          </div>
        </div>

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
              { validator: validateNoSpaces },
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
            label="Email"
            name="businessEmail"
            //  rules={[{ required: true, message: "Please input the email!" }, { validator: validateNoSpaces }]}
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
              { validator: validateNoSpaces },
            ]}
            normalize={(value) => value?.toLowerCase()} // Ensures lowercase
          >
            <Input placeholder="Enter Your Email" />
          </Form.Item>
          <CustomPhoneNumber
            isRequired={true}
            label="Phone Number"
            name="mobileNumber"
          />
          {/* </div> */}
        </div>
        <hr className="bg_grey h-[1px] my-4 border-0" />

        <h2 className="text-lg font-medium mb-4">Business Details</h2>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Business Name"
              name="businessName"
              rules={[
                { required: true, message: "Please input the Business name!" },
                { validator: validateNoSpaces },
              ]}
            >
              <Input
                type="text"
                maxLength={50}
                placeholder="Enter Your Business Name"
              />
            </Form.Item>
          </div>
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Business Address"
              name="businessAddress"
              rules={[
                {
                  required: true,
                  message: "Please input the Business Address!",
                },
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
              label="Business Website"
              name="website"
              rules={[
                { required: true, message: "Please input the website!" },
                { validator: validateWebsite },
              ]}
            >
              <Input type="url" placeholder="Enter Your Website" />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Description"
              name="description"
            >
              <Input maxLength={200} placeholder="Enter Description" />
            </Form.Item>
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
              placeholder="Enter your Commercial Registration Number"
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
            // rules={[{ required: true, validator: validateSaudiVAT }]}
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
            // rules={[{ required: true, message: "Please upload the CR certificate!" }]}
          >
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              accept=".jpeg, .jpg, .png, .pdf"
              onChange={(info) => handleFileChange(info, setCrCertificate)}
              onRemove={() => setCrCertificate(null)}
            >
              <Button icon={<UploadOutlined />}> Upload Cr Certificate</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            className="formControlDesign"
            label="Bank Certificate"
            name="bankCertificate"
            // rules={[{ required: true, message: "Please upload the bank certificate!" }]}
          >
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              accept=".jpeg, .jpg, .png, .pdf"
              onChange={(info) => handleFileChange(info, setBankCertificate)}
              onRemove={() => setBankCertificate(null)}
            >
              <Button icon={<UploadOutlined />}>
                {" "}
                Upload Bank Certificate
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            className="formControlDesign"
            label="VAT Certificate"
            name="vatCertificate"
            //  rules={[{ required: true, message: "Please upload the VAT certificate!" }]}
          >
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              accept=".jpeg, .jpg, .png, .pdf"
              onChange={(info) => handleFileChange(info, setVatCertificate)}
              onRemove={() => setVatCertificate(null)}
            >
              <Button icon={<UploadOutlined />}> Upload VAT Certificate</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            className="formControlDesign"
            label="Delegation Letter"
            name="delegationLetter"
            // rules={[{ required: true, message: "Please upload the delegation letter!" }]}
          >
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              accept=".jpeg, .jpg, .png, .pdf"
              onChange={(info) => handleFileChange(info, setDelegationLetter)}
              onRemove={() => setDelegationLetter(null)}
            >
              <Button icon={<UploadOutlined />}>
                Upload Delegation Letter
              </Button>
            </Upload>
          </Form.Item>
        </div>

        <div className="col-lg-12 mt-15">
          <div className="btn-groups-Forms text-end">
            <Button
              className="btn btn-outline-primary"
              onClick={() => {
                navigate(-1);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-primary"
              htmlType="submit"
              loading={isSubmitting}
            >
              Create
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateMerchant;
