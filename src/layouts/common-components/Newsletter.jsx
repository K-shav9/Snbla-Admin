import React from 'react'
import newletterbg from "../../assets/img/newletter-bg.png";
import { useLanguagePicker } from '../../hooks/useLanguagePicker';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

const Newsletter = () => {
  const lang = useLanguagePicker();
  const { t } = useTranslation()


  return (
    <>
      <section className="tab:py-secpadding py-40">
        <div
          className={`mx-auto 2xl:max-w-screen-xl container ${lang === "ar" ? "text-right" : "text-left"
            } sm:px-5 px-2`}
        >
          <div
            className="rounded-[20px] lg:py-96 py-10 sm:px-10 px-6 xl:px-[80px] text-white shadow-lg bg-cover"
            style={{ backgroundImage: `url(${newletterbg})` }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 ">
              {/* Left Section */}
              <div className="w-full lg:w-auto">
                <h2 className="text-2xl tab:text-4xl font-semibold text-white md:mb-4 mb-2">
                  {/* Don&apos;t miss out on any updates */}
                  {t("HOME_PAGE.UPDATES.TITLE")}
                </h2>
                <p className="xl:text-lg text-base font-normal text-white">
                  {t("HOME_PAGE.UPDATES.DESCRIPTION")}

                </p>
              </div>

              {/* Right Section */}
              <div className="flex flex-col w-full lg:w-auto gap-4">
                <div className="flex items-center sm:flex-row flex-col sm:space-x-2 space-x-0 gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="p-3 w-full sm:w-64 rounded-md border text-black border-gray-700 bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue hover:bg-blue-100 text-white font-semibold py-3 px-6 rounded-md sm:w-auto w-full">
                    {t("HOME_PAGE.UPDATES.GET_ACCESS")}
                  </button>
                </div>
                <p
                  className={`text-white text-sm ${lang === "ar" ? "text-right" : "text-left"
                    } font-normal`}
                >
                  {t("HOME_PAGE.UPDATES.SEE_OUR")}
                  {" "}
                  <Link
                    to="/privacy-policy"
                    className="text-sm text-blue hover:underline"
                  >
                    {t("HOME_PAGE.UPDATES.PRIVACY_POLICY")}
                  </Link>{" "}
                  {t("HOME_PAGE.UPDATES.SEE_YOUR_PRIVACY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Newsletter
