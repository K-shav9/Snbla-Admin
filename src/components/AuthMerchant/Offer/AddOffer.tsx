import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createPlan, updatePlan } from "../../../actions/merchant";

export const AddOffer = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();
  const planData = location.state?.planData || {}; // Access planId from state
  const user = useSelector((state: any) => state?.Auth);
  const [form] = Form.useForm();
  const [promoPicture, setPromoPicture] = useState(null);
  const [demoVideo, setDemoVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button

  const planId = planData?.id;

  useEffect(() => {
    document.title = planData ? "Edit Offer | Snbla" : "Add Offer | Snbla";

    if (planData) {
      form.setFieldsValue({
        pageTitle: planData?.pageTitle,
        offerEarning: planData?.offerEarning,
        offOnRecurring: planData?.offOnRecurring,
        category: planData?.category,
        groupBy: planData?.groupBy,
      });
      // Set the initial file data for the file upload fields
      setPromoPicture(planData?.promoPicture || null);
      setThumbnail(planData?.thumbNailImage || null);
      setDemoVideo(planData?.demoVideo || null);
    } else {
      // If there's no planData, set default values for a new offer
      form.setFieldsValue({
        pageTitle: "",
        offerEarning: "",
        offOnRecurring: "",
        category: "", // Default to "Other"
        groupBy: "", // Default to "Discount"
      });
    }
  }, [planData, form]);

  const handleFileChange = (info, setFile) => {
    if (info.file) {
      setFile(info.file);
    }
  };

  const merchantId = user?.user?.data?.merchant?.id;

  const handleSubmit = (values: any) => {
    const formData = new FormData();
    formData.append("pageTitle", values.pageTitle);
    formData.append("offerEarning", values.offerEarning);
    formData.append("promoPicture", promoPicture);
    formData.append("thumbNail", thumbnail);
    formData.append("demoVideo", demoVideo);
    formData.append("category", values.category || "");
    formData.append("groupBy", values.groupBy || "");

    if (merchantId) {
      formData.append("merchantId", merchantId);
    } else {
      message.error("Merchant ID is missing");
      return;
    }

    setIsSubmitting(true);

    if (planId) {
      // If it's an edit, update the plan
      dispatch(
        updatePlan(formData, planId, (response: any) => {
          setIsSubmitting(false);
          if (response.status === 200 || response.status === 201) {
            navigate("/merchant/offers");
          } else {
            message.error("Failed to update plan.");
          }
        })
      );
    } else {
      // If it's a new offer, create the plan
      dispatch(
        createPlan(formData, (response: any) => {
          setIsSubmitting(false);
          if (response.status === 200 || response.status === 201) {
            navigate("/merchant/offers");
          } else {
            message.error("Failed to create plan.");
          }
        })
      );
    }
  };

  return (
    <div className="container mt-5">
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
        <h2 className="text-3xl font-bold text-left ms-2">
          {planId ? "Edit Offer" : "Add Offer"}
        </h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="form-wrapper"
        onFinish={handleSubmit}
        initialValues={{
          pageTitle: "",
          offerEarning: "",
          offOnRecurring: "",
          price: "",
          demoVideo: "",
          groupBy: "",
          category: "",
        }}
      >
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select the category",
                },
              ]}
            >
              <Select placeholder="Select category">
                <Select.Option value="education">Education</Select.Option>
                <Select.Option value="home_furniture">
                  Home & Furniture
                </Select.Option>
                <Select.Option value="travel">Travel & Hotel</Select.Option>
                <Select.Option value="health_wellness">
                  Health & Wellness
                </Select.Option>
                <Select.Option value="jewelry">Jewelry</Select.Option>
                <Select.Option value="auto">Automotive</Select.Option>
                <Select.Option value="toys_electronics">
                  Toys & Electronics
                </Select.Option>
                <Select.Option value="fashion_apparel">
                  Fashion & Apparel
                </Select.Option>
                <Select.Option value="fitness">Fitness</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Offer Name"
              name="pageTitle"
              rules={[
                { required: true, message: "Please enter the page title" },
              ]}
            >
              <Input placeholder="Enter offer name" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Type"
              name="groupBy"
              rules={[
                {
                  required: true,
                  message: "Please select the groupBy",
                },
              ]}
            >
              <Select placeholder="Select groupBy">
                <Select.Option value="discount" disabled>
                  Discount
                </Select.Option>
                <Select.Option value="cashback">Cashback</Select.Option>
                <Select.Option value="reward" disabled>
                  Reward
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Cashback"
              name="offerEarning"
              rules={[
                { required: true, message: "Please enter the cashback offer" },
                {
                  validator: (_, value) => {
                    if ((value && value > 100) || value < 0) {
                      return Promise.reject(
                        new Error("Percentage must be between 0 and 100%")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Enter cashback offer" type="number" />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12" style={{ maxWidth: "580px" }}>
            <Form.Item
              label="Promo Picture"
              className="formControlDesign"
              name="promoPicture" // Add a name property for proper form binding
              rules={[
                {
                  required: !promoPicture && !planData?.promoPicture, // Only required if no promoPicture is selected or present in planData
                  message: "Promo Picture is required",
                },
              ]}
            >
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                accept=".jpeg, .jpg, .png"
                onChange={(info) => handleFileChange(info, setPromoPicture)}
              >
                <Button icon={<UploadOutlined />}>Upload Promo Picture</Button>
              </Upload>
            </Form.Item>
            {typeof promoPicture === "string" &&
              planData &&
              planData.promoPicture && (
                <a
                  href={planData?.promoPicture}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#1890ff",
                    marginTop: "-6px",
                    marginBottom: "1rem",
                  }}
                >
                  {" "}
                  Previous Promo Picture
                </a>
              )}
          </div>

          <div className="col-lg-6 col-sm-12" style={{ maxWidth: "500px" }}>
            <Form.Item
              label="ThumbNail"
              className="formControlDesign"
              name="thumbNail" // Add a name property for proper form binding
              rules={[
                {
                  required: !thumbnail && !planData?.thumbNailImage, // Only required if no thumbNailImage is selected or present in planData
                  message: "Thumb Nail is required",
                },
              ]}
            >
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                accept=".jpeg, .jpg, .png"
                onChange={(info) => handleFileChange(info, setThumbnail)}
              >
                <Button icon={<UploadOutlined />}>Upload ThumbNail</Button>
              </Upload>
            </Form.Item>
            {typeof thumbnail === "string" &&
              planData &&
              planData?.thumbNailImage && (
                <a
                  href={planData?.thumbNailImage}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#1890ff",
                    marginTop: "-6px",
                    marginBottom: "1rem",
                  }}
                >
                  {" "}
                  Previous Thumbnail
                </a>
              )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12" style={{ maxWidth: "500px" }}>
            <Form.Item
              label="Demo Video"
              className="formControlDesign"
              name="demoVideo"
              rules={[
                {
                  required: !demoVideo && !planData?.plan?.demoVideoImage, // Only required if no demoVideo is selected or present in planData
                  message: "Video is required",
                },
              ]}
            >
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                accept=".mp4"
                onChange={(info) => handleFileChange(info, setDemoVideo)}
              >
                <Button icon={<UploadOutlined />}>Upload Demo Video</Button>
              </Upload>
            </Form.Item>
            {typeof demoVideo === "string" &&
              planData &&
              planData?.demoVideo && (
                <a
                  href={planData?.demoVideo}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#1890ff",
                    marginTop: "-6px",
                    marginBottom: "1rem",
                  }}
                >
                  {" "}
                  Previous Video
                </a>
              )}
          </div>
        </div>

        <div className="text-end mt-4">
          <Button
            className="btn btn-outline-primary me-2"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-primary"
            htmlType="submit"
            loading={isSubmitting}
          >
            {planId ? "Update" : "Create"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddOffer;
