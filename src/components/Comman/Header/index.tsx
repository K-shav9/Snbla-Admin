/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Breadcrumb, Button, Modal } from 'antd';
// @ts-ignore
// import { setAccessToken } from '../../../auth/index.ts';
// @ts-ignore
// import { PORT, apiUrl, version, landinPageUrl } from '../../../environment';
import DropdownUser from './DropdownUser';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatTitle } from '../../../utils/comman';

interface HeaderProps {
    // pagTitle: string;
    logo?: string;
}
const handleToggleBodyClass = () => {
    document.body.classList.toggle('sidebarOpen');
};
const Header: React.FC<HeaderProps> = ({ logo }) => {
    const location = useLocation()
    const { isLoading } = useSelector((state: any) => state?.General);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const user = useSelector((state: any) => state?.Auth);
    const userData = user?.user?.data || user?.user?.user;
    const breadcrumList = [
        {
            title: 'Home',
            href: '/dashboard',
        },
        {
            title: formatTitle(location?.pathname?.split('/')?.join(' ')),
            // href: location?.pathname,
        }
    ]

    const handlePurchase = () => {
        setIsModalOpen(true);
    };

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        // Add logic to handle the purchase action here
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const confirm: any = () => {
        console.log("Confirmation....");
      };

    const handleOk = (status: any) => {

        confirm(status)
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return (
      <>
        {userData?.roleId === 3 && logo ? (
          <div className="showLogo">
            <img className="business-logo" src={logo} alt="logo" />
            <span className="business-lext">Powered by @SNBLA</span>
          </div>
        ) : (
          ""
        )}
        <header className="mainHeader">
          <div className="headertitles">
            <div className="mobilenavigation">
              <button className="toggleicon" onClick={handleToggleBodyClass}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <mask
                    id="mask0_557_4257"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                  >
                    <rect width="60" height="60" />
                  </mask>
                  <g mask="url(#mask0_557_4257)">
                    <path d="M10 45C9.29167 45 8.69792 44.7604 8.21875 44.2813C7.73958 43.8021 7.5 43.2083 7.5 42.5C7.5 41.7917 7.73958 41.1979 8.21875 40.7188C8.69792 40.2396 9.29167 40 10 40H50C50.7083 40 51.3021 40.2396 51.7812 40.7188C52.2604 41.1979 52.5 41.7917 52.5 42.5C52.5 43.2083 52.2604 43.8021 51.7812 44.2813C51.3021 44.7604 50.7083 45 50 45H10ZM10 32.5C9.29167 32.5 8.69792 32.2604 8.21875 31.7813C7.73958 31.3021 7.5 30.7083 7.5 30C7.5 29.2917 7.73958 28.6979 8.21875 28.2187C8.69792 27.7396 9.29167 27.5 10 27.5H50C50.7083 27.5 51.3021 27.7396 51.7812 28.2187C52.2604 28.6979 52.5 29.2917 52.5 30C52.5 30.7083 52.2604 31.3021 51.7812 31.7813C51.3021 32.2604 50.7083 32.5 50 32.5H10ZM10 20C9.29167 20 8.69792 19.7604 8.21875 19.2812C7.73958 18.8021 7.5 18.2083 7.5 17.5C7.5 16.7917 7.73958 16.1979 8.21875 15.7187C8.69792 15.2396 9.29167 15 10 15H50C50.7083 15 51.3021 15.2396 51.7812 15.7187C52.2604 16.1979 52.5 16.7917 52.5 17.5C52.5 18.2083 52.2604 18.8021 51.7812 19.2812C51.3021 19.7604 50.7083 20 50 20H10Z" />
                  </g>
                </svg>
              </button>
            </div>
            {/* <div className="pagetitles">{pagTitle}</div> */}
          </div>
          {userData?.roleId === 3 && logo ? (
            <div>
              <img className="business-logo" src={logo} alt="logo" />
              <div className="business-lext">Powered by @SNBLA</div>
            </div>
          ) : (
            ""
          )}

          <div className="secondmenu">
            {/* <Avatar style={{ backgroundColor: '#87d068' }}  /> */}
            {/* Ask RU */}
            {userData?.roleId === 3 && (
              <Button
                className="btn btn-primary"
                type="primary"
                onClick={() => handlePurchase()}
              >
                Purchase RU
              </Button>
            )}
            {/* <button className='btn p-0' type="button"><img src={AskRU}></img></button> */}
            {/* <DropdownNotification /> */}
            <DropdownUser userData={userData} />
          </div>
        </header>
        <div className='right-content container-fluid px-5'>
          <div className="breadcrumb">
            {userData?.roleId !== 1 ? (
              <Breadcrumb separator=">" items={breadcrumList} />
            ) : (
              ""
            )}
          </div>
          {/* Ant Design Modal */}
          <Modal
            title="Buy SNBLA for your business"
            open={isModalOpen}
            onOk={handleModalConfirm}
            onCancel={handleModalCancel}
            footer={[
              <Button
                key="back"
                style={{ height: "30px" }}
                className="btn btn-outline-primary-md"
                onClick={handleCancel}
              >
                Cancel
              </Button>,
              <Button
                key="submit"
                className="btn btn-primary-md"
                type="primary"
                loading={isLoading}
                onClick={() => handleOk(false)}
              >
                {isLoading ? "Wait we are processing ..." : "Ok"}
              </Button>,
            ]}
          >
            <p>Are you sure you want to purchase?</p>
            <p>You will be logged out from the current session.</p>
          </Modal>
        </div>
      </>
    );
};

export default Header;
