import React, { useState, useEffect } from "react";
import homepageImage from "../assets/img/Homepage.png";
import mission from "../assets/img/our-mission.png";
import founders from "../assets/img/founders.png";
import whoarewe from "../assets/img/whoarewe.png";
import Unlock from "../assets/img/Unlock.png";
import Seamless from "../assets/img/Seamless.png";
import Button from "./common-components/buttons/Button";
import { useNavigate } from "react-router-dom";
import RequestMerchant from "../components/AuthUser/RequestMerchant/RequestMerchant";
import { useLanguagePicker } from "../hooks/useLanguagePicker";
import { useTranslation } from 'react-i18next'

const About = () => {
  const lang = useLanguagePicker();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "About Us | Snbla";
  }, []);

  const handleSignup = () => {
    navigate("/signup");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { t } = useTranslation()

  return (
    <>
      <section
        className="relative bg-no-repeat xl:pt-[256px] xl:pb-[224px] tab:pt-[160px] md:pt-secpadding pt-[80px]"
        style={{
          backgroundImage: `url(${homepageImage})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="container mx-auto 2xl:max-w-screen-xl flex flex-col lg:items-center lg:flex-col lg:gap-16 gap-8 sm:px-5 px-2">
          <div className="text-center max-w-4xl sm:px-4 px-0 mx-auto flex-1">
            <div className="flex max-w-max items-center rounded-full bg-white border border-bordercolor gap-2 sm:px-3 px-2 py-2 mx-auto">
              <p className="text-sm font-medium text-black">
                Announcing our 2M SAR Fundraise
              </p>
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
              {t("ABOUT_US.TITLE")}

            </h1>
            <p className="sm:text-lg text-base font-normal">
              {t("ABOUT_US.DESCRIPTION")}

            </p>
            <div className="text-center tab:mt-12 mt-4 flex gap-4 items-center justify-center">
              <Button
                type="primary"
                className="max-w-max shadow-shadow4 border-bordercolor"
                // eslint-disable-next-line no-undef
                onClick={() => {
                  console.log("button clicked");
                }}
              >
                Press Coverage
              </Button>
              <Button
                type="secondry"
                className="max-w-max shadow-shadow4 "
                // eslint-disable-next-line no-undef
                onClick={() => {
                  console.log("button clicked");
                }}
              >
                {t("WEB_HEADER.CONTACT_SALES")}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className=" xl:py-secpadding tab:py-96 py-40  relative">
        <div className="mx-auto 2xl:max-w-screen-xl container sm:px-5 px-2">
          <div className="flex flex-col-reverse md:flex-row items-center tab:gap-24 md:gap-8 gap-6">
            {/* Left Side: Image and Content */}
            <div className="w-full md:w-1/2 mt-0 lg:mt-0">
              <h2 className="text-2xl tab:text-4xl font-semibold text-black mb-5">
                {t("ABOUT_US.WHO_ARE_WE.TITLE")}
              </h2>
              <p className="xl:text-lg text-base font-normal mb-3">
                {t("ABOUT_US.WHO_ARE_WE.DESCRIPTION")}

              </p>
              <p className="xl:text-lg text-base font-normal ">
                {t("ABOUT_US.WHO_ARE_WE.DESCRIPTION-2")}

              </p>

              <div className="text-center tab:mt-12 mt-4 flex gap-4 items-center  justify-start">
                <Button
                  type="primary"
                  className="max-w-max border-bordercolor shadow-shadow4"
                  // eslint-disable-next-line no-undef
                  onClick={() => {
                    console.log("button clicked");
                  }}
                >
                  {t("WEB_HEADER.OUR_PARTNERS")}
                </Button>
                <Button
                  type="secondry"
                  className="max-w-max shadow-shadow4"
                  // eslint-disable-next-line no-undef
                  onClick={() => {
                    console.log("button clicked");
                  }}
                >
                  Explore Our Solutions
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M8.08748 5L6.91248 6.175L10.7291 10L6.91248 13.825L8.08748 15L13.0875 10L8.08748 5Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            {/* Right Side: How It Works */}

            <div className="w-full md:w-1/2">
              <div className="flex justify-center lg:mt-0 lg:justify-end">
                <img
                  src={whoarewe}
                  alt="create-account"
                  className="size-auto border border-borderlight rounded-[28px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className=" xl:py-secpadding tab:py-96 py-40  relative">
        <div className="mx-auto 2xl:max-w-screen-xl container sm:px-5 px-2">
          <div className="flex flex-col md:flex-row items-center tab:gap-24 md:gap-8 gap-6">
            <div className="w-full md:w-1/2">
              <div className="flex justify-center lg:mt-0 lg:justify-start">
                <img
                  src={founders}
                  alt="create-account"
                  className="size-auto border border-borderlight rounded-[28px]"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-0 lg:mt-0">
              <h3 className="text-lg font-medium text-blue mb-4">
                The Founding Team
              </h3>
              <h2 className="text-2xl tab:text-4xl font-semibold text-black mb-5">
                Meet Our Founders
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                Snbla was brought to life by two passionate leaders. Hashem, the
                visionary Founder and COO, crafted the concept of a smarter
                savings platform that empowers people to reach their financial
                goals without debt. Alongside him, Saleh Alhammad, Co-Founder
                and CEO, leads the charge in driving the company’s growth and
                partnerships, ensuring that Snbla delivers real value to both
                users and brands.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <section className=" xl:py-secpadding tab:py-96 py-40  relative">
        <div className="mx-auto 2xl:max-w-screen-xl container sm:px-5 px-2">
          <div className="flex flex-col-reverse md:flex-row items-center tab:gap-24 md:gap-8 gap-6">
            {/* Right Side: How It Works */}

            <div className="w-full md:w-1/2">
              <div className="flex justify-center lg:mt-0 lg:justify-end">
                <img
                  src={mission}
                  alt="create-account"
                  className="size-auto border border-borderlight rounded-[28px]"
                />
              </div>
            </div>
            {/* Left Side: Image and Content */}
            <div className="w-full md:w-1/2 mt-0 lg:mt-0">
              <h2 className="text-2xl tab:text-4xl font-semibold text-black mb-5">
                {t("ABOUT_US.OUR_MISSION.TITLE")}
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                {t("ABOUT_US.OUR_MISSION.DESCRIPTION")}
              </p>
              <a
                href=""
                className="text-blue font-medium tab:mt-12 mt-4 inline-block"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>

      <RequestMerchant openModal={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default About;
