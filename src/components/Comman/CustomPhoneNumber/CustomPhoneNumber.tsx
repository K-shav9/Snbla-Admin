import React, { useState } from "react";
import { Form } from "antd";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLanguagePicker } from "../../../hooks/useLanguagePicker";
import { useTranslation } from "react-i18next";

interface PhoneNumberType {
  isRequired?: boolean;
  name?: string;
  label?: string;
  isDisabled?: boolean;
}

const CustomPhoneNumber = ({
  isDisabled = false,
  isRequired = false,
  name = "phone",
  label = "Phone Number",
}: PhoneNumberType) => {
  const [phone, setPhone] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("sa"); // Default to Saudi Arabia
  const { t } = useTranslation();
  const lang = useLanguagePicker();

  // Validation rules for different countries
  const countryValidationRules: {
    [key: string]: { pattern: RegExp; errorMessage: string };
  } = {
    sa: {
      pattern: /^5\d{8}$/,
      errorMessage:
        "Saudi Arabian phone numbers must start with 5 and be 9 digits long.",
    },
    ae: {
      pattern: /^5\d{8}$/,
      errorMessage: "UAE phone numbers must start with 5 and be 9 digits long.",
    },
    qa: {
      pattern: /^[23567]\d{7}$/,
      errorMessage:
        "Qatari phone numbers must start with 2, 3, 5, 6, or 7 and be 8 digits long.",
    },
    om: {
      pattern: /^[79]\d{7}$/,
      errorMessage:
        "Omani phone numbers must start with 7 or 9 and be 8 digits long.",
    },
    kw: {
      pattern: /^[569]\d{7}$/,
      errorMessage:
        "Kuwaiti phone numbers must start with 5, 6, or 9 and be 8 digits long.",
    },
    bh: {
      pattern: /^[36]\d{7}$/,
      errorMessage:
        "Bahraini phone numbers must start with 3 or 6 and be 8 digits long.",
    },
    in: {
      pattern: /^[6-9]\d{9}$/,
      errorMessage:
        "Indian phone numbers must start with 6, 7, 8, or 9 and be 10 digits long.",
    },
  };

  // Validate phone number based on the selected country
  const validatePhoneNumber = (_: any, value: string) => {
    if (isDisabled) return Promise.resolve(); // Skip validation if disabled

    if (isRequired) {
      if (!value)
        return Promise.reject(
          new Error("Phone Number is required")
        );

      // Remove country code correctly for all countries
      const digitsOnly = value
        .replace(/\D/g, "")
        .slice(value.startsWith("91") ? 2 : 3);

      const validationRule = countryValidationRules[selectedCountry];
      if (!validationRule)
        return Promise.reject(new Error("Invalid country selected!"));

      if (!validationRule.pattern.test(digitsOnly)) {
        return Promise.reject(new Error(validationRule.errorMessage));
      }
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      className="phontnofirld"
      style={{ maxWidth: "100%" }}
      name={name}
      label={
        <>
          {label}
          {isRequired && <span style={{ color: "#ff4d4f" }}>*</span>}
        </>
      }
      rules={[{ validator: validatePhoneNumber }]}
    >
      <PhoneInput
        country="sa"
        value={phone}
        onChange={(phone: string, country: CountryData) => {
          setPhone(phone);
          setSelectedCountry(country.countryCode.toLowerCase());
        }}
        disabled={isDisabled}
        inputStyle={{
          width: "100%",
          padding: lang === "ar" ? "8px 50px 8px 8px" : "8px 8px 8px 50px",
          height: "44px",
          color: "#1F242E",
          border: "1px solid #D1D5DE",
          borderRadius: "8px",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
          fontSize: "14px",
          textAlign: lang === "ar" ? "right" : "left",
        }}
        buttonStyle={{
          borderRadius: "4px",
          border: "1px solid #d9d9d9",
        }}
        enableSearch={true}
        onlyCountries={["sa", "ae", "qa", "om", "kw", "bh", "in"]}
        masks={{
          sa: ".. ... ....", // Saudi format
          ae: ".. ... ....",
          qa: ".. ... ....",
          om: ".. ... ....",
          kw: ".. ... ....",
          bh: ".. ... ....",
          in: ".. ... .....",
        }}
      />
    </Form.Item>
  );
};

export default CustomPhoneNumber;
