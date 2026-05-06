import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addPackage, updatePackage } from "../../../actions/merchant";
import aeroPlane from "../../../images/logo/flight_takeoff.png";
import luggage from "../../../images/logo/luggage.png";
import radar from "../../../images/logo/radar.png";
import hotel from "../../../images/logo/Vector.png";

const iconOptions = [
  { value: hotel, img: hotel },
  { value: luggage, img: luggage },
  { value: radar, img: radar },
  { value: aeroPlane, img: aeroPlane },
];

export const AddPackage = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state?.Auth);
  const [form] = Form.useForm();
  const [icon, setIcon] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const location = useLocation();
  const { packageData } = location.state || {}; // Ensure packageData is fetched from location.state

  // Determine if this is an edit page or add page based on the presence of packageData.id
  const isEditMode = packageData && packageData.id;

  const packageMerchantId = packageData?.merchant?.id

  useEffect(() => {
    document.title = isEditMode
      ? "Edit Package | Snbla"
      : "Add Package | Snbla";

    if (isEditMode) {
      // Pre-populate the form with package data if editing
      form.setFieldsValue({
        title: packageData?.title || "",
        totalAmount: packageData?.totalAmount || "",
        offerPercentage: packageData?.offerPercentage || "",
        category: packageData?.category || "",
        recurringOff: packageData.recurringOff,
        merchantId: packageData?.merchant?.id,
      });
      setSelectedIcon(packageData?.icon || "");
      setIsRecurring(packageData?.isRecurring || false);
    }
  }, [isEditMode, packageData, form]);

  const handleFileChange = (info, setFile) => {
    if (info.file) {
      setFile(info.file);
    }
  };

  const handleIconSelect = (value) => {
    // Set selected icon by value instead of file object
    setSelectedIcon(value);

    // Convert the imported image into a blob
    fetch(value)
      .then((res) => res.blob())
      .then((blob) => {
        const fileName = `icon_${Date.now()}.png`;
        const file = new File([blob], fileName, { type: "image/png" });

        form.setFieldsValue({ icon: file }); // Update form state
      })
      .catch((error) => console.error("Error processing the image:", error));
  };

  const merchantId = user?.user?.data?.merchant?.id;

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title || "");
    formData.append("totalAmount", values.totalAmount || "");
    formData.append("offerPercentage", values.offerPercentage || "");

    // Check if in edit mode and use packageData's merchantId if available
    const currentMerchantId = isEditMode
      ? packageData?.merchant?.id
      : merchantId;
    if (currentMerchantId) {
      formData.append("merchantId", currentMerchantId);
    } else {
      message.error("Merchant ID is missing");
      return;
    }

    // Convert selectedIcon (URL) to File
    if (selectedIcon) {
      try {
        const response = await fetch(selectedIcon); // Fetch image URL
        const blob = await response.blob(); // Convert to blob
        const fileName = `icon_${Date.now()}.png`; // Set filename
        const file = new File([blob], fileName, { type: "image/png" });

        formData.append("icon", file, file.name); // Append file to formData
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    } else {
      console.warn("No icon selected!");
    }

    // If recurring, add recurringPaymentDate and isRecurring to formData
    if (isRecurring) {
      formData.append("isRecurring", "true"); // Add isRecurring field
      if (values.recurringOff) {
        formData.append("recurringOff", values.recurringOff); // Add recurringPaymentDate field
      }
    }

    // Set submitting state to true when API is called
    setIsSubmitting(true);

    const packageId = packageData && packageData.id;

    // Dispatch the API call: either add or update depending on mode
    if (isEditMode) {
      formData.append("id", packageData.id); // Pass package ID to update
      // formData.append("merchantId", packageMerchantId); // Pass package ID to update
      dispatch(
        updatePackage(formData, packageId, (response: any) => {
          setIsSubmitting(false); // Set submitting state back to false after API response
          if (response.status === 200 || response.status === 201) {
            navigate("/merchant/packages");
          } else {
            message.error("Failed to update package.");
          }
        })
      );
    } else {
      dispatch(
        addPackage(formData, (response: any) => {
          setIsSubmitting(false); // Set submitting state back to false after API response
          if (response.status === 200 || response.status === 201) {
            navigate("/merchant/packages");
          } else {
            message.error("Failed to create package.");
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
          {isEditMode ? "Edit Package" : "Add Package"}
        </h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="form-wrapper"
        onFinish={handleSubmit}
        initialValues={{
          title: "",
          totalAmount: "",
          offerPercentage: "",
          saveOnEveryDepo: "",
          category: "",
          icon: "",
        }}
      >
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input placeholder="Enter package title" />
            </Form.Item>
          </div>

          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Goal Amount"
              name="totalAmount"
              rules={[
                { required: true, message: "Please enter the goal amount" },
                {
                  validator: (_, value) => {
                    if (value && value < 0) {
                      return Promise.reject(
                        new Error("Amount must be greater than 0")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Enter goal amount" type="number" />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              className="formControlDesign"
              label="Reward Percentage"
              name="offerPercentage"
              rules={[
                {
                  required: true,
                  message: "Please enter the reward percentage",
                },
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
              <Input
                placeholder="Enter reward percentage"
                type="number"
                max={100}
              />
            </Form.Item>
          </div>
          <div
            className="col-lg-6 col-sm-12"
            style={{ display: "flex", alignItems: "center" }}
          >
            {/* Is Recurring Toggle */}
            <Form.Item
              label="Additional Discount Recurring"
              style={{ marginBottom: 0, marginRight: 10, minWidth: 100 }}
            >
              <Switch
                checked={isRecurring}
                onChange={(checked) => setIsRecurring(checked)}
              />
            </Form.Item>

            {/* Recurring Payment Date field */}
            {isRecurring && (
              <Form.Item
                className="formControlDesign mt-3"
                name="recurringOff"
                rules={[
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
                <Input
                  placeholder="Enter additional recurring discount"
                  type="number"
                />
              </Form.Item>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Form.Item
              label="Icon Package"
              className="formControlDesign"
              name="icon"
              rules={[{ required: true, message: "Package Icon is required" }]}
            >
              <div className="d-flex gap-3 align-items-center">
                {iconOptions.map((item) => (
                  <div
                    key={item.value}
                    className="position-relative cursor-pointer"
                    onClick={() => handleIconSelect(item.value)}
                  >
                    {/* Icon Image */}
                    <img
                      src={item.img}
                      style={{
                        width: 40,
                        height: 40,
                        border:
                          selectedIcon === item.value
                            ? "2px solid blue"
                            : "2px solid transparent",
                        borderRadius: "50%",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ))}
              </div>
            </Form.Item>
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
            {isEditMode ? "Update" : "Create"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddPackage;
