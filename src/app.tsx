import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminRoutes } from "./routers";
import { useDispatch } from 'react-redux';
import NotFoundPage from './pages/NotFoundPage';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import './styles/index.css';
import { checkuser, userLogout } from './actions/user';
import { setAccessToken } from './auth';
import AuthWrapper from './routers/AuthWrapper';
import ScrollToTop from './layouts/common-components/ScrollToTop';
import IntercomControls from './components/Intercom/IntercomControls';

const AppRoute = () => {
  const dispatch: any = useDispatch();

  const user = useSelector((state: any) => state?.Auth);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token") || localStorage.getItem("web-token");

  useEffect(() => {
    if (token) {
      dispatch(
        checkuser((res: any) => {
          if (res?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("web-token");
            dispatch(
              userLogout(() => {
                window.location.href = "/";
              })
            );
          }
        })
      );
    }
  }, []);

  const [initialRoutes, setInitialRoutes] = useState<any>(AdminRoutes);

  // const adminRoutes = AdminRoutes;
  const userData: any = user?.user?.data || user?.user?.user;

  useEffect(() => {
    if (!userData?.roleId) {
      setLoading(true)
    } else {
      setLoading(false);
      if (userData?.roleId === 1) {
        // adminRoutes = SuperAdminRoutes;
        setInitialRoutes(AdminRoutes);
      } else {
        // show alert you are not authorise to login this portal
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }, [userData])


  return (
    <Router>
      <ScrollToTop />
      {/* <IntercomControls /> */}

      <Routes>
        {initialRoutes.map((route: any, index: number) => {
          const { layout: Layout, component: Component } = route;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <AuthWrapper roleId={userData?.roleId}>
                  <Layout>
                    <Component />
                  </Layout>
                </AuthWrapper>
              }
            />
          );
        })}
        {/* Add a not found route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
