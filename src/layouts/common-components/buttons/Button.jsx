import React from "react";
import PropTypes from "prop-types";

const Button = ({
  type = "primary",
  onClick,
  children,
  className = "",
  ...props
}) => {
  const baseClass =
    "cursor-pointer px-4 py-2 rounded font-medium focus:outline-none focus:ring shadow-shadow4";
  const primaryClass =
    "cursor-pointer h-11 py-0 px-5 flex justify-center items-center gap-1 rounded-[8px] border border-gray-300 bg-transparent text-black hover:bg-blue hover:text-white hover:border-blue focus:ring focus:ring-blue-300 shadow-shadow4";
  const secondaryClass =
    "cursor-pointer h-11 py-0 px-5 flex justify-center items-center gap-1 rounded-[8px] border border-blue text-white bg-blue text-white hover:bg-blue-600 focus:ring-gray-300 shadow-shadow4";

  const finalClass = `${baseClass} ${type === "primary" ? primaryClass : secondaryClass} ${className}`;

  return (
    <a className={finalClass} onClick={onClick} {...props}>
      {children}
    </a>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary"]),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
