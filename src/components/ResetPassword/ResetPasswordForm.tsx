import React from 'react';
// import { userRegister } from '../../actions';
import { Button, Col, Form, Input, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from "../../actions/user";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const ResetPasswordForm: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch:any = useDispatch();
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        const payload = {
            email: values?.email
        };
        

        dispatch(
          forgotPassword(payload, (resp: any) => {
            console.warn("resp :::::::::::::", resp);
            if (resp) {
              // navigate('/setup');
            }
          })
        );
    };

    return (
        <div className='authforms' style={{padding: "152px 60px"}}>
                <div className="authHeadings">
                    <button 
                    onClick={()=> {
                        navigate(-1);
                    }} className='btn textAuthHeading'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="0.4" y="0.4" width="23.2" height="23.2" rx="11.6" stroke="#0d6efd" strokeWidth="0.8" />
                        <path d="M14 8L10 12L14 16" stroke="#0d6efd" strokeWidth="1.25" strokeLinecap="round" />
                    </svg> </button>
                  
                    <div className="textAuthHeading">Reset <span>Password</span></div>
                </div>
            <Row>
                <Col lg={24} md={24} sm={24}>
                    <Form
                        className='formControl'
                        {...layout}
                        form={form}
                        name="email_password_form"
                        onFinish={onFinish}
                        layout="vertical"
                        // onFinishFailed={onFinishFailed}
                        initialValues={{ remember: true }}
                        style={{ maxWidth: '600px', margin: 'auto' }}
                    >
                        <Form.Item
                            label="Email"
                            className='formControlDesign' 
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Email" />
                        </Form.Item>

                        <Form.Item>
                            <Button className='btn btn-primary w-100' type="primary"  htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default ResetPasswordForm;
