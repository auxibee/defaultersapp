import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../button/button";
import styles from "./form.module.css";

import TextInput from "./textInput";
import ErrorNotice from "../errorNotice/error";
import { AuthFetchContext } from "utils/authAxios";
import { useNavigate } from "react-router-dom";
import { NEW_DEFAULTER_API } from "api";

const AddDefaulterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const { authAxios } = useContext(AuthFetchContext);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        defaulterName: "",
        telephone: "",
        location: "",
        arrears: "",
      }}
      validationSchema={Yup.object({
        defaulterName: Yup.string()
          .min(5, "Must be more than 5 characters")
          .required("Required"),
        telephone: Yup.string()
          .length(10, "Must be a valid Telephone Number")
          .required("Required"),
        location: Yup.string().required("Required"),
        arrears: Yup.string().required("Required"),
      })}
      onSubmit={async (values) => {
        try {
          setIsLoading(true);
          const defaulter_data = {
            name: values.defaulterName,
            telephone: values.telephone,
            location: values.location,
            arrears: values.arrears,
          };

          await authAxios.post(NEW_DEFAULTER_API, defaulter_data);

          navigate("/dashboard");
        } catch (error) {
          setIsLoading(false);

          setErrorStatus(error.response.data.message);
        }
      }}
    >
      <div className={styles.container}>
        <Form className={styles.form}>
          <TextInput
            label="Defaulter Name"
            type="text"
            name="defaulterName"
            placeholder="Defaulter name"
          />

          <TextInput
            label="Telephone"
            type="text"
            name="telephone"
            placeholder="Telephone"
          />

          <TextInput
            label="Location"
            type="text"
            name="location"
            placeholder="location"
          />

          <TextInput
            label="Arrears"
            type="text"
            name="arrears"
            placeholder="arrears"
          />
          {errorStatus && <ErrorNotice errors={errorStatus} />}
          <Button
            type="submit"
            primary
            className={styles.addDefaulterButton}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Add Defaulter
          </Button>
        </Form>
      </div>
    </Formik>
  );
};

export default AddDefaulterForm;
