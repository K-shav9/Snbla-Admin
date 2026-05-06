import React from 'react';
import { Button, Col, Form, Input, Radio, Row, Select, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;
const DummyForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        
        console.log('onFinish', values);
        
    };
    const onFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        // You can also display an error message to the user here
      };
    return (
      <div>
        <div className="bodycard">
        <div className="bodycardheading">
                        {' '}
                        <div className="mobileView buttonsvgs">
                            {' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <rect
                                    x="0.4"
                                    y="1.18168"
                                    width="23.2"
                                    height="23.2"
                                    rx="11.6"
                                    stroke="#474df4"
                                    stroke-width="0.8"
                                />
                                <path
                                    d="M14 8.78168L10 12.7817L14 16.7817"
                                    stroke="#474df4"
                                    stroke-width="1.25"
                                    stroke-linecap="round"
                                />
                            </svg>
                        </div>
                        Refer SNBLA
                    </div>
        <div className="cardContentbody">
          
            <Form className="formControl"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFailed}
            >
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            className="formControlDesign"
                            label="Your Business Contact Person"
                            name="Your Business Contact Person"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                    <Form.Item
                            className="formControlDesign"
                            label="Contact Number (Including area code)"
                            name="contactNumber"
                            rules={[
                                { required: true, message: 'Please input your Contact Number!' },
                                {
                                    validator: (_, value) => {
                                        const countryCode = '+61'; // Australia country code
                                        const phoneNumber = value.replace(countryCode, '');
                                        if (!phoneNumber.match(/^[0-9]+$/)) {
                                            return Promise.reject(new Error('Contact Number must only contain numbers!'));
                                        } else if (phoneNumber.length > 10) {
                                            return Promise.reject(new Error('Contact Number must not exceed 10 digits!'));
                                        } else if (phoneNumber.length < 10) {
                                            return Promise.reject(new Error('Contact Number must be exactly 10 digits!'));
                                        } else {
                                            return Promise.resolve();
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input
                                addonBefore={'+61 '} // Display Australia country code by default
                                placeholder="Contact Number"
                                type="tel" // Set input type to tel to allow only numbers
                                maxLength={10} // Limit input to 10 characters
                                // value={businessInfo.contactNumber}
                                // onChange={handleInputChange}
                            />
                        </Form.Item>
                    </div>
                    <div className="col-lg-12 col-sm-12">
                        <Form.Item
                            className="formControlDesign"
                            label="Your Address"
                            name="Your Address"
                            >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            name="Business Category"
                            label="City"
                            className="formControlDesign"
                        >
                            <Select placeholder="City">
                                <Select.Option value="A">items</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            name="Business Category"
                            label="State"
                            className="formControlDesign"
                            >
                            <Select placeholder="State">
                                <Select.Option value="A">items</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            name="Country"
                            label="Country"
                            className="formControlDesign"
                            >
                            <Select placeholder="Country">
                                <Select.Option value="A">items</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            className="formControlDesign"
                            label="Pincode"
                            name="Pincode"
                            >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-12 mt-15">
                        <div className="text-end btn-groups-Forms">
                            <button className="btn btn-outline-primary">
                                Cancel
                            </button>
                            <button className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        </div>
      </div>
    );
};

export default DummyForm;
