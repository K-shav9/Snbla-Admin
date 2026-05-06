import React, { useState, useEffect } from 'react'
import homepageImage from "../assets/img/Homepage.png";
import aov from "../assets/img/aov.png";
import Encourage from "../assets/img/Encourage.png";
import Expand from "../assets/img/Expand.png";
import Unlock from "../assets/img/Unlock.png";
import Seamless from "../assets/img/Seamless.png";
import Incentivize from "../assets/img/Incentivize.png";
import southafrica from "../assets/img/southafrica.png";
import Button from "./common-components/buttons/Button";
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import RequestMerchant from '../components/AuthUser/RequestMerchant/RequestMerchant';
import { useLanguagePicker } from '../hooks/useLanguagePicker';

const Resources = () => {
  useEffect(() => {
    document.title = "Resource | Snbla";
  }, []);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignup = () => {
    navigate("/signup");
  };

    const showModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
    const lang = useLanguagePicker();

  return (
    <>
      <section
        className="relative bg-no-repeat xl:pt-[160px] md:pt-secpadding pt-[80px]"
        style={{
          backgroundImage: `url(${homepageImage})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="container mx-auto 2xl:max-w-screen-xl flex flex-col lg:items-center lg:flex-col lg:gap-16 gap-8 sm:px-5 px-2">
          <div className="text-center max-w-4xl sm:px-4 px-0 mx-auto flex-1">
            <div className="flex max-w-max items-center rounded-full bg-white border border-bordercolor gap-2 sm:px-3 px-2 py-2 mx-auto">
              <p className="text-sm font-medium text-black">Resources</p>
              <p className="text-bordercolor">|</p>
              <p className="text-sm font-medium text-blue">Read</p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.08748 5L6.91248 6.175L10.7291 10L6.91248 13.825L8.08748 15L13.0875 10L8.08748 5Z"
                    fill="#474DF4"
                  />
                </svg>
              </span>
            </div>

            <h1 className="tab:mb-5 mb-3 tab:mt-4 mt-3 xl:text-[60px] lg:text-[40px] md:text-4xl text-2xl lg:font-extrabold font-bold  xl:leading-[72px] lg:leading-[52px] text-black tracking-[-1px]">
              Resource
            </h1>
            <p className="sm:text-lg text-base font-normal">
              Snbla Wallet gives your customers more than just rewards—it
              empowers them to save for their next big purchase, with your brand
              supporting them at every step
            </p>
          </div>
        </div>
      </section>
      <section className=" xl:py-secpadding tab:py-96 py-40">
        <div className="mx-auto 2xl:max-w-screen-xl container sm:px-5 px-2 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-black md:text-4xl">
            Boost Sales and Customer Engagement
          </h2>
          <p className="xl:text-lg text-base font-normal xl:mb-[96px] mb-[48px]">
            Snbla Wallet helps drive higher customer spending, frequent
            purchases, and <br />
            taps into new customer segments like Gen Z.
          </p>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center tab:grid-cols-3 xl:gap-10 gap-6">
            {/* Card 1 */}
            <div className="border border-[#E9EBF0] rounded-[16px] xl:p-[40px] p-[20px] flex flex-col xl:gap-10  gap-4 items-start">
              <div className="flex items-center justify-center xl:h-[289px] h-auto w-full rounded-[12px]">
                <img
                  src={aov}
                  alt="aov"
                  className="size-[200px] rounded-[30px]"
                />
              </div>
              <div className={`${lang === "ar" ? "text-right" : "text-left"}`}>
                <h3 className="text-lg font-semibold text-black mb-3">
                  Increase AOV by Up to 55%
                </h3>
                <p>
                  Customers who save ahead of time spend significantly more on
                  each purchase.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border border-[#E9EBF0] rounded-[16px] xl:p-[40px] p-[20px] flex flex-col xl:gap-10  gap-4 items-start">
              <div className="flex items-center justify-center xl:h-[289px] h-auto w-full rounded-[12px]">
                <img
                  src={Encourage}
                  alt="Encourage"
                  className="size-[200px] rounded-[30px]"
                />
              </div>
              <div className={`${lang === "ar" ? "text-right" : "text-left"}`}>
                <h3 className="text-lg font-semibold text-black mb-3">
                  Increase AOV by Up to 55%
                </h3>
                <p>
                  Customers who save ahead of time spend significantly more on
                  each purchase.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="border border-[#E9EBF0] rounded-[16px] xl:p-[40px] p-[20px] flex flex-col xl:gap-10  gap-4 items-start">
              <div className="flex items-center justify-center xl:h-[289px] h-auto w-full rounded-[12px]">
                <img
                  src={Expand}
                  alt="Expand"
                  className="size-[200px] rounded-[30px]"
                />
              </div>
              <div className={`${lang === "ar" ? "text-right" : "text-left"}`}>
                <h3 className="text-lg font-semibold text-black mb-3">
                  Increase AOV by Up to 55%
                </h3>
                <p>
                  Customers who save ahead of time spend significantly more on
                  each purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" xl:py-secpadding tab:py-96 py-40  relative">
        <div className="mx-auto 2xl:max-w-screen-xl container text-left sm:px-5 px-2">
          <div className="flex flex-col-reverse md:flex-row items-center tab:gap-24 md:gap-8 gap-6">
            {/* Left Side: Image and Content */}
            <div
              className={`w-full md:w-1/2 mt-0 lg:mt-0 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              <h2 className="text-2xl tab:text-4xl font-semibold text-black mb-5">
                Unlock Exclusive Savings for Your Customers
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                With every deposit, customers grow a dedicated balance to spend
                at your store, making it easier for them to save and shop with
                you—again and again.
              </p>
            </div>
            {/* Right Side: How It Works */}

            <div className="w-full md:w-1/2">
              <div className="flex justify-center lg:mt-0 lg:justify-end">
                <img
                  src={Unlock}
                  alt="create-account"
                  className="size-auto border border-borderlight rounded-[28px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" xl:py-secpadding tab:py-96 py-40  relative">
        <div className="mx-auto 2xl:max-w-screen-xl container text-left sm:px-5 px-2">
          <div className="flex flex-col md:flex-row items-center tab:gap-24 md:gap-8 gap-6">
            {/* Right Side: How It Works */}

            <div className="w-full md:w-1/2">
              <div className="flex justify-center lg:mt-0 lg:justify-start">
                <img
                  src={Seamless}
                  alt="create-account"
                  className="size-auto border border-borderlight rounded-[28px]"
                />
              </div>
            </div>
            {/* Left Side: Image and Content */}
            <div
              className={`w-full md:w-1/2 mt-0 lg:mt-0 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              <h2 className="text-2xl tab:text-4xl font-semibold text-black mb-5">
                Seamless Integration, Ready When You Are
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                Snbla provides flexible, easy-to-deploy solutions, from low-code
                tools to full API integrations, making it simple to connect and
                start offering savings to your customers.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" xl:py-secpadding tab:py-96 py-40">
        <div className="mx-auto 2xl:max-w-screen-xl container sm:px-5 px-2 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-black md:text-4xl">
            Flexible Ways to Fund
          </h2>
          <p className="xl:text-lg text-base font-normal xl:mb-[96px] mb-[48px]">
            We’ve made it easy for your customers to add funds to their Snbla
            wallet,
            <br /> offering options that fit their lifestyle.
          </p>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center xl:gap-16 gap-6">
            {/* Recurring Deposits */}
            <div className={`${lang === "ar" ? "text-right" : "text-left"} flex items-start gap-4 `}>
              <div className="relative bg-[#ECF2FF] w-[48px] h-[48px] rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.89 11.1049C11.11 10.5149 10.25 10.1449 10.25 9.20488C10.25 8.18488 11.36 7.81488 12.06 7.81488C13.37 7.81488 13.85 8.80488 13.96 9.15488L15.54 8.48488C15.39 8.03488 14.72 6.56488 13 6.24488V5.00488H11V6.26488C8.52 6.82488 8.51 9.12488 8.51 9.22488C8.51 11.4949 10.76 12.1349 11.86 12.5349C13.44 13.0949 14.14 13.6049 14.14 14.5649C14.14 15.6949 13.09 16.1749 12.16 16.1749C10.34 16.1749 9.82 14.3049 9.76 14.0849L8.1 14.7549C8.73 16.9449 10.38 17.5349 11 17.7149V19.0049H13V17.7649C13.4 17.6749 15.9 17.1749 15.9 14.5449C15.9 13.1549 15.29 11.9349 12.89 11.1049ZM3 21.0049H1V15.0049H7V17.0049H4.52C6.13 19.4149 8.88 21.0049 12 21.0049C16.97 21.0049 21 16.9749 21 12.0049H23C23 18.0849 18.08 23.0049 12 23.0049C8.28 23.0049 4.99 21.1549 3 18.3349V21.0049ZM1 12.0049C1 5.92488 5.92 1.00488 12 1.00488C15.72 1.00488 19.01 2.85488 21 5.67488V3.00488H23V9.00488H17V7.00488H19.48C17.87 4.59488 15.12 3.00488 12 3.00488C7.03 3.00488 3 7.03488 3 12.0049H1Z"
                    fill="#474DF4"
                  />
                </svg>
              </div>
              <div className="flex flex-col sm:gap-3 gap-2">
                <h4 className="text-lg font-semibold text-black">
                  Recurring Deposits
                </h4>
                <p className="text-gray-600">
                  Set it and forget it! Schedule automatic deposits on a weekly,
                  bi-weekly, or monthly basis. Your savings grow effortlessly
                  while you focus on other things.
                </p>
              </div>
            </div>

            {/* One-time Deposits */}
            <div className={`${lang === "ar" ? "text-right" : "text-left"} flex items-start gap-4 `}>
              <div className="relative bg-[#ECF2FF] w-[48px] h-[48px] rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.3902 10.9049C10.1202 10.3149 9.39016 9.70488 9.39016 8.75488C9.39016 7.66488 10.4002 6.90488 12.0902 6.90488C13.8702 6.90488 14.5302 7.75488 14.5902 9.00488H16.8002C16.7302 7.28488 15.6802 5.70488 13.5902 5.19488V3.00488H10.5902V5.16488C8.65016 5.58488 7.09016 6.84488 7.09016 8.77488C7.09016 11.0849 9.00016 12.2349 11.7902 12.9049C14.2902 13.5049 14.7902 14.3849 14.7902 15.3149C14.7902 16.0049 14.3002 17.1049 12.0902 17.1049C10.0302 17.1049 9.22016 16.1849 9.11016 15.0049H6.91016C7.03016 17.1949 8.67016 18.4249 10.5902 18.8349V21.0049H13.5902V18.8549C15.5402 18.4849 17.0902 17.3549 17.0902 15.3049C17.0902 12.4649 14.6602 11.4949 12.3902 10.9049Z"
                    fill="#474DF4"
                  />
                </svg>
              </div>
              <div className="flex flex-col  sm:gap-3 gap-2">
                <h4 className="text-lg font-semibold text-black">
                  One-time Deposits
                </h4>
                <p className="text-gray-600">
                  Add money whenever it suits you, giving you complete
                  flexibility to save at your own pace.
                </p>
              </div>
            </div>

            {/* Round-ups Deposits */}
            <div className={`${lang === "ar" ? "text-right" : "text-left"} flex items-start gap-4 `}>
              <div className="relative bg-[#ECF2FF] w-[48px] h-[48px] rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 4.00488C10.58 4.00488 7 7.58488 7 12.0049C7 16.4249 10.58 20.0049 15 20.0049C19.42 20.0049 23 16.4249 23 12.0049C23 7.58488 19.42 4.00488 15 4.00488ZM15 18.0049C11.69 18.0049 9 15.3149 9 12.0049C9 8.69488 11.69 6.00488 15 6.00488C18.31 6.00488 21 8.69488 21 12.0049C21 15.3149 18.31 18.0049 15 18.0049Z"
                    fill="#474DF4"
                  />
                  <path
                    d="M3 12.0049C3 9.39488 4.67 7.17488 7 6.35488V4.26488C3.55 5.15488 1 8.27488 1 12.0049C1 15.7349 3.55 18.8549 7 19.7449V17.6549C4.67 16.8349 3 14.6149 3 12.0049Z"
                    fill="#474DF4"
                  />
                </svg>
              </div>
              <div className="flex flex-col  sm:gap-3 gap-2">
                <h4 className="text-lg font-semibold text-black">
                  Round-ups Deposits
                </h4>
                <p className="text-gray-600">
                  Automatically round up your everyday purchases to the nearest
                  riyal and save the difference.
                </p>
              </div>
            </div>

            {/* Crowd Savings Deposits */}
            <div className={`${lang === "ar" ? "text-right" : "text-left"} flex items-start gap-4 `}>
              <div className="relative bg-[#ECF2FF] w-[48px] h-[48px] rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 16.5049C5.10457 16.5049 6 15.6095 6 14.5049C6 13.4003 5.10457 12.5049 4 12.5049C2.89543 12.5049 2 13.4003 2 14.5049C2 15.6095 2.89543 16.5049 4 16.5049Z"
                    fill="#474DF4"
                  />
                  <path
                    d="M1.22 18.0849C0.48 18.4049 0 19.1249 0 19.9349V21.5049H4.5V19.8949C4.5 19.0649 4.73 18.2849 5.13 17.6049C4.76 17.5449 4.39 17.5049 4 17.5049C3.01 17.5049 2.07 17.7149 1.22 18.0849Z"
                    fill="#474DF4"
                  />
                  <path
                    d="M20 16.5049C21.1046 16.5049 22 15.6095 22 14.5049C22 13.4003 21.1046 12.5049 20 12.5049C18.8954 12.5049 18 13.4003 18 14.5049C18 15.6095 18.8954 16.5049 20 16.5049Z"
                    fill="#474DF4"
                  />
                  <path
                    d="M22.78 18.0849C21.93 17.7149 20.99 17.5049 20 17.5049C19.61 17.5049 19.24 17.5449 18.87 17.6049C19.27 18.2849 19.5 19.0649 19.5 19.8949V21.5049H24V19.9349C24 19.1249 23.52 18.4049 22.78 18.0849Z"
                    fill="#474DF4"
                  />
                  <path
                    d="M16.24 17.1549C15.07 16.6349 13.63 16.2549 12 16.2549C10.37 16.2549 8.93 16.6449 7.76 17.1549C6.68 17.6349 6 18.7149 6 19.8949V21.5049H18V19.8949C18 18.7149 17.32 17.6349 16.24 17.1549Z"
                    fill="#474DF4"
                  />
                  <path
                    d="M9 12.5049C9 14.1649 10.34 15.5049 12 15.5049C13.66 15.5049 15 14.1649 15 12.5049C15 10.8449 13.66 9.50488 12 9.50488C10.34 9.50488 9 10.8449 9 12.5049Z"
                    fill="#474DF4"
                  />
                  <path
                    d="M2.48 11.3649C2.17 10.6049 2 9.86488 2 9.10488C2 6.52488 4.02 4.50488 6.6 4.50488C9.28 4.50488 10.42 6.24488 12 8.09488C13.57 6.26488 14.7 4.50488 17.4 4.50488C19.98 4.50488 22 6.52488 22 9.10488C22 9.86488 21.83 10.6049 21.52 11.3649C22.17 11.6749 22.7 12.1849 23.05 12.8049C23.65 11.6049 24 10.3849 24 9.10488C24 5.40488 21.1 2.50488 17.4 2.50488C15.31 2.50488 13.31 3.47488 12 5.01488C10.69 3.47488 8.69 2.50488 6.6 2.50488C2.9 2.50488 0 5.40488 0 9.10488C0 10.3849 0.35 11.6049 0.96 12.8049C1.31 12.1849 1.84 11.6749 2.48 11.3649Z"
                    fill="#474DF4"
                  />
                </svg>
              </div>
              <div className="flex flex-col  sm:gap-3 gap-2">
                <h4 className="text-lg font-semibold text-black">
                  Crowd Savings Deposits
                </h4>
                <p className="text-gray-600">
                  Let friends and family contribute directly to your wallet,
                  helping you reach your savings goals faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" xl:py-secpadding tab:py-96 py-40  relative">
        <div className="mx-auto 2xl:max-w-screen-xl container text-left sm:px-5 px-2">
          <div className="flex flex-col md:flex-row items-center tab:gap-24 md:gap-8 gap-6">
            {/* Right Side: How It Works */}

            <div className="w-full md:w-1/2">
              <div className="flex justify-center lg:mt-0 lg:justify-start">
                <img
                  src={Incentivize}
                  alt="create-account"
                  className="size-auto border border-borderlight rounded-[28px]"
                />
              </div>
            </div>
            {/* Left Side: Image and Content */}
            <div className={`${lang === "ar" ? "text-right" : "text-left"} w-full md:w-1/2 mt-0 lg:mt-0`}>
              <h2 className="text-2xl tab:text-4xl font-semibold text-black mb-5">
                Incentivize Customers to Save
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                Boost loyalty and encourage spending by offering rewards for
                every deposit customers make toward their goals. These rewards
                grow with each contribution and can be redeemed exclusively at
                checkout, making saving even more rewarding.
              </p>
            </div>
          </div>
        </div>
      </section>
      <RequestMerchant openModal={isModalOpen} closeModal={closeModal} />
    </>
  );
}

export default Resources
