import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Switch,
  Space,
  InputNumber,
} from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addPackage, updatePackage } from "../../actions/merchant"; // Assuming updatePackage is defined
import NumberInputWithControls from "../../components/Comman/NumberInputWithControls";
import riyal from "../../assets/img/riyal_icon.png";
import ReactDOMServer from "react-dom/server";
import {
  Bag2,
  Radar,
  Airplane,
  Car,
  Home,
  Briefcase,
  Monitor,
  ShoppingBag,
  Diamonds,
  Game,
  Heart,
} from "iconsax-react";

const iconOptions = [
  { value: "hotel", icon: Briefcase, name: "Briefcase" },
  { value: "luggage", icon: Bag2, name: "Bag2" },
  { value: "radar", icon: Radar, name: "Radar" },
  { value: "aeroPlane", icon: Airplane, name: "Airplane" },
  { value: "auto", icon: Car, name: "Car" },
  { value: "education", icon: Briefcase, name: "Briefcase" },
  { value: "electronics", icon: Monitor, name: "Monitor" },
  { value: "fashion", icon: ShoppingBag, name: "ShoppingBag" },
  { value: "home", icon: Home, name: "Home" },
  { value: "jewelery", icon: Diamonds, name: "Diamonds" },
  { value: "other", icon: Briefcase, name: "Briefcase" },
  { value: "toys", icon: Game, name: "Game" },
  { value: "wellness", icon: Heart, name: "Heart" },
];

export const AddMerchantPackage = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [icon, setIcon] = useState(null);
  const location = useLocation();
  const { merchantData, packageData } = location.state || {}; // Ensure packageData is fetched from location.state

  // Determine if this is an edit page or add page based on the presence of packageData.id
  const isEditMode = packageData && packageData.id;

  const packageMerchantId =
    localStorage.getItem("merchantId") || packageData?.merchant?.id;

  useEffect(() => {
    document.title = isEditMode
      ? "Edit Package cc | Snbla"
      : "Add Package cc | Snbla";

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

  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const [activeIcon, setActiveIcon] = useState(null);

  const handleFileChange = (info, setFile) => {
    if (info.file) {
      setFile(info.file);
    }
  };


const handleIconSelect = async (value) => {
  setActiveIcon(value);

  // Find the selected icon from the iconOptions array
  const selectedIcon = iconOptions.find((icon) => icon.value === value);

  if (!selectedIcon) {
    console.error("No icon found for:", value);
    return;
  }

  // ✅ Convert the React component to an SVG string
  const svgElement = React.createElement(selectedIcon.icon, {
    size: 50,
    color: "black",
  });

  const svgString = ReactDOMServer.renderToString(svgElement);

  // ✅ Create a Blob from the SVG string
  const blob = new Blob([svgString], { type: "image/svg+xml" });

  // ✅ Convert Blob to File (this makes it behave like an uploaded file)
  const fileName = `${selectedIcon.name}.svg`;
  const svgFile = new File([blob], fileName, { type: "image/svg+xml" });

  // ✅ Store in form (so it gets submitted with FormData)
  form.setFieldsValue({ icon: svgFile });
};

  const merchantId = merchantData;

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title || "");
    formData.append("totalAmount", values.totalAmount || "");
    formData.append("offerPercentage", values.offerPercentage || "");

    // Check if in edit mode and use packageData's merchantId if available
    const currentMerchantId = isEditMode
      ? packageData?.merchant?.id
      : packageMerchantId;
    if (currentMerchantId) {
      formData.append("merchantId", currentMerchantId);
    } else {
      message.error("Merchant ID is missing");
      return;
    }
     const iconFile = values.icon;

     if (iconFile && iconFile instanceof File) {
       console.log("Appending SVG file:", iconFile);
       formData.append("icon", iconFile, iconFile.name); // ✅ Append as binary
     } else {
       console.warn("No valid icon file found!");
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
      formData.append("merchantId", packageMerchantId); // Pass package ID to update
      dispatch(
        updatePackage(formData, packageId, (response: any) => {
          setIsSubmitting(false); // Set submitting state back to false after API response
          if (response.status === 200 || response.status === 201) {
            // navigate("/admin/merchants");

            navigate("/admin/merchant/details", {
              state: { tab: "5" },
            });
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
            navigate("/admin/merchant/details", {
              state: { tab: "5" },
            });
            // navigate("/admin/merchant/details", {
            //   state: { merchantData },
            // });
          } else {
            message.error("Failed to create package.");
          }
        })
      );
    }
  };

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
        requiredMark={false} // 👈 This will hide the required asterisk (*)
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
              rules={[
                { required: true, message: "Please enter the title" },
                { max: 80, message: "Title cannot exceed 80 characters" }, // Validation rule
              ]}
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
                    // if (value && (value < 0 || value > 100000)) {
                    //   return Promise.reject(
                    //     new Error("Amount must be between 0 and 100000 SAR")
                    //   );
                    // }
                    if (value && value?.toString()?.length > 6) {
                      return Promise.reject(
                        new Error("Amount cannot exceed 6 digits")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <NumberInputWithControls
                value={form.getFieldValue("totalAmount")}
                onChange={(val: any) => {
                  if (val?.toString()?.length <= 6) {
                    form.setFieldsValue({ totalAmount: val });
                  }
                }}
                min={0}
                max={100000} // Max value adjusted to allow up to 6 digits
                step={1}
                placeholder="Enter goal amount"
                addonAfter={
                  <img
                    src={riyal}
                    alt="SAR"
                    style={{ width: "10px", height: "15px" }}
                  />
                }
              />
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
              <NumberInputWithControls
                value={form.getFieldValue("offerPercentage") || 0} // Ensure default value
                onChange={(val: any) => {
                  if (val > 100) {
                    form.setFields([
                      {
                        name: "offerPercentage",
                        errors: ["Percentage must be between 0 and 100%"],
                      },
                    ]);
                  } else {
                    form.setFieldsValue({ offerPercentage: val });
                    form.validateFields(["offerPercentage"]);
                  }
                }}
                min={0}
                max={100}
                step={1}
                placeholder="Enter reward percentage"
                addonAfter="%"
              />
            </Form.Item>
          </div>

          <div className="col-lg-6 col-sm-12">
            <Form.Item
              label="Package Icon"
              className="formControlDesign"
              name="icon"
              rules={[{ required: true, message: "Package Icon is required" }]}
            >
              <div className="flex flex-wrap gap-4 items-center justify-start">
                {iconOptions?.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.value}
                      className={`relative cursor-pointer flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-200 
            ${activeIcon === item.value ? "border-black" : "border-transparent"}
          `}
                      onClick={() => handleIconSelect(item?.value)}
                    >
                      <IconComponent size="32" color="#555" />
                    </div>
                  );
                })}
              </div>
            </Form.Item>
          </div>
        </div>

        <div className="row"></div>

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

export default AddMerchantPackage;
