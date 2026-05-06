import React, { useState, useEffect, useRef } from "react";
import Button from "../common-components/buttons/Button";
import cardimg from "../../assets/img/dash-card.png";
import eilago from "../../assets/img/eilago.png";
import { use } from "i18next";
// import { useLabelContext } from "@headlessui/react/dist/components/label/label";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const WalletDetails = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const nextBtnRef = useRef(null);
  const { merchant } = location.state || {};
  const autoplayRef = useRef(null);

  useEffect(() => {
    autoplayRef.current = setInterval(handleNext, 4000); // Autoplay every 3 seconds

    // Clear autoplay when component unmounts
    return () => clearInterval(autoplayRef.current);
  }, []);

  const stopAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(handleNext, 3000); // Restart autoplay
  };

  const offerEarning = merchant?.merchants?.offer?.offerEarning || 8; // Default value
  const amounts = [
    { value: 8.0, description: "SAR 8.00", label: "Main Fee" },
    {
      value: 2.0,
      description: "SAR 2.00",
      label: "Credit card points or cashbacks",
    },
    {
      value: 0.75,
      description: "SAR 0.75",
      label: "Term deposit savings accounts",
    },
    {
      value: 0.1,
      description: "SAR 0.10",
      label: "Traditional savings accounts",
    },
  ];
  const multipliers = amounts.slice(1).map((item) => ({
    base: item.value,
    label: `${(offerEarning / item.value).toFixed(2)}x`, // Keeping the same calculation logic
    description: item.label, // Using the description from `amounts`
  }));

  // const amounts = [
  //   { value: 8.0, description: "SAR 8.00", label: "Main Fee" },
  //   {
  //     value: 2.0,
  //     description: "SAR 2.00",
  //     label: "Credit card points or cashbacks",
  //   },
  //   {
  //     value: 0.75,
  //     description: "SAR 0.75",
  //     label: "Term deposit savings accounts",
  //   },
  //   {
  //     value: 0.1,
  //     description: "SAR 0.10",
  //     label: "Traditional savings accounts",
  //   },
  // ];
  useEffect(() => {
    document.title = "Partner Offer | Snbla";
    if (activeIndex === 2) {
      // Assuming 2 is the last item
      nextBtnRef.current?.focus();
    }
  }, [activeIndex]);

  const handleActive = (index) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex === 3) {
        nextBtnRef.current?.focus(); // Focus Next button when at the last item
      }
      return nextIndex === 3 ? 0 : nextIndex; // Loop back to first item
    });
  };
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 < 0 ? 2 : prevIndex - 1)); // Loop back to last item
  };
  console.log("merchant", merchant);
  return (
    <>
      <div className="flex flex-col tab:gap-8 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="tab:text-[28px] text-xl font-semibold text-black ">
            Eilago Vacation Package
          </h1>
          <Button
            type="primary"
            onClick=""
            className="border border-bordercolor w-[40px] p-0 h-[40px] !hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.99967 6.66683C10.9163 6.66683 11.6663 5.91683 11.6663 5.00016C11.6663 4.0835 10.9163 3.3335 9.99967 3.3335C9.08301 3.3335 8.33301 4.0835 8.33301 5.00016C8.33301 5.91683 9.08301 6.66683 9.99967 6.66683ZM9.99967 8.3335C9.08301 8.3335 8.33301 9.0835 8.33301 10.0002C8.33301 10.9168 9.08301 11.6668 9.99967 11.6668C10.9163 11.6668 11.6663 10.9168 11.6663 10.0002C11.6663 9.0835 10.9163 8.3335 9.99967 8.3335ZM9.99967 13.3335C9.08301 13.3335 8.33301 14.0835 8.33301 15.0002C8.33301 15.9168 9.08301 16.6668 9.99967 16.6668C10.9163 16.6668 11.6663 15.9168 11.6663 15.0002C11.6663 14.0835 10.9163 13.3335 9.99967 13.3335Z"
                fill="#1F242E"
              />
            </svg>
          </Button>
        </div>
        <div className="flex flex-row gap-6 flex-wrap ">
          <div className="tab:w-[340px] w-full flex flex-col  gap-4">
            <div className="relative">
              <img
                src={merchant?.merchants.offer.coverImage}
                alt={cardimg}
                className="w-full xl:h-auto object-cover rounded-xl h-[200px]"
              />
              <div className="absolute left-5 bottom-5 p-2 bg-white rounded-lg">
                <img
                  src={merchant?.merchants.brandLogo}
                  alt={eilago}
                  className="h-[48px]"
                />
              </div>
            </div>
            <div className="flex gap-3 py-5 px-4 border border-bordercolor bg-white rounded-xl">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M33.334 10.8337H29.7007C29.884 10.317 30.0007 9.75033 30.0007 9.16699C30.0007 6.40033 27.7673 4.16699 25.0007 4.16699C23.2507 4.16699 21.734 5.06699 20.834 6.41699L20.0007 7.53366L19.1673 6.40033C18.2673 5.06699 16.7507 4.16699 15.0007 4.16699C12.234 4.16699 10.0007 6.40033 10.0007 9.16699C10.0007 9.75033 10.1173 10.317 10.3007 10.8337H6.66732C4.81732 10.8337 3.35065 12.317 3.35065 14.167L3.33398 32.5003C3.33398 34.3503 4.81732 35.8337 6.66732 35.8337H33.334C35.184 35.8337 36.6673 34.3503 36.6673 32.5003V14.167C36.6673 12.317 35.184 10.8337 33.334 10.8337ZM25.0007 7.50033C25.9173 7.50033 26.6673 8.25033 26.6673 9.16699C26.6673 10.0837 25.9173 10.8337 25.0007 10.8337C24.084 10.8337 23.334 10.0837 23.334 9.16699C23.334 8.25033 24.084 7.50033 25.0007 7.50033ZM15.0007 7.50033C15.9173 7.50033 16.6673 8.25033 16.6673 9.16699C16.6673 10.0837 15.9173 10.8337 15.0007 10.8337C14.084 10.8337 13.334 10.0837 13.334 9.16699C13.334 8.25033 14.084 7.50033 15.0007 7.50033ZM33.334 32.5003H6.66732V29.167H33.334V32.5003ZM33.334 24.167H6.66732V14.167H15.134L11.6673 18.8837L14.3673 20.8337L20.0007 13.167L25.634 20.8337L28.334 18.8837L24.8673 14.167H33.334V24.167Z"
                    fill="#9FA5B2"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1 ">
                <p className="text-black font-medium text-sm">
                  7% reward unlocked
                </p>
                <p className="text-black text-sm flex items-center gap-1">
                  Time&apos;s ticking on your
                  <span className="text-[#047857] text-xs text-medium flex items-center gap-1 bg-[#ECFDF5] rounded px-2 py-1">
                    +7%
                  </span>
                </p>
                <p className="text-black font-medium text-sm">
                  reward rate. Fund today!
                </p>
                <div className="flex gap-4 mt-3">
                  <Button
                    type="primary"
                    // onClick=""
                    className="border-bordercolor "
                  >
                    Purchase
                  </Button>
                  <Button type="secondry">
                    Add funds
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 py-5 px-4 border border-bordercolor bg-white rounded-xl">
              <div className="flex gap-2 items-center border-b border-bordercolor pb-3">
                <p>Automated Rules</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.33301 12.0002H8.66634V10.6668H7.33301V12.0002ZM7.99967 1.3335C4.31967 1.3335 1.33301 4.32016 1.33301 8.00016C1.33301 11.6802 4.31967 14.6668 7.99967 14.6668C11.6797 14.6668 14.6663 11.6802 14.6663 8.00016C14.6663 4.32016 11.6797 1.3335 7.99967 1.3335ZM7.99967 13.3335C5.05967 13.3335 2.66634 10.9402 2.66634 8.00016C2.66634 5.06016 5.05967 2.66683 7.99967 2.66683C10.9397 2.66683 13.333 5.06016 13.333 8.00016C13.333 10.9402 10.9397 13.3335 7.99967 13.3335ZM7.99967 4.00016C6.52634 4.00016 5.33301 5.1935 5.33301 6.66683H6.66634C6.66634 5.9335 7.26634 5.3335 7.99967 5.3335C8.73301 5.3335 9.33301 5.9335 9.33301 6.66683C9.33301 8.00016 7.33301 7.8335 7.33301 10.0002H8.66634C8.66634 8.50016 10.6663 8.3335 10.6663 6.66683C10.6663 5.1935 9.47301 4.00016 7.99967 4.00016Z"
                    fill="#D1D5DE"
                  />
                </svg>
                <Button
                  type="primary"
                  onClick=""
                  className="border border-bordercolor w-[40px] p-0 h-[40px] !hover:text-white ml-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15.8337 10.8332H10.8337V15.8332H9.16699V10.8332H4.16699V9.1665H9.16699V4.1665H10.8337V9.1665H15.8337V10.8332Z"
                      fill="#1F242E"
                    />
                  </svg>
                </Button>
              </div>
              <div className="flex gap-3 bg-[#F9FAFC] p-4 rounded-2xl">
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.59268 7.40033C7.40602 7.00699 6.83268 6.76033 6.83268 6.13366C6.83268 5.45366 7.57268 5.20699 8.03935 5.20699C8.91268 5.20699 9.23268 5.86699 9.30602 6.10033L10.3593 5.65366C10.2593 5.35366 9.81268 4.37366 8.66602 4.16033V3.33366H7.33268V4.17366C5.67935 4.54699 5.67268 6.08033 5.67268 6.14699C5.67268 7.66033 7.17268 8.08699 7.90602 8.35366C8.95935 8.72699 9.42602 9.06699 9.42602 9.70699C9.42602 10.4603 8.72602 10.7803 8.10602 10.7803C6.89268 10.7803 6.54602 9.53366 6.50602 9.38699L5.39935 9.83366C5.81935 11.2937 6.91935 11.687 7.33268 11.807V12.667H8.66602V11.8403C8.93268 11.7803 10.5993 11.447 10.5993 9.69366C10.5993 8.76699 10.1927 7.95366 8.59268 7.40033ZM1.99935 14.0003H0.666016V10.0003H4.66602V11.3337H3.01268C4.08602 12.9403 5.91935 14.0003 7.99935 14.0003C11.3127 14.0003 13.9993 11.3137 13.9993 8.00033H15.3327C15.3327 12.0537 12.0527 15.3337 7.99935 15.3337C5.51935 15.3337 3.32602 14.1003 1.99935 12.2203V14.0003ZM0.666016 8.00033C0.666016 3.94699 3.94602 0.666992 7.99935 0.666992C10.4793 0.666992 12.6727 1.90033 13.9993 3.78033V2.00033H15.3327V6.00033H11.3327V4.66699H12.986C11.9127 3.06033 10.0793 2.00033 7.99935 2.00033C4.68602 2.00033 1.99935 4.68699 1.99935 8.00033H0.666016Z"
                      fill="#9FA5B2"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1 ">
                  <p className="text-black font-medium text-sm">
                    Recurring deposit
                  </p>
                  <p className="text-black text-xs ">
                    SAR 250 deposit <span className="font-bold">+SAR 17.5</span>{" "}
                    in rewards every month
                  </p>
                </div>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M8.08711 5L6.91211 6.175L10.7288 10L6.91211 13.825L8.08711 15L13.0871 10L8.08711 5Z"
                      fill="#1F242E"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 py-5 px-4 border border-bordercolor bg-white rounded-xl">
              <div className="flex gap-2 items-center">
                <p>Transactions</p>
                <Link
                  to="/dashboard/wallet-transactions-details"
                  state={{ merchant }}
                  className="font-medium flex justify-center text-black items-center gap-1 ml-auto"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M8.08711 5L6.91211 6.175L10.7288 10L6.91211 13.825L8.08711 15L13.0871 10L8.08711 5Z"
                      fill="#1F242E"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="tab:w-[calc(100%-370px)] w-full">
            <div className="bg-white p-6 rounded-2xl border border-[#E9EBF0] w-full">
              <p className="text-xs text-[#686E7D] mb-3">Progress</p>
              <div className="flex gap-2 justify-between items-center mb-4">
                <p className="lg:text-[40px] text-2xl lg:leading-[36px] font-semibold text-black flex gap-2 items-end">
                  {merchant?.investedAmount} SAR
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11 18H13V16H11V18ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z"
                        fill="#D1D5DE"
                      />
                    </svg>
                  </span>
                  <span className="text-[#686E7D] lg:text-xl text-lg">
                    of {merchant?.targetAmount} SAR
                  </span>
                </p>
                <p className="text-sm text-gray-500"></p>
                <p className="text-sm text-gray-500 mt-1">
                  {merchant?.remainingAmount
                    ? Number(
                      ((merchant.targetAmount - merchant.remainingAmount) /
                        merchant.targetAmount) *
                      100
                    ).toFixed(2)
                    : "0.00"}
                  %
                </p>
              </div>
              <div className="h-[16px] w-full bg-[#F1F3F7] rounded-[4px] relative">
                <span
                  style={{ width: "10.56%" }}
                  className="absolute left-0 h-full bg-[#474DF4] rounded-tl-md rounded-bl-md border-r-4 border-[#10B981]"
                ></span>
              </div>
              <div className="mt-4 pb-4 border-b border-bordercolor">
                <div className="flex items-center gap-3 text-xs">
                  <p className="text-xs text-[#686E7D]">
                    <span className="bg-blue inline-block rounded-full size-[10px] "></span>{" "}
                    Deposits
                  </p>
                  <p className="text-xs text-[#686E7D]">
                    <span className=" bg-green-500 inline-block rounded-full size-[10px]"></span>{" "}
                    Rewards
                  </p>
                  <p className="text-xs text-[#686E7D]">
                    <span className=" bg-purple-500 inline-block rounded-full size-[10px]"></span>{" "}
                    Group Funds
                  </p>
                </div>
              </div>

              <div className="2xl:px-10 sm:px-4 px-0">
                <div className="mt-6 grid sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-2">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Every time you deposit
                    </p>
                    <div className="relative border border-bordercolor rounded-lg mt-2 px-6 py-2 flex items-center">
                      <span className="sm:text-xl text-lg font-semibold">
                        SAR
                      </span>
                      <input
                        type="text"
                        value="100"
                        className="text-[28px] font-semibold w-full outline-none bg-transparent px-2"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black flex gap-2">
                      You earn
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.333 4.33317H11.8797C11.953 4.1265 11.9997 3.89984 11.9997 3.6665C11.9997 2.55984 11.1063 1.6665 9.99967 1.6665C9.29967 1.6665 8.69301 2.0265 8.33301 2.5665L7.99967 3.01317L7.66634 2.55984C7.30634 2.0265 6.69967 1.6665 5.99967 1.6665C4.89301 1.6665 3.99967 2.55984 3.99967 3.6665C3.99967 3.89984 4.04634 4.1265 4.11967 4.33317H2.66634C1.92634 4.33317 1.33967 4.9265 1.33967 5.6665L1.33301 12.9998C1.33301 13.7398 1.92634 14.3332 2.66634 14.3332H13.333C14.073 14.3332 14.6663 13.7398 14.6663 12.9998V5.6665C14.6663 4.9265 14.073 4.33317 13.333 4.33317ZM9.99967 2.99984C10.3663 2.99984 10.6663 3.29984 10.6663 3.6665C10.6663 4.03317 10.3663 4.33317 9.99967 4.33317C9.63301 4.33317 9.33301 4.03317 9.33301 3.6665C9.33301 3.29984 9.63301 2.99984 9.99967 2.99984ZM5.99967 2.99984C6.36634 2.99984 6.66634 3.29984 6.66634 3.6665C6.66634 4.03317 6.36634 4.33317 5.99967 4.33317C5.63301 4.33317 5.33301 4.03317 5.33301 3.6665C5.33301 3.29984 5.63301 2.99984 5.99967 2.99984ZM13.333 12.9998H2.66634V11.6665H13.333V12.9998ZM13.333 9.6665H2.66634V5.6665H6.05301L4.66634 7.55317L5.74634 8.33317L7.99967 5.2665L10.253 8.33317L11.333 7.55317L9.94634 5.6665H13.333V9.6665Z"
                          fill="#059669"
                        />
                      </svg>
                    </p>
                    <div className="relative border border-[#6EE7B7] rounded-lg bg-[#D1FAE5] mt-2 px-6 py-2 flex items-center">
                      <span className="sm:text-xl text-lg font-semibold">
                        SAR
                      </span>
                      <input
                        type="text"
                        value={merchant?.merchants?.offer?.offerEarning}
                        step="0.01"
                        className="text-[28px] font-semibold w-full outline-none bg-transparent px-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 py-4 px-5 bg-[#E0F2FE] border border-[#7DD3FC] rounded-lg flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <rect width="32" height="32" rx="8" fill="#2A52BE" />
                    <path
                      d="M27.2775 12.2633V22.9648L21.166 21.6303V11.7334C21.166 11.0619 20.8657 10.4443 20.3387 10.0306C19.8089 9.6226 19.1402 9.48093 18.4913 9.64243L8.93164 12.0451V7.99908L18.667 5.5454C20.7467 5.02123 22.917 5.48023 24.6142 6.80341C26.3085 8.12375 27.2775 10.1128 27.2775 12.2661V12.2633Z"
                      fill="white"
                    />
                    <path
                      d="M21.1666 21.6302V26.8095L9.73685 24.3162C6.7675 23.6673 4.61133 20.9898 4.61133 17.9553V13.1358L8.93218 12.0449V16.7568C8.93218 18.0346 9.84168 19.1595 11.0912 19.4315L21.1666 21.6273V21.6302Z"
                      fill="white"
                    />
                  </svg>
                  <p className="text-sm text-[#075985] ml-3">
                    That&apos;s{" "}
                    <span className="font-semibold">
                      {multipliers[activeIndex]?.label}{" "}
                      {multipliers[activeIndex]?.description}
                    </span>{" "}
                  </p>
                </div>

                <div className="flex sm:gap-4 gap-2 items-end mt-4 px-7 pb-4 relative">
                  <div className="w-full text-center flex flex-col gap-3 ">
                    <p className="font-medium text-black items-center flex gap-2 text-center mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.333 4.33317H11.8797C11.953 4.1265 11.9997 3.89984 11.9997 3.6665C11.9997 2.55984 11.1063 1.6665 9.99967 1.6665C9.29967 1.6665 8.69301 2.0265 8.33301 2.5665L7.99967 3.01317L7.66634 2.55984C7.30634 2.0265 6.69967 1.6665 5.99967 1.6665C4.89301 1.6665 3.99967 2.55984 3.99967 3.6665C3.99967 3.89984 4.04634 4.1265 4.11967 4.33317H2.66634C1.92634 4.33317 1.33967 4.9265 1.33967 5.6665L1.33301 12.9998C1.33301 13.7398 1.92634 14.3332 2.66634 14.3332H13.333C14.073 14.3332 14.6663 13.7398 14.6663 12.9998V5.6665C14.6663 4.9265 14.073 4.33317 13.333 4.33317ZM9.99967 2.99984C10.3663 2.99984 10.6663 3.29984 10.6663 3.6665C10.6663 4.03317 10.3663 4.33317 9.99967 4.33317C9.63301 4.33317 9.33301 4.03317 9.33301 3.6665C9.33301 3.29984 9.63301 2.99984 9.99967 2.99984ZM5.99967 2.99984C6.36634 2.99984 6.66634 3.29984 6.66634 3.6665C6.66634 4.03317 6.36634 4.33317 5.99967 4.33317C5.63301 4.33317 5.33301 4.03317 5.33301 3.6665C5.33301 3.29984 5.63301 2.99984 5.99967 2.99984ZM13.333 12.9998H2.66634V11.6665H13.333V12.9998ZM13.333 9.6665H2.66634V5.6665H6.05301L4.66634 7.55317L5.74634 8.33317L7.99967 5.2665L10.253 8.33317L11.333 7.55317L9.94634 5.6665H13.333V9.6665Z"
                          fill="#059669"
                        ></path>
                      </svg>
                      SAR {merchant?.merchants?.offer?.offerEarning}.00
                    </p>
                    <div className="w-full h-36 bg-blue"></div>
                    <div className="lg:h-[50px] h-[80px]">
                      <svg
                        className="mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          width="24"
                          height="24"
                          rx="5"
                          fill="#2A52BE"
                        ></rect>
                        <path
                          d="M20.4587 9.19734V17.2235L15.875 16.2226V8.79996C15.875 8.29633 15.6498 7.83308 15.2545 7.52283C14.8571 7.21683 14.3556 7.11058 13.869 7.2317L6.69922 9.03371V5.99919L14.0007 4.15893C15.5605 3.7658 17.1883 4.11005 18.4611 5.10243C19.7319 6.09269 20.4587 7.58445 20.4587 9.19946V9.19734Z"
                          fill="white"
                        ></path>
                        <path
                          d="M15.8754 16.2226V20.1071L7.30313 18.2371C5.07612 17.7505 3.45898 15.7424 3.45898 13.4665V9.85182L6.69962 9.03369V12.5676C6.69962 13.526 7.38175 14.3696 8.31888 14.5736L15.8754 16.2205V16.2226Z"
                          fill="white"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {[2.0, 0.75, 0.1].map((amount, index) => (
                    <div
                      key={index}
                      className="w-full text-center flex flex-col gap-3 cursor-pointer"
                      onClick={() => handleActive(index)}
                    >
                      <p
                        className={`font-medium text-sm flex gap-2 text-center mx-auto ${activeIndex === index ? "text-black" : "text-gray-500"
                          }`}
                      >
                        SAR {amount.toFixed(2)}
                      </p>
                      <div
                        className={`w-full ${index === 0 ? "h-16" : index === 1 ? "h-8" : "h-1"
                          } ${activeIndex === index ? "active-bar" : "bg-[#F1F3F7]"
                          }`}
                      ></div>
                      <div
                        className={`text-sm lg:h-[50px] h-[80px] ${activeIndex === index ? "text-dark" : "text-inactive"
                          }`}
                      >
                        {index === 0
                          ? "Credit card points or cashbacks"
                          : index === 1
                            ? "Term deposit savings accounts"
                            : "Traditional savings accounts"}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between mt-4 navigigationaut">
                    <button
                      onClick={handlePrev}
                      className="prev-btn"
                      disabled={activeIndex === 0} // Disable Prev when at the first item
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M10.4698 4.94513L9.52979 4.00513L5.52979 8.00513L9.52979 12.0051L10.4698 11.0651L7.41645 8.00513L10.4698 4.94513Z"
                          fill="#686E7D"
                        />
                      </svg>
                    </button>
                    <button
                      ref={nextBtnRef} // Ref to focus on Next button
                      onClick={handleNext}
                      className="next-btn"
                      disabled={activeIndex === 2} // Disable Next when at the last item
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6.46979 4.00513L5.52979 4.94513L8.58312 8.00513L5.52979 11.0651L6.46979 12.0051L10.4698 8.00513L6.46979 4.00513Z"
                          fill="#686E7D"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[#F9FAFC] border border-[#F1F3F7] rounded-2xl mt-2">
                  <p className="text-sm text-black font-medium flex items-center justify-between gap-2 text-center">
                    <span className="w-full border-t border-[#F1F3F7]"></span>
                    <span className="min-w-[100px]">Compared to</span>
                    <span className="w-full border-t border-[#F1F3F7]"></span>
                  </p>

                  {multipliers[activeIndex] && (
                    <p className="txt-sm text-black flex gap-2 mt-3 flex-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M16.667 3.3335H3.33366C2.40866 3.3335 1.67533 4.07516 1.67533 5.00016L1.66699 15.0002C1.66699 15.9252 2.40866 16.6668 3.33366 16.6668H16.667C17.592 16.6668 18.3337 15.9252 18.3337 15.0002V5.00016C18.3337 4.07516 17.592 3.3335 16.667 3.3335ZM16.667 15.0002H3.33366V10.0002H16.667V15.0002ZM16.667 6.66683H3.33366V5.00016H16.667V6.66683Z"
                          fill="#1F242E"
                        />
                      </svg>
                      <span className="font-semibold">
                        {multipliers[activeIndex].base} SAR
                      </span>{" "}
                      of value in {multipliers[activeIndex].description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletDetails;
