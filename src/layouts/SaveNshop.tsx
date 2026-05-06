import React, { useEffect } from "react";
import homepageImage from "../assets/img/Homepage.png";
import FilterSection from "./common-components/FilterSection";
import { useLocation } from "react-router-dom";
import { getUrlToken } from "../utils/url-hash-params";
import { useDispatch } from "react-redux";


import { getQueryParams } from "../utils/constants";
import { checkMobileUser } from "../actions/user";

const SaveNshop = () => {
  useEffect(() => {
    document.title = "SaveN’Shop, Smarter way to save and get paid | Snbla";
  }, []);

  const dispatch: any = useDispatch();
  const url = window.location.href;
  const { token, appLink } = getQueryParams(url);

  // console.log("token---", token)
  // console.log("appLink---", appLink)

  useEffect(() => {
    if (token) {
      dispatch(
        checkMobileUser(token, (res: any) => {
          if (res?.success === true) {
            localStorage.setItem("web-token", JSON?.stringify(token))
            localStorage.setItem("app-link", JSON?.stringify(appLink))
          }
        })
      );
    }
  }, []);

  return (
    <>
      <section
        className="relative bg-cover bg-no-repeat xl:pt-[192px] md:pt-secpadding pt-[80px] tab:pb-secpadding pb-40 partner_offerpge"
        style={{ backgroundImage: `url(${homepageImage})` }}
      >
        <div className="container mx-auto 2xl:max-w-screen-xl  flex-col hidden md:flex lg:items-center lg:flex-col lg:gap-14 gap-8 sm:px-5 px-2">
          <div className="text-center max-w-4xl sm:px-4 px-0 mx-auto flex-1">
            <h1 className="tab:mb-5 mb-3 xl:text-[60px] lg:text-[40px] md:text-4xl text-2xl lg:font-extrabold font-bold  xl:leading-[72px] lg:leading-[52px] text-black tracking-[-1px]">
              Save Now, Buy Later
            </h1>
            <p className="sm:text-lg text-base font-normal">
              A smarter way to save and get paid. Earn rewards instantly with
              every deposit you make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 tab:grid-cols-3 xl:gap-16 gap-8 place-content-center">
            {/* Card 1 */}
            <div className="border border-[#E9EBF0] bg-white rounded-[16px] xl:p-[40px] p-[20px] flex flex-col xl:gap-8 gap-4 items-start">
              <div className="flex items-center justify-center w-12 h-12 bg-blue rounded-[12px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 4H6C3.79 4 2 5.79 2 8V16C2 18.21 3.79 20 6 20H18C20.21 20 22 18.21 22 16V8C22 5.79 20.21 4 18 4ZM16.14 13.77C15.9 13.97 15.57 14.05 15.26 13.97L4.15 11.25C4.45 10.52 5.16 10 6 10H18C18.67 10 19.26 10.34 19.63 10.84L16.14 13.77ZM6 6H18C19.1 6 20 6.9 20 8V8.55C19.41 8.21 18.73 8 18 8H6C5.27 8 4.59 8.21 4 8.55V8C4 6.9 4.9 6 6 6Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  Tailored to How You Save
                </h3>
                <p>
                  Save safely for what matters most, whether it’s purchases or
                  experiences—no loans, credit checks, or hidden costs.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border border-[#E9EBF0] bg-white rounded-[16px] xl:p-[40px] p-[20px] flex flex-col xl:gap-8 gap-4 items-start">
              <div className="flex items-center justify-center w-12 h-12 bg-blue rounded-[12px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6.5H17.82C17.93 6.19 18 5.85 18 5.5C18 3.84 16.66 2.5 15 2.5C13.95 2.5 13.04 3.04 12.5 3.85L12 4.52L11.5 3.84C10.96 3.04 10.05 2.5 9 2.5C7.34 2.5 6 3.84 6 5.5C6 5.85 6.07 6.19 6.18 6.5H4C2.89 6.5 2.01 7.39 2.01 8.5L2 19.5C2 20.61 2.89 21.5 4 21.5H20C21.11 21.5 22 20.61 22 19.5V8.5C22 7.39 21.11 6.5 20 6.5ZM15 4.5C15.55 4.5 16 4.95 16 5.5C16 6.05 15.55 6.5 15 6.5C14.45 6.5 14 6.05 14 5.5C14 4.95 14.45 4.5 15 4.5ZM9 4.5C9.55 4.5 10 4.95 10 5.5C10 6.05 9.55 6.5 9 6.5C8.45 6.5 8 6.05 8 5.5C8 4.95 8.45 4.5 9 4.5ZM20 19.5H4V17.5H20V19.5ZM20 14.5H4V8.5H9.08L7 11.33L8.62 12.5L12 7.9L15.38 12.5L17 11.33L14.92 8.5H20V14.5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  Earn More, Spend Less
                </h3>
                <p>
                  With every deposit, our brand partners contribute, giving you
                  rewards instantly—no waiting for interest.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="border border-[#E9EBF0] bg-white rounded-[16px] xl:p-[40px] p-[20px] flex flex-col xl:gap-8 gap-4 items-start">
              <div className="flex items-center justify-center w-12 h-12 bg-blue rounded-[12px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19.07 4.93L17.66 6.34C19.1 7.79 20 9.79 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.92 7.05 4.56 11 4.07V6.09C8.16 6.57 6 9.03 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 10.34 17.33 8.84 16.24 7.76L14.83 9.17C15.55 9.9 16 10.9 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 10.14 9.28 8.59 11 8.14V10.28C10.4 10.63 10 11.26 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 11.26 13.6 10.62 13 10.28V2H12C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 9.24 20.88 6.74 19.07 4.93Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  Flexible Savings, No Limits
                </h3>
                <p>
                  Change your savings goal whenever you need to. Cancel or
                  withdraw anytime, with no fees or penalties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FilterSection />
    </>
  );
};

export default SaveNshop;
