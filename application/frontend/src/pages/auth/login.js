import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { string } from "yup";
import { object } from "yup";
import axiosInstance from "../../axios-config";
import "./login.css";
import { logEvent } from "firebase/analytics";

export const loginState = atom({
  key: "loginState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const checkLoginState = selector({
  key: "getLoginState",
  get: ({ get }) => get(loginState),
});

export const adminState = atom({
  key: "adminState",
  default: false,
});

export const checkAdminState = selector({
  key: "getAdminState",
  get: ({ get }) => get(adminState),
});

const Login = (props) => {
  const [login, setLogin] = useRecoilState(loginState);
  const [admin, setAdmin] = useRecoilState(adminState);

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

  const [loginMessage, setLoginMessage] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  const submitLoginForm = async (values) => {
    console.log("Login");
    const requestData = await axiosInstance.post(
      `/api/login`,
      { ...values },
      { withCredentials: true }
    );
    console.log(requestData.data);
    if (requestData.data.message) {
      setLoginStatus("SUCCESS");
      setLoginMessage(requestData.data.message);
      setLogin(true);
      if (requestData.data.roleid == 1) {
        setAdmin(true);
      }
      logEvent(props.analytics, "login");
      setTimeout(() => {
        props.history.push("/");
      }, 2000);
    } else {
      setLoginStatus("ERROR");
      setLoginMessage("Error Logging in. Please try again.");
    }
  };

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
              submitLoginForm(values);
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
                <button className="button is-link is-medium" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="login-submit-icon"
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
                  Login
                </button>
                {loginStatus ? (
                  <div
                    className={[
                      "has-text-weight-semibold is-size-5 mt-4",
                      loginStatus === "SUCCESS"
                        ? "has-text-success"
                        : "has-text-danger",
                    ].join(" ")}
                  >
                    {loginMessage}
                  </div>
                ) : null}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
