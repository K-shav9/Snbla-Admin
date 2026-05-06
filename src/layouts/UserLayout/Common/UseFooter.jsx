import React from 'react'
import { Link } from 'react-router-dom';

const UseFooter = () => {
  return (
    <>
      <div className="py-4 px-8 flex tab:flex-row flex-col justify-between border-t border-bordercolor items-center gap-3 mt-auto bg-white ">
        <p className="text-xs tab:text-left text-center">
          Copyrights © {new Date().getFullYear()} Snbla, All rights reserved.
        </p>
        <ul className="flex gap-3">
          <li>
            <Link
              className="text-black text-sm font-medium"
              to="/user/term-condition"
            >
              Terms of Use
            </Link>
          </li>
          <li>
            <Link
              className="text-black text-sm font-medium"
              to="/user/privacy-policy"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default UseFooter
