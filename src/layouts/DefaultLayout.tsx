/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from "antd";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Comman/Sidebar";
import Header from "../components/Comman/Header";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isLoading = useSelector((state: any) => state?.General?.loading); // Redux state for loading
  const user = useSelector((state: any) => state?.Auth); // Redux state for user authentication
  const navigate = useNavigate();

  const isLoggedin: boolean =
    JSON.parse(localStorage.getItem("token") || "false") !== "undefined"; // Ensure proper type

  const checkLogin = () => {
    // navigate('/login', { replace: true }); // Navigate to login if not logged in
  };

  useEffect(() => {
    if (!isLoggedin) {
      checkLogin(); // Redirect to login
    }
  }, [isLoggedin]);

  return (
    <div className="flex overflow-hidden">
      {isLoading ? (
        <Spin tip="Loading..." />
      ) : (
        <div className="main">
          {/* Sidebar */}
          <Sidebar
            sidebarOpen={false}
            setSidebarOpen={(arg: boolean) => {
              console.error("Function not implemented:", arg);
            }}
          />

          {/* Content Area */}
          <div className="mainBody">
              <main className="bg-yellow">
                <Header />
              <div className="container-fluid px-5 ">
                {children}
              </div>
            </main>

            {/* Footer */}
            {/* <div className="">
                            <div className="text-center">
                            </div>
                        </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
