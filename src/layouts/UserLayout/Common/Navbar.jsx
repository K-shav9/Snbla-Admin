import React from "react";
import PropTypes from "prop-types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <>
      <div className="flex items-center justify-between tab:px-8 px-3 tab:py-5 py-3 pl-6 border-bordercolor border-b relative bg-white">
        <button
          onClick={onToggleSidebar}
          className="absolute rounded-full md:hidden border border-bordercolor p-1.5 left-[-12px] top-[16px] cursor bg-white"
        >
          <svg
            className="transform rotate-180"
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
        </button>
        <div className="relative sm:w-[320px] w-[200px] sm:ml-0 ml-2">
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow border border-bordercolor rounded-lg px-4 pl-8 py-2 text-sm h-[40px] w-full"
          />
          <svg
            className="absolute left-2 top-[11px]"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M13.1291 11.8791H12.4707L12.2374 11.6541C13.0541 10.7041 13.5457 9.47074 13.5457 8.12907C13.5457 5.1374 11.1207 2.7124 8.12907 2.7124C5.1374 2.7124 2.7124 5.1374 2.7124 8.12907C2.7124 11.1207 5.1374 13.5457 8.12907 13.5457C9.47074 13.5457 10.7041 13.0541 11.6541 12.2374L11.8791 12.4707V13.1291L16.0457 17.2874L17.2874 16.0457L13.1291 11.8791ZM8.12907 11.8791C6.05407 11.8791 4.37907 10.2041 4.37907 8.12907C4.37907 6.05407 6.05407 4.37907 8.12907 4.37907C10.2041 4.37907 11.8791 6.05407 11.8791 8.12907C11.8791 10.2041 10.2041 11.8791 8.12907 11.8791Z"
              fill="#686E7D"
            />
          </svg>
          <button className="absolute right-2 top-[7px] border border-[#E9EBF0] rounded-md px-1 py-[2px] text-sm">
            ⌘K
          </button>
        </div>
        <div className="flex items-center tab:gap-3 gap-1">
          <button className="text-gray-600 tab:p-2 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0002 18.125C10.9168 18.125 11.6668 17.375 11.6668 16.4583H8.3335C8.3335 17.375 9.0835 18.125 10.0002 18.125ZM15.0002 13.125V8.95833C15.0002 6.4 13.6418 4.25833 11.2502 3.69167V3.125C11.2502 2.43333 10.6918 1.875 10.0002 1.875C9.3085 1.875 8.75016 2.43333 8.75016 3.125V3.69167C6.36683 4.25833 5.00016 6.39167 5.00016 8.95833V13.125L3.3335 14.7917V15.625H16.6668V14.7917L15.0002 13.125ZM13.3335 13.9583H6.66683V8.95833C6.66683 6.89167 7.92516 5.20833 10.0002 5.20833C12.0752 5.20833 13.3335 6.89167 13.3335 8.95833V13.9583Z"
                fill="#1F242E"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

Navbar.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};
