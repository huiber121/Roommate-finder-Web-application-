import React from "react";
import { Formik, Form, Field} from 'formik';
import * as Yup from "yup";
import "./register.css";


const Register = () => {
  const registrationValidationSchema = Yup.object().shape({
    username: Yup.string()
    .required("Please enter a username.")
    .min(2, "Please enter a valid username.")
    .max(50, "Please enter a valid username.")
    .matches(/^[a-zA-Z][a-zA-Z0-9.,$;]+$/,"Username must begin with character."),
    email: Yup.string().email('Invalid Email')
    .required("The email is required.")
    .min(2, "Please enter a valid e-mail.")
    .max(50, "Please enter a valid e-mail."),
    password: Yup.string()
    .required("The password is required.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    confirmPassword: Yup.string()
    .required('Password confirmation is required.')
    .oneOf([Yup.ref('password'),null], 'Password must match'),
    terms: Yup.boolean()
    .oneOf([true],"Must Accept Terms and Conditions")
  });

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
            initialValues={{ username: "", email: "", password: "", confirmPassword: "", terms: "" }}
            validationSchema={registrationValidationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
            >
              {({errors, touched}) => (
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
                      <div className="field-body">
                        <div className="field">
                          <p className="control">
                            <Field
                              className="form-check-label"
                              name="terms"
                              type="checkbox"
                            />
                            <label htmlFor="terms">
                              I agree to the Terms and Conditions.  
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
                </Form>
              )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
