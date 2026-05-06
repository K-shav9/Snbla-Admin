import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import avtar from '../../../images/user/user-01.png';

import { Avatar } from 'antd';

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info('Click on left button.');
    console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const items: MenuProps['items'] = [
    {
        label: 'A new version of [App Name] is now available. Update now to enjoy new features and improvements. Tap here to update.',
        key: '1',
    },
    {
        label: 'Don’t forget your meeting with the marketing team in 30 minutes. Tap here to view details.',
        key: '2',
    },
];

const menuProps = {
    items,
    onClick: handleMenuClick,
};
const DropdownNotification = () => {
    return (
        <>
            <Dropdown menu={menuProps}>
                <button className="btn">
                    <div className="notification">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_122_355)">
                                <path
                                    d="M15.175 12.416C14.7521 12.039 14.3818 11.6067 14.0742 11.1309C13.7383 10.4741 13.537 9.75687 13.4821 9.02124V6.85456C13.485 5.69911 13.0658 4.58238 12.3034 3.71417C11.541 2.84596 10.4878 2.28604 9.34167 2.13961V1.57381C9.34167 1.41852 9.27998 1.26959 9.17018 1.15978C9.06037 1.04997 8.91144 0.988281 8.75614 0.988281C8.60085 0.988281 8.45192 1.04997 8.34211 1.15978C8.2323 1.26959 8.17061 1.41852 8.17061 1.57381V2.14838C7.03475 2.30537 5.99427 2.86867 5.24188 3.73396C4.48949 4.59926 4.07617 5.7079 4.07848 6.85456V9.02124C4.02355 9.75687 3.82224 10.4741 3.48637 11.1309C3.18412 11.6056 2.81979 12.0378 2.40303 12.416C2.35625 12.4571 2.31875 12.5077 2.29304 12.5644C2.26732 12.6211 2.25399 12.6827 2.25391 12.745V13.3415C2.25391 13.4578 2.30012 13.5693 2.38237 13.6516C2.46462 13.7338 2.57618 13.7801 2.69251 13.7801H14.8856C15.0019 13.7801 15.1135 13.7338 15.1957 13.6516C15.278 13.5693 15.3242 13.4578 15.3242 13.3415V12.745C15.3241 12.6827 15.3108 12.6211 15.285 12.5644C15.2593 12.5077 15.2218 12.4571 15.175 12.416ZM3.16619 12.9029C3.57427 12.5086 3.93357 12.0669 4.23638 11.5871C4.65945 10.7938 4.90631 9.91863 4.96007 9.02124V6.85456C4.94267 6.34053 5.02889 5.82827 5.2136 5.34826C5.3983 4.86825 5.67771 4.43032 6.03518 4.06054C6.39266 3.69077 6.82089 3.39671 7.29437 3.19588C7.76786 2.99504 8.27692 2.89155 8.79123 2.89155C9.30555 2.89155 9.81461 2.99504 10.2881 3.19588C10.7616 3.39671 11.1898 3.69077 11.5473 4.06054C11.9048 4.43032 12.1842 4.86825 12.3689 5.34826C12.5536 5.82827 12.6398 6.34053 12.6224 6.85456V9.02124C12.6762 9.91863 12.923 10.7938 13.3461 11.5871C13.6489 12.0669 14.0082 12.5086 14.4163 12.9029H3.16619Z"
                                    fill="white"
                                />
                                <path
                                    d="M8.81119 15.2451C9.08748 15.2388 9.35262 15.1349 9.5597 14.9519C9.76679 14.7689 9.90248 14.5185 9.94278 14.2451H7.63574C7.67718 14.526 7.81922 14.7822 8.03544 14.9661C8.25166 15.1501 8.52734 15.2492 8.81119 15.2451Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_122_355">
                                    <rect
                                        width="15.7896"
                                        height="15.7896"
                                        fill="white"
                                        transform="translate(0.916016 0.209961)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </button>
            </Dropdown>
        </>
    );
};

export default DropdownNotification;
