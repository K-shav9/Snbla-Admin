import React from "react";
import {
  WalletIcon,
  ReferralIcon,
  AccountIcon,
  TransactionIcon,
  RefferalsIcon,
  SettingsIcon,
  WalletIconUser,
  PlanIcon,
  MerchantDashboardIcon,
  PackageIcon,
  TransactionsIcon,
  SendNotificationIcon,
  NotificationIcon,
  AdminSettingsIcon,
  MerchantTransactionsIcon
} from "../icons/icons";
import setup from "../images/icon/Isolation_Mode.svg";
import Referrals from "../images/icon/My Referrals.svg";
import Social from "../images/icon/socialmedia.svg";
import Network from "../images/icon/ReferUS Network.svg";
import account from "../images/icon/Account.svg";
import help from "../images/icon/help.svg";
import Sms from "../images/icon/Sms.svg"

// ******* for business admin **************** //
export const sidebarMenuList = [
  {
    id: 1,
    roleId: [1],
    name: "Manage Merchants",
    path: "/admin/merchants",
    icon: ReferralIcon(),
  },
  {
    id: 2,
    roleId: [1],
    name: "Manage Users",
    path: "/admin/users",
    icon: AccountIcon(),
  },
  // {
  //   id: 3,
  //   roleId: [1],
  //   name: "Transactions",
  //   path: "/admin/transactions",
  //   icon: TransactionsIcon(),
  // },
  {
    id: 3,
    roleId: [1],
    name: "Wallets",
    path: "/admin/wallets",
    icon: WalletIcon(),
  },
    {
    id: 4,
    roleId: [1],
    name: "Send Notification",
    path: "/admin/send-notification",
    icon: SendNotificationIcon(),
  },
      {
    id: 5,
    roleId: [1],
    name: "Notification",
    path: "/admin/notification",
    icon: NotificationIcon(),
  },
       {
    id: 6,
    roleId: [1],
    name: "Settings",
    path: "/admin/settings",
    icon: AdminSettingsIcon(),
  },
         {
    id: 6,
    roleId: [1],
    name: "Merchant Transactions",
    path: "/admin/merchant-transaction",
    icon: MerchantTransactionsIcon(),
  },
];

// ******* for admin **************** //
export const sidebarMenuListForMerchant = [
  {
    id: 1,
    roleId: [2],
    name: "Dashboard",
    path: "/merchant/dashboard",
    icon: (isActive) => <MerchantDashboardIcon isActive={isActive} />,
  },
  {
    id: 2,
    roleId: [2],
    name: "Wallets",
    path: "/merchant/wallets",
    icon: (isActive) => <WalletIconUser isActive={isActive} />,
  },
  {
    id: 3,
    roleId: [2],
    name: "Transactions",
    path: "/merchant/transactions",
    icon: (isActive) => <TransactionIcon isActive={isActive} />,
  },
  {
    id: 4,
    roleId: [2],
    name: "Offers",
    path: "/merchant/offers",
    icon: (isActive) => <PlanIcon isActive={isActive} />,
  },
  {
    id: 5,
    roleId: [2],
    name: "Packages",
    path: "/merchant/packages",
    icon: (isActive) => <PackageIcon isActive={isActive} />,
  },
];

// *********** Super admin sidemenu list *************** //
export const sidebarMenuListForUser = [
  {
    id: 1,
    roleId: [3],
    name: "Dasboard",
    path: "/dashboard",
    // icon: WalletIcon(),
    icon: (isActive) => <MerchantDashboardIcon isActive={isActive} />,
  },
  {
    id: 2,
    roleId: [3],
    name: "Wallets",
    path: "/dashboard/wallets",
    // icon: WalletIcon(),
    icon: (isActive) => <WalletIconUser isActive={isActive} />,
  },
  {
    id: 3,
    roleId: [3],
    name: "Transactions",
    path: "/dashboard/transactions",
    icon: (isActive) => <TransactionIcon isActive={isActive} />,
  },
  // {
  //   id: 4,
  //   roleId: [3],
  //   name: "Merchants",
  //   path: "/dashboard/merchants",
  //   icon: (isActive) => <WalletIconUser isActive={isActive} />,
  // },
];

export const generalMenuListForUser = [
  {
    id: 1,
    roleId: [2, 3],
    name: "Referrals",
    path: "/dashboard/referrals",
    icon: (isActive) => <RefferalsIcon isActive={isActive} />,
  },
  {
    id: 2,
    roleId: [2, 3],
    name: "Settings",
    path: "/dashboard/settings",
    icon: (isActive) => <SettingsIcon isActive={isActive} />,
  },
];

export const generalMenuListForMerchant = [
  {
    id: 1,
    roleId: [2],
    name: "Referrals",
    path: "/merchant/referrals",
    icon: (isActive) => <RefferalsIcon isActive={isActive} />,
  },
  {
    id: 2,
    roleId: [2],
    name: "Setttings",
    path: "/merchant/settings",
    icon: (isActive) => <SettingsIcon isActive={isActive} />,
  },
];

export const dashboardItemList = [
  {
    id: 2,
    role: [2, 3],
    name: 'My Referrals',
    path: '/my-referrals',
    icon: Referrals
  },
  {
    id: 7,
    role: [2, 3],
    name: 'SNBLA Network',
    path: '/SNBLA-network',
    icon: Network
  },
  {
    id: 8,
    role: [2, 3],
    name: 'Social Media',
    path: '/social-media',
    icon: Social
  },
  {
    id: 9,
    role: [2],
    name: 'Promotional Page',
    path: '/businessLink',
    icon: setup
  },
  {
    id: 10,
    role: [2, 3],
    name: 'Account',
    path: '/account',
    icon: account
  },
  {
    id: 11,
    role: [2],
    name: 'Setup',
    path: '/setup',
    icon: setup
  },
  {
    id: 12,
    role: [2, 3],
    name: 'Help',
    path: '/help',
    icon: help
  },
];

// ******* Super admin dashboard list ************* //
export const superAdminDashboardItemList = [
  {
    id: 3,
    role: [1],
    name: 'SNBLA Network',
    path: '/super-admin/SNBLA-network',
    icon: Network
  },
  {
    id: 4,
    role: [1],
    name: 'Contact Us',
    path: '/super-admin/contact-us',
    icon: help
  },
  {
    id: 5,
    role: [1],
    name: 'SMS',
    path: '/super-admin/sms',
    icon: Sms
  },
  {
    id: 7,
    role: [1],
    name: 'My Referrals',
    path: '/super-admin/my-referrals',
    icon: Referrals
  },
]
