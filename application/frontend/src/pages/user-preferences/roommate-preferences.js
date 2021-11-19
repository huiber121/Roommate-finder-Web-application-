import axios from "axios";
// import { useState } from "react/cjs/react.development";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./roommate-preferences.css";

const RoommatePreferences = (props) => {
  const RoommatePreferencesValidationSchema = Yup.object().shape()({
    type: Yup.string(),
    gender: Yup.string()
  });

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  const submitForm = async (values) => {
    const requestData = await axios.post(
      `${process.env.REACT_APP_HOST_BASE}/api/addRoommatePreference`,
      {
        preftype: "roommate",
        type: values.type,
        gender: values.gender
      },
      { withCredentials: true }
    );
    console.log(requestData);
    if (requestData.status == 200) {
      setSubmitStatus("SUCCESS");
      setSubmitMessage(requestData.data.message);
      setTimeout(() => {
        props.history.push("/home");
      }, 2000);
    } else {
      setSubmitStatus("ERROR");
      setSubmitMessage("Somehing went wrong. Please try again.");
    }
  };

  return (
    <div className="preferences-root-container">
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered">
          <h1 className="is-size-1 has-text-weight-bold">Roommate Preferences</h1>
        </div>
      </div>
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered ">
          <Formik
              initialValues={{
                type: "",
                gender: ""
              }}
              validationSchema={RoommatePreferencesValidationSchema}
              onSubmit={(values) => {
                console.log(values);
                submitForm(values);
              }}
            >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                      <label className="label">Type</label>
                  </div>
                  <div className="field-body">
                      <p className="control">
                      <div className="select is-pulled-left">
                        <select
                              name="type"
                              value={values.type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                            <option value="">Select type</option>
                            <option value="student">Student</option>
                            <option value="professor">Professor</option>
                            <option value="professional">Professional</option>
                        </select>
                      </div>
                      </p>
                      {errors.type && touched.type ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.type}
                        </div>
                      ) : null}
                  <div className="field">
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Gender</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">
                              Male
                            </option>
                            <option value="female">
                              Female
                            </option>
                            <option value="other">
                              Other
                            </option>
                          </select>
                        </div>
                      </p>
                      {errors.gender && touched.gender ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.gender}
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
                  Set Preferences
                </button>
                {submitStatus ? (
                  <div
                    className={[
                      "has-text-weight-semibold is-size-5 mt-4",
                      submitStatus === "SUCCESS"
                        ? "has-text-success"
                        : "has-text-danger",
                    ].join(" ")}
                  >
                    {submitMessage}
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

export default RoommatePreferences;
