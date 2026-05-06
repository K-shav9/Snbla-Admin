import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomPhoneNumber from '../../Comman/CustomPhoneNumber/CustomPhoneNumber'
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { requestOtp } from '../../../actions/user';


const IndexPlugins = ({ merchantPlan }: any) => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button

  // localStorage.setItem("merchantId", merchantPlan?.merchant?.id)
  // const merchant = useSelector((state: any) => state?.merchant?.merchant?.id);


  const handleFormSubmit = async (values: any) => {
    // Set submitting state to true when API is called
    setIsSubmitting(true);

    const phoneNumber = values?.phoneNumber?.toString().trim();
    if (phoneNumber) {
      const updatedPayload = {
        phoneNumber: phoneNumber.startsWith("+")
          ? phoneNumber
          : `+${phoneNumber}`,
      };
      localStorage.setItem("web-phoneNumber", updatedPayload.phoneNumber);
      // navigate("#verify-mobile", { state: { merchantPlan } });

      dispatch(
        requestOtp(updatedPayload, (response) => {
          setIsSubmitting(false); // Set submitting state back to false after API response
          if (response.success === true || response.status === 201) {
            // navigate("#verify-mobile", { state: { merchantPlan } });
            navigate("#verify-mobile", { replace: true });
          } else {
            console.error(
              "Request OTP failed:",
              response.message || "Unknown error"
            );
          }
        })
      );
    }
  };

  return (
    <div className="plugin-body">
      <h4>
        Save Together, Let Friends Help, and Enjoy up to{" "}
        {merchantPlan?.offerEarning}% Off!
      </h4>
      <div className="form-group">
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <CustomPhoneNumber
            isRequired={true}
            label="Mobile Number"
            name="phoneNumber"
          />
          <p>Only for login, never spam.</p>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="submitbtn"
              loading={isSubmitting}
            >
              Start Saving
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* <Link to="#verify-mobile" className="submitbtn">Start Saving</Link> */}
      {/* <button type="submit" className="submitbtn" onClick={handleSubmit}>Start Saving</button> */}
    </div>
  );
}
export default IndexPlugins
