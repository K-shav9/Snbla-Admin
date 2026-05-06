import React from "react";
import { Navigate } from "react-router-dom";
import { DefaultLayout } from "../layouts";
import Dashboard from "../layouts/UserLayout/Dashboard";
import UserLayout from "../layouts/UserLayout";
import Transactions from "../layouts/UserLayout/Transactions";
import Referrals from "../layouts/UserLayout/Referrals";
import Settings from "../layouts/UserLayout/Settings";
import Plan from "../layouts/UserLayout/Plan";
import MerchantChangePassword from "../components/AuthUser/User Reset Password/MerchantChangePassword";
import Wallets from "../layouts/UserLayout/Wallets";
import AddOffer from "../components/AuthMerchant/Offer/AddOffer";
import PackageListing from "../components/AuthMerchant/Packages/PackageListing";
import AddPackage from "../components/AuthMerchant/Packages/AddPackage";

export const globalMerchantRoutes = [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Navigate to="/dashboard" />,
  },
  {
    path: "/merchant/dashboard",
    exact: true,
    layout: UserLayout,
    component: Dashboard,
  },
  {
    path: "/merchant/wallets",
    exact: true,
    layout: UserLayout,
    component: Wallets,
  },
  {
    path: "/merchant/offers",
    exact: true,
    layout: UserLayout,
    component: Plan,
  },
  {
    path: "/merchant/packages",
    exact: true,
    layout: UserLayout,
    component: PackageListing,
  },
  {
    path: "/merchant/transactions",
    exact: true,
    layout: UserLayout,
    component: Transactions,
  },
  {
    path: "/merchant/referrals",
    exact: true,
    layout: UserLayout,
    component: Referrals,
  },
  {
    path: "/merchant/settings",
    exact: true,
    layout: UserLayout,
    component: Settings,
  },
  {
    path: "/merchant/change-password",
    exact: true,
    layout: UserLayout,
    component: MerchantChangePassword,
  },
  {
    path: "/merchant/add-offer",
    exact: true,
    layout: UserLayout,
    component: AddOffer,
  },
  {
    path: "/merchant/add-package",
    exact: true,
    layout: UserLayout,
    component: AddPackage,
  },
];
