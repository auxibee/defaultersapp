import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../button/button";
import styles from "./form.module.css";

import TextInput from "./textInput";
import ErrorNotice from "../errorNotice/error";
import { AuthFetchContext } from "utils/authAxios";
import { useNavigate } from "react-router-dom";
import SvgSpinner from "icons/Spinner";

const EditDefaulterform = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const [defaulter, setDefaulter] = useState(null);
  const { authAxios } = useContext(AuthFetchContext);

  useEffect(() => {
    const getDefaulter = async () => {
      const { data } = await authAxios.get(`defaulters/${id}`);
      setDefaulter(data.defaulter);
    };

    getDefaulter();
  }, [id, authAxios]);

  const navigate = useNavigate();

  return (
    <>
      {!defaulter && (
        <div className="loading">
          <SvgSpinner />
        </div>
      )}
      {defaulter && (
        <Formik
          initialValues={{
            defaulterName: defaulter.name,
            telephone: defaulter.telephone,
            location: defaulter.location,
            arrears: defaulter.arrears,
          }}
          enableReinitialize={true}
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

              await authAxios.put(`defaulters/${id}`, defaulter_data);

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
                placeholder="Arrears"
              />
              {errorStatus && <ErrorNotice errors={errorStatus} />}
              <Button
                type="submit"
                primary
                className={styles.addDefaulterButton}
                disabled={isLoading}
                isLoading={isLoading}
              >
                Update Defaulter
              </Button>
            </Form>
          </div>
        </Formik>
      )}
    </>
  );
};

export default EditDefaulterform;
