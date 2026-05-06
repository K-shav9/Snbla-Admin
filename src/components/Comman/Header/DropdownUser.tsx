/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
// @ts-ignore
// import { setAccessToken } from '../../../auth/index.ts';
import './styles.css'

import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter, truncateText } from '../../../utils/comman';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../../actions/user';
import userIcon from "../../../images/user/userProfile.jpg"
import Logo from "../../../images/brand/Logo.svg";


const items: MenuProps['items'] = [
  {
    label: 'Profile',
    key: '1',
  },
  // {
  //   label: 'Change Password',
  //   key: '2',
  // },
  {
    label: 'Logout',
    key: '3',
  },
];

const DropdownUser = ({ userData }: any) => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const user = useSelector((state: any) => state?.Auth);
  const profilePhoto = user?.user?.data?.profilePhoto;
  const handleMenuClick: MenuProps["onClick"] = (e: any) => {
    if (Number(e.key) === 1) {
      userData?.roleId !== 2 &&
        navigate("/admin/account/profile", { state: { changePassword: false } });
    }
    if (Number(e.key) === 2) {

      userData?.roleId !== 2 &&
        navigate("/admin/account/change-password", { state: { changePassword: true } });
    }
    if (Number(e.key) === 3) {
      logout();
    }
  };

  // Logout function
  const logout = () => {
    dispatch(
      userLogout(() => {
        navigate("/admin/login");
      })
    );
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <Dropdown menu={menuProps}>
        <button className="btn user-menu-button">
          <div className="user-info">
            {profilePhoto ? (
              <Avatar src={profilePhoto} alt="avatar" />
            ) : (
              <Avatar size={40} src={Logo} />
            )}
            <div className="user-details">
              <span className="user-name">
                {userData?.contactName
                  ? capitalizeFirstLetter(
                      truncateText(userData?.contactName, 15) || ""
                    )
                  : capitalizeFirstLetter(`${userData?.name || ""}`)}
              </span>
            </div>
          </div>
        </button>
      </Dropdown>
    </>
  );
};

export default DropdownUser;
