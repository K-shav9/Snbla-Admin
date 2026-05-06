import React, { useEffect, useRef, useState } from "react";
import homepageImage from "../assets/img/Homepage.png";
import eilago from "../assets/img/eilago.png";
import andLogo from "../assets/img/and.png";
import snblaLogo from "../assets/img/snbla-logo.png";
import openaccount from "../assets/img/open-account.png";
import Button from './common-components/buttons/Button';
import Newsletter from './common-components/Newsletter';
import { useNavigate } from 'react-router-dom';
import PluginModalWrapper from './common-components/PluginWrappper/PluginModalWrapper';
import { useLocation } from "react-router-dom";
import { getMerchantPlan } from '../actions/merchant';
import { useDispatch, UseDispatch } from 'react-redux';
import { Modal } from "antd";
import ReactPlayer from "react-player";
import { resetPayData } from "../store/Auth/payment";
import { resetMerchantPlan } from "../store/Auth/merchant";
import { getUrlToken } from "../utils/url-hash-params";

const Partnersoffer = () => {
  const [pluginModal, setOpenPluginModal] = useState(false);
  const [data, setData] = useState<any>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const nextBtnRef = useRef(null);
  const autoplayRef = useRef(null);



  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const token = getUrlToken(location?.search);

  // const { merchant } = location.state || {}; // Extract merchant safely
  // console.log("merchant :::::::", merchant)

  const merchantId = Number(localStorage.getItem("m_id"));

  const fetchPlanByMerchantId = async () => {
    dispatch(
      getMerchantPlan(
        { merchantId },
        (response: any) => {
          // console.log("partnet offer :::::::", response);
          // merchant?.merchant?.id
          if (response.status === 200 || response?.status === 201) {
            setData(response?.data);
            // localStorage.setItem(
            //   "merchantPlan",
            //   JSON.stringify(response?.data)
            // );
          } else {
            console.error("Failed to fetch plans:", response);
          }
        }
      )
    );
  };

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    fetchPlanByMerchantId();
  }, []);



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

  // handleShowModal = ()=>{
  //   localStorage.setItem("modal", true);
  //   setOpenPluginModal(true)
  // }

  useEffect(() => {
    autoplayRef.current = setInterval(handleNext, 4000); // Autoplay every 3 seconds

    // Clear autoplay when component unmounts
    return () => clearInterval(autoplayRef.current);
  }, []);

  const stopAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(handleNext, 3000); // Restart autoplay
  };
  const offerEarning = data?.offerEarning || 8; // Default value

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
  useEffect(() => {
    document.title = "Partner Offer | Snbla";
    if (activeIndex === 2) {
      // Assuming 2 is the last item
      nextBtnRef.current?.focus();
    }
  }, [activeIndex]);




  return (
    <>
      <section
        className="relative bg-cover bg-no-repeat xl:pt-[160px] md:pt-secpadding pt-[50px] tab:pb-80 pb-40"
        style={{ backgroundImage: `url(${homepageImage})` }}
      >
        <div className="container mx-auto 2xl:max-w-screen-xl flex flex-col lg:items-center lg:flex-col lg:gap-16 gap-8 sm:px-5 px-2">
          <div className="text-center max-w-4xl sm:px-4 px-0 mx-auto flex-1">
            {/* <div className="text-center mb-4"> */}
            {/* <img src={data?.data?.promoPicture} alt="eilago" className="size-auto mx-auto " /> */}
            {/* <h1>{data?.data?.merchant?.businessName}</h1> */}
            {/* </div> */}
            <div className="text-center mb-4">
              {data?.merchant?.brandLogo ? (
                <img
                  src={data?.merchant?.brandLogo}
                  className="w-[100px] mx-auto"
                  alt="Brand Logo"
                />
              ) : (
                <h1 className="text-xl font-bold">
                  {data?.merchant?.businessName}
                </h1>
              )}
            </div>
            <h1 className="tab:mb-5 mb-3 xl:text-[60px] lg:text-[40px] md:text-4xl text-2xl lg:font-extrabold font-bold  xl:leading-[72px] lg:leading-[52px] text-black tracking-[-1px]">
              Save now and get up {data?.offerEarning}% off <br /> your next
              booking with {data?.merchant?.businessName}!
              {/* {data?.data?.pageTitle} */}
            </h1>
            <p className="sm:text-lg text-base font-normal">
              Snbla helps you save, and {data?.merchant?.businessName} helps you
              pay by offering up to &nbsp;
              {data?.offerEarning}% cash <br /> reward on every deposit you make
              for your next flight
            </p>
            <div className="text-center tab:mt-12 mt-4">
              <Button
                type="secondry"
                className="max-w-max mx-auto"
                // eslint-disable-next-line no-undef
                onClick={() => setOpenPluginModal(true)}
                Show
                More
              >
                Start Saving
              </Button>
            </div>
          </div>

          {data?.demoVideo && (
            <div className="flex justify-center items-center">
              <div className="relative w-full">
                <div className="relative xl:w-[1024px] xl:h-[642px] md:h-[500px] h-[300px]  w-full md:p-5 p-3 border-bordercolor border md:rounded-3xl rounded-xl mx-auto overflow-hidden bg-gray-900 flex items-center justify-center bg-white">
                  {isPlaying ? (
                    <ReactPlayer
                      // url={data?.demoVideo}
                      url="https://videos.pexels.com/video-files/2759477/2759477-uhd_2560_1440_30fps.mp4"
                      playing={true}
                      controls={true}
                      height="100%"
                      width="100%"
                      className="rounded-lg overflow-hidden"
                      onError={(e) => console.error("Video Error:", e)}
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={data?.thumbNailImage}
                        alt="Thumbnail"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Play Button */}
                      <div className="absolute inset-0 flex justify-center items-center">
                        <Button
                          shape="circle"
                          size="large"
                          className="bg-black bg-opacity-60 flex items-center justify-center playbtn"
                          onClick={() => setIsPlaying(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 56 56"
                            fill="none"
                          >
                            <path
                              d="M18.666 15.9186V40.092C18.666 41.9353 20.696 43.0553 22.2593 42.052L41.2527 29.9653C42.6994 29.0553 42.6994 26.9553 41.2527 26.022L22.2593 13.9586C20.696 12.9553 18.666 14.0753 18.666 15.9186Z"
                              fill="white"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className=" xl:py-secpadding tab:py-96 py-40  relative">
        <div className="mx-auto 2xl:max-w-screen-xl container sm:px-5 px-2">
          <div className="flex flex-col tab:flex-row items-center tab:gap-8 gap-6">
            {/* Left Side: Image and Content */}
            <div className="w-full tab:w-1/2 mt-0 lg:mt-0">
              <div className="flex justify-start items-start gap-4 mb-4">
                <img
                  src={data?.merchant?.brandLogo}
                  alt="eilago"
                  className="tab:h-[30px] h-[24px] w-auto"
                />
                <img
                  src={andLogo}
                  alt="eilago"
                  className="tab:h-[30px] h-[24px] w-auto"
                />
                <img
                  src={snblaLogo}
                  alt="eilago"
                  className="tab:h-[30px] h-[24px] w-auto"
                />
              </div>

              <h2 className="text-2xl tab:text-4xl font-semibold text-black sm:mb-5 mb-3">
                {data?.merchant?.businessName} has teamed up with Snbla to make
                your savings smarter
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                With your dedicated {data?.merchant?.businessName} savings
                account, each deposit can earn up to an extra{" "}
                {data?.offerEarning}% contribution
              </p>
            </div>

            {/* Right Side: How It Works */}

            <div className="w-full tab:w-1/2 slider">
              <div className="flex justify-center lg:mt-0 lg:justify-end">
                <div className="p-0">
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
                          className="text-[28px] font-semibold w-full outline-none bg-transparent px-1 border-0"
                          value={100}
                          readOnly // Add this attribute to make the input non-editable
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
                          ></path>
                        </svg>
                      </p>
                      <div className="relative border border-[#6EE7B7] rounded-lg bg-[#D1FAE5] mt-2 px-6 py-2 flex items-center">
                        <span className="sm:text-xl text-lg font-semibold">
                          SAR
                        </span>
                        <input
                          type="text"
                          value={data?.offerEarning}
                          step="0.01"
                          className="text-[28px] font-semibold w-full outline-none bg-transparent px-1 border-0"
                          readOnly // Add this attribute to make the input non-editable
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
                        {data?.offerEarning}{".00"}
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
                          className={`font-medium text-sm flex gap-2 text-center mx-auto ${activeIndex === index
                            ? "text-black"
                            : "text-gray-500"
                            }`}
                        >
                          SAR {amount.toFixed(2)}
                        </p>
                        <div
                          className={`w-full ${index === 0 ? "h-16" : index === 1 ? "h-8" : "h-1"
                            } ${activeIndex === index
                              ? "active-bar"
                              : "bg-[#F1F3F7]"
                            }`}
                        ></div>
                        <div
                          className={`text-sm lg:h-[50px] h-[80px] ${activeIndex === index
                            ? "text-dark"
                            : "text-inactive"
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
                  {/* Buttons for navigation */}

                  <div className="p-4 bg-[#F9FAFC] border border-[#F1F3F7] rounded-2xl mt-2">
                    <p className="text-sm text-black font-medium flex items-center justify-between gap-2 text-center ">
                      <span className="w-full border-t border-[#F1F3F7]"></span>
                      <span className="min-w-[100px] ">Compared to</span>
                      <span className="w-full border-t border-[#F1F3F7]"></span>
                    </p>
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
                        ></path>
                      </svg>
                      <span className="font-semibold">
                        {activeIndex === 0
                          ? "2"
                          : activeIndex === 1
                            ? "0.75"
                            : "0.10"}{" "}
                        SAR
                      </span>{" "}
                      of value in credit card points
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" xl:py-secpadding tab:py-96 py-40  relative">
        <div className="mx-auto 2xl:max-w-screen-xl container sm:px-5 px-2">
          <div className="flex flex-col md:flex-row items-center tab:gap-24 md:gap-8 gap-6">
            {/* Right Side: How It Works */}

            <div className="w-full md:w-1/2">
              <div className="flex justify-center lg:mt-0 lg:justify-start">
                <img
                  src={data?.promoPicture || openaccount}
                  alt="create-account"
                  className="object- size-full md:rounded-3xl rounded-xl border border-bordercolor"
                />
                {/* {data?.data?.promoPicture} */}
              </div>
            </div>
            {/* Left Side: Image and Content */}
            <div className="w-full md:w-1/2 mt-0 lg:mt-0">
              <h3 className="text-lg font-medium text-blue mb-4">
                So, how does it work?
              </h3>
              <h2 className="text-2xl tab:text-4xl font-semibold text-black mb-5">
                Open an account and save while {data?.merchant?.businessName}{" "}
                adds up to {data?.offerEarning}%
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                When it’s time to buy, you’ll owe nothing—just enjoy the reward
                of your hard work with zero debt.
              </p>
              <ul className="md:mt-10 mt-6 flex flex-col sm:gap-6 gap-3">
                <li className="flex gap-3  items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2.00488C6.48 2.00488 2 6.48488 2 12.0049C2 17.5249 6.48 22.0049 12 22.0049C17.52 22.0049 22 17.5249 22 12.0049C22 6.48488 17.52 2.00488 12 2.00488ZM10 17.0049L5 12.0049L6.41 10.5949L10 14.1749L17.59 6.58488L19 8.00488L10 17.0049Z"
                      fill="#474DF4"
                    />
                  </svg>
                  No risk, no fees, no debt
                </li>
                <li className="flex gap-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2.00488C6.48 2.00488 2 6.48488 2 12.0049C2 17.5249 6.48 22.0049 12 22.0049C17.52 22.0049 22 17.5249 22 12.0049C22 6.48488 17.52 2.00488 12 2.00488ZM10 17.0049L5 12.0049L6.41 10.5949L10 14.1749L17.59 6.58488L19 8.00488L10 17.0049Z"
                      fill="#474DF4"
                    />
                  </svg>
                  Earn rewards with every deposit
                </li>
                <li className="flex gap-3  items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2.00488C6.48 2.00488 2 6.48488 2 12.0049C2 17.5249 6.48 22.0049 12 22.0049C17.52 22.0049 22 17.5249 22 12.0049C22 6.48488 17.52 2.00488 12 2.00488ZM10 17.0049L5 12.0049L6.41 10.5949L10 14.1749L17.59 6.58488L19 8.00488L10 17.0049Z"
                      fill="#474DF4"
                    />
                  </svg>
                  Flexible savings options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="tab:py-secpadding py-40 bg-[#F9FAFC]">
        <div className="mx-auto tab:2xl:max-w-[928px] max-w-full container  px-5">
          <div className="flex flex-col md:flex-row md:items-center items-start justify-between md:gap-4 gap-6">
            {/* Left Content */}
            <div className="md:w-auto w-full mt-0 lg:mt-0 md:pr-4">
              <h2 className="text-2xl tab:text-4xl font-semibold text-black mb-5">
                Ready to Get Started?
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                Start saving smarter today and earn cash rewards as you go.
              </p>
            </div>
            <Button
              type="secondry"
              className="sm:max-w-max md:ml-auto ml-0"
              // eslint-disable-next-line no-undef
              onClick={() => setOpenPluginModal(true)}
              Show
              More
            >
              Start Saving
            </Button>
          </div>
        </div>
      </section>
      <section className="tab:py-secpadding py-40">
        <div className="mx-auto 2xl:max-w-screen-xl container sm:px-5 px-2">
          <div className="flex flex-col md:flex-row items-start xl:gap-32 gap-6">
            {/* Left Content */}
            <div className="w-full md:w-1/2 mt-0 lg:mt-0 tab:pr-4">
              <h3 className="text-lg font-medium text-blue mb-3">
                Funding Options
              </h3>
              <h2 className="text-2xl tab:text-4xl font-semibold text-black sm:mb-5 mb-3">
                Save at Your Own Pace, Your Own Way
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                We’ve made saving simple by giving you multiple ways to fund
                your wallet, so you can pick what works best for you.
              </p>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 flex flex-col md:gap-12 gap-3">
              {/* Recurring Deposits */}
              <div className="flex items-start gap-4">
                <div className="relative top-1">
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
                <div className="flex flex-col  sm:gap-3 gap-2">
                  <h4 className="text-lg font-semibold text-black">
                    Recurring Deposits
                  </h4>
                  <p className="text-gray-600">
                    Set it and forget it! Schedule automatic deposits on a
                    weekly, bi-weekly, or monthly basis. Your savings grow
                    effortlessly while you focus on other things.
                  </p>
                </div>
              </div>

              {/* One-time Deposits */}
              <div className="flex items-start gap-4">
                <div className="relative top-1">
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
              <div className="flex items-start gap-4">
                <div className="relative top-1">
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
                    Automatically round up your everyday purchases to the
                    nearest riyal and save the difference.
                  </p>
                </div>
              </div>

              {/* Crowd Savings Deposits */}
              <div className="flex items-start gap-4">
                <div className="relative top-1">
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
        </div>
      </section>
      {/* <PluginModalWrapper pluginModal={pluginModal}
        handlePluginModal={() => setOpenPluginModal(!pluginModal)} merchantPlan={data?.data} /> */}
      <PluginModalWrapper
        pluginModal={pluginModal}
        handlePluginModalValue={setOpenPluginModal}
        handlePluginModal={() => {
          setOpenPluginModal(!pluginModal); // Toggle the modal state
          dispatch(resetPayData());
          dispatch(resetMerchantPlan());
          navigate("/our-partners");
        }}
        merchantPlan={data} // Assuming you're passing merchantP as a prop
      />
      <Newsletter />
    </>
  );
};

export default Partnersoffer;
