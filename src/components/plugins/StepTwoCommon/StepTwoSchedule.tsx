
// import React, { useEffect, useState } from 'react';
// import { DatePicker, Select, Button, Form, message, Row, Col } from 'antd';
// import dayjs from 'dayjs'; // For date handling
// import { useSelector } from 'react-redux';

// const { Option } = Select;

// const StepTwoSchedule = ({ onSave }: any) => {
//   const [form] = Form.useForm();
//   const [selectedFrequency, setSelectedFrequency] = useState(null);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const payData = useSelector((state: any) => state?.Payment?.payData);
//   const scheduleValues = payData?.scheduleValues
//   const handleSave = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         const { frequency, day, date } = values;
//         onSave({ frequency, day, date: date.format('YYYY-MM-DD') }); // Pass values to parent
//       })
//       .catch(() => {
//         console.error('Please fill all fields before saving.');
//       });
//   };

//   // Generate an array of numbers from 1 to 31
//   const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
//   useEffect(() => {
//     setSelectedDate(scheduleValues?.date ?? null)
//     setSelectedFrequency(scheduleValues?.frequency ?? null)
//     setSelectedDate(scheduleValues?.selectedDate ?? null)

//   })

//   return (
//     <div>
//       <Form form={form} layout="vertical">
//         <Row>
//           <Col md={selectedFrequency === "monthly" ? 12 : 24}>
//             <Form.Item
//               label="Frequency"
//               name="frequency"
//               rules={[
//                 { required: true, message: "Please select a frequency!" },
//               ]}
//             >
//               <Select
//                 placeholder="Select frequency"
//                 onChange={(value) => setSelectedFrequency(value)}
//               >
//                 <Option value="monthly">Monthly</Option>
//                 <Option value="weekly">Weekly</Option>
//                 <Option value="daily">Daily</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           {selectedFrequency === "monthly" && (
//             <Col md={12}>
//               <Form.Item
//                 label="Day"
//                 name="day"
//                 rules={[{ required: true, message: "Please select a day!" }]}
//               >
//                 <Select
//                   placeholder="Select day"
//                   onChange={(value) => setSelectedDay(value)}
//                 >
//                   {daysInMonth.map((day) => (
//                     <Option key={day} value={`${day}th`}>
//                       {day}th
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           )}
//         </Row>

//         <Form.Item
//           label="Starting Date"
//           name="date"
//           rules={[
//             { required: true, message: "Please select a starting date!" },
//           ]}
//         >
//           <DatePicker
//             style={{ width: "100%" }}
//             format="DD-MM-YYYY"
//             onChange={(date) => setSelectedDate(date)}
//             disabledDate={(current) => {
//               // Disable dates before today
//               return current && current < dayjs().startOf("day");
//             }}
//           />
//         </Form.Item>
//       </Form>

//       <Button type="primary" onClick={handleSave} className="submitbtn">
//         Save Schedule
//       </Button>
//     </div>
//   );
// };

// export default StepTwoSchedule;

import React, { useEffect, useState } from "react";
import { DatePicker, Select, Button, Form, Row, Col } from "antd";
import dayjs from "dayjs"; // For date handling
import { useSelector } from "react-redux";

const { Option } = Select;

const StepTwoSchedule = ({ onSave }: any) => {
  const [form] = Form.useForm();
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const payData = useSelector((state: any) => state?.Payment?.payData);
  const scheduleValues = payData?.scheduleValues;

  useEffect(() => {
    form.setFieldsValue({
      frequency: scheduleValues?.frequency || null,
      day: scheduleValues?.day || null,
      date: scheduleValues?.date ? dayjs(scheduleValues.date) : null,
    });
    setSelectedFrequency(scheduleValues?.frequency ?? null);
    setSelectedDate(scheduleValues?.date ? dayjs(scheduleValues.date) : null);
  }, [scheduleValues, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const { frequency, day, date } = values;
        onSave({
          frequency,
          day,
          date: date.format("YYYY-MM-DD")
        }); // Pass values to parent
      })
      .catch(() => {
        console.error("Please fill all fields before saving.");
      });
  };

  const handleFrequencyChange = (value: string) => {
    setSelectedFrequency(value);
    // Reset the day field when frequency changes
    form.setFieldsValue({ day: null });
  };

  return (
    <div>
      <Form form={form} layout="vertical">
        <Row>
          <Col md={selectedFrequency === "monthly" ? 12 : 24}>
            <Form.Item
              label="Frequency"
              name="frequency"
              rules={[
                { required: true, message: "Please select a frequency!" },
              ]}
            >
              <Select
                placeholder="Select frequency"
                onChange={handleFrequencyChange}
              >
                <Option value="monthly">Monthly</Option>
                <Option value="weekly">Weekly</Option>
                <Option value="daily">Daily</Option>
              </Select>
            </Form.Item>
          </Col>
          {selectedFrequency === "monthly" && (
            <Col md={12}>
              <Form.Item
                label="Day"
                name="day"
                rules={[{ required: true, message: "Please select a day!" }]}
              >
                <Select placeholder="Select day">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <Option key={day} value={`${day}th`}>
                      {day}th
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>

        <Form.Item
          label="Starting Date"
          name="date"
          rules={[{ required: true, message: "Please select a starting date!" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="DD-MM-YYYY"
            disabledDate={(current) => current && current < dayjs().startOf("day")}
          />
        </Form.Item>
      </Form>

      <Button type="primary" onClick={handleSave} className="submitbtn">
        Save Schedule
      </Button>
    </div>
  );
};

export default StepTwoSchedule;
