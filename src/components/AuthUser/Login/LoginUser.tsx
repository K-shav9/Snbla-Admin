import React, { useEffect, useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { requestOtp, adminAndMerchantLogin, getActiveUsers } from "../../../actions/user";

export default function LoginUser() {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
  });

  useEffect(() => {
    document.title = "Login | Snbla";
  }, []);

  const handleLogin = (payload) => {

    if (payload?.phoneNumber) {

      const phoneNumber = payload.phoneNumber.toString().trim();
      const updatedPayload = {
        phoneNumber: phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`, // Only phoneNumber
      };


      dispatch(
        requestOtp(updatedPayload, (response) => {
          if (response.status === 200 || response.status === 201) {
            localStorage.setItem("phoneNumber", updatedPayload.phoneNumber);
            navigate("/verify-otp");
          } else {
            console.error("Request OTP failed:", response.message || "Unknown error");
          }
        })
      );
    } else if (payload?.email && payload?.password) {
      const updatedPayload = {
        email: payload.email.trim(),
        password: payload.password, // Only email and password
      };

      // Set submitting state to true when API is called
      setIsSubmitting(true);

      dispatch(
        adminAndMerchantLogin(updatedPayload, "merchant", (response) => {
          setIsSubmitting(false); // Set submitting state back to false after API response
          if (response.status === 200 || response.status === 201) {
            localStorage.setItem("token", JSON.stringify(response.token));
            navigate("/merchant/dashboard");
          }
        })
      );
    } else {
      console.error("Invalid login payload. Please provide phone number or email and password.");
    }
  };

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

  return (
    <div>
      <AuthForm
        formType="login"
        onSubmit={(payload) => handleLogin(payload)}
        isSubmitting={isSubmitting}
        statsData={statsData}
      />
    </div>
  );
}
