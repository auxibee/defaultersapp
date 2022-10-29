import { useContext } from "react";
import Button from "../../components/button/button";
import { AuthenticationContext } from "../../store/auth";
import Head from "components/head/head";

import styles from "./landing.module.css";

const LandingPage = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  const href = isAuthenticated() ? "/dashboard" : "/login";

  return (
    <>
      <Head />
      <div className={styles.container}>
        <h1> Loan Defaulters Contact Book</h1>
        <Button href={href}> Get Started </Button>
        <Button href="github"> GitHub </Button>
      </div>
    </>
  );
};

export default LandingPage;
