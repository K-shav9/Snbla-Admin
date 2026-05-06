// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Form, Input, InputNumber, Button, message, Upload } from 'antd';
// import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
// import cardimg from "../../../assets/img/dash-card.png";
// import { createCustomGoal } from '../../../actions/user';
// import { useDispatch, useSelector } from 'react-redux';
// import { storePack } from '../../../store/Auth/payment';

// const CustomGoal = () => {
//   const location = useLocation();
//   const dispatch: any = useDispatch();
//   // const { merchantPlan, selectedGoal } = location?.state || {};
//   const [data, setData] = useState<any>({});
//   const [fileList, setFileList] = useState<any[]>([]); // State to store uploaded files
//   const navigate = useNavigate();
//   // const merchantPData: any = JSON.parse(localStorage.getItem('merchantPlan'));
//   const merchantPData = useSelector((state: any) => state?.Merchant?.merchantPlan);
//   const user = useSelector((state: any) => state?.Merchant?.merchantPlan);


//   // console.log("merchant--", merchantPData)

//   const userId: any = localStorage.getItem('userId');

//   const [form] = Form.useForm();

//   // console.log("location", location);
//   // console.log("merchantPData", merchantPData);

//   // Handle file upload
//   const handleFileChange = ({ fileList }: any) => {
//     setFileList(fileList); // Update the file list state
//   };

//   const handleSubmit = (values: any) => {
//     // Check if a file is uploaded
//     values.isCustom = true
//     if (fileList.length === 0) {
//       message.error('Please upload an icon');
//       return;
//     }

//     const file = fileList[0].originFileObj; // Get the uploaded file
//     // const merchantId: any = Number(localStorage.getItem("merchantId"));
//     const merchantId: any = merchantPData?.merchant?.id;

//     // Create the payload object
//     const payload = {
//       id: merchantPData?.id,
//       totalAmount: values?.totalAmount, // You can add the price value
//       isRecurring: 0,
//       isOnetime: false,
//       offerPercentage: merchantPData?.offerEarning, // From the first object
//       title: values?.customGoal,
//       merchantId: merchantId,
//       userId: userId,
//       category: merchantPData?.category,
//       icon: file, // Include the uploaded file in the payload
//       recurringOff: 0,
//       recurringPaymentDate: ""
//     };

//     console.log("payload---", payload); // Log the payload for debugging

//     // Create FormData and append all fields
//     const formData = new FormData();
//     formData.append("id", merchantPData?.merchant?.id || "");
//     formData.append("totalAmount", values?.totalAmount || 0);
//     // formData.append("isRecurring", null);
//     // formData.append("isOnetime", null);
//     formData.append("offerPercentage", merchantPData?.offerEarning);
//     formData.append("title", values?.customGoal || "");
//     formData.append("merchantId", merchantId);
//     formData.append("userId", userId);
//     formData.append("recurringOff", merchantPData?.recurringOff || 0);
//     formData.append("recurringPaymentDate", merchantPData?.recurringPaymentDate || "");
//     formData.append("isCustom", values?.isCustom);

//     formData.append("icon", file); // Append the uploaded file

//     // Log FormData for debugging
//     for (const [key, value] of formData.entries()) {
//       console.log(key, value);
//     }

//     // Dispatch the API call
//     dispatch(
//       createCustomGoal(formData, (response: any) => {
//         if (response.status === 200 || response.status === 201) {
//           dispatch(storePack(payload))
//           // localStorage.setItem('snbla_g_data', JSON.stringify(payload)); // Save payload to localStorage
//           navigate("#pick-goal", { state: { merchantPData, pack: payload } }); // Navigate to the next step
//         } else {
//           message.error("Failed to create custom goal.");
//         }
//       })
//     );
//   };
//   const removeFile = () => {
//     setFileList([]);
//   };

//   useEffect(() => {
//     if (merchantPData?.offerEarning !== undefined) {
//       form.setFieldsValue({
//         offerEarning: merchantPData?.offerEarning, // Ensure correct field name
//       });
//     }
//   }, [data, form]); // Ensure it runs when `data` updates

//   // Custom validation for name and address (disallow spaces-only input)
//   const validateNoSpaces = (_, value) => {
//     if (value && /^\s+$/.test(value)) {
//       return Promise.reject('This field cannot be empty or just spaces');
//     }
//     return Promise.resolve();
//   };

//   return (
//     <div className="plugin-body">
//       <div className="step_div">
//         <h4>Enter Custom Goal Details</h4>
//       </div>
//       <div className="relative">
//         <label htmlFor="upload-icon" className="cursor-pointer">
//           <img
//             src={fileList.length ? URL.createObjectURL(fileList[0].originFileObj) : cardimg}
//             alt="img"
//             className="w-full max-h-40 object-cover"
//           />
//         </label>
//         {fileList.length > 0 && (
//           <button onClick={removeFile} className="absolute top-2 right-2 bg-white text-white rounded p-1">
//             <DeleteTwoTone style={{ color: 'red' }} />
//           </button>
//         )}
//       </div>

//       <Form form={form} layout="vertical" onFinish={handleSubmit} className="three-steps name_step_three">
//         <div className="form-group">
//           <Form.Item label="Goal Name" name="customGoal" rules={[{ required: true, message: 'Please enter the goal name' }]}>
//             <Input className="input-style" placeholder="Enter goal name" />
//           </Form.Item>
//         </div>
//         <div className="form-group">
//           <Form.Item label="Saving Target" name="totalAmount" rules={[{ required: true, message: 'Please enter the total amount' }]}>
//             <InputNumber style={{ width: "100%" }} min={1} addonBefore="SAR" />
//           </Form.Item>
//         </div>

