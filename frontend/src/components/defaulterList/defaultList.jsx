import React from "react";
import styles from "./defaulterList.module.css";

const DefaultersList = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default DefaultersList;
