import axios from "axios";
// import { useState } from "react/cjs/react.development";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./room-preferences.css";

const RoomPreferences = (props) => {
  const RoomPreferencesValidationSchema = Yup.object().shape({
    type: Yup.string(),
    bedrooms: Yup.string(),
    bathrooms: Yup.string(),
    smoking: Yup.string(),
    pets: Yup.string(),
    parking: Yup.string(),
    college: Yup.string(),
    disability: Yup.string(),
    negotiation: Yup.string(),
    restroomPrivacy: Yup.string(),
  });

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  const submitForm = async (values) => {
    const requestData = await axios.post(
      `${process.env.REACT_APP_HOST_BASE}/api/addPreference`,
      {
        preftype: "room",
        type: values.type,
        numbedrooms: values.bedrooms,
        smoking: values.smoking,
        pets: values.pets,
        parking: values.parking,
        college: values.college,
        disability: values.disability,
        negotiation: values.negotiation,
        restroom: values.restroomPrivacy,
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
          <h1 className="is-size-1 has-text-weight-bold">User Preferences</h1>
        </div>
      </div>
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered ">
          <Formik
            initialValues={{
              type: "",
              bedrooms: "",
              bathrooms: "",
              smoking: "",
              pets: "",
              parking: "",
              college: "",
              disability: "",
              negotiation: "",
              restroomPrivacy: "",
            }}
            validationSchema={RoomPreferencesValidationSchema}
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
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select property type</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="mobile home">Mobile Home</option>
                          </select>
                        </div>
                      </p>
                      {errors.type && touched.type ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.type}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Bedrooms</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="bedrooms"
                            value={values.bedrooms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select number of bedrooms</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6+">6+</option>
                          </select>
                        </div>
                      </p>
                      {errors.bedrooms && touched.bedrooms ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.bedrooms}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Bathrooms</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="bathrooms"
                            value={values.bathrooms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select number of bathrooms</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4+">4+</option>
                          </select>
                        </div>
                      </p>
                      {errors.bathrooms && touched.bathrooms ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.bathrooms}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Smoking</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="smoking"
                            value={values.smoking}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select smoking options</option>
                            <option value="no smoking">No Smoking</option>
                            <option value="smoking friendly">
                              Smoking Friendly
                            </option>
                          </select>
                        </div>
                      </p>
                      {errors.smoking && touched.smoking ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.smoking}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Pets</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="pets"
                            value={values.bedrooms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">None</option>
                            <option value="no pets">No Pets</option>
                            <option value="pets friendly">Pets Friendly</option>
                          </select>
                        </div>
                      </p>
                      {errors.pets && touched.pets ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.pets}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Parking</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="parking"
                            value={values.parking}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">None</option>
                            <option value="no parking">No Parking</option>
                            <option value="parking included">
                              Parking Included
                            </option>
                          </select>
                        </div>
                      </p>
                      {errors.parking && touched.parking ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.parking}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">College</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="college"
                            value={values.college}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">None</option>
                            <option value="not college oriented">
                              Not College Oriented
                            </option>
                            <option value="college oriented">
                              College oriented
                            </option>
                          </select>
                        </div>
                      </p>
                      {errors.college && touched.college ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.college}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Disability</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="disability"
                            value={values.disability}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">None</option>
                            <option value="disability friendly">
                              Disability Friendly
                            </option>
                            <option value="not disability friendly">
                              Not Disability Friendly
                            </option>
                          </select>
                        </div>
                      </p>
                      {errors.disability && touched.disability ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.disability}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Negotiation</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="negotiation"
                            value={values.negotiation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">None</option>
                            <option value="rent not negotiatable">
                              Rent Not Negotiable
                            </option>
                            <option value="rent negotiatable">
                              Rent Negotiatable
                            </option>
                          </select>
                        </div>
                      </p>
                      {errors.negotiation && touched.negotiation ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.negotiation}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Restroom Privacy</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="restroomPrivacy"
                            value={values.restroomPrivacy}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">None</option>
                            <option value="private restroom">
                              Private Restroom
                            </option>
                            <option value="no private restroom">
                              No Private Restroom
                            </option>
                          </select>
                        </div>
                      </p>
                      {errors.restroomPrivacy && touched.restroomPrivacy ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.restroomPrivacy}
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

export default RoomPreferences;
