import { Result } from 'antd';
import React, { useEffect } from 'react'
import homepageImage from "../../assets/img/Homepage.png";
import { useNavigate } from 'react-router-dom';
import Button from '../../layouts/common-components/buttons/Button';

const SuccessPayment = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Success | Snbla";
  }, []);
  return (
    <>
      <section
        className="relative bg-no-repeat md:py-secpadding pt-[80px] pb-[40px]"
        style={{
          backgroundImage: `url(${homepageImage})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="container mx-auto 2xl:max-w-screen-xl flex flex-col lg:items-center lg:flex-col lg:gap-16 gap-8 sm:px-5 px-2">
          <div className="max-w-4xl sm:px-4 px-0 mx-auto flex-1">
            <h1 className="tab:mb-5 mb-3 tab:mt-4 mt-3 xl:text-[60px] lg:text-[40px] md:text-4xl text-2xl lg:font-extrabold font-bold  xl:leading-[72px] lg:leading-[52px] text-black tracking-[-1px]">
              Success
            </h1>
          </div>
        </div>
      </section>
      <Result
        status="success"
        title="Payment Successful!"
        subTitle="Your payment was processed successfully. Thank you for your purchase!"
        extra={[
          <div className="flex justify-center" key="button-wrapper">
            <Button
              className="text-center"
              type="secondary"
              onClick={() => navigate("/")}
            >
              Back Home
            </Button>
          </div>,
        ]}
      />
    </>
  );
}

export default SuccessPayment
