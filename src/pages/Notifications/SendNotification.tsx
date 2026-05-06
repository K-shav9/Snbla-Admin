import React, { useState } from 'react'
import ApiClient from '../../api-client/apiClient';
import { Form, Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch,useSelector } from 'react-redux';
import { createNotification } from '../../actions/notification';
import { useNavigate } from "react-router-dom";

const SendNotification = () => {

  const dispatch: any = useDispatch();
    const { isLoading } = useSelector((state:any)=> state?.General)
     const navigate = useNavigate();

  const [formData, setFormData] = useState({
    platform: "All",
    appVersion: "All",
    gender: "All",
    title_en: "",
    description_en: "",
     language: 'en',
    image: null,
    title_ar:"",
    description_ar:"",
  });
   const [form] = Form.useForm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
const handleUpload = (info: any) => {
  const file = info.file.originFileObj; // Correct
  setFormData((prevState) => ({
    ...prevState,
    image: file,
  }));
};


 const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
    const handleLanguageChange = (value: string) => {
    setFormData({ ...formData, language: value });
  };

const handleSendNotification = async () => {
  try {
    const formValues = form.getFieldsValue();
    console.log("Current form values:", formValues);
    await form.validateFields();


    const data = new FormData();
    data.append("platform", formData.platform);
    data.append("appVersion", formData.appVersion);
    data.append("gender", formData.gender);  
    data.append("title_en", formData.title_en);
    data.append("description_en", formData.description_en);
        data.append("title_ar", formData.title_ar);
    data.append("description_ar", formData.description_ar);

    if (formData.image) {
      data.append("image_url", formData.image);
    }

    console.log("dataaa:::::::::::::::::",data)

    dispatch(createNotification(data, (response: any) => {
      if (response.status === 200 || response.status === 201) {
        console.log("response===", response.data);
        navigate("/admin/notification")
      } else {
        console.error("Failed to create notification:", response);
      }
    }));

  } catch (error) {
    console.error("Please fill out all required fields!");
  }
};

  return (
    <>
     <div className="p-6">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Send Notification</h1>
        
      </div>
        <div className="bg-white  rounded-lg shadow-md w-full pb-2 ">
           
          <Form form={form}>
             <div className="flex items-center space-x-4 mx-6 mt-6">

          
                <Form.Item   
                  name="platform"
                  rules={[{ required: true, message: "Please select a platform!" }]}
                >
                  <div>
                    <label className="block text-gray-700 text-sm mb-1 mt-6">Platform</label>
                    <select
                      className="w-full p-2 border border-[gainsboro] rounded-lg focus:ring focus:ring-blue-300 bg-white"
                      value={formData.platform}
                      onChange={(e) => handleSelectChange("platform", e.target.value)}
                    >
                      <option value="">Select Platform</option>
                      <option>Android</option>
                      <option>iOS</option>
                      <option>Web</option>
                    </select>
                  </div>
                </Form.Item>

                <Form.Item
                name="appVersion"
                rules={[{ required: true, message: "Please select an app version" }]}
              >
                <div>
                  <label className="block text-gray-700 text-sm mb-1 mt-6">App Version</label>
                  <select
                    className="w-full p-2 border border-[gainsboro] rounded-lg bg-white"
                    value={formData.appVersion}
                    onChange={(e) => handleSelectChange("appVersion", e.target.value)}
                  >
                    <option value="">Select App Version</option>
                    <option>0.1</option>
                    <option>0.2</option>
                    <option>1.3</option>
                    <option>0.4</option>
                  </select>
                </div>
                </Form.Item>

                <Form.Item
                  name="gender"
                  rules={[{ required: false, message: "Please select a gender!" }]}
                >
                  <div>
                    <label className="block text-gray-700 text-sm mb-1 mt-6">Gender</label>
                    <select
                      className="w-full p-2 border border-[gainsboro] rounded-lg focus:ring focus:ring-blue-300 bg-white"
                      value={formData.gender}
                      onChange={(e) => handleSelectChange("gender", e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </Form.Item>

            
              <Form.Item >
                 <label className="block text-gray-700 text-sm mb-1 mt-6">Select Language</label>
                <div>
                   <Select
                  value={formData.language}
                  onChange={handleLanguageChange}
                  className="w-full"
                >
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="ar">Arabic</Select.Option>
                </Select>
                </div>            
              </Form.Item> 
            </div>

          <div className="border border-[gainsboro] p-6 rounded-lg mt-12 mx-8 mb-6">
                <h2 className="text-base font-semibold text-black mb-4">Please Enter Notification Title and Description</h2>
            <div className="grid grid-cols-3 gap-4">
              
              <Form.Item
                className="formControlDesign"
                label="Enter Title (English)"
                name="title_en"
                rules={[{ required:false, message: "Please enter the English title!" }]} >
                <Input 
                name="title_en"
                placeholder="Enter Title (English)"
                value={formData.title_en}
                onChange={handleInputChange} />
              </Form.Item>
                  
              <Form.Item
                className="formControlDesign"
                label="Enter Description (English)"
                name="description_en"
                rules={[{required:false, message: "Please enter the English description!" }]}
              >
                <Input.TextArea
                name="description_en"
                placeholder="Enter Description (English)" 
                value={formData.description_en}
                onChange={handleInputChange}/>
              </Form.Item>

              <Form.Item
                className="formControlDesign"
                label="Enter Title (Arabic)"
                name="title_ar"
                rules={[{ message: "Please enter the Arabic title!" }]}
              >
                <Input 
                name="title_ar"
                placeholder="Enter Title (Arabic)" 
                value={formData.title_ar}
                onChange={handleInputChange}/>
              </Form.Item>

              <Form.Item
                className="formControlDesign"
                label="Enter Description (Arabic)"
                name="description_ar"
                rules={[{ message: "Please enter the Arabic description!" }]}
              >
                <Input.TextArea 
                name="description_ar"
                placeholder="Enter Description (Arabic)"
                value={formData.description_ar} 
                onChange={handleInputChange}/>
              </Form.Item>
      
              <Form.Item
                className="formControlDesign"
                label="Upload Image"
                name="image"
              >
                <Upload
                  maxCount={1}
                  beforeUpload={() => false}
                  onChange={handleUpload}
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>

                </div>
            </div>

            <div className="flex justify-end mt-4 mb-6 me-8">
              <Button 
              type='primary'
              onClick={handleSendNotification} 
              loading={isLoading}>
                Send Notification
              </Button>
            </div>

        </Form>
      
      </div>
       
      </div>
    </>
  )
}

export default SendNotification