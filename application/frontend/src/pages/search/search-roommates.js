import axios from "axios";
import React, { useEffect, useState } from "react";
import FilterPanel from "../../components/search/filter-panel";
import NoRoommatesFound from "../../assets/images/no-roommates-found.png";
import "./search-rooms.css";
import RoommateCard from "../../components/search/roommate-card";

const SearchRoommates = () => {
  // This stores and sets the search input field's value
  const [inputField, setInputField] = useState("");
  // Store the filters values.

  const [typeSelect, setTypeSelect] = useState("");
  const [genderSelect, setGenderSelect] = useState("");
  const [majorSelect, setMajorSelect] = useState("");
  const [gradSelect, setGradSelect] = useState("");
  const [schoolSelect, setSchoolSelect] = useState("");

  const [currentTab, setCurrentTab] = useState("");
  // This stores and sets the room data value which is received from the Flask API.
  const [roommateData, setRoommateData] = useState([]);
  // Loading boolean flag.
  const [isLoading, setLoading] = useState(true);

  // This function calls the `getRooms` API endpoint and passes the search query to
  const fetchData = async () => {
    // Regexp that only accepts numbers from 0-9
    const zipRegex = "^[0-9]*$";
    // This flag is used to pass either the location or zipCode based on the input.
    let hasProvidedZipCode = false;

    // Check if the inputField value provided is a ZipCode or a Location
    if (inputField.match(zipRegex) && inputField !== "") {
      hasProvidedZipCode = true;
    }
    // The QueryObject is passed as to the getRooms API endpoint.
    const queryObj = {
      ...(hasProvidedZipCode === true && { zipcode: inputField }),

      ...(!hasProvidedZipCode &&
        inputField !== "" && { joblocation: inputField }),
      ...(typeSelect !== "" && { type: typeSelect }),
      ...(genderSelect !== "" && { gender: genderSelect }),
      ...(majorSelect !== "" && { major: majorSelect }),
      ...(gradSelect !== "" && { gradlevel: gradSelect }),
      ...(schoolSelect !== "" && { school: schoolSelect }),
    };
    console.log(queryObj);
    setLoading(true);
    const data = await axios.post(

      `${process.env.REACT_APP_HOST_BASE}/api/getRoommates`,
      queryObj
    );
    console.log(data.data);
    setRoommateData(data.data);
    setLoading(false);
  };

  // Handle Form submission and pass the data to the fetchData request.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const clearAllFilters = () => {
    setInputField("");
    setTypeSelect("");
    setGenderSelect("");
    setMajorSelect("");
    setGradSelect("");
    setSchoolSelect("");
  };

  // This function will run when the page loads - It should contain the initial fetch request which loads all the listings.
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mt-6">
      <form onSubmit={(event) => handleFormSubmit(event)}>
        <div>
          <div className="columns is-mobile is-gapless is-centered">
            <article className="panel is-link column is-11-mobile is-10-tablet is-10-desktop">
              <p className="panel-heading">Find Roommate</p>

              {typeSelect === "professor" ? (
                <p className="mt-2 mx-2 control has-icons-left">
                  <input
                    className="input is-normal is-link"
                    name="search"
                    placeholder="Enter the Job Location or a Zip Code."
                    onChange={(event) => setInputField(event.target.value)}
                    value={inputField}
                  />
                  <span className="icon is-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="search-find-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </p>
              ) : null}

              <p className="panel-tabs is-flex is-flex-direction-row is-flex-wrap-wrap">
                <a
                  className={currentTab === "type" ? "is-active" : ""}
                  onClick={() => setCurrentTab("type")}
                >
                  Type
                </a>
                <a
                  className={currentTab === "gender" ? "is-active" : ""}
                  onClick={() => setCurrentTab("gender")}
                >
                  Gender
                </a>
                {typeSelect === "student" ? (
                  <React.Fragment>
                    <a
                      className={currentTab === "major" ? "is-active" : ""}
                      onClick={() => setCurrentTab("major")}
                    >
                      Major
                    </a>
                    <a
                      className={currentTab === "grad" ? "is-active" : ""}
                      onClick={() => setCurrentTab("grad")}
                    >
                      Grad Level
                    </a>
                    <a
                      className={currentTab === "school" ? "is-active" : ""}
                      onClick={() => setCurrentTab("school")}
                    >
                      School
                    </a>
                  </React.Fragment>
                ) : null}
                {currentTab !== "" ? (
                  <a
                    className="is-flex is-align-content-center"
                    onClick={() => setCurrentTab("")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-3 close-filters"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </a>
                ) : null}
              </p>
              {currentTab === "type" ? (
                <FilterPanel
                  select={typeSelect}
                  setSelect={setTypeSelect}
                  options={[
                    { value: "", name: "None" },
                    { value: "student", name: "Student" },
                    { value: "professor", name: "Professor" },
                    { value: "professional", name: "Professional" },
                  ]}
                />
              ) : currentTab === "gender" ? (
                <FilterPanel
                  select={genderSelect}
                  setSelect={setGenderSelect}
                  options={[
                    { value: "", name: "None" },
                    { value: "Male", name: "Male" },
                    { value: "Female", name: "Female" },
                    { value: "Other", name: "Other" },
                  ]}
                />
              ) : currentTab === "major" ? (
                <FilterPanel
                  select={majorSelect}
                  setSelect={setMajorSelect}
                  options={[
                    { value: "", name: "None" },
                    { value: "Math", name: "Math" },
                    { value: "CS", name: "CS" },
                    { value: "Physics", name: "Physics" },
                    { value: "MED", name: "Med" },
                  ]}
                />
              ) : currentTab === "grad" ? (
                <FilterPanel
                  select={gradSelect}
                  setSelect={setGradSelect}
                  options={[
                    { value: "", name: "None" },
                    { value: "Senior", name: "Senior" },
                    { value: "Junior", name: "Junior" },
                    { value: "Graduate", name: "Graduate" },
                  ]}
                />
              ) : currentTab === "school" ? (
                <FilterPanel
                  select={schoolSelect}
                  setSelect={setSchoolSelect}
                  options={[
                    { value: "", name: "None" },
                    { value: "SF State", name: "SF State" },
                    { value: "USF", name: "USF" },
                    { value: "UCD", name: "UCD" },
                  ]}
                />
              ) : null}
              {currentTab !== "" ? (
                <div>
                  <a
                    className="panel-block is-flex is-flex-direction-row is-justify-content-end pb-2 pt-2"
                    onClick={() => clearAllFilters()}
                  >
                    <button className="button is-danger">Clear All</button>
                  </a>
                </div>
              ) : null}
            </article>
          </div>

          <div className="columns is-gapless is-centered mt-5 mb-5">
            <div className="column is-flex is-flex-direction-row is-justify-content-center">
              <button
                type="submit"
                className="button is-link is-medium has-text-weight-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="search-submit-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
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
        <div className="columns is-mobile is-centered is-multiline is-2">
          {/* <p className="m-5">{JSON.stringify(roommateData)}</p> */}
          {roommateData[0].length > 0 && typeSelect === "" ? (
            roommateData[0].map((roommate) => (
              <RoommateCard key={roommate.username} roommate={roommate[0]} />
            ))
          ) : roommateData[0].length > 0 && typeSelect !== "" ? (
            roommateData[0].map((roommate) => (
              <RoommateCard key={roommate.username} roommate={roommate} />
            ))
          ) : (
            <div>
              <img src={NoRoommatesFound} className="mt-5 mb-3" />
              <div className="has-text-danger has-text-weight-semibold is-size-5">
                No Rommates found. Please update your search preferences.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRoommates;
