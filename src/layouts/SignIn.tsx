import React, { useEffect } from 'react'
import homepageImage from "../assets/img/Homepage.png";
import southafrica from "../assets/img/southafrica.png";
import Avatargroup from "../assets/img/Avatargroup.png";
import Button from "./common-components/buttons/Button";
import { useLanguagePicker } from '../hooks/useLanguagePicker';

const SignIn = () => {
  const lang = useLanguagePicker();
  useEffect(() => {
    document.title = "SignIn | Snbla";
  }, []);
  return (
    <>
      <section
        className="relative bg-cover bg-no-repeat lg:pt-[160px] md:pt-secpadding pt-[80px] tab:pb-96 pb-40"
        style={{
          backgroundImage: `url(${homepageImage})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="container mx-auto 2xl:max-w-screen-xl flex md:flex-row flex-col md:items-center lg:gap-12 gap-6 sm:px-5 px-2">
          {/* Left Text Section */}
          <div
            className={`flex flex-col xl:gap-12 gap-4 ${
              lang === "ar" ? "lg:pl-10" : "lg:pr-10"
            } pr-0 md:w-1/2`}
          >
            <h1 className="mb-1 xl:text-[60px] lg:text-[40px] md:text-4xl text-2xl lg:font-extrabold font-bold  xl:leading-[72px] lg:leading-[52px] text-black tracking-[-1px]">
              The Savings Solution You’ve Been Waiting For!
            </h1>
            <div className="flex gap-4 items-center">
              <img src={Avatargroup} alt="Avatargroup" className="h-[40px]" />{" "}
              <p className="text-sm">Join 47,000+ savers</p>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center md:mt-0 md:w-1/2 lg:justify-end">
            <div className="md:w-[440px] w-full tab:px-8 tab:py-12 px-4 py-6  bg-white rounded-[20px] border border-bordercolor">
              <h2 className="text-[32px] text-black text-center mb-3 font-semibold">
                Let’s get started
              </h2>
              <p className="text-black text-center mb-6 font-medium">
                Your <span className="text-blue">savings journey</span> starts
                here!
              </p>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block mb-1 text-sm font-medium text-black"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="eg. Abdullah Al Rajhi"
                    className="w-full px-2 py-2 h-[44px] text-black placeholder-[#686E7D] border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Mobile Number
                  </label>
                  <div className="flex items-center relative">
                    <img
                      src={southafrica}
                      alt="southafrica"
                      className="absolute top-[12px] left-[5px]"
                    />
                    <select className="px-2 py-2 h-full bg-transparent absolute top-0 left-[24px]">
                      <option>SA</option>
                    </select>
                    <input
                      type="text"
                      id="phoneNumber"
                      placeholder="+966 53 545 5820"
                      className="w-full pr-2 py-2 pl-[90px]  h-[44px] text-black placeholder-[#686E7D] border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>

                <Button
                  type="secondry"
                  className=" mt-6  "
                  // eslint-disable-next-line no-undef
                  onClick={() => alert("Primary Button Clicked")}
                  Show
                  More
                >
                  Continue{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9.99992 3.3335L8.82492 4.5085L13.4749 9.16683H3.33325V10.8335H13.4749L8.82492 15.4918L9.99992 16.6668L16.6666 10.0002L9.99992 3.3335Z"
                      fill="white"
                    />
                  </svg>
                </Button>
                <p className="text-center text-xs text-gray mt-6 px-5">
                  By clicking &quot;Continue&quot; you agree to our{" "}
                  <a href="" className="text-xs text-gray underline">
                    {" "}
                    Code of Conduct,
                  </a>{" "}
                  <a href="" className="text-xs text-gray underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="" className="text-xs text-gray underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn
