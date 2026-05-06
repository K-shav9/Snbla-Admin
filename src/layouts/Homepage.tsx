import React, { useState, useEffect } from 'react'
import homepageImage from "../assets/img/Homepage.png";
import homepagebanner from "../assets/img/home-banner.png";
import homepagefullbanner from "../assets/img/homepagefullbanner.png";
import playstore from "../assets/img/app-store.png";
import google from "../assets/img/google-play.png";
import createAccount from "../assets/img/create-account.jpg";
import createAccountfull from "../assets/img/create-accountfull.jpg";
import fundWallet from "../assets/img/fund-wallet.jpg";
import fundWalletfull from "../assets/img/fundfullimg.jpg";
import SaveTogether from "../assets/img/Save-Together.png";
import SaveTogetherfull from "../assets/img/savetogetherfull.jpg";
import timetograp from "../assets/img/timetograp.png";
import bridgestone from "../assets/img/bridgestone.png";
import alomarlogo1 from "../assets/img/alomarlogo-1.png";
import alomarlogo from "../assets/img/alomarlogo.png";
import eilago from "../assets/img/eilago.png";
import fitness from "../assets/img/fitness.png";
import mouawad from "../assets/img/mouawad.png";
import riyadh from "../assets/img/riyadh.png";
import rosaclara from "../assets/img/rosaclara.png";
import takecontrol from "../assets/img/Take-control.png";
import Newsletter from "./common-components/Newsletter";
import { useLanguagePicker } from "../hooks/useLanguagePicker";
import { useDispatch, useSelector } from 'react-redux';
import { getAllMerchants } from '../actions/user';
import { useTranslation } from 'react-i18next'


