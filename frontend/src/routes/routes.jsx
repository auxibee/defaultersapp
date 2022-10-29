import { Outlet, Routes, Route, Navigate } from "react-router-dom";
import Login from "features/auth/routes/login";
import SignUp from "features/auth/routes/register";
import React from "react";
import { useContext } from "react";
import LandingPage from "features/main/landing";
import Layout from "components/layout/layout";
import { Suspense } from "react/cjs/react.production.min";
import NoticeCard from "components/noticeCard/noticeCard";
import AddDefaulter from "features/main/adddefaulter";
import { AuthenticationContext } from "store/auth";
import EditDefaulter from "features/main/editdefaulter";
import PageNotFound from "features/notfound/notfound";

const Main = React.lazy(() => import("features/main/main"));
const UserProfile = React.lazy(() =>
  import("features/profile/components/userProfile")
);

const AppWrapper = () => {
  return (
    <Suspense fallback={<NoticeCard message="loading....." />}>
      <Layout>
        <Outlet />
      </Layout>
    </Suspense>
  );
};

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<AppWrapper />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoutes>
              <Main />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route element={<AppWrapper />}>
        <Route
          path="profile/:username"
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route element={<AppWrapper />}>
        <Route
          path="defaulter/update/:id"
          element={
            <ProtectedRoutes>
              <EditDefaulter />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route element={<AppWrapper />}>
        <Route
          path="defaulter/new"
          exact
          element={
            <ProtectedRoutes>
              <AddDefaulter />
            </ProtectedRoutes>
          }
        />
      </Route>
    </Routes>
  );
};
