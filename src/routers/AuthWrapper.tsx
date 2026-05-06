// import { Spin } from "antd";
// import React, { useEffect, useState } from "react";
// import { getAccessToken } from "../auth";
// import { useLocation, useNavigate } from "react-router-dom";

// export const roleBasedRedirect: { [key: number]: string } = {
//   1: "/admin/dashboard",
//   2: "/merchant/dashboard",
//   3: "/dashboard/wallets",
// };

// const AuthWrapper: React.FC<any> = ({ children, roleId }) => {
//   // const dispatch: any = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState<boolean>(true);

//   const publicRoutes = [
//     "/",
//     "/login",
//     "/register",
//     "/admin/login",
//     "/admin/forgot-password",
//     "/verify-otp",
//     // "/save-shop",
//     "/our-partners",
//     "/partners-offer",
//     "/platform",
//     "/about-us",
//     "/resources",
//     "/contact-us",
//     "/signin",
//     "/otp",
//     "/dashboard/login",
//     "/auth",
//     "/request-merchant",
//     "/careers",
//     "/savers-community",
//     "/terms-of-use",
//     "/privacy-policy",
//     "/news-letter",
//     "/news-room",
//     "/forgot-password",
//   ];

//   const isLoggedin = getAccessToken();

//   const checkLogin = (token: string | null, roleId: number) => {
//     if (token) {

//       console.log("token--", token)
//       const defaultRedirect = roleBasedRedirect[roleId];

//       // ✅ Only redirect if the user is on a public page
//       if (publicRoutes.includes(location.pathname)) {
//         navigate(defaultRedirect, { replace: true });
//       }
//     } else {
//       // Redirect to login if not on public routes
//       if (!publicRoutes.includes(location.pathname)) {
//         navigate("/login", { replace: true });
//       }
//     }
//   };

//   useEffect(() => {
//     // const token = localStorage.getItem("token");
//     const token = localStorage.getItem("token") || localStorage.getItem("token");

//     // Allow these paths regardless of login state
//     if (
//       ["/admin/reset-password", "/reset-password", "/payment-success"].includes(
//         location.pathname
//       )
//     ) {
//       return;
//     }

//     // ✅ Prevent redirect loop by only redirecting if on a public page
//     checkLogin(token, roleId);
//   }, [isLoggedin, roleId]); // Removed `location.pathname` from dependencies to prevent unnecessary redirects

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // if (loading) {
//   //   return <Spin fullscreen>Loading... </Spin>;
//   // }

//   return <>{children}</>;
// };

// export default AuthWrapper;

import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getAccessToken, getAccessTokenPlugin } from "../auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const roleBasedRedirect: { [key: number]: string } = {
  1: "/admin/dashboard",
  2: "/merchant/dashboard",
  3: "/dashboard",
};

const AuthWrapper: React.FC<any> = ({ children, roleId }) => {
  // const dispatch: any = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  // const merchantPlan = JSON.parse(localStorage.getItem("merchantPlan"));
  // const merchantPlan = useSelector((state: any) => state?.Merchant?.merchantPlan);
  const merchantPlan = useSelector((state: any) => state?.Merchant?.merchantPlan);

  const businessName = merchantPlan?.merchant?.businessName




  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/admin/login",
    "/admin/forgot-password",
    "/verify-otp",
    // "/our-partners",
    `/partners-offer/${businessName}`,
    "/platform",
    "/about-us",
    "/resources",
    "/contact-us",
    "/signin",
    "/otp",
    "/dashboard/login",
    "/auth",
    "/request-merchant",
    "/careers",
    "/savers-community",
    "/terms-of-use",
    "/privacy-policy",
    "/news-letter",
    "/news-room",
    "/forgot-password",
  ];

  const isLoggedin: any = getAccessTokenPlugin();

  const checkLogin = (loggedIn: any | null, roleId: number) => {

    if (loggedIn?.token) {

      // Ensure 'defaultRedirect' is properly assigned
      const defaultRedirect = loggedIn?.key !== 'web-token' ? roleBasedRedirect[roleId] : null;

      // ✅ Only redirect if the user is on a public page
      if (defaultRedirect && publicRoutes.includes(location.pathname)) {
        navigate(defaultRedirect, { replace: true });
      }
    } else {
      // Redirect to login if not on public routes

      if (!publicRoutes.includes(location.pathname)) {
        navigate("/dashboard/login", { replace: true });
      }

      // if (!publicRoutes.includes(location.pathname)) {
      //   if (loggedIn?.token) {

      //     console.log("token--", loggedIn?.token);
      //     const defaultRedirect = loggedIn?.key !== 'web-token' ? roleBasedRedirect[roleId] : null;

      //     if (defaultRedirect) {
      //       navigate(defaultRedirect);
      //     }
      //   } else {
      //     navigate("/dashboard/login", { replace: true });
      //   }
      // }

    }
  };

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // const token = localStorage.getItem("token") || localStorage.getItem("token");
    const tokenObj = getAccessTokenPlugin();
    // Allow these paths regardless of login state
    if (
      ["/admin/reset-password", "/reset-password", "/payment-success", "/our-partners"].includes(
        location.pathname
      )
    ) {
      return;
    }

    // ✅ Prevent redirect loop by only redirecting if on a public page
    checkLogin(tokenObj, roleId);
  }, [isLoggedin?.token, roleId]); // Removed `location.pathname` from dependencies to prevent unnecessary redirects

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // if (loading) {
  //   return <Spin fullscreen>Loading... </Spin>;
  // }

  return <>{children}</>;
};

export default AuthWrapper;