const Homepage = () => {
  const lang = useLanguagePicker();
  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: any) => state.General);
  const [merchants, setMerchants] = useState<any>([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 12,
  });
  useEffect(() => {
    document.title = "Snbla | Save Now, Buy Later Platform for Savvy Shoppers";
  }, []);

  const { t } = useTranslation()


  const fetchMerchants = (roleId: number) => {
    const data = {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      isWeb: true,
    };

    dispatch(getAllMerchants({ roleId, ...data }))
      .then((response: any) => {

        if (response.status === 200) {
          setMerchants((prev) =>
            pagination.currentPage === 1 ? response.data : [...prev, ...response.data]
          );

          const paginationData = response?.pagination || {};
          setPagination((prev) => ({
            ...prev,
            totalItems: paginationData.totalItems,
            totalPages: paginationData.totalPages,
            currentPage: paginationData.currentPage,
            pageSize: paginationData.pageSize,
            // pageSize: 4,

          }));
        } else {
          console.error("Error fetching merchants", response);
          setMerchants([]);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching merchants", error);
        setMerchants([]);
      });
  };

  useEffect(() => {
    fetchMerchants(2);
  }, [pagination.currentPage]);



  return (
    <>
      <section
        className="relative bg-cover bg-no-repeat lg:pt-[268px] tab:pt-[192px] tab:pb-secpadding md:pt-secpadding pt-[80px] pb-40 homepagebanner "
        style={{
          backgroundImage: `url(${homepageImage})`,
          backgroundSize: "auto",
        }}
      >
        <div className="container mx-auto 2xl:max-w-screen-xl flex md:flex-row flex-col-reverse md:items-center lg:gap-12 sm:px-5 px-2">
          {/* Left Text Section */}
          <div
            className={`flex flex-col xl:gap-4 gap-2 ${lang === "ar" ? "lg:pl-10" : "lg:pr-10"
              } pr-0 md:w-1/2`}
          >
            <div className="flex max-w-max items-center space-x-2 rounded-full  border border-bordercolor px-3 py-2">
              <p className="text-sm font-medium text-blue">                {t("HOME_PAGE.NEW")}
              </p>
              <p className="text-sm font-medium text-black">
                {t("HOME_PAGE.PARTNER_SIGNED")}
              </p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.0876 5L6.9126 6.175L10.7293 10L6.9126 13.825L8.0876 15L13.0876 10L8.0876 5Z"
                    fill="#1F242E"
                  />
                </svg>
              </span>
            </div>
            <h1 className="mb-1 xl:text-[60px] lg:text-[40px] md:text-4xl text-2xl lg:font-extrabold font-bold  xl:leading-[72px] lg:leading-[52px] text-black tracking-[-1.2px]">
              {t("HOME_PAGE.TITLE")}
            </h1>
            <p
              className={`text-base mb-6 ${lang === "ar" ? "pl-16" : "pr-0"
                } xl:text-lg`}
            >
              {t("HOME_PAGE.DESCRIPTION")}
            </p>
            <div className="flex gap-6">
              <a
                href="https://apps.apple.com/sa/app/snbla-save-earn/id6468773800"
                target="_blank"
                className=""
                rel="noopener noreferrer"
              >
                <img
                  src={playstore}
                  alt="Download on the App Store"
                  className="inline w-auto h-[48px]"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.snbla.app"
                target="_blank"
                className=""
                rel="noopener noreferrer"
              >
                <img
                  src={google}
                  alt="Get it on Google Play"
                  className="inline w-auto h-[48px]"
                />
              </a>
            </div>
          </div>

          {/* Right Image Section */}
          <div
            className={`md:absolute ${lang === "ar" ? "left-0" : "right-0"
              } mb-10 flex justify-center md:mt-0 md:w-1/2 lg:justify-end imagesec_banner`}
          >
            <img
              src={homepagefullbanner}
              alt="home-banner"
              className="showthisforall block md:hidden 3xl:block size-auto"
            />
            <img
              src={homepagebanner}
              alt="home-banner"
              className="hidethisforall hidden md:block 3xl:hidden size-auto"
            />
          </div>
        </div>
      </section>

      <section className=" xl:py-secpadding tab:py-96 py-40">
        <div className="mx-auto 2xl:max-w-screen-xl container sm:px-5 px-2 text-center">
          {/* Top Heading */}
          <h3 className="text-lg font-medium text-blue sm:mb-2 mb-0">
            {t("HOME_PAGE.SLOGANS.SAVE_SMART")}
          </h3>
          <h2 className="sm:mb-5 mb-3 text-2xl font-semibold text-black md:text-4xl tracking-[-0.72px]">
            {t("HOME_PAGE.SLOGANS.YOUR_MONEY")}
          </h2>
          <p className="xl:text-lg text-base font-normal xl:mb-[96px] mb-[48px]">
            {t("HOME_PAGE.SLOGANS.DESCRIPTION")}

          </p>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center tab:grid-cols-3 xl:gap-16 gap-8">
            {/* Card 1 */}
            <div className="border border-[#E9EBF0] rounded-[16px] xl:p-[40px] p-[20px] flex flex-col xl:gap-8 gap-4 items-start">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-[12px]">
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
                <h3
                  className={`text-lg font-semibold text-black ${lang === "ar" ? "text-right" : "text-left"
                    } mb-2 tracking-[-0.72px]`}
                >
                  {t("HOME_PAGE.CARDS.DISCOUNTS.TITLE")}
                </h3>
                <p className={`${lang === "ar" ? "text-right" : "text-left"}`}>
                  {t("HOME_PAGE.CARDS.DISCOUNTS.DESCRIPTION")}
                </p>
              </div>
              <a
                href="#"
                className="ml-0 inline-flex items-center justify-center text-left font-medium text-blue-100 hover:underline"
              >
                {t("HOME_PAGE.CARDS.MORE_INFO")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.0876 5L6.9126 6.175L10.7293 10L6.9126 13.825L8.0876 15L13.0876 10L8.0876 5Z"
                    fill="#356ADB"
                  />
                </svg>
              </a>
            </div>

            {/* Card 2 */}
            <div className="border border-[#E9EBF0] rounded-[16px] xl:p-[40px] p-[20px] flex flex-col xl:gap-8 gap-4 items-start">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-[12px]">
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
                <h3
                  className={`text-lg font-semibold text-black ${lang === "ar" ? "text-right" : "text-left"
                    } mb-2 tracking-[-0.72px]`}
                >
                  {t("HOME_PAGE.CARDS.ZERO_COST.TITLE")}
                </h3>
                <p className={`${lang === "ar" ? "text-right" : "text-left"}`}>
                  {t("HOME_PAGE.CARDS.ZERO_COST.DESCRIPTION")}
                </p>
              </div>
              <a
                href="#"
                className="ml-0 inline-flex items-center justify-center text-left font-medium text-blue-100 hover:underline"
              >
                {t("HOME_PAGE.CARDS.MORE_INFO")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.0876 5L6.9126 6.175L10.7293 10L6.9126 13.825L8.0876 15L13.0876 10L8.0876 5Z"
                    fill="#356ADB"
                  />
                </svg>
              </a>
            </div>

            {/* Card 3 */}
            <div className="border border-[#E9EBF0] rounded-[16px] xl:p-[40px] p-[20px] flex flex-col xl:gap-8 gap-4 items-start">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-[12px]">
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
                <h3
                  className={`text-lg font-semibold text-black ${lang === "ar" ? "text-right" : "text-left"
                    } mb-2 tracking-[-0.72px]`}
                >
                  {t("HOME_PAGE.CARDS.WITH_DRAW.TITLE")}
                </h3>
                <p className={`${lang === "ar" ? "text-right" : "text-left"}`}>
                  {t("HOME_PAGE.CARDS.MORE_INFO")}
                </p>
              </div>
              <a
                href="#"
                className="ml-0 inline-flex items-center justify-center text-left font-medium text-blue-100 hover:underline"
              >
                {t("HOME_PAGE.CARDS.MORE_INFO")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.0876 5L6.9126 6.175L10.7293 10L6.9126 13.825L8.0876 15L13.0876 10L8.0876 5Z"
                    fill="#356ADB"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className=" xl:py-secpadding tab:py-80 py-40 xl:my-96 md:my-16  relative homepagenormalimges  ">
        <div className="mx-auto 2xl:max-w-screen-xl container text-left sm:px-5 px-2">
          <div className="flex flex-col md:flex-row items-center homepagedivs">
            {/* Left Side: Image and Content */}
            <div className="w-full md:w-1/2 3xl:h-[380px] lg:h-[340px] md:h-[260px] imagesec_full">
              <div
                className={`md:absolute ${lang === "ar" ? "right-0" : "left-0"
                  } inset-y-0 flex justify-center lg:mt-0 md:w-1/2 md:justify-start imagesec`}
              >
                <img
                  src={createAccountfull}
                  alt="create-account"
                  className="showthisforall block md:hidden 3xl:block size-auto"
                />
                <img
                  src={createAccount}
                  alt="create-account"
                  className="hidethisforall hidden md:block 3xl:hidden size-auto"
                />
              </div>
            </div>
            {/* Right Side: How It Works */}
            <div
              className={`w-full ${lang === "ar" ? "md:pr-10 text-right" : "md:pl-10"
                } md:mt-0  mt-2 md:w-1/2 contentdiv`}
            >
              <h3 className="text-lg font-medium text-blue sm:mb-2 mb-0">
                {t("HOME_PAGE.HOW_IT_WORKS.TITLE")}
              </h3>
              <h2 className="text-2xl tab:text-4xl font-semibold text-black sm:mb-4 mb-2">
                {t("HOME_PAGE.HOW_IT_WORKS.HEADING")}
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                {t("HOME_PAGE.HOW_IT_WORKS.DESCRIPTION")}

              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" xl:py-secpadding tab:py-96 py-40 xl:my-secmargin tab:my-96 ma md:my-40 my-0 relative homepagenormalimges ">
        <div className="mx-auto 2xl:max-w-screen-xl container text-left sm:px-5 px-2">
          <div className="flex flex-col-reverse md:flex-row items-center gap-4 homepagedivs">
            {/* Left Side: Image and Content */}
            <div
              className={`contentdiv w-full md:w-1/2 mt-0 lg:mt-0 ${lang === "ar" ? "md:pl-10 text-right" : "md:pr-10"
                }`}
            >
              <h2 className="text-2xl tab:text-4xl font-semibold text-black sm:mb-4 mb-2">
                {t("HOME_PAGE.FUND_YOUR_WALLET.TITLE")}
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                {t("HOME_PAGE.FUND_YOUR_WALLET.DESCRIPTION")}
              </p>
            </div>

            {/* Right Side: How It Works */}

            <div className="w-full md:w-1/2 3xl:h-[380px] lg:h-[340px] md:h-[260px] imagesec_full">
              <div
                className={`md:absolute ${lang === "ar" ? "left-0" : "right-0"
                  } inset-y-0 flex justify-center lg:mt-0 md:w-1/2 lg:justify-end imagesec`}
              >
                <img
                  src={fundWalletfull}
                  alt="create-account"
                  className="showthisforall block md:hidden 3xl:block size-auto"
                />
                <img
                  src={fundWallet}
                  alt="create-account"
                  className="hidethisforall hidden md:block 3xl:hidden size-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" xl:py-secpadding tab:py-96 py-40  xl:my-secmargin tab:my-96 md:my-40 my-0 relative homepagenormalimges">
        <div className="mx-auto 2xl:max-w-screen-xl container text-left sm:px-5 px-2 ">
          <div className="flex flex-col md:flex-row items-center homepagedivs">
            {/* Left Side: Image and Content */}
            <div className="w-full md:w-1/2 3xl:h-[380px] lg:h-[340px] md:h-[260px] imagesec_full">
              <div
                className={`md:absolute ${lang === "ar" ? "right-0" : "left-0"
                  } top-0 bottom-0 flex justify-center lg:mt-0 md:w-1/2 lg:justify-start imagesec`}
              >
                <img
                  src={SaveTogetherfull}
                  alt="SaveTogether"
                  className="showthisforall block md:hidden 3xl:block size-auto"
                />
                <img
                  src={SaveTogether}
                  alt="SaveTogether"
                  className="hidethisforall hidden md:block 3xl:hidden size-auto"
                />
              </div>
            </div>

            {/* Right Side: How It Works */}
            <div
              className={`contentdiv w-full md:w-1/2 md:mt-0 mt-2 lg:mt-0 ${lang === "ar" ? "md:pr-10 text-right" : "md:pl-10"
                }`}
            >
              <h2 className="text-2xl tab:text-4xl font-semibold text-black sm:mb-4 mb-2">
                {t("HOME_PAGE.SAVE_TOGETHER.TITLE")}
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                {t("HOME_PAGE.SAVE_TOGETHER.DESCRIPTION")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" xl:py-secpadding tab:py-96 py-40  relative">
        <div className="mx-auto 2xl:max-w-screen-xl container text-left sm:px-5 px-2">
          <div className="flex flex-col-reverse md:flex-row items-center gap-6 homepagedivs">
            {/* Left Side: Image and Content */}
            <div
              className={`contentdiv w-full md:w-1/2 mt-0 lg:mt-0 ${lang === "ar" ? "md:pl-10 text-right" : "md:pr-10"
                }`}
            >
              <h2 className="text-2xl tab:text-4xl font-semibold text-black sm:mb-4 mb-2">
                {t("HOME_PAGE.TIME_TO_GRAB.TITLE")}
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                {t("HOME_PAGE.TIME_TO_GRAB.DESCRIPTION")}

              </p>
            </div>

            {/* Right Side: How It Works */}

            <div className="w-full md:w-1/2">
              <div className="flex justify-center lg:mt-0 lg:justify-end">
                <img
                  src={timetograp}
                  alt="create-account"
                  className="size-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tab:py-96 py-40 bg-bggray">
        <div className="mx-auto 2xl:max-w-screen-xl container text-left sm:px-5 px-2 w-100 flex flex-col gap-20">
          <div className="text-center max-w-2xl sm:px-4 px-0 mx-auto flex-1">
            <h2 className="text-2xl tab:text-4xl font-semibold text-black sm:mb-4 mb-2">
              {t("HOME_PAGE.BOOST_YOUR_WALLET.TITLE")}
            </h2>
            <p className="xl:text-lg text-base font-normal ">
              {t("HOME_PAGE.BOOST_YOUR_WALLET.DESCRIPTION")}

            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-[48px] justify-items-center homepage_logo">
            {merchants?.slice(0, 8)?.map((merchant, index) => (
              <img
                key={merchant?.id || index}
                src={merchant?.merchant?.brandLogo || bridgestone} // Default to Bridgestone if missing
                // alt={merchant?.merchant?.brandName || "Merchant Logo"}
                className="w-auto"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="tab:py-secpadding py-40">
        <div className="mx-auto 2xl:max-w-screen-xl container text-left sm:px-5 px-2">
          <div className="flex flex-col-reverse md:flex-row items-center md:gap-0 gap-6">
            {/* Left Side: Image and Content */}
            <div
              className={`w-full md:w-1/2 lg:mt-0 ${lang === "ar" ? "md:pl-10 text-right" : "md:pr-10"
                }`}
            >
              <h3 className="text-lg font-medium text-blue sm:mb-2 mb-0">
                {t("HOME_PAGE.YOUR_SAVINGS.TITLE")}
              </h3>
              <h2 className="text-2xl tab:text-4xl font-semibold text-black sm:mb-4 mb-2">
                {t("HOME_PAGE.YOUR_SAVINGS.HEADING")}
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                {t("HOME_PAGE.YOUR_SAVINGS.DESCRIPTION")}

              </p>
              <div className="flex flex-col sm:flex-row items-center tab:mt-[40px] mt-4 tab:gap-4 sm:gap-2 gap-3">
                <div className="bg-bggray rounded-[16px] tab:py-[32px] py-3 px-4 tab:px-[40px] flex flex-col tab:gap-4 gap-2 w-full">
                  <h3 className="tab:text-5xl text-xl text-black font-bold">
                    +70%
                  </h3>
                  <p className="tab:text-base text-sm">
                    {t("HOME_PAGE.YOUR_SAVINGS.RATE")}
                  </p>
                </div>
                <div className="bg-bggray rounded-[16px] tab:py-[32px] py-3 px-4 tab:px-[40px] flex flex-col tab:gap-4 gap-2 w-full">
                  <h3 className="tab:text-5xl text-xl text-black font-bold">
                    2.5X
                  </h3>
                  <p className="tab:text-base text-sm">
                    {t("HOME_PAGE.YOUR_SAVINGS.SECURITY")}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: How It Works */}

            <div className="w-full md:w-1/2">
              <div className="flex justify-center lg:mt-0 lg:justify-end">
                <img
                  src={takecontrol}
                  alt="create-account"
                  className="size-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tab:py-secpadding py-40">
        <div className="mx-auto 2xl:max-w-screen-xl container text-left sm:px-5 px-2">
          <div className="flex flex-col md:flex-row items-start md:gap-0 gap-6">
            {/* Left Content */}
            <div
              className={`w-full md:w-1/2 mt-0 lg:mt-0 ${lang === "ar"
                ? "tab:pl-20 md:pl-4 text-right"
                : "tab:pr-20 md:pr-4"
                }`}
            >
              <h3 className="text-lg font-medium text-blue sm:mb-2 mb-0">
                {t("HOME_PAGE.TOP_UP.TITLE")}
              </h3>
              <h2 className="text-2xl tab:text-4xl font-semibold text-black sm:mb-4 mb-2">
                {t("HOME_PAGE.TOP_UP.HEADING")}
              </h2>
              <p className="xl:text-lg text-base font-normal ">
                {t("HOME_PAGE.TOP_UP.DESCRIPTION")}
              </p>
            </div>

            {/* Right Content */}
            <div
              className={`w-full md:w-1/2 flex flex-col md:gap-12 gap-3 ${lang === "ar" ? "text-right" : ""
                }`}
            >
              {/* Recurring Deposits */}
              <div
                className={`flex items-start ${lang === "ar" ? "space-x-reverse space-x-4" : "space-x-4"
                  }`}
              >
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
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-semibold text-black">
                    {t("HOME_PAGE.RECURRING_DEPOSITS.TITLE")}
                  </h4>
                  <p className="text-gray-600">
                    {t("HOME_PAGE.RECURRING_DEPOSITS.DESCRIPTION")}
                  </p>
                </div>
              </div>

              {/* One-time Deposits */}
              <div
                className={`flex items-start ${lang === "ar" ? "space-x-reverse space-x-4" : "space-x-4"
                  }`}
              >
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
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-semibold text-black">
                    {t("HOME_PAGE.ONE_TIME_DEPOSITS.TITLE")}                  </h4>
                  <p className="text-gray-600">
                    {t("HOME_PAGE.ONE_TIME_DEPOSITS.DESCRIPTION")}
                  </p>
                </div>
              </div>

              {/* Round-ups Deposits */}
              <div
                className={`flex items-start ${lang === "ar" ? "space-x-reverse space-x-4" : "space-x-4"
                  }`}
              >
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
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-semibold text-black">
                    {t("HOME_PAGE.ROUND_UP_DEPOSITS.TITLE")}                         </h4>
                  <p className="text-gray-600">
                    {t("HOME_PAGE.ROUND_UP_DEPOSITS.DESCRIPTION")}
                  </p>
                </div>
              </div>

              {/* Crowd Savings Deposits */}
              <div
                className={`flex items-start ${lang === "ar" ? "space-x-reverse space-x-4" : "space-x-4"
                  }`}
              >
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
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-semibold text-black">
                    {t("HOME_PAGE.CROWD_SAVINGS_DEPOSITS.TITLE")}                  </h4>
                  <p className="text-gray-600">
                    {t("HOME_PAGE.CROWD_SAVINGS_DEPOSITS.DESCRIPTION")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
};

export default Homepage;
