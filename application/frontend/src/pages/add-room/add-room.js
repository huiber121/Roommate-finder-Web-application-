import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { object, number, string } from "yup";
import AddRoomSelect from "../../components/add-room/add-room-select";
import "./add-room.css";

const AddRoom = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [uploadStatus, setStatus] = useState("");

  const addRoomValidationSchema = object().shape({
    Location: string()
      .required("A room Location is required.")
      .min(2, "Please enter a valid Location"),
    ZipCode: number()
      .required("The room ZipCode is required")
      .min(10000, "Please enter a valid ZipCode")
      .max(99999, "Please enter a valid ZipCode."),
    Type: string().required("The Type of Room is required."),
    Description: string()
      .required("A Description of the room is required")
      .min(10, "Please enter a valid Description"),
    Price: number()
      .required("The Price of the room is required")
      .min(10, "Please enter a valid price."),
    Size: number()
      .required("The Size of the room is required")
      .min(10, "Please enter a valid size"),
    NumBathrooms: number().required("The Number of Bathrooms is required"),
    NumBedrooms: number().required("The Number of Bedrooms is required"),
  });

  useEffect(() => {
    let imagePreviews = [];
    console.log(images);
    images.forEach((image) => {
      imagePreviews.push(URL.createObjectURL(image));
    });
    setPreviewImages(imagePreviews);
  }, [images]);

  const submitForm = async (values) => {
    setLoading(true);
    if (images.length < 1) {
      setImageError("Please add at least 1 image.");
      setLoading(false);
      return;
    }
    let tagKeys = [
      "Smoking",
      "Pets",
      "Parking",
      "College",
      "Disability",
      "Negotiation",
      "Restroom",
    ];
    console.log(values[tagKeys[0]]);
    let tags = [];
    for (const tag of tagKeys) {
      if (values[tag] !== "") {
        console.log(values[tag]);
        tags.push(values[tag]);
      }
    }
    const queryObj = {
      json: {
        Location: `${values.Location}`,
        ZipCode: 94130,
        Type: `${values.Type}`,
        Description: `${values.Description}`,
        Price: 12.0,
        Size: 1700.0,
        NumBathrooms: 2,
        NumBedrooms: 4,
        Tags: `${tags.join(", ")}`,
        Available: 0,
      },
      files: images,
    };
    console.log(tags);
    console.log(queryObj);
    var formData = new FormData();
    formData.append(
      "json",
      `{"Location": "${values.Location}","ZipCode": "${
        values.ZipCode
      }","Type": "${values.Type}","Description": "${
        values.Description
      }","Price": "${values.Price}","Size": "${values.Size}","NumBathrooms": "${
        values.NumBathrooms
      }","NumBedrooms": "${values.NumBedrooms}","Tags": "${tags.join(
        ", "
      )}","Available": "0"}`
    );
    for (let i in images) {
      formData.append("files", images[i], images[i].name);
    }

    const data = await axios.post(
      `${process.env.REACT_APP_HOST_BASE}/api/addRoom`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(data);
    if (data.data.message.Roominfo === "success added room info") {
      setLoading(false);
      setStatus("SUCCESS");
    } else {
      setLoading(false);
      setStatus("ERROR");
    }
  };

  return (
    <div className="">
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered">
          <h1 className="is-size-1 has-text-weight-bold">Add Room</h1>
          <h5 className="is-size-5 has-text-weight-bold">
            Fill out the form below to add a new room listing.
          </h5>
        </div>
      </div>
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered ">
          <Formik
            initialValues={{
              Location: "",
              ZipCode: "",
              Type: "Apartment",
              Description: "",
              Price: 0,
              Size: 0,
              NumBathrooms: 0,
              NumBedrooms: 0,
              Smoking: "",
              Pets: "",
              Parking: "",
              College: "",
              Disability: "",
              Negotiation: "",
              Restroom: "",
              Available: true,
            }}
            validationSchema={addRoomValidationSchema}
            onSubmit={(values) => {
              console.log(values);
              submitForm(values);
            }}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form>
                {/* Location Field */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Location</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="Location"
                          placeholder="Enter the Location of the room."
                        />
                      </p>
                      {errors.Location && touched.Location ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.Location}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* ZipCode Field */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">ZipCode</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="ZipCode"
                          placeholder="Enter the ZipCode of the room."
                          type="number"
                        />
                      </p>
                      {errors.ZipCode && touched.ZipCode ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.ZipCode}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* Type Select */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Type</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="select is-pulled-left">
                          <select
                            name="Type"
                            value={values.Type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="Apartment">Apartment</option>
                            <option value="House">House</option>
                            <option value="Mobile Home">Mobile Home</option>
                          </select>
                        </div>
                      </p>
                      {errors.Type && touched.Type ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.Type}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* Description Field */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Description</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <textarea
                          className="input is-normal"
                          name="Description"
                          value={values.Description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter the Description of the room."
                          className="textarea"
                          rows="4"
                        />
                      </p>
                      {errors.Description && touched.Description ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.Description}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* Price Field */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Price ($)</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="Price"
                          placeholder="Enter the ZipCode of the room."
                          type="number"
                        />
                      </p>
                      {errors.Price && touched.Price ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.Price}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* Size Field */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Size (sq. ft.)</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="Size"
                          placeholder="Enter the ZipCode of the room."
                          type="number"
                        />
                      </p>
                      {errors.Size && touched.Size ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.Size}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* Number of Bedrooms Field */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Bedrooms</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="NumBedrooms"
                          placeholder="Enter the ZipCode of the room."
                          type="number"
                        />
                      </p>
                      {errors.NumBedrooms && touched.NumBedrooms ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.NumBedrooms}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* Number of Bathrooms Field */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Bathrooms</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <Field
                          className="input is-normal"
                          name="NumBathrooms"
                          placeholder="Enter the ZipCode of the room."
                          type="number"
                        />
                      </p>
                      {errors.NumBathrooms && touched.NumBathrooms ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {errors.NumBathrooms}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* Smoking Select */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Smoking</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-flex is-flex-direction-row">
                      <p className="control mt-2">
                        <label className="radio">
                          <Field
                            name="Smoking"
                            className="mr-2"
                            value="yes smoking"
                            type="radio"
                          />
                          Smoking Friendly
                        </label>
                        <label className="radio">
                          <Field
                            name="Smoking"
                            className="mr-2"
                            value="no smoking"
                            type="radio"
                          />
                          No Smoking
                        </label>
                      </p>
                    </div>
                  </div>
                </div>
                {/* Pets Select */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Pets</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-flex is-flex-direction-row">
                      <p className="control mt-2">
                        <label className="radio">
                          <Field
                            name="Pets"
                            className="mr-2"
                            value="yes pets"
                            type="radio"
                          />
                          Pet Friendly
                        </label>
                        <label className="radio">
                          <Field
                            name="Pets"
                            className="mr-2"
                            value="no pets"
                            type="radio"
                          />
                          No Pets Allowed
                        </label>
                      </p>
                    </div>
                  </div>
                </div>
                {/* Parking Select */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Parking</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-flex is-flex-direction-row">
                      <p className="control mt-2">
                        <label className="radio">
                          <Field
                            name="Parking"
                            className="mr-2"
                            value="yes parking availability"
                            type="radio"
                          />
                          Parking Available
                        </label>
                        <label className="radio">
                          <Field
                            name="Parking"
                            className="mr-2"
                            value="no parking availability"
                            type="radio"
                          />
                          No Parking Available
                        </label>
                      </p>
                    </div>
                  </div>
                </div>
                {/* College Select */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">College</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-flex is-flex-direction-row">
                      <p className="control mt-2">
                        <label className="radio">
                          <Field
                            name="College"
                            className="mr-2"
                            value="no college oriented"
                            type="radio"
                          />
                          Not College Oriented
                        </label>
                        <label className="radio">
                          <Field
                            name="College"
                            className="mr-2"
                            value="yes college oriented"
                            type="radio"
                          />
                          College Oriented
                        </label>
                      </p>
                    </div>
                  </div>
                </div>
                {/* Disability Select */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Disability</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-flex is-flex-direction-row">
                      <p className="control mt-2">
                        <label className="radio">
                          <Field
                            name="Disability"
                            className="mr-2"
                            value="yes disability friendly"
                            type="radio"
                          />
                          Disability Friendly
                        </label>
                        <label className="radio">
                          <Field
                            name="Disability"
                            className="mr-2"
                            value="no disability friendly"
                            type="radio"
                          />
                          Not Disability Friendly
                        </label>
                      </p>
                    </div>
                  </div>
                </div>
                {/* Negotiation Select */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Negotiation</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-flex is-flex-direction-row">
                      <p className="control mt-2">
                        <label className="radio">
                          <Field
                            name="Negotiation"
                            className="mr-2"
                            value="no negotiable"
                            type="radio"
                          />
                          Rent Not Negotiable
                        </label>
                        <label className="radio">
                          <Field
                            name="Negotiation"
                            className="mr-2"
                            value="yes negotiable"
                            type="radio"
                          />
                          Rent Negotiable
                        </label>
                      </p>
                    </div>
                  </div>
                </div>
                {/* Restroom Select */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Restroom</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-flex is-flex-direction-row">
                      <p className="control mt-2">
                        <label className="radio">
                          <Field
                            name="Restroom"
                            className="mr-2"
                            value="yes private restroom"
                            type="radio"
                          />
                          Private Restroom
                        </label>
                        <label className="radio">
                          <Field
                            name="Restroom"
                            className="mr-2"
                            value="no private restroom"
                            type="radio"
                          />
                          No Private Restroom
                        </label>
                      </p>
                    </div>
                  </div>
                </div>
                {/* Upload Image */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Pictures</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <div className="file is-boxed">
                          <label className="file-label">
                            <input
                              className="file-input"
                              type="file"
                              name="resume"
                              onChange={(event) => {
                                setImages([...images, ...event.target.files]);
                              }}
                            />
                            <span className="file-cta">
                              <span className="file-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    height: "1.25rem",
                                    width: "1.25rem",
                                  }}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                  />
                                </svg>
                              </span>
                              <span className="file-label">Choose a file…</span>
                            </span>
                          </label>
                        </div>
                      </p>
                      {imageError ? (
                        <div className="has-text-danger has-text-weight-semibold">
                          {imageError}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="columns is-mobile is-centered is-1 is-multiline">
                  {previewImages.map((previewImage) => (
                    <div
                      className="column is-11-mobile is-5-tablet is-5-desktop"
                      key={previewImage}
                    >
                      <img src={previewImage} />
                    </div>
                  ))}
                </div>
                {uploadStatus === "SUCCESS" ? (
                  <div className="m-3 is-size-5 has-text-weight-bold text-success">
                    Room Added Successfully
                  </div>
                ) : uploadStatus === "ERROR" ? (
                  <div className="m-3 is-size-5 has-text-weight-bold text-danger">
                    There was an error. Please try again.
                  </div>
                ) : null}
                {isLoading ? (
                  <div className="sk-circle">
                    <div className="sk-circle1 sk-child"></div>
                    <div className="sk-circle2 sk-child"></div>
                    <div className="sk-circle3 sk-child"></div>
                    <div className="sk-circle4 sk-child"></div>
                    <div className="sk-circle5 sk-child"></div>
                    <div className="sk-circle6 sk-child"></div>
                    <div className="sk-circle7 sk-child"></div>
                    <div className="sk-circle8 sk-child"></div>
                    <div className="sk-circle9 sk-child"></div>
                    <div className="sk-circle10 sk-child"></div>
                    <div className="sk-circle11 sk-child"></div>
                    <div className="sk-circle12 sk-child"></div>
                  </div>
                ) : (
                  <button
                    className="button is-link is-medium mt-5 mb-5"
                    type="submit"
                    disabled={isLoading}
                  >
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Add Room
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
