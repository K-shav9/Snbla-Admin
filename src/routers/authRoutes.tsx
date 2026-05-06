// Layout Types
import { PrivateLayout, WebLayout } from '../layouts';
import { Login } from '../components/Login/Login';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';


// Route Views
const AuthRoutes = [
  {
    path: "/admin/login",
    exact: true,
    layout: PrivateLayout,
    component: Login,
  },
  {
    path: "/admin/forgot-password",
    exact: true,
    layout: PrivateLayout,
    component: ForgotPassword,
  },
  {
    path: "/admin/reset-password",
    exact: true,
    layout: PrivateLayout,
    component: ResetPassword,
  },
];

export default AuthRoutes;