//         <div className="form-group" style={{ display: 'none' }} >
//           <Form.Item className="formControlDesign" label="Icon" name="icon" rules={[{ required: true, message: "Please upload the icon" }]}>
//             <Upload fileList={fileList} onChange={handleFileChange} beforeUpload={() => false} listType="picture-card" showUploadList={false}>
//               <input id="upload-icon" type="file" hidden onChange={(e) => handleFileChange({ fileList: Array.from(e.target.files).map(file => ({ originFileObj: file })) })} />
//               {fileList.length >= 1 ? null : (
//                 <div>
//                   <PlusOutlined />
//                   <div style={{ marginTop: 8 }}>Upload</div>
//                 </div>
//               )}
//             </Upload>
//           </Form.Item>
//         </div>

//         <div className="footer-btns deletebtns flex justify-end space-x-4 mt-4">
//           <Button id="pause" type="text" className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancel</Button>
//           <Button id="done" type="primary" className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md" htmlType="submit">Confirm</Button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default CustomGoal;

import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomGoal } from '../../../actions/user';
import { storePack } from '../../../store/Auth/payment';
import { useNavigate } from 'react-router-dom';

const CustomGoal = () => {
  const [fileList, setFileList] = useState<any[]>([]); // State to store uploaded files
  const [form] = Form.useForm();
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const merchantPData = useSelector((state: any) => state?.Merchant?.merchantPlan);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const userId = localStorage.getItem('u_id');

  // Handle file change
  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList); // Update the file list state
  };

  // Handle file removal
  const removeFile = () => {
    setFileList([]); // Remove file
  };

  // Validation for image file type (e.g., JPEG, PNG, GIF)
  const beforeUpload = (file: any) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  // Form submission
  const handleSubmit = (values: any) => {
    // Set submitting state to true when API is called
    setIsSubmitting(true);
    values.isCustom = true
    if (fileList.length === 0) {
      message.error('Please upload an icon');
      return;
    }

    const file = fileList[0].originFileObj; // Get the uploaded file
    const merchantId = merchantPData?.merchant?.id;

    // Create the payload object
    const pack = {
      id: merchantPData?.merchant?.id,
      totalAmount: values?.totalAmount,
      isRecurring: 0,
      isOnetime: false,
      offerPercentage: merchantPData?.offerEarning,
      title: values?.customGoal,
      merchantId: merchantId,
      userId: userId,
      category: merchantPData?.category,
      // icon: file,
      recurringOff: 0,
      recurringPaymentDate: ""
    };

    // Create FormData and append all fields
    const formData = new FormData();
    formData.append('id', merchantPData?.merchant?.id || '');
    formData.append('totalAmount', values?.totalAmount || 0);
    formData.append('offerPercentage', merchantPData?.offerEarning);
    formData.append('title', values?.customGoal || '');
    formData.append('merchantId', merchantId);
    formData.append('userId', userId);
    formData.append('recurringOff', merchantPData?.recurringOff || 0);
    formData.append('recurringPaymentDate', merchantPData?.recurringPaymentDate || '');
    formData.append('isCustom', values?.isCustom);
    formData.append('icon', file);

    console.log('Form Data: ', formData); // Log FormData for debugging

    console.log("pack---", pack)
    // dispatch(storePack(pack));

    // Dispatch the API call
    dispatch(
      createCustomGoal(formData, (response: any) => {
        setIsSubmitting(false); // Set submitting state back to false after API response
        if (response.status === 200 || response.status === 201) {
          // console.log("paylaod---", pack)
          dispatch(storePack(pack));
          navigate('#pick-goal', { state: { merchantPData, pack } });
        } else {
          message.error('Failed to create custom goal.');
        }
      })
    );
  };

  return (
    <div className="plugin-body">
      <div className="step_div">
        <h4>Enter Custom Goal Details</h4>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit} className="three-steps name_step_three">
        {/* Icon Field */}
        <div className="form-group w-full">
          <Form.Item
            label="Goal Icon"
            name="icon"
            rules={[{ required: true, message: 'Please upload an icon' }]} // Display validation message
          >
            <Upload
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={beforeUpload} // Validate image type before uploading
              listType="picture" // Display as a simple picture
              showUploadList={{ showRemoveIcon: true }} // Show remove icon
              onRemove={removeFile} // Handle file removal
              maxCount={1} // Allow only one file to be uploaded
            >
              {fileList?.length < 1 && (
                <Button
                  icon={<UploadOutlined />}
                  // className="w-full h-48 text-center" // Tailwind for centering
                  // className="w-full max-h-40 object-cover"
                  className="w-80 h-20 flex items-center justify-center text-gray-700 border border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-lg"

                >
                  Upload Icon
                </Button>
              )}
            </Upload>
          </Form.Item>
        </div>

        {/* Goal Name Field */}
        <div className="form-group">
          <Form.Item
            label="Goal Name"
            name="customGoal"
            rules={[{ required: true, message: 'Please enter the goal name' }]}
          >
            <Input className="input-style" placeholder="Enter goal name" />
          </Form.Item>
        </div>

        {/* Saving Target Field */}
        <div className="form-group">
          <Form.Item
            label="Saving Target"
            name="totalAmount"
            rules={[{ required: true, message: 'Please enter the total amount' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} addonBefore="SAR" />
          </Form.Item>
        </div>

        {/* Footer Buttons */}
        <div className="footer-btns deletebtns flex justify-end space-x-4 mt-4">
          <Button type="text" className="p-2 text-gray-600 hover:bg-gray-100 rounded-md" onClick={() => form.resetFields()}>
            Cancel
          </Button>
          <Button type="primary" className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md" htmlType="submit" loading={isSubmitting}>
            Confirm
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CustomGoal;



