/* eslint-disable prefer-const */
import React, { useEffect, useState } from "react";
// import imagbtns from '../../images/brand/uploadimg.svg';
import dummyUserImage from "../../images/user/user.jpeg";
import Logo from "../../images/brand/Logo.svg";
import { Button, Form, Input, message, Spin, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import edit from "../../assets/img/edit.png";
import {
  checkuser,
  updateAdminAndMerchantProfileDetails,
} from "../../actions/user";
import userLogo from "../../images/user/userProfile.jpg";
import { Updateusename } from "./Updateusename";

export const Updateaccountdetails = () => {
  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: any) => state.General);
  const user = useSelector(
    (state: any) => state?.Auth?.user || state?.Auth?.data
  );
  const profilePhoto = user?.data?.profilePhoto;
  const [uploadedImage, setUploadedImage] = useState<string>(profilePhoto); // State for the displayed image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  

  useEffect(() => {
    document.title = "Profile | Snbla";
  }, []);

  const initialValues = {
    name: user?.data?.name || "",
    email: user?.data?.email || "",
    phoneNumber: user?.data?.mobileNumber || "",
    state: user?.data?.state || "",
    country: user?.data?.country || "",
    zipCode: user?.data?.zipCode || "",
    address: user?.data?.address || "",
  };


  const handleCancel = () => {
    navigate(-1);
  };

  //  const handleUpload = (file: any) => {
  //    handleImageChange(file);
  //    return false; // Prevent automatic upload
  //  };

  //  const handleImageChange = (file: File) => {
  //    const isValid = file.type.startsWith("image/");
  //    if (!isValid) {
  //      message.error("Please upload a valid image file!");
  //      return;
  //    }

  //    // Set the uploaded image
  //    setImageFile(file);
  //    const reader = new FileReader();
  //    reader.onload = () => {
  //      setUploadedImage(reader.result as string);
  //    };
  //    reader.readAsDataURL(file);
  //  };

  const onFinish = (values: any) => {
       setIsSubmitting(true);

    const formData = new FormData();

    // Append non-empty form fields to FormData
    formData.append("name", values?.name || "");
    // formData.append("address", values?.address || "");

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
                navigate("/admin/account/profile");
              }
            })
          );
        }
      })
    );
  };

  const onFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };



  return (
    <>
      <Form
        className="formControl"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        requiredMark={false} // 👈 This will hide the required asterisk (*)
        onFinishFailed={onFailed}
        initialValues={initialValues}
      >
        <div className="d-flex align-items-center mb-6 mt-3">
          <button
            onClick={() => {
              navigate("/admin/dashboard");
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
                stroke="blue"
                strokeWidth="0.8"
              />
              <path
                d="M14 8L10 12L14 16"
                stroke="blue"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>{" "}
          </button>
          <h2 className="text-3xl font-bold text-left ms-2">Profile</h2>
        </div>
        <div>
          <div className="uploadprofileimg">
            <div className="relative">
              <div className="relative cursor-pointer">
                {/* Avatar Image */}
                <img
                  src={uploadedImage || profilePhoto || Logo}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  style={{
                    width: "120px",
                    height: "120px",
                  }}
                />
                {/* Edit Icon */}
                {/* <img
                    src={edit}
                    alt="Edit"
                    className="absolute left-0 right-0 bottom-[-12px] mx-auto cursor-pointer"
                    style={{
                      cursor: "pointer",
                      width: "24px",
                      height: "24px",
                    }}
                  /> */}
              </div>
            </div>

            <div className="textsides">
              <h6>Snbla Logo</h6>
            </div>
          </div>
          <div className="row">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <Form.Item
                  className="formControlDesign"
                  label="Name "
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              <div className="col-lg-6 col-sm-12">
                <Form.Item
                  className="formControlDesign"
                  label="Email"
                  name="email"
                >
                  <Input disabled />
                </Form.Item>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-lg-6 col-sm-12">
                <Form.Item
                  className="formControlDesign"
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your address",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div> */}

            <div className="col-lg-12 mt-15">
              <div className="btn-groups-Forms text-end mr-7">
                <Button
                  className="btn btn-outline-primary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  className="btn btn-primary"
                  htmlType="submit"
                  loading={isSubmitting}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>

      <Updateusename />
    </>
  );
};
