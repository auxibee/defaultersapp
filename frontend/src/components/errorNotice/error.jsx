import React from "react";
import styles from "./errorNotice.module.css";

const ErrorNotice = ({ errors }) => {
  let multipleErrors, errorMessage;

  if (Array.isArray(errors)) {
    multipleErrors = Object.values(errors);
  } else {
    errorMessage = errors;
  }

  return (
    <div className={styles.errorNotice}>
      {multipleErrors?.map((error) => (
        <p key={error}> {error} </p>
      ))}

      {errorMessage && <p> {errorMessage} </p>}
    </div>
  );
};

export default ErrorNotice;
