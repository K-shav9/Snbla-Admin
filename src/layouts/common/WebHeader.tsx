import React from "react";
import { useState, useEffect } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import Button from "../common-components/buttons/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LanguageSwitch from "../../LanguageSwitch";
import PluginModalWrapper from "../common-components/PluginWrappper/PluginModalWrapper";
import snblaLogo from "../../assets/img/snbla-logo.png"
import { useTranslation } from 'react-i18next'

const WebHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleSignup = () => {
    navigate("/dashboard/login")
  }

  const handleClose = () => {
    setMobileMenuOpen(false)
  }

  const webToken = localStorage.getItem('web-token')
  const { t } = useTranslation()

  return (
    <>
      <header className="absolute top-0 z-50 w-full transition-colors duration-300 bg-transparent">
        <div className="container mx-auto 2xl:max-w-screen-xl sm:px-5 px-2">
          <nav
            aria-label="Global"
            className="mx-auto flex items-center justify-between lg:py-6 py-5"
          >
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                {/* <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                /> */}
                <svg
                  width="128"
                  height="32"
                  viewBox="0 0 128 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.816406"
                    width="32"
                    height="32"
                    rx="8"
                    fill="#474DF4"
                  />
                  <path
                    d="M28.0949 12.2633V22.9648L21.9834 21.6303V11.7334C21.9834 11.0619 21.6831 10.4443 21.1561 10.0306C20.6262 9.6226 19.9576 9.48093 19.3087 9.64243L9.74902 12.0451V7.99908L19.4844 5.5454C21.5641 5.02123 23.7344 5.48023 25.4316 6.80341C27.1259 8.12375 28.0949 10.1128 28.0949 12.2661V12.2633Z"
                    fill="white"
                  />
                  <path
                    d="M21.9835 21.6302V26.8095L10.5537 24.3162C7.5844 23.6673 5.42822 20.9898 5.42822 17.9553V13.1358L9.74907 12.0449V16.7568C9.74907 18.0346 10.6586 19.1595 11.9081 19.4315L21.9835 21.6273V21.6302Z"
                    fill="white"
                  />
                  <g clipPath="url(#clip0_1334_298)">
                    <path
                      d="M50.9964 16.8375C49.0939 16.585 47.4789 16.37 47.4789 15.0075C47.4789 13.9675 48.4114 13.0675 50.2789 13.0675C51.9664 13.0675 52.9689 13.8225 53.0789 14.9H57.3164C57.2089 11.7775 54.5514 9.33496 50.2089 9.33496C45.8664 9.33496 43.1739 11.705 43.1739 15.3325C43.1739 19.675 47.1964 20.14 49.9239 20.5C51.8239 20.7525 53.4039 20.93 53.4039 22.295C53.4039 23.37 52.4714 24.2675 50.2814 24.2675C48.0914 24.2675 47.1589 23.475 47.1214 22.295H42.8164C42.9239 25.595 45.7589 28 50.2789 28C54.7989 28 57.7089 25.6325 57.7089 22.0425C57.7089 17.6275 53.3664 17.1625 50.9964 16.84V16.8375Z"
                      fill="#1F242E"
                    />
                    <path
                      d="M68.5813 9.3374C63.3438 9.3374 59.7563 12.1974 59.7563 18.1174V27.9999H63.9913V18.1174C63.9913 14.7424 65.8888 13.3224 68.5813 13.3224C71.2738 13.3224 73.1688 14.7424 73.1688 18.1174V27.9999H77.4038V18.1174C77.4038 12.1599 73.8213 9.3374 68.5813 9.3374Z"
                      fill="#1F242E"
                    />
                    <path
                      d="M90.419 9.3375C87.874 9.3375 85.754 10.415 84.499 12.39L84.464 4H80.229V18.525C80.229 24.2675 84.1065 28 89.6665 28C95.2265 28 99.249 24.1225 99.249 18.49C99.249 12.425 94.729 9.34 90.4215 9.34H90.419V9.3375ZM89.7015 24.015C86.579 24.015 84.499 21.79 84.499 18.6675C84.499 15.545 86.5815 13.3225 89.7015 13.3225C92.8215 13.3225 94.9415 15.545 94.9415 18.6675C94.9415 21.79 92.824 24.015 89.7015 24.015Z"
                      fill="#1F242E"
                    />
                    <path
                      d="M102.111 4L102.076 28H106.346V4H102.111Z"
                      fill="#1F242E"
                    />
                    <path
                      d="M118.376 9.3374C112.741 9.3374 108.794 13.2149 108.794 18.8499C108.794 24.9149 113.316 27.9999 117.621 27.9999C120.424 27.9999 122.829 26.6724 123.904 24.0524V27.9999H127.816V18.8124C127.816 13.1074 123.939 9.3374 118.376 9.3374ZM118.341 24.0149C115.216 24.0149 113.101 21.7899 113.101 18.6674C113.101 15.5449 115.216 13.3224 118.341 13.3224C121.466 13.3224 123.544 15.5449 123.544 18.6674C123.544 21.7899 121.459 24.0149 118.341 24.0149Z"
                      fill="#1F242E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1334_298">
                      <rect
                        width="85"
                        height="24"
                        fill="white"
                        transform="translate(42.8164 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-transparent"
              >
                <span className="sr-only">Open main menu</span>
                {/* <Bars3Icon aria-hidden="true" className="size-6" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="32"
                  height="32"
                  x="0"
                  y="0"
                  viewBox="0 0 20 20"
                  className=""
                >
                  <g>
                    <path
                      fill="#1f242e"
                      fillRule="evenodd"
                      d="M3 15a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zM3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z"
                      clipRule="evenodd"
                      opacity="1"
                      data-original="#000000"
                      className=""
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
            <PopoverGroup className="hidden lg:flex lg:gap-2">
              <Link to="/about-us" className="xl:px-3 px-2 py-2 font-medium">
                {t("WEB_HEADER.ABOUT_US")}
              </Link>
              <Link to="/platform" className="xl:px-3 px-0 py-2 font-medium">
                {t("WEB_HEADER.PLATFORM")}
              </Link>
              <Link to="/resources" className="xl:px-3 px-2 py-2 font-medium">
                {t("WEB_HEADER.RESOURCES")}
              </Link>
              <Link
                to="/our-partners"
                className="xl:px-3 px-0 py-2 font-medium"
              >
                {t("WEB_HEADER.OUR_PARTNERS")}

              </Link>
            </PopoverGroup>
            <div className="hidden xl:gap-4 gap-2 lg:flex lg:flex-1 lg:justify-end hideswitcher">
              <LanguageSwitch />
              <Button
                type="primary"
                className="header_link w-[100px]"
                onClick={() =>
                  !webToken
                    ? navigate("/dashboard/login")
                    : navigate("/dashboard")
                }
              >
                {/* Sign in */}
                {/* {location?.pathname === "/login" ? "Sign up" : "Dashboard"} */}
                {!webToken ? t("WEB_HEADER.SIGN_IN") : t("WEB_HEADER.DASHBOARD")
                }
              </Button>
              <Button
                type="secondary"
                onClick={() => navigate("/contact-us")}
                className="header_link w-[148px]"
              >
                {t("WEB_HEADER.CONTACT_SALES")}
              </Button>
            </div>
          </nav>
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" onClick={handleClose} className="-m-1.5 p-1.5">
                  <span className="sr-only">
                    {t("WEB_HEADER.YOUR_COMPANY")}
                  </span>
                  <img alt="" src={snblaLogo} className="h-8 w-auto" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">
                    {t("WEB_HEADER.CLOSE_MENU")}
                  </span>
                  {/* <XMarkIcon aria-hidden="true" className="size-6" /> */}
                  {/* <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="25"
                    height="25"
                    x="0"
                    y="0"
                    viewBox="0 0 329.269 329"
                    className=""
                  >
                    <g>
                      <path
                        d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"
                        fill="#1f242e"
                        opacity="1"
                        data-original="#000000"
                        className=""
                      ></path>
                    </g>
                  </svg> */}
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Link
                      to="/about-us"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={handleClose}
                    >
                      {t("WEB_HEADER.ABOUT_US")}
                    </Link>
                    <Link
                      to="/platform"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={handleClose}
                    >
                      {t("WEB_HEADER.PLATFORM")}
                    </Link>
                    <Link
                      to="/resources"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={handleClose}
                    >
                      {t("WEB_HEADER.RESOURCES")}
                    </Link>
                    <Link
                      to="/our-partners"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={handleClose}
                    >
                      {t("WEB_HEADER.OUR_PARTNERS")}
                    </Link>
                  </div>

                  <div className="py-6">
                    <Link
                      // to="/login"
                      to={!webToken ? "/dashboard/login" : "/dashboard/wallets"}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={handleClose}
                    >
                      {!webToken ? t("WEB_HEADER.SIGN_IN") : t("WEB_HEADER.DASHBOARD")}
                    </Link>

                    <Link
                      to="/contact-us"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={handleClose}
                    >
                      {t("WEB_HEADER.CONTACT_SALES")}
                    </Link>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </header>
    </>
  );
};

export default WebHeader;
