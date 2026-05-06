import React, { useEffect } from "react";
import homepageImage from "../assets/img/Homepage.png";
import southafrica from "../assets/img/southafrica.png";
import Avatargroup from "../assets/img/Avatargroup.png";
import Button from "./common-components/buttons/Button";

const OTP = () => {
  useEffect(() => {
    document.title = "Otp | Snbla";
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
        <div className="container mx-auto 2xl:max-w-screen-xl justify-center flex md:flex-row flex-col md:items-center lg:gap-12 gap-6 sm:px-5 px-2">
          <div className="flex justify-center flex-col items-center tab:gap-10 gap-5 md:mt-0 ">
            <div className="md:w-[440px] w-full tab:p-8 p-6  bg-white rounded-[20px] border border-bordercolor">
              <h2 className="text-xl text-black text-center mb-2 font-semibold">
                Verify your mobile number
              </h2>
              <p className="text-black text-center text-sm mb-6">
                We have sent an sms to{" "}
                <a href="" className="font-semibold text-black">
                  +966535455820
                </a>{" "}
                with a verification code.
              </p>
              <form>
                <div className="flex sm:gap-2 gap-1 justify-center">
                  <input
                    type="text"
                    className=" px-2 py-2 sm:h-[48px] h-[40px] sm:w-[48px] w-[40px] text-center border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-base"
                  />
                  <input
                    type="text"
                    className="px-2 py-2 sm:h-[48px] h-[40px] sm:w-[48px] w-[40px] text-center border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-base "
                  />
                  <input
                    type="text"
                    className="px-2 py-2 sm:h-[48px] h-[40px] sm:w-[48px] w-[40px] text-center border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-base "
                  />
                  <input
                    type="text"
                    className="px-2 py-2 sm:h-[48px] h-[40px] sm:w-[48px] w-[40px] text-center border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-base "
                  />
                  <input
                    type="text"
                    className="px-2 py-2 sm:h-[48px] h-[40px] sm:w-[48px] w-[40px] text-center border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-base"
                  />
                  <input
                    type="text"
                    className="px-2 py-2 sm:h-[48px] h-[40px] sm:w-[48px] w-[40px] text-center border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-base"
                  />
                </div>
                <p className="text-center text-sm text-blue font-medium mt-3">
                  Don’t receive a code? Resend
                </p>
                <Button
                  type="secondry"
                  className=" mt-6  "
                  // eslint-disable-next-line no-undef
                  onClick={() => alert("Primary Button Clicked")}
                  Show
                  More
                >
                  Verify and continue{" "}
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
              </form>
            </div>
            <p className="font-medium text-black">
              Need help?{" "}
              <span className="text-blue font-medium">Contact us</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default OTP;
