import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../assets/img/Avataaar.png";
import LogoutImage from "../../../assets/img/logout.png";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../actions/user";
import {
  sidebarMenuListForUser,
  sidebarMenuListForMerchant,
  generalMenuListForMerchant,
  generalMenuListForUser,
} from "../../../utils/contstant";
import { Modal } from "antd";
import "../../../styles/dashboard.css";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const user = useSelector((state: any) => state?.Auth);

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false); // State for logout modal
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userSideBarList, setUserSidebarList] = useState(
    sidebarMenuListForUser
  );
  const [generalList, setGeneralList] = useState(generalMenuListForUser);
  const [showCollapse, setShowCollapse] = useState();

  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || "Dashboard"
  );
  const profilePhoto = user?.user?.data?.profilePhoto;

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    switch (user?.user?.data?.roleId) {
      case 2: {
        setUserSidebarList(sidebarMenuListForMerchant);
        setGeneralList(generalMenuListForMerchant);

        break;
      }
      case 3: {
        setUserSidebarList(sidebarMenuListForUser);
        setGeneralList(generalMenuListForUser);

        break;
      }
      default: {
        break;
      }
    }
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [user, darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    // Reset active menu when navigating to settings or change password
    if (
      location.pathname.includes("/settings") ||
      location.pathname.includes("/change-password")
    ) {
      setActiveMenu(null); // Reset active menu when in settings or change password
    }
  }, [location]);

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogout = () => {
    dispatch(
      userLogout(() => {
        navigate("/dashboard/login");
      })
    );
    setIsLogoutModalVisible(false);
  };

  const LogoutModal = (handleLogout: () => void) => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      onOk: handleLogout,
      okText: "Log Out",
      cancelText: "Stay Logged In",
      className: "modal-bg-light model_bg_remove" ,
    });
  };

  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false); // Close the dropdown
  };

  // Update active menu and store it in localStorage
  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem.name);
    localStorage.setItem("activeMenu", menuItem.name); // Persist active menu to localStorage
  };

  return (
    <>
      <div
        className={`${
          isCollapsed ? "w-20" : "w-72"
        } bg-white shadow-md h-screen fixed transition-all duration-300 sidebarcustom z-10`}
      >
        <div className="flex flex-col relative full-height overflow-y-auto overflow-x-hidden">
          <div
            className="absolute rounded-full border border-bordercolor md:p-2 p-1.5 right-[-12px]  md:top-[24px] top-[16px] cursor bg-white"
            onClick={onToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10.4698 4.94L9.52979 4L5.52979 8L9.52979 12L10.4698 11.06L7.41645 8L10.4698 4.94Z"
                fill="#1F242E"
              />
            </svg>
          </div>
          <div className="flex items-center space-x-2  tab:py-6 py-4 mx-6 border-b border-bordercolor">
            <Link to="/">
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
                ></rect>
                <path
                  d="M28.0949 12.2633V22.9648L21.9834 21.6303V11.7334C21.9834 11.0619 21.6831 10.4443 21.1561 10.0306C20.6262 9.6226 19.9576 9.48093 19.3087 9.64243L9.74902 12.0451V7.99908L19.4844 5.5454C21.5641 5.02123 23.7344 5.48023 25.4316 6.80341C27.1259 8.12375 28.0949 10.1128 28.0949 12.2661V12.2633Z"
                  fill="white"
                ></path>
                <path
                  d="M21.9835 21.6302V26.8095L10.5537 24.3162C7.5844 23.6673 5.42822 20.9898 5.42822 17.9553V13.1358L9.74907 12.0449V16.7568C9.74907 18.0346 10.6586 19.1595 11.9081 19.4315L21.9835 21.6273V21.6302Z"
                  fill="white"
                ></path>
                <g clipPath="url(#clip0_1334_298)">
                  <path
                    d="M50.9964 16.8375C49.0939 16.585 47.4789 16.37 47.4789 15.0075C47.4789 13.9675 48.4114 13.0675 50.2789 13.0675C51.9664 13.0675 52.9689 13.8225 53.0789 14.9H57.3164C57.2089 11.7775 54.5514 9.33496 50.2089 9.33496C45.8664 9.33496 43.1739 11.705 43.1739 15.3325C43.1739 19.675 47.1964 20.14 49.9239 20.5C51.8239 20.7525 53.4039 20.93 53.4039 22.295C53.4039 23.37 52.4714 24.2675 50.2814 24.2675C48.0914 24.2675 47.1589 23.475 47.1214 22.295H42.8164C42.9239 25.595 45.7589 28 50.2789 28C54.7989 28 57.7089 25.6325 57.7089 22.0425C57.7089 17.6275 53.3664 17.1625 50.9964 16.84V16.8375Z"
                    fill="#1F242E"
                  ></path>
                  <path
                    d="M68.5813 9.3374C63.3438 9.3374 59.7563 12.1974 59.7563 18.1174V27.9999H63.9913V18.1174C63.9913 14.7424 65.8888 13.3224 68.5813 13.3224C71.2738 13.3224 73.1688 14.7424 73.1688 18.1174V27.9999H77.4038V18.1174C77.4038 12.1599 73.8213 9.3374 68.5813 9.3374Z"
                    fill="#1F242E"
                  ></path>
                  <path
                    d="M90.419 9.3375C87.874 9.3375 85.754 10.415 84.499 12.39L84.464 4H80.229V18.525C80.229 24.2675 84.1065 28 89.6665 28C95.2265 28 99.249 24.1225 99.249 18.49C99.249 12.425 94.729 9.34 90.4215 9.34H90.419V9.3375ZM89.7015 24.015C86.579 24.015 84.499 21.79 84.499 18.6675C84.499 15.545 86.5815 13.3225 89.7015 13.3225C92.8215 13.3225 94.9415 15.545 94.9415 18.6675C94.9415 21.79 92.824 24.015 89.7015 24.015Z"
                    fill="#1F242E"
                  ></path>
                  <path
                    d="M102.111 4L102.076 28H106.346V4H102.111Z"
                    fill="#1F242E"
                  ></path>
                  <path
                    d="M118.376 9.3374C112.741 9.3374 108.794 13.2149 108.794 18.8499C108.794 24.9149 113.316 27.9999 117.621 27.9999C120.424 27.9999 122.829 26.6724 123.904 24.0524V27.9999H127.816V18.8124C127.816 13.1074 123.939 9.3374 118.376 9.3374ZM118.341 24.0149C115.216 24.0149 113.101 21.7899 113.101 18.6674C113.101 15.5449 115.216 13.3224 118.341 13.3224C121.466 13.3224 123.544 15.5449 123.544 18.6674C123.544 21.7899 121.459 24.0149 118.341 24.0149Z"
                    fill="#1F242E"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_1334_298">
                    <rect
                      width="85"
                      height="24"
                      fill="white"
                      transform="translate(42.8164 4)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
          <nav className="p-5 flex flex-col gap-2 ">
            {/* <p className="">Dashboard</p> */}
            {userSideBarList.map((menuItem) => (
              <Link
                key={menuItem?.id}
                to={menuItem.path}
                onClick={() => handleMenuClick(menuItem)}
                className={`flex items-center gap-3 py-2 px-3 text-sm rounded-lg font-medium transition-all
      ${
        activeMenu === menuItem.name
          ? "bg-[#ECF2FF] text-blue"
          : "text-gray bg-white"
      }
      hover:bg-gray-100 hover:text-gray-900`}
              >
                {typeof menuItem.icon === "function"
                  ? menuItem.icon(activeMenu === menuItem.name)
                  : menuItem.icon}
                {menuItem.name}
              </Link>
            ))}
          </nav>
          <div className="pb-5 px-5 flex flex-col gap-2 mt-auto ">
            <p className={`${isCollapsed ? "opacity-0" : " "} mt-auto`}>
              General
            </p>
            {generalList.map((menuItem) => (
              <Link
                key={menuItem?.id}
                to={menuItem.path}
                onClick={() => handleMenuClick(menuItem)}
                className={`flex items-center gap-3 py-2 px-3 text-sm rounded-lg font-medium transition-all
      ${
        activeMenu === menuItem.name
          ? "bg-[#ECF2FF] text-blue"
          : "text-gray bg-white"
      }
      hover:bg-gray-100 hover:text-gray-900`}
              >
                {typeof menuItem.icon === "function"
                  ? menuItem.icon(activeMenu === menuItem.name)
                  : menuItem.icon}
                {menuItem.name}
              </Link>
            ))}
            <button
              // onClick={showLogoutModal}
              onClick={() => LogoutModal(handleLogout)}
              className="flex items-center gap-3 py-2 px-3 text-sm rounded-lg font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M13 3H7C6.44772 3 6 3.44772 6 4V16C6 16.5523 6.44772 17 7 17H13C13.5523 17 14 16.5523 14 16V4C14 3.44772 13.5523 3 13 3ZM12 15H8V5H12V15Z"
                  fill="#4E5663"
                />
              </svg>
              {!isCollapsed && <span className="ml-2">Logout</span>}
            </button>
            <div className="relative group pt-4">
              <div
                className={`${
                  isCollapsed ? "px-0" : "px-3"
                } text-black-600 py-3 flex flex-row gap-3 items-center cursor-pointer hover:bg-borderlight rounded-lg`}
                onClick={handleToggleDropdown}
              >
                <p
                  className={`${
                    isCollapsed ? "size-auto" : "size-[40px]"
                  } relative`}
                >
                  <img
                    src={profilePhoto ? profilePhoto : Avatar}
                    alt="Profile"
                  />
                  <span
                    className={`${
                      isCollapsed ? "size-[10px] p-1" : "size-[16px] p-2"
                    } absolute rounded-full bg-white bottom-0 right-[-5px]`}
                  >
                    <span
                      className={`${
                        isCollapsed ? "size-[6px]" : "size-[12px]"
                      } absolute rounded-full bg-[#10B981] bottom-[2px] right-[2px]`}
                    ></span>
                  </span>
                </p>
                <p
                  className={`${
                    isCollapsed ? "hidden" : ""
                  } text-sm flex flex-col text-black gap-2`}
                >
                  {user?.user?.data?.roleId === "2"
                    ? user?.user?.data?.name
                    : user?.user?.data?.name &&
                      user?.user?.data?.name !== "undefined"
                    ? user?.user?.data?.name
                    : user?.user?.data?.firstName || user?.user?.data?.lastName
                    ? `${user?.user?.data?.firstName || ""} ${
                        user?.user?.data?.lastName || ""
                      }`.trim()
                    : ""}
                  <span className="text-xs text-gray">
                    {user?.user?.data?.mobileNumber}
                  </span>
                </p>
                <p className={`${isCollapsed ? "hidden" : ""} ml-auto`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12.0002 5.83L15.1702 9L16.5802 7.59L12.0002 3L7.41016 7.59L8.83016 9L12.0002 5.83ZM12.0002 18.17L8.83016 15L7.42016 16.41L12.0002 21L16.5902 16.41L15.1702 15L12.0002 18.17Z"
                      fill="#4E5663"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>

          {user?.user?.data?.roleId === 3
            ? isDropdownOpen && (
                <div className="absolute bottom-24 bg-white border-t w-full pt-4 border-bordercolor mt-auto Accountdiv rounded-xl">
                  <div className="flex flex-col gap-2 px-5">
                    <p
                      className={`${
                        isCollapsed ? "opacity-0" : " "
                      } mt-auto text-xs`}
                    >
                      Account
                    </p>
                    <Link
                      className="flex items-center gap-3 py-2 px-3 text-sm rounded-lg font-medium transition-all text-black bg-white hover:bg-gray-100 hover:text-gray-900"
                      to="/dashboard/settings"
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M15.3247 12.1334C13.9247 11.4167 12.108 10.8334 9.99967 10.8334C7.89134 10.8334 6.07467 11.4167 4.67467 12.1334C3.84134 12.5584 3.33301 13.4167 3.33301 14.35V16.6667H16.6663V14.35C16.6663 13.4167 16.158 12.5584 15.3247 12.1334Z"
                          fill="#686E7D"
                        />
                        <path
                          d="M8.14967 10H11.8497C12.858 10 13.633 9.11671 13.4997 8.11671L13.233 6.07504C12.9747 4.49171 11.5997 3.33337 9.99967 3.33337C8.39967 3.33337 7.02467 4.49171 6.76634 6.07504L6.49967 8.11671C6.36634 9.11671 7.14134 10 8.14967 10Z"
                          fill="#686E7D"
                        />
                      </svg>
                      My Profile
                    </Link>
                    <Link
                      className="flex items-center gap-3 py-2 px-3 text-sm rounded-lg font-medium transition-all text-black bg-white hover:bg-gray-100 hover:text-gray-900"
                      to="/dashboard/referrals"
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M16.25 2.91663L15 1.66663L13.75 2.91663L12.5 1.66663L11.25 2.91663L10 1.66663L8.75 2.91663L7.5 1.66663L6.25 2.91663L5 1.66663V13.3333H2.5V15.8333C2.5 17.2166 3.61667 18.3333 5 18.3333H15C16.3833 18.3333 17.5 17.2166 17.5 15.8333V1.66663L16.25 2.91663ZM15.8333 15.8333C15.8333 16.2916 15.4583 16.6666 15 16.6666C14.5417 16.6666 14.1667 16.2916 14.1667 15.8333V13.3333H6.66667V4.16663H15.8333V15.8333Z"
                          fill="#686E7D"
                        />
                        <path
                          d="M12.5 5.83329H7.5V7.49996H12.5V5.83329Z"
                          fill="#686E7D"
                        />
                        <path
                          d="M15 5.83329H13.3333V7.49996H15V5.83329Z"
                          fill="#686E7D"
                        />
                        <path
                          d="M12.5 8.33329H7.5V9.99996H12.5V8.33329Z"
                          fill="#686E7D"
                        />
                        <path
                          d="M15 8.33329H13.3333V9.99996H15V8.33329Z"
                          fill="#686E7D"
                        />
                      </svg>
                      My Statements
                    </Link>
                  </div>
                  <div className="border-t border-bordercolor my-3"></div>
                  <div
                    className={`${
                      isCollapsed ? "hidediv" : " "
                    } flex flex-col gap-1  `}
                  >
                    <p
                      className={`${
                        isCollapsed ? "opacity-0" : " "
                      } mt-auto text-xs px-5 py-2`}
                    >
                      Preferences
                    </p>
                    <div className="flex justify-between px-5 hover:bg-borderlight">
                      <a className="flex items-center gap-3 py-3 px-3 text-sm rounded-lg font-medium transition-all text-black bg-transparent hover:text-gray-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M10 2.5C5.85833 2.5 2.5 5.85833 2.5 10C2.5 14.1417 5.85833 17.5 10 17.5C10.6917 17.5 11.25 16.9417 11.25 16.25C11.25 15.925 11.125 15.6333 10.925 15.4083C10.7333 15.1917 10.6083 14.9 10.6083 14.5833C10.6083 13.8917 11.1667 13.3333 11.8583 13.3333H13.3333C15.6333 13.3333 17.5 11.4667 17.5 9.16667C17.5 5.48333 14.1417 2.5 10 2.5ZM5.41667 10C4.725 10 4.16667 9.44167 4.16667 8.75C4.16667 8.05833 4.725 7.5 5.41667 7.5C6.10833 7.5 6.66667 8.05833 6.66667 8.75C6.66667 9.44167 6.10833 10 5.41667 10ZM7.91667 6.66667C7.225 6.66667 6.66667 6.10833 6.66667 5.41667C6.66667 4.725 7.225 4.16667 7.91667 4.16667C8.60833 4.16667 9.16667 4.725 9.16667 5.41667C9.16667 6.10833 8.60833 6.66667 7.91667 6.66667ZM12.0833 6.66667C11.3917 6.66667 10.8333 6.10833 10.8333 5.41667C10.8333 4.725 11.3917 4.16667 12.0833 4.16667C12.775 4.16667 13.3333 4.725 13.3333 5.41667C13.3333 6.10833 12.775 6.66667 12.0833 6.66667ZM14.5833 10C13.8917 10 13.3333 9.44167 13.3333 8.75C13.3333 8.05833 13.8917 7.5 14.5833 7.5C15.275 7.5 15.8333 8.05833 15.8333 8.75C15.8333 9.44167 15.275 10 14.5833 10Z"
                            fill="#686E7D"
                          />
                        </svg>
                        Theme
                      </a>
                      <div className="switch-main">
                        <div
                          className={`switch-container theme ${
                            darkMode ? "dark" : "light"
                          }`}
                          onClick={toggleTheme}
                        >
                          <div
                            className={`switch  ${
                              darkMode ? "switch-ar dark" : "switch-en light"
                            }`}
                          >
                            <span className="switch-text">
                              {darkMode ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="w-3 h-3"
                                >
                                  <circle cx="12" cy="12" r="5" />
                                  <line x1="12" y1="1" x2="12" y2="3" />
                                  <line x1="12" y1="21" x2="12" y2="23" />
                                  <line
                                    x1="4.22"
                                    y1="4.22"
                                    x2="5.64"
                                    y2="5.64"
                                  />
                                  <line
                                    x1="18.36"
                                    y1="18.36"
                                    x2="19.78"
                                    y2="19.78"
                                  />
                                  <line x1="1" y1="12" x2="3" y2="12" />
                                  <line x1="21" y1="12" x2="23" y2="12" />
                                  <line
                                    x1="4.22"
                                    y1="19.78"
                                    x2="5.64"
                                    y2="18.36"
                                  />
                                  <line
                                    x1="18.36"
                                    y1="5.64"
                                    x2="19.78"
                                    y2="4.22"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                >
                                  <path
                                    d="M6 1.5C3.515 1.5 1.5 3.515 1.5 6C1.5 8.485 3.515 10.5 6 10.5C8.485 10.5 10.5 8.485 10.5 6C10.5 5.77 10.48 5.54 10.45 5.32C9.96 6.005 9.16 6.45 8.25 6.45C6.76 6.45 5.55 5.24 5.55 3.75C5.55 2.845 5.995 2.04 6.68 1.55C6.46 1.52 6.23 1.5 6 1.5Z"
                                    fill="#131826"
                                  />
                                </svg>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between px-5 hover:bg-borderlight">
                      <Link
                        className="flex items-center gap-3 py-3 px-3 text-sm rounded-lg font-medium transition-all text-black bg-transparent hover:text-gray-900"
                        to=""
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M9.99199 1.66663C5.39199 1.66663 1.66699 5.39996 1.66699 9.99996C1.66699 14.6 5.39199 18.3333 9.99199 18.3333C14.6003 18.3333 18.3337 14.6 18.3337 9.99996C18.3337 5.39996 14.6003 1.66663 9.99199 1.66663ZM15.767 6.66663H13.3087C13.042 5.62496 12.6587 4.62496 12.1587 3.69996C13.692 4.22496 14.967 5.29163 15.767 6.66663ZM10.0003 3.36663C10.692 4.36663 11.2337 5.47496 11.592 6.66663H8.40866C8.76699 5.47496 9.30866 4.36663 10.0003 3.36663ZM3.55033 11.6666C3.41699 11.1333 3.33366 10.575 3.33366 9.99996C3.33366 9.42496 3.41699 8.86663 3.55033 8.33329H6.36699C6.30033 8.88329 6.25033 9.43329 6.25033 9.99996C6.25033 10.5666 6.30033 11.1166 6.36699 11.6666H3.55033ZM4.23366 13.3333H6.69199C6.95866 14.375 7.34199 15.375 7.84199 16.3C6.30866 15.775 5.03366 14.7166 4.23366 13.3333ZM6.69199 6.66663H4.23366C5.03366 5.28329 6.30866 4.22496 7.84199 3.69996C7.34199 4.62496 6.95866 5.62496 6.69199 6.66663ZM10.0003 16.6333C9.30866 15.6333 8.76699 14.525 8.40866 13.3333H11.592C11.2337 14.525 10.692 15.6333 10.0003 16.6333ZM11.9503 11.6666H8.05033C7.97533 11.1166 7.91699 10.5666 7.91699 9.99996C7.91699 9.43329 7.97533 8.87496 8.05033 8.33329H11.9503C12.0253 8.87496 12.0837 9.43329 12.0837 9.99996C12.0837 10.5666 12.0253 11.1166 11.9503 11.6666ZM12.1587 16.3C12.6587 15.375 13.042 14.375 13.3087 13.3333H15.767C14.967 14.7083 13.692 15.775 12.1587 16.3ZM13.6337 11.6666C13.7003 11.1166 13.7503 10.5666 13.7503 9.99996C13.7503 9.43329 13.7003 8.88329 13.6337 8.33329H16.4503C16.5837 8.86663 16.667 9.42496 16.667 9.99996C16.667 10.575 16.5837 11.1333 16.4503 11.6666H13.6337Z"
                            fill="#686E7D"
                          />
                        </svg>
                        Language
                      </Link>
                      <div className="flex gap-1 items-center">
                        <div className="flex gap-1 items-center border py-1 px-2 border-[#A7F3D0] bg-[#ECFDF5] w-auto rounded-[4px]">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_2147_14278)">
                              <path
                                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                                fill="#F0F0F0"
                              />
                              <path
                                d="M1.65355 3.12866C1.02514 3.94626 0.551297 4.8886 0.275391 5.91232H4.4372L1.65355 3.12866Z"
                                fill="#0052B4"
                              />
                              <path
                                d="M15.7243 5.91241C15.4483 4.88872 14.9745 3.94638 14.3461 3.12878L11.5625 5.91241H15.7243Z"
                                fill="#0052B4"
                              />
                              <path
                                d="M0.275391 10.0868C0.551328 11.1105 1.02517 12.0528 1.65355 12.8704L4.43711 10.0868H0.275391Z"
                                fill="#0052B4"
                              />
                              <path
                                d="M12.8705 1.65321C12.0529 1.02481 11.1106 0.550962 10.0869 0.275024V4.43681L12.8705 1.65321Z"
                                fill="#0052B4"
                              />
                              <path
                                d="M3.12891 14.3452C3.9465 14.9736 4.88885 15.4475 5.91253 15.7234V11.5616L3.12891 14.3452Z"
                                fill="#0052B4"
                              />
                              <path
                                d="M5.9125 0.275024C4.88881 0.550962 3.94647 1.02481 3.12891 1.65318L5.9125 4.43677V0.275024Z"
                                fill="#0052B4"
                              />
                              <path
                                d="M10.0869 15.7234C11.1106 15.4475 12.0529 14.9736 12.8705 14.3452L10.0869 11.5616V15.7234Z"
                                fill="#0052B4"
                              />
                              <path
                                d="M11.5625 10.0868L14.3461 12.8704C14.9745 12.0528 15.4483 11.1105 15.7243 10.0868H11.5625Z"
                                fill="#0052B4"
                              />
                              <path
                                d="M15.9323 6.95653H9.04353H9.0435V0.0677188C8.70191 0.02325 8.35366 0 8 0C7.64628 0 7.29809 0.02325 6.95653 0.0677188V6.95647V6.9565H0.0677188C0.02325 7.29809 0 7.64634 0 8C0 8.35372 0.02325 8.70191 0.0677188 9.04347H6.95647H6.9565V15.9323C7.29809 15.9768 7.64628 16 8 16C8.35366 16 8.70191 15.9768 9.04347 15.9323V9.04353V9.0435H15.9323C15.9768 8.70191 16 8.35372 16 8C16 7.64634 15.9768 7.29809 15.9323 6.95653Z"
                                fill="#D80027"
                              />
                              <path
                                d="M10.0869 10.0876L13.6568 13.6574C13.821 13.4933 13.9776 13.3217 14.127 13.1438L11.0707 10.0875H10.0869V10.0876Z"
                                fill="#D80027"
                              />
                              <path
                                d="M5.91268 10.0875H5.91262L2.34277 13.6574C2.5069 13.8216 2.67849 13.9782 2.85637 14.1276L5.91268 11.0712V10.0875Z"
                                fill="#D80027"
                              />
                              <path
                                d="M5.91317 5.91274V5.91268L2.3433 2.34277C2.17911 2.5069 2.02248 2.67849 1.87305 2.85637L4.92939 5.91271H5.91317V5.91274Z"
                                fill="#D80027"
                              />
                              <path
                                d="M10.0869 5.91345L13.6568 2.34351C13.4927 2.17932 13.3211 2.0227 13.1432 1.87329L10.0869 4.92964V5.91345V5.91345Z"
                                fill="#D80027"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2147_14278">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <span className="enclass">En</span>
                        </div>
                        <div className="arrowicon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M6.47027 4L5.53027 4.94L8.58361 8L5.53027 11.06L6.47027 12L10.4703 8L6.47027 4Z"
                              fill="#686E7D"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-bordercolor my-2  "></div>
                  <div className="flex flex-col gap-2 px-5 cursor-pointer">
                    <a
                      // onClick={showLogoutModal}
                      onClick={() => LogoutModal(handleLogout)}
                      className={`${
                        isCollapsed ? "px-0" : " px-3"
                      } flex items-center text-[#DC2626] gap-3 py-2  text-sm rounded-lg font-medium pointer`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M14.167 5.83333L12.992 7.00833L15.142 9.16667H6.66699V10.8333H15.142L12.992 12.9833L14.167 14.1667L18.3337 10L14.167 5.83333ZM3.33366 4.16667H10.0003V2.5H3.33366C2.41699 2.5 1.66699 3.25 1.66699 4.16667V15.8333C1.66699 16.75 2.41699 17.5 3.33366 17.5H10.0003V15.8333H3.33366V4.16667Z"
                          fill="#EF4444"
                        />
                      </svg>
                      {!isCollapsed && <span className="">Sign Out</span>}
                    </a>
                  </div>
                </div>
              )
            : isDropdownOpen && (
                <div className="absolute bottom-24 bg-white border-t w-full pt-4 border-bordercolor mt-auto Accountdiv rounded-xl">
                  <div className="flex flex-col gap-2 px-5">
                    <p
                      className={`${
                        isCollapsed ? "opacity-0" : " "
                      } mt-auto text-xs`}
                    >
                      Account
                    </p>
                    <Link
                      className="flex items-center gap-3 py-2 px-3 text-sm rounded-lg font-medium transition-all text-black bg-white hover:bg-gray-100 hover:text-gray-900"
                      to="/merchant/settings"
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M15.3247 12.1334C13.9247 11.4167 12.108 10.8334 9.99967 10.8334C7.89134 10.8334 6.07467 11.4167 4.67467 12.1334C3.84134 12.5584 3.33301 13.4167 3.33301 14.35V16.6667H16.6663V14.35C16.6663 13.4167 16.158 12.5584 15.3247 12.1334Z"
                          fill="#686E7D"
                        />
                        <path
                          d="M8.14967 10H11.8497C12.858 10 13.633 9.11671 13.4997 8.11671L13.233 6.07504C12.9747 4.49171 11.5997 3.33337 9.99967 3.33337C8.39967 3.33337 7.02467 4.49171 6.76634 6.07504L6.49967 8.11671C6.36634 9.11671 7.14134 10 8.14967 10Z"
                          fill="#686E7D"
                        />
                      </svg>
                      My Profile
                    </Link>
                    <Link
                      className="flex items-center gap-3 py-2 px-3 text-sm rounded-lg font-medium transition-all text-black bg-white hover:bg-gray-100 hover:text-gray-900"
                      to="/merchant/change-password"
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M16.25 2.91663L15 1.66663L13.75 2.91663L12.5 1.66663L11.25 2.91663L10 1.66663L8.75 2.91663L7.5 1.66663L6.25 2.91663L5 1.66663V13.3333H2.5V15.8333C2.5 17.2166 3.61667 18.3333 5 18.3333H15C16.3833 18.3333 17.5 17.2166 17.5 15.8333V1.66663L16.25 2.91663ZM15.8333 15.8333C15.8333 16.2916 15.4583 16.6666 15 16.6666C14.5417 16.6666 14.1667 16.2916 14.1667 15.8333V13.3333H6.66667V4.16663H15.8333V15.8333Z"
                          fill="#686E7D"
                        />
                        <path
                          d="M12.5 5.83329H7.5V7.49996H12.5V5.83329Z"
                          fill="#686E7D"
                        />
                        <path
                          d="M15 5.83329H13.3333V7.49996H15V5.83329Z"
                          fill="#686E7D"
                        />
                        <path
                          d="M12.5 8.33329H7.5V9.99996H12.5V8.33329Z"
                          fill="#686E7D"
                        />
                        <path
                          d="M15 8.33329H13.3333V9.99996H15V8.33329Z"
                          fill="#686E7D"
                        />
                      </svg>
                      Change Password
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2 px-5">
                    <a
                      // onClick={showLogoutModal}
                      onClick={() => LogoutModal(handleLogout)}
                      className={`${
                        isCollapsed ? "px-0" : " px-3"
                      } flex items-center text-[#DC2626] gap-3 py-2  text-sm rounded-lg font-medium pointer`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M14.167 5.83333L12.992 7.00833L15.142 9.16667H6.66699V10.8333H15.142L12.992 12.9833L14.167 14.1667L18.3337 10L14.167 5.83333ZM3.33366 4.16667H10.0003V2.5H3.33366C2.41699 2.5 1.66699 3.25 1.66699 4.16667V15.8333C1.66699 16.75 2.41699 17.5 3.33366 17.5H10.0003V15.8333H3.33366V4.16667Z"
                          fill="#EF4444"
                        />
                      </svg>
                      {!isCollapsed && (
                        <span className="cursor-pointer">Logout</span>
                      )}
                    </a>
                  </div>
                </div>
              )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {/* <Modal
        title="Confirm Logout"
        visible={isLogoutModalVisible}
        onOk={handleLogout}
        onCancel={handleCancelLogout}
        okText="Yes"
        cancelText="No"
        className="modal-bg-light"
        
      >
        <p>Are you sure you want to logout?</p>
      </Modal> */}
    </>
  );
};

export default Sidebar;
