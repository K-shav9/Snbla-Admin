import React, { useEffect, useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useDispatch } from "react-redux";
// import { getActiveUsers, requestOtp } from "../../../actions/user";
import { getActiveUsers, requestOtp } from "../../../actions/user";

import { useNavigate } from "react-router-dom";

const SignUpUser = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
  });

  useEffect(() => {
    document.title = "Signup | Snbla";
  }, []);

  const fetchActiveUsers = () => {
    // Fetch dashboard stats
    getActiveUsers({})
      .then((response: any) => {
        if (response) {
          setStatsData(response); // Update the stats data
        }
      })
      .catch((error: any) => {
        console.error("Error fetching dashboard stats:", error);
      });
  };

  useEffect(() => {
    fetchActiveUsers();
  }, [])

  const handleSignUp = ({ phoneNumber, fullName }) => {
    if (!phoneNumber) {
      console.error("Phone number is missing in the payload.");
      return;
    }

    const formattedPhoneNumber = phoneNumber.toString().trim().startsWith("+")
      ? phoneNumber.toString().trim()
      : `+${phoneNumber.toString().trim()}`;

    const updatedPayload = {
      fullName,
      phoneNumber: formattedPhoneNumber,
    };

    // Set submitting state to true when API is called
    setIsSubmitting(true);

    dispatch(
      requestOtp(updatedPayload, (response) => {
        setIsSubmitting(false); // Set submitting state back to false after API response
        if ([200, 201].includes(response.status)) {
          localStorage.setItem("name", fullName);
          localStorage.setItem("phoneNumber", formattedPhoneNumber);
          navigate("/verify-otp");
        } else {
          console.error(
            "Request OTP failed:",
            response.message || "Unknown error"
          );
        }
      })
    );
  };

  return (
    <AuthForm
      formType="signup"
      onSubmit={handleSignUp}
      isSubmitting={isSubmitting}
      statsData={statsData}
    />
  );
};

export default SignUpUser;
