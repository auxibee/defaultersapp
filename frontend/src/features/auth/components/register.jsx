import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./auth.module.css";
import TextInput from "../../../components/forms/textInput";
import Button from "../../../components/button/button";
import { register } from "./../api/api";
import { AuthenticationContext } from "../../../store/auth";
import ErrorNotice from "../../../components/errorNotice/error";
import Head from "components/head/head";

const SignUpForm = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  return (
    <>
      <Head title="Sign Up" />
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(5, "Must be more than 5 characters")
            .required("Username Required"),
          password: Yup.string().required("Password Required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "password must match")
            .required("Please re-enter your password"),
        })}
        onSubmit={async (values) => {
          try {
            setIsLoading(true);
            const { data } = await register(values);
            const { userInfo, token, expiresAt } = data;

            setAuthState({ userInfo, token, expiresAt });
          } catch (error) {
            setIsLoading(false);
            setErrorStatus(error.response.data.message);
          }
        }}
      >
        <>
          <div className={styles.formHeader}>
            <h3>Sign Up for a new account</h3>
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

              <TextInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              {errorStatus && <ErrorNotice errors={errorStatus} />}
              <Button
                type="submit"
                className={styles.submitBtn}
                primary
                isLoading={isLoading}
              >
                Sign Up
              </Button>
              <Button href="/login"> Login </Button>
            </Form>
          </div>
        </>
      </Formik>
    </>
  );
};

export default SignUpForm;
