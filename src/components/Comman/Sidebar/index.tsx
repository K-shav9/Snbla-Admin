/* eslint-disable prefer-const */
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../../images/brand/Logo.svg';
import { DashboardIcon } from '../../../icons/icons';
import { useSelector } from 'react-redux';
import {
  sidebarMenuList,
  sidebarMenuListForMerchant,
  sidebarMenuListForUser,
} from "../../../utils/contstant";
import { SidebarMenuType } from '../../../types/global';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const user = useSelector((state: any) => state?.Auth?.user);
  const referralNotificationList = useSelector((state: any) => state?.Business?.referralNotificationList);
  let userRole = 2;
  const [sideBarList, setSidebarList] = useState(sidebarMenuList)
  useEffect(() => {
    switch (user?.data?.roleId) {
      case 1: {
        setSidebarList(sidebarMenuList);
        break;
      }
      // case 2: {
      //   setSidebarList(sidebarMenuListForMerchant)
      //   break;
      // }
      // case 3: {
      //   setSidebarList(sidebarMenuListForUser)

      //   break;
      // }
      default: {
        break;
      }
    }
  }, [user])


  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null
      ? false
      : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document
        .querySelector('body')
        ?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const handleremoveBodyClass = () => {
    document.body.classList.remove('sidebarOpen');
  };

  const visibleCount = referralNotificationList?.referralsCount || 0;
  const visibleCount1 = referralNotificationList?.referrersCount || 0;

  const business = referralNotificationList?.businessCount || 0;
  const contactUs = referralNotificationList?.contact || 0;
  const SNBLA = referralNotificationList?.referSNBLACount || 0;
  const referNet = referralNotificationList?.rewards || 0;

  return (
    <div className="sidebar">
      <div className="mainlogo">
        <img src={Logo} alt="logo" />
        <button className="btnsClosedSidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M7.50001 14.5L11 11M11 11L14.5 7.49999M11 11L14.5 14.5M11 11L7.50001 7.49999M20.5 11C20.5 16.2467 16.2467 20.5 11 20.5C5.75329 20.5 1.5 16.2467 1.5 11C1.5 5.75329 5.75329 1.5 11 1.5C16.2467 1.5 20.5 5.75329 20.5 11Z"
              stroke="#35353A"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className="navigationMenu">
        <nav id="sidebar" className="accordianmenu">
          <NavLink
            className="sideNavigation "
            to="/admin/dashboard"
            onClick={handleremoveBodyClass}
          >
            {DashboardIcon()}
            <span>Dashboard</span>
          </NavLink>
          {sideBarList?.map((item: SidebarMenuType) => {
            if (item?.roleId.includes(user?.data?.roleId)) {
            if (item) 
              return (
                <NavLink
                  key={item?.id}
                  className="sideNavigation "
                  to={item?.path}
                  onClick={handleremoveBodyClass}
                >
                  {item?.icon}
                  <span>{item?.name}</span>
                  {item?.name === "My Referrals" ? (
                    visibleCount > 0 ? (
                      <div className="badge-icon ">
                        <span className="custom-badge">
                          {visibleCount}
                        </span>
                      </div>
                    ) : null
                  ) : (
                    ""
                  )}
                  {item?.name === "My Referrers" ? (
                    visibleCount1 > 0 ? (
                      <div className="badge-icon ">
                        <span className="custom-badge">
                          {visibleCount1}
                        </span>
                      </div>
                    ) : null
                  ) : (
                    ""
                  )}
                  {item?.name === "Businesses" ? (
                    business > 0 ? (
                      <div className="badge-icon ">
                        <span className="custom-badge-lg">
                          {business}
                        </span>
                      </div>
                    ) : null
                  ) : (
                    ""
                  )}
                  {item?.name === "Refer SNBLA" ? (
                    SNBLA > 0 ? (
                      <div className="badge-icon ">
                        <span className="custom-badge-lg">
                          {SNBLA}
                        </span>
                      </div>
                    ) : null
                  ) : (
                    ""
                  )}
                  {item?.name === "SNBLA Network" ? (
                    referNet > 0 ? (
                      <div className="badge-icon ">
                        <span className="custom-badge-lg">
                          {referNet}
                        </span>
                      </div>
                    ) : null
                  ) : (
                    ""
                  )}
                  {item?.name === "Contact Us" ? (
                    contactUs > 0 ? (
                      <div className="badge-icon ">
                        <span className="custom-badge-lg">
                          {contactUs}
                        </span>
                      </div>
                    ) : null
                  ) : (
                    ""
                  )}
                </NavLink>
              );
            }
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
