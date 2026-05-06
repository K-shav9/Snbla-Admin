// import { AddTask } from '@components/ToDo/AddTask';
import { DefaultLayout, PrivateLayout } from '../layouts';
import { Navigate } from 'react-router-dom';
import React from 'react';
import Dashboard from '../pages/Dashboard/Dashboard';
import Wallet from '../pages/Wallets/Wallet';
import Transaction from '../pages/Transactions/Transaction';
import Setting from '../pages/Settings/Setting';
import Referral from '../pages/Referrals/Referral';
import { Updateusename } from '../pages/Acount/Updateusename';
import UserList from '../pages/Users/UserList';
import MerchantList from '../pages/Merchants/MerchantList';
import { Updateaccountdetails } from '../pages/Acount/Updateaccountdetails';
import CreateMerchant from '../pages/Merchants/CreateMerchant';
import ViewMerchant from '../pages/Merchants/ViewMerchant';
import ViewUser from '../pages/Users/ViewUser';
import EditUser from '../pages/Users/EditUser';
import EditMerchant from '../pages/Merchants/EditMerchant';
import AddMerchantPackage from '../pages/Merchants/AddMerchantPackage';
import AddMerchantOffer from '../pages/Merchants/AddMerchantOffer';
import ViewWalletDetails from '../pages/Wallets/ViewWalletDetails';
import ViewUserWalletDetail from '../pages/Users/ViewUserWalletDetail';
import ViewMerchantWalletDetails from '../pages/Merchants/ViewMerchantWalletDeatils';
import { Login } from '../components/Login/Login';
import SendNotification from '../pages/Notifications/SendNotification';
import NotificationList from '../pages/Notifications/NotificationList';
import UserTransactionDetails from '../pages/Users/UserTransactionDetails';
import MerchantTransactionsDetails from '../pages/Merchants/MerchantTransactionsDetails';
import MerchantTransaction from '../pages/Merchants/MerchantTransactions/MerchantTransaction';

export const GlobalAdminRoutes = [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Navigate to="/admin/login" replace />,
  },
  {
    path: "/admin/login",
    exact: true,
    layout: PrivateLayout,
    component: Login,
  },
  {
    path: "/admin/dashboard",
    exact: true,
    layout: DefaultLayout,
    component: Dashboard,
  },
  {
    path: "/admin/wallets",
    exact: true,
    layout: DefaultLayout,
    component: Wallet,
  },
  {
    path: "/admin/transactions",
    exact: true,
    layout: DefaultLayout,
    component: Transaction,
  },
  {
    path: "/admin/referrals",
    exact: true,
    layout: DefaultLayout,
    component: Referral,
  },
  {
    path: "/admin/settings",
    exact: true,
    layout: DefaultLayout,
    component: Setting,
  },
  {
    path: "/admin/users",
    exact: true,
    layout: DefaultLayout,
    component: UserList,
  },
  {
    path: "/admin/user/details",
    exact: true,
    layout: DefaultLayout,
    component: ViewUser,
  },
  {
    path: "/admin/user/edit",
    exact: true,
    layout: DefaultLayout,
    component: EditUser,
  },
  {
    path: "/admin/merchants",
    exact: true,
    layout: DefaultLayout,
    component: MerchantList,
  },
  {
    path: "/admin/merchant/create",
    exact: true,
    layout: DefaultLayout,
    component: CreateMerchant,
  },
  {
    path: "/admin/merchant/details",
    exact: true,
    layout: DefaultLayout,
    component: ViewMerchant,
  },
  // {
  //   path: "/admin/merchant/add-offer",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: AddOffer,
  // },
  {
    path: "/admin/merchant/edit",
    exact: true,
    layout: DefaultLayout,
    component: EditMerchant,
  },
  {
    path: "/admin/account/change-password",
    exact: true,
    layout: DefaultLayout,
    component: Updateusename,
  },
  {
    path: "/admin/account/profile",
    exact: true,
    layout: DefaultLayout,
    component: Updateaccountdetails,
  },
  {
    path: "/admin/merchant/add-package",
    exact: true,
    layout: DefaultLayout,
    component: AddMerchantPackage,
  },
  {
    path: "/admin/merchant/add-offer",
    exact: true,
    layout: DefaultLayout,
    component: AddMerchantOffer,
  },
  {
    path: "/admin/wallet/details",
    exact: true,
    layout: DefaultLayout,
    component: ViewWalletDetails,
  },
  {
    path: "/admin/user/wallet/details",
    exact: true,
    layout: DefaultLayout,
    component: ViewUserWalletDetail,
  },
  {
    path: "/admin/user/transaction/details",
    exact: true,
    layout: DefaultLayout,
    component: UserTransactionDetails,
  },
  {
    path: "/admin/merchant/transaction/details",
    exact: true,
    layout: DefaultLayout,
    component: MerchantTransactionsDetails,
  },
  {
    path: "/admin/merchant/wallet/details",
    exact: true,
    layout: DefaultLayout,
    component: ViewMerchantWalletDetails,
  },
  {
    path: "/admin/send-notification",
    exact: true,
    layout: DefaultLayout,
    component: SendNotification,
  },
  {
    path: "/admin/notification",
    exact: true,
    layout: DefaultLayout,
    component: NotificationList,
  },
    {
    path: "/admin/merchant-transaction",
    exact: true,
    layout: DefaultLayout,
    component: MerchantTransaction,
  },
];
