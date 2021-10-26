import { Field } from "formik";
import React from "react";

const AddRoomSelect = ({ title, key, options, errors, touched }) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{title}</label>
      </div>
      <div className="field-body">
        <div className="field is-flex is-flex-direction-row">
          <p className="control mt-2">
            {options.map((option) => (
              <label className="radio">
                <Field
                  name={key}
                  className="mr-2"
                  value={option.value}
                  type="radio"
                />
                {option.label}
              </label>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddRoomSelect;
