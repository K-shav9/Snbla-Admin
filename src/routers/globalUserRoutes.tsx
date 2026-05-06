import Dashboard from "../layouts/UserLayout/Dashboard";
import UserLayout from "../layouts/UserLayout";
import Referrals from "../layouts/UserLayout/Referrals";
import Account from "../pages/Acount/Account";
import Transactions from "../layouts/UserLayout/Transactions";
import Settings from "../layouts/UserLayout/Settings";
import MerchantChangePassword from "../components/AuthUser/User Reset Password/MerchantChangePassword";
import UserMerchantList from "../components/AuthUser/UserMerchant/UserMerchantList";
import UserMerchantPlan from "../components/AuthUser/UserMerchant/UserMerchantPlan";
import Wallets from "../layouts/UserLayout/Wallets";
import WalletDetails from "../layouts/UserLayout/WalletDetails";
import TransactionsDetails from "../layouts/UserLayout/TransactionsDetails";

export const GlobalUserRoutes = [
  // {
  //   path: "/",
  //   exact: true,
  //   layout: UserLayout,
  //   component: () => <Navigate to="/dashboard" />,
  // },
  {
    path: "/dashboard",
    exact: true,
    layout: UserLayout,
    component: Dashboard,
  },
  {
    path: "/dashboard/referrals",
    exact: true,
    layout: UserLayout,
    component: Referrals,
  },
  {
    path: "/account",
    exact: true,
    layout: UserLayout,
    component: Account,
  },
  {
    path: "/dashboard/wallets",
    exact: true,
    layout: UserLayout,
    component: Wallets,
  },
  {
    path: "/dashboard/wallet-details",
    exact: true,
    layout: UserLayout,
    component: WalletDetails,
  },
  {
    path: "/dashboard/wallet-transactions-details",
    exact: true,
    layout: UserLayout,
    component: TransactionsDetails,
  },
  {
    path: "/dashboard/transactions",
    exact: true,
    layout: UserLayout,
    component: Transactions,
  },
  {
    path: "/dashboard/settings",
    exact: true,
    layout: UserLayout,
    component: Settings,
  },
  {
    path: "/dashboard/change-password",
    exact: true,
    layout: UserLayout,
    component: MerchantChangePassword,
  },
  {
    path: "/dashboard/merchants",
    exact: true,
    layout: UserLayout,
    component: UserMerchantList,
  },
  {
    path: "/dashboard/merchant/offer",
    exact: true,
    layout: UserLayout,
    component: UserMerchantPlan,
  },
];
