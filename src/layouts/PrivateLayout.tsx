/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';
// @ts-ignore
import { getAccessToken } from '../auth/index';
import whiteLogo from '../images/brand/Logo.png';
// import authIcon from '../images/brand/authicons.png';
import { PrivateLayoutProps } from '../types/global';

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoading = useSelector((state: any) => state?.General?.loading);
  const user = useSelector((state: any) => state?.Auth);
  const userData = user?.user?.data || user?.user?.user;

  const routes = ['/login', '/register'];
  const isLoggedin = getAccessToken();

  return (
    <div className="privateWrapper container-fluid d-flex align-items-center justify-content-center m-0 p-0 h-screen">
      {/* {isLoading ? (
        <Spin fullscreen tip="Loading..."></Spin>
      ) : ( */}
      <div className="cardWhite">
        <div className="flex items-center justify-center p-0 m-0 h-full">
          {/* <div className="col-lg-6 col-sm-12 p-0">
                <div className="sidebanner">
                  <div className="mainLogsContined">
                    <div className="whitelogos">
                      <img
                        src={whiteLogo}
                        alt="logo"
                        style={{ width: "250px" }}
                      />
                    </div>
                  </div>
                  <div className="authSidetext">
                    <h5>The Savings Solution You’ve Been Waiting For! </h5>
                  </div>
                </div>
              </div> */}
          <div className="col-lg-6 col-sm-12 p-0 form_wrapper_col">
            <div className="whitelogos">
              <img src={whiteLogo} alt="logo" style={{ width: "250px" }} />
            </div>
            {children}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};