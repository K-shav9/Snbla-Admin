/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Updateaccountdetails } from './Updateaccountdetails';
import { Updateusename } from './Updateusename';
// @ts-ignore
import { setAccessToken } from '../../auth/index.ts';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../../components/Comman/Header';

const allItems: TabsProps['items'] = [
    {
        key: '1',
        label: 'Change Account Details',
        children: <Updateaccountdetails />,
    },
    {
        key: '2',
        label: 'Update Password',
        children: <Updateusename />,
    },
];
const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Change Account Details',
        children: <Updateaccountdetails />,
    },
    {
        key: '2',
        label: 'Update Password',
        children: <Updateusename />,
    }
];
const superAdminItems: TabsProps['items'] = [
    {
        key: '1',
        label: 'Change Account Details',
        children: <Updateaccountdetails />,
    }
];

const Account = () => {
    const user = useSelector((state: any) => state?.Auth?.user);
    let userData = user?.user || user?.data;
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState("1")

    useEffect(() => {
      document.title = "Account | Snbla";
    }, []);

    const onChange = (key: string) => {
        setActiveStep(key)
    };

    useEffect(() => {
        if (location?.state?.changePassword) {
            setActiveStep('2')
        } else {
            setActiveStep('1')
        }
        // dispatch(checkuser((res: any) => {
        //     if(res?.status === 401) {
        //         setAccessToken('');
        //         localStorage.removeItem('token')
        //         localStorage.removeItem('token')
        //         dispatch(userLogout((resp: any) => { }))
        //     }
        //  }));
    }, [location])

    const [tabItems, setTabItems] = useState<any>([])
    useEffect(() => {
        if (userData?.roleId === 2) {
            setTabItems(allItems)
        } else if (userData?.roleId === 3) {
            setTabItems(items);
        } else {
            setTabItems(superAdminItems);
        }
    }, [userData])

    return (
        <div>
            <Header />
            <div className="contentBody">
                <div className="bodycard">
                    <div className="bodycardheading">
                        <div className="mobileView buttonsvgs" onClick={() => navigate(-1)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <rect
                                    x="0.4"
                                    y="1.18168"
                                    width="23.2"
                                    height="23.2"
                                    rx="11.6"
                                    stroke="#474df4"
                                    strokeWidth="0.8"
                                />
                                <path
                                    d="M14 8.78168L10 12.7817L14 16.7817"
                                    stroke="#474df4"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        Account
                    </div>
                    <div className="cardContentbody">
                        <Tabs
                            className="customeTabs"
                            activeKey={activeStep}
                            defaultActiveKey={activeStep}
                            items={tabItems}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
