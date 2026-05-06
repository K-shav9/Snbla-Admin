import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { captureRediectPayment, checkuser, openNotificationWithIcon, payWithCard } from '../../../actions/user';
import PaymentConfirmationModal from './PaymentConfirmationModal';
import { storeTransactionDetails } from '../../../store/Auth/payment';


const StepThree = () => {
  const dispatch: any = useDispatch();
  const location = useLocation();
  const [isLoading, setIsloading] = useState(false);
  // const [userData, setUserData] = useState<any>({})
  const [ipData, setIpData] = useState<any>({})

  const { selectedGoal } = location?.state || {};


  useEffect(() => {
    dispatch(
      checkuser((res: any) => {
        if (res?.success === true) {
          console.log("resp data", res?.data)
          // setUserData(res?.data)

        }
      })
    );

  }, []);

  useEffect(() => {
    fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) =>
        setIpData(data)
      )
      .catch((error) => console.error("Error:", error));
  }, []);

  // const merchantId = Number(localStorage.getItem("merchantId")); // Convert to number
  // const userId = Number(localStorage.getItem("userId")); // Convert to number

  const merchantPlan = useSelector((state: any) => state?.Merchant?.merchantPlan);
  // const user = useSelector((state: any) => state?.Auth);
  const merchantId = useSelector((state: any) => state?.Merchant?.merchantPlan?.merchant?.id);
  const user = useSelector((state: any) => state?.Auth?.user?.data);

  const navigate = useNavigate();

  const [form] = Form.useForm();

  // const cashback = parseFloat(localStorage.getItem("baseEarnings") || "0");
  // const deposit = parseFloat(localStorage.getItem("amount") || "0");
  // const scheduleValues = payData?.scheduleValues
  const payData = useSelector((state: any) => state?.Payment?.payData);

  const cashback = payData?.amounts?.baseEarnings || 0;
  const deposit = payData?.amounts?.amount || 0;
  const scheduleValues = payData?.scheduleValues
  const pack = payData?.pack

  const totalAmount = cashback + deposit


  const baseEarnings = payData?.baseEarnings
  const amount = payData?.amount




  const handleSubmit = async (values: any) => {
    // localStorage.setItem("email", user?.email);
    const payload = {
      ...values,
      selectedGoal,
      deposit: amount,
      extraEarnings: baseEarnings,
      pack,
      scheduleValues,
      merchantPlan,
    };
    const cardNo = values?.cardNumber;
    const date = values.expiryDate?.split("/"); // Example date
    const month = date?.[0]; // getMonth() returns 0-based index (0 = January)
    const year = date?.[1];
    const paymentSuccessUrl = process.env.PAYMENT_SUCCESS_URL;
    const payloadData = {
      // order_id: "434343test32233",
      order_amount: `${totalAmount?.toFixed(2)}`,
      card_number: cardNo,
      card_exp_month: month,
      card_exp_year: `20${year}`,
      card_cvv2: values.cvv,
      payer_phone: user?.mobileNumber,
      payer_country: user?.country ?? "SA",
      payer_address: user?.address,
      action: "SALE",
      payer_zip: user?.zipCode ?? "134004",
      payer_ip: ipData?.ip ?? "176.44.76.100",
      order_currency: "SAR",
      payer_first_name: user?.firstName,
      payer_city: user?.city ?? "Riadh",
      auth: "N",
      payer_last_name: user?.lastName,
      order_description:
        merchantPlan?.merchant?.description ?? "Snbla Wallet Payment",
      payer_email: user?.email,
      term_url_3ds:
        paymentSuccessUrl ??
        "http://54.201.160.69:3399/partners-offer#automation-success",
      recurring_init: "N",
      req_token: "N",
      merchant_origin: "http://pay.edfapay.com",
      card_scheme: "VISA",
      userId: user?.id,
      merchantId,
    };

    if (
      payloadData?.payer_email &&
      payloadData?.payer_address &&
      payloadData?.payer_city &&
      payloadData?.payer_country
    ) {
      // Payment: make the payment with card and redirections
      // Modal.confirm({
      //   style: {
      //     backgroundColor: "white",
      //     padding: "16px",
      //     borderRadius: "8px",
      //   },
      //   title: "Pop-up & Redirection Required",
      //   content:
      //     "Before proceeding with the payment, please ensure that your browser's pop-up and redirection settings are enabled. If they are disabled, enable them first before continuing. If already enabled, click 'Confirm.' Once the payment is complete, return to this page to proceed.",
      //   okText: "Confirm",
      //   cancelText: "No",
      //   onOk: () => {
      //     console.log("Confirmed! Proceeding with the action...");
      //     // Place your action logic here
      //     setIsloading(true);
      //     dispatch(
      //       payWithCard(payloadData, (response: any) => {
      //         // Stop loading immediately when any error occurs
      //         if (!response?.success || response?.data?.result === "ERROR") {
      //           setIsloading(false);

      //           const errorMessage =
      //             response?.data?.error_message ||
      //             response?.data?.errors?.[0]?.error_message ||
      //             "Payment failed. Please try again.";

      //           return;
      //         }
      //         if (response.status === 200 || response.status === 201) {
      //           if (response?.data?.trans_id) {
      //             // localStorage.setItem(
      //             //   "snbla_trans_id",
      //             //   response?.data?.trans_id
      //             // );
      //             // localStorage.setItem(
      //             //   "snbla_order_id",
      //             //   response?.data?.order_id
      //             // );
      //             dispatch(storeTransactionDetails({
      //               snbla_trans_id: response?.data?.trans_id,
      //               snbla_order_id: response?.data?.order_id
      //             }))

      //             const data = {
      //               url: response?.data?.redirect_url,
      //               body: response?.data?.redirect_params?.body,
      //             };
      //             setIsloading(false);
      //             navigate("#payment-processing", { state: { payload, data } });
      //             dispatch(
      //               captureRediectPayment(data, (response: any) => {
      //                 if (response.status === 200 || response.status === 201) {
      //                   const newWindow = window.open("", "_blank");
      //                   if (newWindow) {
      //                     newWindow.document.write(response?.data);
      //                     newWindow.document.close(); // Ensures content loads properly
      //                   }
      //                 }
      //               })
      //             );
      //           } else {
      //             setIsloading(false);
      //             message.error("Payment failed. No transaction ID received.");
      //           }
      //         } else {
      //           setIsloading(false);
      //           message.error("Payment failed. Please try again.");
      //         }
      //       })
      //     );
      //   },
      //   onCancel: () => {
      //     console.log("Cancelled! No action taken.");
      //   },
      // });
      setIsloading(true);
      dispatch(
        payWithCard(payloadData, (response: any) => {
          // Stop loading immediately when any error occurs
          if (!response?.success || response?.data?.result === "ERROR") {
            setIsloading(false);

            const errorMessage =
              response?.data?.error_message ||
              response?.data?.errors?.[0]?.error_message ||
              "Payment failed. Please try again.";

            return;
          }
          if (response.status === 200 || response.status === 201) {
            if (response?.data?.trans_id) {
              // localStorage.setItem(
              //   "snbla_trans_id",
              //   response?.data?.trans_id
              // );
              // localStorage.setItem(
              //   "snbla_order_id",
              //   response?.data?.order_id
              // );
              dispatch(storeTransactionDetails({
                snbla_trans_id: response?.data?.trans_id,
                snbla_order_id: response?.data?.order_id
              }))

              const data = {
                url: response?.data?.redirect_url,
                body: response?.data?.redirect_params?.body,
              };
              setIsloading(false);
              navigate("#payment-processing", { state: { payload, data } });
              dispatch(
                captureRediectPayment(data, (response: any) => {
                  if (response.status === 200 || response.status === 201) {
                    const newWindow = window.open("", "_blank");
                    if (newWindow) {
                      newWindow.document.write(response?.data);
                      newWindow.document.close(); // Ensures content loads properly
                    }
                  }
                })
              );
            } else {
              setIsloading(false);
              message.error("Payment failed. No transaction ID received.");
            }
          } else {
            setIsloading(false);
            message.error("Payment failed. Please try again.");
          }
        })
      );
    } else {
      const missingFields = [
        !payloadData?.payer_email && "Email",
        !payload?.payer_address && "Address",
        !payload?.payer_city && "City",
        !payload?.payer_country && "Country",
      ].filter(Boolean);
      if (missingFields.length) {
        console.log("missing fields---", missingFields)
        openNotificationWithIcon(
          "error",
          `These fields are not validated: ${missingFields.join(", ")}`
        );
      }
    }
  };

  const validateExpiryDate = (_, value) => {
    if (!value) {
      return Promise.resolve(); // Allow empty input, no validation error
    }

    const today = dayjs().startOf('month'); // Get the first day of the current month
    const expiryDate = dayjs(value, "MM/YY", true); // Parse expiry date in MM/YY format

    // Validate correct format MM/YY
    if (!expiryDate.isValid()) {
      return Promise.reject(new Error("Invalid format. Use MM/YY"));
    }

    // Ensure expiry date is not in the past
    if (expiryDate.isBefore(today)) {
      return Promise.reject(new Error("Expiry date must be in the future"));
    }

    return Promise.resolve();
  };


  // Custom validation for name and address (disallow spaces-only input)
  const validateNoSpaces = (_, value) => {
    if (value && /^\s+$/.test(value)) {
      return Promise.reject('This field cannot be empty or just spaces');
    }
    return Promise.resolve();
  };



  return (
    <div>
      <div className="plugin-body">
        <div className="step_div">
          <p className="step">Step 3 of 3</p>
          <h4>Make a one-time deposit</h4>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false} // 👈 This will hide the required asterisk (*)
          className="three-steps name_step_three"
          // initialValues={{
          //   amount: finalEarning, // Example of pre-filling the amount from `totalEarnings`
          // }}
        >
          {/* <div className="form-group">
            <Form.Item
              label="Your Name"
              name="name"
              rules={[
                { required: true, message: "Name is required" },
                { validator: validateNoSpaces }, // Check for spaces
              ]}
            >
              <Input className="input-style" />
            </Form.Item>
          </div> */}

          {/* <div className="form-group">
            <Form.Item
              label="Card Number"
              name="cardNumber"
              rules={[
                { required: true, message: "Please enter your card number" },
                {
                  pattern: /^\d{16}$/,
                  message: "Card number should be 16 digits",
                },
              ]}
            >
              <Input
                className="input-style"
                style={{ width: "100%" }}
                maxLength={16}
              />
            </Form.Item>
          </div> */}

          <div className="form-group">
            <Form.Item
              label="Card Number"
              name="cardNumber"
              rules={[
                { required: true, message: "Please enter your card number" },
                {
                  pattern: /^\d{16}$/,
                  message: "Card number should be exactly 16 digits",
                },
              ]}
            >
              <Input
                className="input-style"
                style={{ width: "100%" }}
                maxLength={16} // Ensures only 16 digits can be entered
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault(); // Prevents non-numeric characters
                  }
                }}
              />
            </Form.Item>
          </div>

          <div className="half-divs">
            <div className="form-group">
              <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[
                  { required: true, message: "Please select expiry date" },
                  { validator: validateExpiryDate }, // Check for past dates
                ]}
              >
                <Input
                  type="text"
                  className="input-style"
                  placeholder="MM/YY"
                  onChange={(e) => {
                    let value = e.target.value;

                    // Allow only numbers and "/" for MM/YYYY format
                    value = value.replace(/[^0-9/]/g, "");

                    // Automatically format input as MM/YYYY
                    if (value.length === 2 && !value.includes("/")) {
                      value += "/";
                    }

                    // Restrict length to 7 (MM/YYYY)
                    if (value.length > 7) {
                      value = value.slice(0, 7);
                    }

                    e.target.value = value;

                    // Trigger validation
                    form.validateFields(["expiryDate"]);
                  }}
                />
              </Form.Item>
            </div>

            <div className="form-group">
              <Form.Item
                label="CVV"
                name="cvv"
                className="cvvv"
                rules={[
                  { required: true, message: "Please enter your CVV" },
                  { pattern: /^\d{3}$/, message: "CVV should be 3 digits" },
                ]}
              >
                <InputNumber
                  className="input-style"
                  style={{ width: "100%" }}
                  maxLength={3}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault(); // Prevents non-numeric characters
                    }
                  }}
                />
              </Form.Item>
            </div>
          </div>

          {/* <div className="form-group">
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please enter your address" },
                { validator: validateNoSpaces }, // Check for spaces
              ]}
            >
              <Input className="input-style" />
            </Form.Item>
          </div> */}

          <div className="iconwithtext">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16 1.33887L4 6.6722V14.6722C4 22.0722 9.12 28.9922 16 30.6722C22.88 28.9922 28 22.0722 28 14.6722V6.6722L16 1.33887ZM13.3333 22.6722L8 17.3389L9.88 15.4589L13.3333 18.8989L22.12 10.1122L24 12.0055L13.3333 22.6722Z"
                fill="#10B981"
              />
            </svg>
            <div>
              <p>We never store your banking information.</p>
              <p> Update and remove your funding method anytime</p>
            </div>
          </div>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="submitbtn"
            >
              Deposit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default StepThree;
