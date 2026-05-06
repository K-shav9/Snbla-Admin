import React from 'react';
import { Button, Col, Form, Input, Radio, Row, Select, Checkbox } from 'antd';
const { TextArea } = Input;
import maps from '../../images/brand/map.svg';

export const MyReferrersaccount = () => {
    return (
        <div>
            <Form className="formControl">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            className="formControlDesign"
                            label="Business Name"
                            name="Your Business Contact Person"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            className="formControlDesign"
                            label="ABN"
                            name="Contact Number(Including area code)"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            className="formControlDesign"
                            label="Email Address"
                            name="Current Password"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            className="formControlDesign"
                            label="Contact Person"
                            name="Upadted Password"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            className="formControlDesign"
                            label="Contact Person Position"
                            name="Upadted Password"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            className="formControlDesign"
                            label="Contact Phone Number"
                            name="Upadted Password"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            className="formControlDesign"
                            label="Company Phone Number"
                            name="Upadted Password"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            className="formControlDesign"
                            label="Address"
                            name="Upadted Password"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            name="Country"
                            label="Business Category"
                            className="formControlDesign"
                        >
                            <Select placeholder="Business Category">
                                <Select.Option value="A">items</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <Form.Item
                            name="Country"
                            label="Social Media"
                            className="formControlDesign"
                        >
                            <Select placeholder="Social Media">
                                <Select.Option value="A">items</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="col-lg-12 mt-15">
                        <div className="text-end btn-groups-Forms">
                            <button className="btn btn-outline-primary">
                                Cancel
                            </button>
                            <button className="btn btn-primary">
                                Save & Update
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};
