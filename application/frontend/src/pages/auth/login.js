import { Field, Form, Formik } from "formik";
import React from "react";
import { string } from "yup";
import { object } from "yup";
import "./login.css";

const Login = () => {
  const loginValidationSchema = object().shape({
    loginid: string()
      .required("The Login ID is required.")
      .min(2, "Please enter a valid Login ID.")
      .max(50, "Please enter a valid Login ID."),
    password: string()
      .required("The password is required.")
      .min(2, "Please enter a valid password.")
      .max(50, "Please enter a valid password."),
  });

  return (
    <div className="login-root-container">
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered">
          <h1 className="is-size-1 has-text-weight-bold">Login</h1>
          <h5 className="is-size-5 has-text-weight-bold">
            Fill out the form below to login to the application.
          </h5>
        </div>
      </div>
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered ">
          <Formik
            initialValues={{ loginid: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Login ID</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="loginid"
                          placeholder="Enter your Login ID"
                        />
                      </p>
                      {errors.loginid && touched.loginid ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.loginid}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Password</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="password"
                          placeholder="Enter your Password"
                          type="password"
                        />
                      </p>
                      {errors.password && touched.password ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <button className="button is-link is-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="submit-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
