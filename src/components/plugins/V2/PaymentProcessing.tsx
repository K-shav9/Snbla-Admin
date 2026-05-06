import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { captureRediectPayment } from '../../../actions/user';
import { Flex, Progress } from 'antd';

const PaymentProcessing = () => {
  const location = useLocation();
  const { payload, data } = location?.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  const { loading } = useSelector((state: any) => state.General);
  const payData = useSelector((state: any) => state?.Payment?.payData);
  const merchantId = useSelector((state: any) => state?.Merchant?.merchantPlan?.merchant?.id);
  const user = useSelector((state: any) => state?.Auth?.user?.data);

  useEffect(() => {
    const paymentDetails = {
      // transId: localStorage.getItem("snbla_trans_id"),
      // email: localStorage.getItem("email"),
      // userId: localStorage.getItem("userId"),
      // merchantId: localStorage.getItem("merchantId"),
      // orderId: localStorage.getItem("snbla_order_id"),

      // const user = useSelector((state: any) => state?.Auth);

      merchantId,
      userId: user?.id,
      transId: payData?.snbla_trans_id,
      email: user?.email,
      orderId: payData?.snbla_order_id,
    };

    const isValid = Object.values(paymentDetails).some(
      (val) => val && val !== "undefined"
    );

    if (isValid) {
      // Simulate progress increment over 3 seconds
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 5; // Increment progress by 10% every 300ms
        });
      }, 2000);

      // Cleanup intervals and timeouts
      return () => {
        clearInterval(interval);
      };
    }
  }, [navigate, payload]);

  useEffect(() => {
    if (progress === 100) {
      navigate("#payment-success");
    }
  }, [progress])

  return (
    <div className="plugin-body">
      <div className="processing">
        <svg width={60} height={60} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 16.0054C0 7.16881 7.16344 0.00537109 16 0.00537109H44C52.8366 0.00537109 60 7.16882 60 16.0054V44.0054C60 52.8419 52.8366 60.0054 44 60.0054H16C7.16344 60.0054 0 52.8419 0 44.0054V16.0054Z" fill="#E9EBF0" />
          <path d="M22 16.6719V24.6719H22.0133L22 24.6852L27.3333 30.0052L22 35.3385L22.0133 35.3519H22V43.3385H38V35.3519H37.9867L38 35.3385L32.6667 30.0052L38 24.6852L37.9867 24.6719H38V16.6719H22ZM35.3333 36.0052V40.6719H24.6667V36.0052L30 30.6719L35.3333 36.0052ZM30 29.3385L24.6667 24.0052V19.3385H35.3333V24.0052L30 29.3385Z" fill="#4E5663" />
        </svg>
        <div className="processing-info">
          <h2>Processing deposit</h2>
          <h4>This might take a few seconds</h4>
        </div>
        <Flex gap="small" vertical>
          <Progress
            percent={progress}
            percentPosition={{ align: 'end', type: 'inner' }}
            size={[300, 20]}
            strokeColor="#808080"
          />
        </Flex>
      </div>
    </div>
  );
};

export default PaymentProcessing;