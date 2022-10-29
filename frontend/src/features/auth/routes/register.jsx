import React, { useContext } from "react";
import SignUpForm from "../components/register";
import { Navigate } from "react-router";
import { AuthenticationContext } from "../../../store/auth";

const SignUp = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <>{isAuthenticated() ? <Navigate to="/dashboard" /> : <SignUpForm />}</>
  );
};

export default SignUp;
