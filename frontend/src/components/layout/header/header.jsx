import React, { useContext } from "react";
import styles from "./header.module.css";
import Button from "./../../button/button";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "store/auth";

const AuthenticatedContainer = ({ username, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className={styles.authContainer}>
      <Link to={`profile/${username}`}> {username} </Link>
      <button onClick={() => handleLogout()}> Logout </button>
    </div>
  );
};

const AuthenticationButtons = () => {
  return (
    <div className={styles.authBtns}>
      <Button href="login" primary>
        Login
      </Button>
      <Button href="signup" primary>
        Sign Up
      </Button>
    </div>
  );
};

const Header = () => {
  const { isAuthenticated, authState, logout } = useContext(
    AuthenticationContext
  );

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>
          <Link to={isAuthenticated() ? "/dashboard" : "/"}>DefaultersApp</Link>
        </h1>
      </div>
      <div className={styles.auth}>
        {isAuthenticated() ? (
          <AuthenticatedContainer
            username={authState.userInfo.username}
            logout={logout}
          />
        ) : (
          <AuthenticationButtons />
        )}
      </div>
    </div>
  );
};

export default Header;
