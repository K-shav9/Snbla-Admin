import React from 'react';
import './styles.css'; // Import the CSS for the spinner
import logo from '../../../images/logo/refer-refer-us.png'; // Your logo image

// Custom Spinner Component with logo
const CustomSpinner = () => {
  return (
    <div className="spinner-container">
      <img src={logo} alt="" className="spinner-logo" />
    </div>
  );
};
    
export default CustomSpinner;
