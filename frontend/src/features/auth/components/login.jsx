import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./auth.module.css";
import TextInput from "components/forms/textInput";
import Button from "components/button/button";
import { login } from "../api/api";
import { AuthenticationContext } from "store/auth";
import ErrorNotice from "components/errorNotice/error";
import Head from "components/head/head";

const LoginForm = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  return (
    <>
      <Head title="Log In" />
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(5, "Must be more than 5 characters")
            .required("Username Required"),
          password: Yup.string().required("Password Required"),
        })}
        onSubmit={async (values) => {
          try {
            setIsLoading(true);
            const { data } = await login(values);
            const { userInfo, token, expiresAt } = data;

            setAuthState({ userInfo, token, expiresAt });
          } catch (error) {
            setIsLoading(false);
            setErrorState(error.response.data.message);
          }
        }}
      >
        <>
          <div className={styles.formHeader}>
            <h3>Login in to your account</h3>
          </div>
          <div className={styles.authContainer}>
            <Form>
              <TextInput
                label="Username"
                type="text"
                name="username"
                placeholder="Username"
              />

              <TextInput
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
              />
              {errorState && <ErrorNotice errors={errorState} />}
              <Button
                type="submit"
                className={styles.submitBtn}
                primary
                isLoading={isLoading}
              >
                Login
              </Button>
              <Button href="/signup"> Register </Button>
            </Form>
          </div>
        </>
      </Formik>
    </>
  );
};

export default LoginForm;
