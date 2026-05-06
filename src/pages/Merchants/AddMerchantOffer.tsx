import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Select, Tooltip } from "antd";
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createPlan, updatePlan } from "../../actions/merchant";
import NumberInputWithControls from "../../components/Comman/NumberInputWithControls";

export const AddMerchantOffer = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state?.Auth);
  const [form] = Form.useForm();
  const [promoPicture, setPromoPicture] = useState(null);
  const [demoVideo, setDemoVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const location = useLocation();
  const { merchantData, planData } = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button

  const planId = planData?.plan?.id;

  useEffect(() => {
    document.title = planData ? "Edit Offer | Snbla" : "Add Offer | Snbla";

    if (planData?.plan) {
      form.setFieldsValue({
        pageTitle: planData?.plan?.pageTitle,
        offerEarning: planData?.plan?.offerEarning,
        offOnRecurring: planData?.plan?.offOnRecurring,
        category: planData?.plan?.category,
        groupBy: planData?.plan?.groupBy,
      });
      // Set the initial file data for the file upload fields
      setPromoPicture(planData?.plan?.promoPicture || null);
      setThumbnail(planData?.plan?.thumbNailImage || null);
      setDemoVideo(planData?.plan?.demoVideo || null);
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

  const merchantId =
    planId ?? merchantData?.id ?? localStorage.getItem("merchantId");

  const planMerchantId = localStorage.getItem("merchantId");

  const handleSubmit = (values: any) => {
    const formData = new FormData();
    formData.append("pageTitle", values.pageTitle);
    formData.append("offerEarning", values.offerEarning);

    if (typeof promoPicture !== "string") formData.append("promoPicture", promoPicture);
    if (typeof thumbnail !== "string") formData.append("thumbNail", thumbnail);
    if (typeof demoVideo !== "string") formData.append("demoVideo", demoVideo);
    // formData.append("category", values.category || "");
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
          if ([200, 201].includes(response.status)) {
            const {
              plan,
              merchantId,
              pageTitle,
              demoVideo,
              everyTimeDeposit,
              everyDepositEarn,
              promoPicture,
              thumbNailImage,
              offerEarning,
              category,
              groupBy,
              id,
            } = response?.data;

            const updatedMerchantData = {
              ...merchantData,
              merchant: {
                ...merchantData?.merchant,
                plan: {
                  id: id,
                  merchantId,
                  pageTitle,
                  demoVideo,
                  everyTimeDeposit,
                  everyDepositEarn,
                  promoPicture,
                  thumbNailImage,
                  offerEarning,
                  category,
                  groupBy,
                },
              },
            };

            navigate("/admin/merchant/details", {
              state: { merchantData: updatedMerchantData, tab: "5" },
            });
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
          // if (response.status === 200 || response.status === 201) {
          //   const updatedMerchantData = {
          //     ...merchantData,
          //     plan: response?.data?.plan
          //   };
          //   navigate("/admin/merchant/details", { state: { merchantData: updatedMerchantData, tab: "5" } });
          // }
          if ([200, 201].includes(response.status)) {
            const {
              plan,
              merchantId,
              pageTitle,
              demoVideo,
              everyTimeDeposit,
              everyDepositEarn,
              promoPicture,
              thumbNailImage,
              offerEarning,
              category,
              groupBy,
              id,
            } = response?.data;

            const updatedMerchantData = {
              ...merchantData,
              merchant: {
                ...merchantData?.merchant,
                plan: {
                  id: id,
                  merchantId,
                  pageTitle,
                  demoVideo,
                  everyTimeDeposit,
                  everyDepositEarn,
                  promoPicture,
                  thumbNailImage,
                  offerEarning,
                  category,
                  groupBy,
                },
              },
            };

            navigate("/admin/merchant/details", {
              state: { merchantData: updatedMerchantData, tab: "5" },
            });
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
        requiredMark={false} // 👈 This will hide the required asterisk (*)
        className="form-wrapper"
        onFinish={handleSubmit}
        initialValues={{
          pageTitle: "",
          offerEarning: "",
          price: "",
          demoVideo: "",
          groupBy: "",
          category: "",
        }}
      >
        <div className="row">
          {/* <div className="col-lg-6 col-sm-12">
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
          </div> */}
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Offer Name"
              name="pageTitle"
              rules={[
                { required: true, message: "Please enter the page title" },
              ]}
            >
              <Input maxLength={50} placeholder="Enter offer name" />
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
                {/* <Select.Option value="reward" disabled>
                  Reward
                </Select.Option> */}
              </Select>
            </Form.Item>
          </div>
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Percentage"
              name="offerEarning"
              rules={[
                { required: true, message: "Please enter the cashback" },
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
              <NumberInputWithControls
                value={form.getFieldValue("offerEarning")}
                onChange={(val: any) =>
                  form.setFieldsValue({ offerEarning: val })
                }
                min={0}
                step={1}
                placeholder="Enter cashback offer"
                addonAfter="%"
              />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              label="Promo Picture"
              className="formControlDesign"
              name="promoPicture" // Add a name property for proper form binding
              rules={[
                {
                  required: !promoPicture && !planData?.plan?.promoPicture, // Only required if no promoPicture is selected or present in planData
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
                {/* Recommended Format & Dimensions */}
                <p
                  style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}
                >
                  Recommended formats: <strong>JPEG, JPG, PNG</strong> <br />
                  Recommended size: <strong>1200x600px</strong> (or 16:9 ratio)
                </p>
              </Upload>
            </Form.Item>
            {typeof promoPicture === "string" &&
              planData?.plan &&
              planData?.plan?.promoPicture && (
                <a
                  href={planData?.plan?.promoPicture}
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
                  View Promo Picture
                </a>
              )}
          </div>

          <div className="col-lg-6 col-sm-12">
            <Form.Item
              label="ThumbNail"
              className="formControlDesign"
              name="thumbNail" // Add a name property for proper form binding
              rules={[
                {
                  required: !thumbnail && !planData?.plan?.thumbNailImage, // Only required if no thumbNailImage is selected or present in planData
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
              planData?.plan &&
              planData?.plan?.thumbNailImage && (
                <a
                  href={planData?.plan?.thumbNailImage}
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
                  View Thumbnail
                </a>
              )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              label="Demo Video"
              className="formControlDesign"
              name="demoVideo"
              rules={[]}
            >
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                accept=".mp4"
                onChange={(info) => handleFileChange(info, setDemoVideo)}
              >
                <Button icon={<UploadOutlined />}>Upload Demo Video</Button>
                {/* Recommended Format & Dimensions */}
                <p
                  style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}
                >
                  Recommended format: <strong>MP4</strong> <br />
                  Recommended resolution: <strong>1920x1080px</strong> (Full HD){" "}
                  <br />
                  Maximum file size: <strong>50MB</strong>
                </p>
              </Upload>
            </Form.Item>

            {/* Show "View Video" link only if an existing video is available */}
            {typeof demoVideo === "string" &&
              planData?.plan &&
              planData?.plan?.demoVideo && (
                <a
                  href={planData?.plan?.demoVideo}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#1890ff",
                    marginTop: "10px",
                  }}
                >
                  View Video
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

export default AddMerchantOffer;
