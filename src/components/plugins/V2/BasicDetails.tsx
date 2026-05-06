import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { checkuser, openNotificationWithIcon, updateAdminAndMerchantProfileDetails, updateBasicDetails } from '../../../actions/user';
import AddressAutocomplete from '../../../utils/snippets/Addressdetail';
import { extractAddressComponents } from '../../../utils/constants';

const BasicDetails: React.FC<any> = (props: any) => {
  const dispatch: any = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [form] = Form.useForm();

  const { merchantPlan, selectedGoal, amount, baseEarnings, scheduleValues, pack } = location?.state || {};
  // const user = useSelector((state: any) => state?.Auth?.user);
  const user = useSelector((state: any) => state?.Auth?.user?.data);


  // useEffect(() => {
  //   dispatch(
  //     checkuser((res: any) => {
  //       // if (res?.success) {
  //       //   setUserData(res?.data);
  //       // }
  //     })
  //   );
  // }, [dispatch]);

  const validateNoSpaces = (_: any, value: string) => {
    if (value && /^\s+$/.test(value)) {
      return Promise.reject(new Error('This field cannot be empty or just spaces'));
    }
    return Promise.resolve();
  };

  const handleSubmit = async (formValues: any) => {
    const { countryCode, zipCode, city, fullAddress } = extractAddressComponents(formValues?.address);
    setIsLoading(true);
    try {
      console.log({ zipCode, city, fullAddress });
      const payload = {
        ...formValues,
        firstName: formValues?.firstName,
        lastName: formValues?.lastName,
        email: formValues?.email,
        address: fullAddress,
        country: countryCode,
        zipCode,
        city
      };
      dispatch(
        updateAdminAndMerchantProfileDetails(payload, (res: any) => {
          setIsLoading(false);
          if (res?.status === 204 || res?.success) {
            navigate("#pick-goal");

          } else {
            openNotificationWithIcon("error", "Failed to update profile");
          }
        })
      );
      localStorage.setItem("email", formValues?.email);
    } catch (error) {
      setIsLoading(false);
      openNotificationWithIcon("error", "An error occurred while updating the profile");
    }
  };

  const handleAddressSelect = (selectedAddress: string) => {
    form.setFieldsValue({ address: selectedAddress }); // Auto-fill the form field
  };

  return (
    <div className="plugin-body">
      <div className="step_div">
        <h4>Enter Basic Details</h4>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false} // 👈 This will hide the required asterisk (*)
        className="three-steps name_step_three"
      >
        {/* <Form.Item label="Your Name" name="name" rules={[{ required: true, message: "Name is required" }, { validator: validateNoSpaces }]}>
          <Input className="input-style" />
        </Form.Item> */}

        <div className="half-divs">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "First name is required" },
              { validator: validateNoSpaces },
            ]}
          >
            <Input className="input-style" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Last Name is required" },
              { validator: validateNoSpaces },
            ]}
          >
            <Input className="input-style" />
          </Form.Item>
        </div>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
            { validator: validateNoSpaces },
          ]}
        >
          <Input className="input-style" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Please enter your address" },
            { validator: validateNoSpaces },
          ]}
        >
          <AddressAutocomplete onAddressSelect={handleAddressSelect} />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="submitbtn"
          >
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BasicDetails;
