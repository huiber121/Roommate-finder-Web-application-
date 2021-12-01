import axios from "axios";
// import { useState } from "react/cjs/react.development";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./roommate-preferences.css";

const RoommatePreferences = (props) => {
  const RoommatePreferencesValidationSchema = Yup.object().shape({
    type: Yup.string(),
    gender: Yup.string(),
    location: Yup.string().max(180, "Please enter a valid location."),
    zipCode: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(5, "Must be exactly 5 digits"),
  });

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [type, setType] = useState("");

  const submitForm = async (values) => {
    const requestData = await axios.post(
      `${process.env.REACT_APP_HOST_BASE}/api/addPreference`,
      {
        preftype: "roommate",
        ...(values.type !== "" && { type: values.type }),
        ...(values.gender !== "" && { gender: values.gender }),
        ...(values.school !== "" && { school: values.school }),
        ...(values.gradeLevel !== "" && { gradlevel: values.gradeLevel }),
        ...(values.major !== "" && { major: values.major }),
        ...(values.location !== "" && { joblocation: values.location }),
        ...(values.zipCode !== "" && { zipcode: values.zipCode }),
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
          <h1 className="is-size-1 has-text-weight-bold">
            Roommate Preferences
          </h1>
        </div>
      </div>
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered ">
          <Formik
            initialValues={{
              type: "",
              gender: "",
              location: "",
              zipCode: "",
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
                          onChange={(e) => {
                            setType(e.target.value);
                            handleChange(e);
                          }}
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
                    <div className="field"></div>
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
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
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
                {type == "student" ? (
                  <React.Fragment>
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">School</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <p className="control">
                            <div className="select is-pulled-left">
                              <select
                                name="school"
                                value={values.school}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">Select School</option>
                                <option value="SF State">SF State</option>
                                <option value="USF">USF</option>
                                <option value="UCD">UCD</option>
                              </select>
                            </div>
                          </p>
                          {errors.school && touched.school ? (
                            <div className="has-text-danger has-text-weight-semibold">
                              {errors.school}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">Grad Level</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <p className="control">
                            <div className="select is-pulled-left">
                              <select
                                name="gradeLevel"
                                value={values.gradeLevel}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">Select Grad Level</option>
                                <option value="Senior">Senior</option>
                                <option value="Junior">Junior</option>
                                <option value="Graduate">Graduate</option>
                              </select>
                            </div>
                          </p>
                          {errors.gradeLevel && touched.gradeLevel ? (
                            <div className="has-text-danger has-text-weight-semibold">
                              {errors.gradeLevel}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">Major</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <p className="control">
                            <div className="select is-pulled-left">
                              <select
                                name="major"
                                value={values.major}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">Select Your Major</option>
                                <option value="Math">Math</option>
                                <option value="CS">CS</option>
                                <option value="Physics">Physics</option>
                                <option value="MED">Med</option>
                              </select>
                            </div>
                          </p>
                          {errors.major && touched.major ? (
                            <div className="has-text-danger has-text-weight-semibold">
                              {errors.major}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ) : type == "professor" ? (
                  <React.Fragment>
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">Location/Job Location</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <p className="control">
                            <Field
                              className="input is-normal"
                              name="location"
                              placeholder="Enter your location/job location"
                            />
                          </p>
                          {errors.location && touched.location ? (
                            <div className="has-text-danger has-text-weight-semibold">
                              {errors.location}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">Zip Code</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <p className="control">
                            <Field
                              className="input is-normal"
                              name="zipCode"
                              placeholder="Enter your zipcode"
                            />
                          </p>
                          {errors.zipCode && touched.zipCode ? (
                            <div className="has-text-danger has-text-weight-semibold">
                              {errors.zipCode}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ) : null}
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
