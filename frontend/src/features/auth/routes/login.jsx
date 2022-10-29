import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthenticationContext } from "../../../store/auth";
import LoginForm from "./../components/login";

const Login = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <>{isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginForm />}</>
  );
};

export default Login;
