import React, { useEffect } from 'react'
import homepageImage from "../assets/img/Homepage.png";
import southafrica from "../assets/img/southafrica.png";
import Button from './common-components/buttons/Button';
import { Link } from 'react-router-dom';
import CustomPhoneNumber from '../components/Comman/CustomPhoneNumber/CustomPhoneNumber';

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us | Snbla";
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
          <div className="flex flex-col xl:gap-4 gap-2 lg:pr-10 pr-0 md:w-1/2">
            <h1 className="mb-1 xl:text-[60px] lg:text-[40px] md:text-4xl text-2xl lg:font-extrabold font-bold  xl:leading-[72px] lg:leading-[52px] text-black tracking-[-1px]">
              Contact Us
            </h1>
            <p className="text-base sm:mb-5 mb-3 tab:pr-16 xl:text-lg">
              Let’s Connect—We’d Love to Hear from You!
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M20 4.5H4C2.9 4.5 2.01 5.4 2.01 6.5L2 18.5C2 19.6 2.9 20.5 4 20.5H20C21.1 20.5 22 19.6 22 18.5V6.5C22 5.4 21.1 4.5 20 4.5ZM20 18.5H4V8.5L12 13.5L20 8.5V18.5ZM12 11.5L4 6.5H20L12 11.5Z"
                    fill="#1F242E"
                  />
                </svg>
                <Link to="tel:info@snbla.com" className="text-black">
                  info@snbla.com
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M13.56 19.4C12.6 20.4 11.5 21.43 10.25 22.5C4.92 17.95 2.25 14.02 2.25 10.7C2.25 5.72 6.05 2.5 10.25 2.5C14.25 2.5 17.89 5.42 18.22 10H21.75L17.25 14.5L12.75 10H16.22C15.9 6.74 13.38 4.5 10.25 4.5C6.9 4.5 4.25 7.07 4.25 10.7C4.25 13.04 6.2 16.14 10.25 19.84C10.89 19.25 11.48 18.68 12.02 18.13C11.85 17.79 11.75 17.41 11.75 17.01C11.75 15.63 12.87 14.51 14.25 14.51C15.63 14.51 16.75 15.63 16.75 17.01C16.75 18.39 15.63 19.5 14.25 19.5C14.01 19.5 13.78 19.47 13.56 19.4Z"
                    fill="#1F242E"
                  />
                </svg>
                <p className="text-black">
                  3998 Anas Ibn Malik, Al Yasmeen,
                  <br />
                  Riyadh 13326, Kingdom of Saudi Arabia
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center md:mt-0 md:w-1/2 lg:justify-end">
            <div className="w-full tab:p-8 p-4 bg-white rounded-[20px] border border-bordercolor">
              <form>
                <div className="flex tab:gap-4 tab:flex-row flex-col">
                  <div className="mb-4 w-full">
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Enter your Full Name"
                      className="w-full px-2 py-2 h-[44px] text-black placeholder-[#686E7D] border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Enter your Full Name"
                      className="w-full px-2 py-2 h-[44px] text-black placeholder-[#686E7D] border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Business Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@business.com"
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
                      placeholder="+966 5xxxxxxxx"
                      className="w-full pr-2 py-2 pl-[90px]  h-[44px] text-black placeholder-[#686E7D] border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
                {/* <CustomPhoneNumber
                  isRequired={true}
                  label="Mobile Number"
                  name="phoneNumber"
                /> */}
                <div className="mb-4">
                  <label
                    htmlFor="industry"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Which best describes you?
                  </label>
                  <div className="flex flex-wrap">
                    <label className="flex items-center tab:w-1/3 sm:w-1/2 w-full mb-3">
                      <input
                        type="radio"
                        name="description"
                        value="merchant"
                        className="w-4 h-4 opacity-50 checked:opacity-100"
                      />
                      <span className="ml-3 block text-sm font-medium text-black">
                        A Merchant
                      </span>
                    </label>
                    <label className="flex items-center tab:w-1/3 sm:w-1/2 w-full mb-3">
                      <input
                        type="radio"
                        name="description"
                        value="shopper"
                        className="w-4 h-4 opacity-50 checked:opacity-100"
                      />
                      <span className="ml-3 block text-sm font-medium text-black">
                        A Shopper
                      </span>
                    </label>
                    <label className="flex items-center tab:w-1/3 sm:w-1/2 w-full mb-3">
                      <input
                        type="radio"
                        name="description"
                        value="journalist"
                        className="w-4 h-4 opacity-50 checked:opacity-100"
                      />
                      <span className="ml-3 block text-sm font-medium text-black">
                        A Journalist
                      </span>
                    </label>
                    <label className="flex items-center tab:w-1/3 sm:w-1/2 w-full mb-3">
                      <input
                        type="radio"
                        name="description"
                        value="investor"
                        className="w-4 h-4 opacity-50 checked:opacity-100"
                      />
                      <span className="ml-3 block text-sm font-medium text-black">
                        An Investor
                      </span>
                    </label>
                    <label className="flex items-center tab:w-1/3 sm:w-1/2 w-full mb-3">
                      <input
                        type="radio"
                        name="description"
                        value="other"
                        className="w-4 h-4 opacity-50 checked:opacity-100"
                      />
                      <span className="ml-3 block text-sm font-medium text-black">
                        Other
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Type your message here..."
                    className="w-full px-2 py-2 text-black placeholder-[#686E7D] border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  ></textarea>
                </div>

                <Button
                  type="secondry"
                  className="max-w-max mt-6"
                  // eslint-disable-next-line no-undef
                  // onClick={() => alert("Primary Button Clicked")}
                  Show
                  More
                >
                  Send Message
                </Button>
                <p className="text-center text-xs text-gray mt-6">
                  By clicking &quot;Send Message&quot; you agree to our{" "}
                  <a href="" className="text-xs text-gray underline">
                    {" "}
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

export default ContactUs
