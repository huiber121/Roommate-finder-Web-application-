import axios from "axios";
// import { useState } from "react/cjs/react.development";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./register.css";

const Register = (props) => {
  const registrationValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Please enter a username.")
      .min(2, "Please enter a valid username.")
      .max(50, "Please enter a valid username.")
      .matches(
        /^[a-zA-Z][a-zA-Z0-9.,$;]+$/,
        "Username must begin with character."
      ),
    email: Yup.string()
      .email("Invalid Email")
      .required("The email is required.")
      .min(2, "Please enter a valid e-mail.")
      .max(50, "Please enter a valid e-mail."),
    password: Yup.string()
      .required("The password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .required("Password confirmation is required.")
      .oneOf([Yup.ref("password"), null], "Password must match"),
    terms: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
    age: Yup.number().required("Your age is required"),
    accountType: Yup.string()
      .notOneOf([""])
      .required("Please indicate your account type."),
    firstName: Yup.string().required("Field is required"),
    lastName: Yup.string().required("Field is required"),
    middleName: Yup.string(),
    gender: Yup.string().notOneOf([""]).required("Please indicate your gender"),
    ssn: Yup.string()
      .matches(/^[0-9]*$/, "Numbers only.")
      .min(9, "SSN must be 9 digits long.")
      .max(9, "SSN must be 9 digits long.")
      .required("Please enter your SSN."),

    school: Yup.string(),
    gradeLevel: Yup.string(),
    major: Yup.string()
      .min(2, "Please enter a valid major.")
      .max(50, "Please enter a valid major."),
    location: Yup.string().max(180, "Please enter a valid location."),
    zipCode: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(5, "Must be exactly 5 digits"),
  });

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [accountType, setAccountType] = useState("");

  const submitForm = async (values) => {
    const requestData = await axios.post(
      `${process.env.REACT_APP_HOST_BASE}/api/addUser`,
      {
        loginid: values.username,
        email: values.email,
        password: values.password,
        type: values.accountType,
        name: values.firstName + " " + values.lastName,
        age: values.age,
        gender: values.gender,
        userscore: 50,
        ssn: values.ssn,
        ...(values.school !== "" && { school: values.school }),
        ...(values.gradeLevel !== "" && { gradlevel: values.gradeLevel }),
        ...(values.major !== "" && { major: values.major }),
        ...(values.location !== "" && { location: values.location }),
        ...(values.zipCode !== "" && { zipcode: values.zipCode }),
      },
      { withCredentials: true }
    );
    console.log(requestData);
    if (requestData.data.message) {
      setSubmitStatus("SUCCESS");
      setSubmitMessage(requestData.data.message);
      setTimeout(() => {
        props.history.push("/login");
      }, 2000);
    } else {
      setSubmitStatus("ERROR");
      setSubmitMessage("Error signing up. Please try again.");
    }
  };

  return (
    <div className="register-root-container">
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered">
          <h1 className="is-size-1 has-text-weight-bold">Sign up</h1>
          <h5 className="is-size-5 has-text-weight-bold">
            Fill out the form below to create an account.
          </h5>
        </div>
      </div>
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered ">
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              age: 0,
              terms: "",
              accountType: "",
              firstName: "",
              lastName: "",
              middleName: "",
              gender: "",
              ssn: "",
              school: "",
              gradeLevel: "",
              major: "",
              location: "",
              zipCode: "",
            }}
            validationSchema={registrationValidationSchema}
            onSubmit={(values) => {
              console.log(values);
              submitForm(values);
            }}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Username</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="username"
                          placeholder="Enter your username"
                        />
                      </p>
                      {errors.username && touched.username ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.username}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Email</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="email"
                          placeholder="Enter your e-mail"
                        />
                      </p>
                      {errors.email && touched.email ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.email}
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
                          placeholder="Enter your password"
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
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Confirm Password</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="confirmPassword"
                          placeholder="Re-enter your password"
                          type="password"
                        />
                      </p>
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Age</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="age"
                          placeholder="Enter your age"
                        />
                      </p>
                      {errors.age && touched.age ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.age}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Account Type</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="accountType"
                            value={values.accountType}
                            onChange={(e) => {
                              setAccountType(e.target.value);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                          >
                            <option value="">Select a type</option>
                            <option value="student">Student</option>
                            <option value="professor">Professor</option>
                            {/* <option value={2}>Land Lord</option> */}
                          </select>
                        </div>
                      </p>
                      {errors.accountType && touched.accountType ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.accountType}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">First Name</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="firstName"
                          placeholder="First Name"
                        />
                      </p>
                      {errors.firstName && touched.firstName ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.firstName}
                        </div>
                      ) : null}
                    </div>
                    <div className="field-label is-normal">
                      <label className="label">Middle Name</label>
                    </div>
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="middleName"
                          placeholder="Middle Name"
                        />
                      </p>
                      {errors.middleName && touched.middleName ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.middleName}
                        </div>
                      ) : null}
                    </div>
                    <div className="field-label is-normal">
                      <label className="label">Last Name</label>
                    </div>
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="lastName"
                          placeholder="Last Name"
                        />
                      </p>
                      {errors.lastName && touched.lastName ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.lastName}
                        </div>
                      ) : null}
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
                            <option value="">Select a gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
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
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">SSN</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="ssn"
                          placeholder="Enter your SSN"
                          type="password"
                        />
                      </p>
                      {errors.ssn && touched.ssn ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.ssn}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {accountType == "student" ? (
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
                                <option value="Med">Med</option>
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
                ) : accountType == "professor" ? (
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
                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          type="checkbox"
                          name="terms"
                          className="form-check-input mr-2"
                        />
                        <label htmlFor="ml-2 terms">
                          I agree to the Terms and Condidtions.
                        </label>
                      </p>
                      {errors.terms && touched.terms ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.terms}
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
                  Sign up
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

export default Register;
