import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";

// Create the ProtectedRoute component to protect routes
const ProtectedRoute = ({ children, isPublicRoute }: any) => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state?.Auth);
  const [loading, setLoading] = useState(true);
  const isLoggedin: boolean =
    JSON.parse(localStorage.getItem("token") || "false") !== "undefined"; // Ensure proper type

  const userData = user?.user || user?.user?.user; // Get user data from Redux store

  useEffect(() => {
    if (isPublicRoute) {
      setLoading(false); // If it's a public route, skip the authentication check
      return;
    }

    // If user is not authenticated, redirect to login page
    if (!isLoggedin) {
      setLoading(false); // Finish loading
      navigate("/"); // Redirect to login page if not authenticated
      localStorage.clear();
    } else {
      setLoading(false); // Finish loading if user is authenticated
    }
  }, [userData, navigate, isPublicRoute]);

  // While loading, show a spinner
  // if (loading) {
  //   return <Spin fullscreen>Loading...</Spin>;
  // }

  return children; // Render the protected route if authenticated
};

export default ProtectedRoute;
