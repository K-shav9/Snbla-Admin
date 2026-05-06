import React, { useEffect, useRef, useState } from "react";
import homepageImage from "../../assets/img/Homepage.png";
import Button from "../../layouts/common-components/buttons/Button";
import { registerUser, loginUser, resendOtp } from "../../actions/user";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const VerifyOtp = () => {
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Verift Otp | Snbla";
    }, []);

    const name = localStorage.getItem("name");
    const phoneNumber = localStorage.getItem("phoneNumber");
    // const phoneNumber = `+${917318455186}`  // user

    const handleResendCode = (e) => {
        e.preventDefault();
        const data = {
            phoneNumber
        }
        dispatch(
            resendOtp(data, (response) => {
                if ([200, 201].includes(response.status)) {
                    console.log("response");
                } else {
                    console.error("Request OTP failed:", response.message || "Unknown error");
                }
            })
        );

    }

    const handleChange = (element, index) => {
        const value = element.value.replace(/[^0-9]/g, "");
        const updatedOtp = [...otp];
        if (value) {
            updatedOtp[index] = value;
            setOtp(updatedOtp);
            // Check if the next index exists before focusing
            if (index < 3 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const updatedOtp = [...otp];
            if (otp[index] === "") {
                if (index > 0) inputRefs.current[index - 1].focus();
            } else {
                updatedOtp[index] = "";
                setOtp(updatedOtp);
            }
        }
    };

    const handleSubmit = () => {
      // Set submitting state to true when API is called
      setIsSubmitting(true);
      if (otp.every((digit) => digit !== "")) {
        const otpCode = otp.join("");

        const values = {
          phoneNumber: phoneNumber,
          otp: otpCode,
          name: name,
        };

        dispatch(
          registerUser(values, (response) => {
            setIsSubmitting(false); // Set submitting state back to false after API response
            // if (response.status === 200 || response.status === 201) {
            if (response.success === true) {
              localStorage.removeItem("phoneNumber");
              localStorage.setItem("token", JSON.stringify(response?.token));

              navigate("/dashboard/wallets");
            } else {
              console.error(
                "Sign-up failed:",
                response.message || "Unknown error"
              );
            }
          })
        );
        // if (values?.name) {
        //     // Sign-up flow
        //     dispatch(
        //         registerUser(values, (response) => {
        //             // if (response.status === 200 || response.status === 201) {
        //             if (response.success === true) {
        //                 navigate("/login"); // Redirect after signup
        //                 localStorage.clear();

        //             } else {
        //                 console.error(
        //                     "Sign-up failed:",
        //                     response.message || "Unknown error"
        //                 );
        //             }
        //         })
        //     );
        // } else {
        //     // Login flow
        //     delete values.name
        //     dispatch(
        //         loginUser(values, (response) => {

        //             if (response.status === 200 || response.status === 201) {
        //                 localStorage.removeItem("phoneNumber");
        //                 navigate("/dashboard/wallets");

        //             } else {
        //                 console.error(
        //                     "Login failed:",
        //                     response.message || "Unknown error"
        //                 );
        //             }
        //         })
        //     );
        // }
      } else {
        alert("Please fill all OTP fields.");
      }
    };

    return (
      <section
        className="relative bg-cover bg-no-repeat lg:pt-[160px] md:pt-secpadding pt-[80px] tab:pb-96 pb-40"
        style={{
          backgroundImage: `url(${homepageImage})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="container mx-auto 2xl:max-w-screen-xl justify-center flex md:flex-row flex-col md:items-center lg:gap-12 gap-6 sm:px-5 px-2">
          <div className="flex justify-center flex-col items-center tab:gap-10 gap-5 md:mt-0">
            <div className="md:w-[440px] w-full tab:p-8 p-6 bg-white rounded-[20px] border border-bordercolor">
              <h2 className="text-xl text-black text-center mb-2 font-semibold">
                Verify your mobile number
              </h2>
              <p className="text-black text-center text-sm mb-6">
                We have sent an SMS to{" "}
                <span className="font-semibold">{phoneNumber}</span> with a
                verification code.
              </p>
              <form>
                <div className="flex sm:gap-2 gap-1 justify-center">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="px-2 py-2 sm:h-[48px] h-[40px] sm:w-[48px] w-[40px] text-center border rounded-lg shadow-shadow2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-base"
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-blue font-medium mt-3">
                  Don’t receive a code?{" "}
                  <button onClick={(e) => handleResendCode(e)}>Resend</button>
                </p>
                <Button
                  type="secondry"
                  className="mt-6"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading ..." : "Verify and continue"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9.99992 3.3335L8.82492 4.5085L13.4749 9.16683H3.33325V10.8335H13.4749L8.82492 15.4918L9.99992 16.6668L16.6666 10.0002L9.99992 3.3335Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </form>
            </div>
            <p className="font-medium text-black">
              {/* Need help? <span className="text-blue font-medium">Contact us</span> */}
              Need help?{" "}
              <span className="text-blue font-medium">
                <Link
                  to="/contact-us"
                  className="text-center text-sm text-blue font-medium mt-3"
                >
                  Contact Us
                </Link>
              </span>
            </p>
          </div>
        </div>
      </section>
    );
};

export default VerifyOtp;

