import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getPaymentStatus } from '../../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

const PaymentSuccess = () => {
  const location = useLocation();
  const dispatch: any = useDispatch();
  // const { payload } = location?.state || {};
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const payData = useSelector((state: any) => state?.Payment?.payData);
  const merchantPlan = useSelector((state: any) => state?.Merchant?.merchantPlan);
  const user = useSelector((state: any) => state?.Auth?.user?.data);

  // const orderId = localStorage.getItem('snbla_order_id');
  const orderId = payData?.snbla_order_id;
  const transactionId = payData?.snbla_trans_id;
  const userId = user?.id;
  const email = user?.email;
  const merchantId = merchantPlan?.merchant?.id;
  const businessName = merchantPlan?.merchant?.businessName


  // const transactionId = localStorage.getItem('snbla_trans_id');ss
  // const userId = localStorage.getItem('userId');
  // const merchantId = localStorage.getItem('merchantId');
  // const email = localStorage.getItem('email');
  // const merchantPlan = JSON.parse(localStorage.getItem("merchantPlan"));
  // const businessName = merchantPlan?.merchant?.businessName


  const data = { orderId, transId: transactionId, userId: Number(userId), merchantId: Number(merchantId), email }

  const getOrderStatus = async () => {
    dispatch(
      getPaymentStatus(data, (response: any) => {
        console.warn("Payment status response ::::::::::::", response)
        if (response?.success || response.status === 200 || response?.status === 201) {
          console.log("response-pay status-", response)
          if (response?.paymentData?.status === "SETTLED" || response?.paymentData?.status === 'approved') {
            setIsPaymentSuccess(true);
            setTimeout(() => {
              navigate(`/partners-offer/${businessName}#automation-success`)
            }, 4000)
          }
        } else {
          console.error("Failed to fetch plans:", response);
          setIsPaymentSuccess(false)
        }
      })
    );
  }

  useEffect(() => {
    getOrderStatus()
  }, [])

  const navigate = useNavigate();
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("#automation-success", { state: { payload } });
  //   }, 1000)
  // }, [])


  return (
    <div className="plugin-body">
      <div className="processing">
        {isPaymentSuccess ? <svg width={76} height={76} viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M52 4.00537H24C12.9543 4.00537 4 12.9597 4 24.0054V52.0054C4 63.0511 12.9543 72.0054 24 72.0054H52C63.0457 72.0054 72 63.0511 72 52.0054V24.0054C72 12.9597 63.0457 4.00537 52 4.00537Z" stroke="#ECFDF5" strokeWidth={8} />
          <path d="M8 24.0054C8 15.1688 15.1634 8.00537 24 8.00537H52C60.8366 8.00537 68 15.1688 68 24.0054V52.0054C68 60.8419 60.8366 68.0054 52 68.0054H24C15.1634 68.0054 8 60.8419 8 52.0054V24.0054Z" fill="#D1FAE5" />
          <path d="M33.7342 43.2056L28.1342 37.6056L26.2676 39.4723L33.7342 46.9389L49.7342 30.9389L47.8676 29.0723L33.7342 43.2056Z" fill="#4E5663" />
        </svg> :
          <div>
            Wait or contact to admin after some times
          </div>}

        {
          isPaymentSuccess &&
          <div className="processing-info">
            <h2>Payment successful</h2>
          </div>
        }


        {
          !isPaymentSuccess &&
          <Button type='link' className='text-blue border border-blue px-4 text-base refresh-btn' onClick={getOrderStatus}>Refetch your status</Button>
        }

      </div>
    </div>
  )
}

export default PaymentSuccess