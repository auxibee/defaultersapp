import React from "react";
import Header from "./header/header";
import Main from "./main/main";
import Head from "components/head/head";

import styles from "./layout.module.css";

const Layout = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <Head title={title} />

      <header>
        <Header />
      </header>

      <main>
        <Main>{children}</Main>
      </main>
    </div>
  );
};

export default Layout;
