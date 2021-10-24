import axios from "axios";
import React, { useEffect, useState } from "react";
import "./search-rooms.css";
import RoomCard from "../../components/search/room-card";
import NoRoomsFound from "../../assets/images/no-rooms-found.png";

const SearchRooms = () => {
  // This stores and sets the search input field's value
  const [inputField, setInputField] = useState("");
  // Store the filters values.
  const [typeSelect, setTypeSelect] = useState("");
  const [bedroomSelect, setBedroomSelect] = useState("");
  const [bathroomSelect, setBathroomSelect] = useState("");
  const [petSelect, setPetSelect] = useState("");
  const [smokingSelect, setSmokingSelect] = useState("");
  const [parkingSelect, setParkingSelect] = useState("");
  const [collegeSelect, setCollegeSelect] = useState("");
  const [disabilitySelect, setDisabilitySelect] = useState("");
  const [negotiationSelect, setNegotiationSelect] = useState("");
  const [restroomSelect, setRestroomSelect] = useState("");

  const [currentTab, setCurrentTab] = useState("");
  // This stores and sets the room data value which is received from the Flask API.
  const [roomData, setRoomData] = useState([]);
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
      ...(!hasProvidedZipCode && { location: inputField }),
      ...(typeSelect !== "" && { type: typeSelect }),
      ...(bedroomSelect !== "" && { numbedrooms: bedroomSelect }),
      ...(bathroomSelect !== "" && { numbathrooms: bathroomSelect }),
      ...(petSelect !== "" && { pets: petSelect }),
      ...(smokingSelect !== "" && { smoking: smokingSelect }),
      ...(parkingSelect !== "" && { parking: parkingSelect }),
      ...(collegeSelect !== "" && { college: collegeSelect }),
      ...(disabilitySelect !== "" && { disability: disabilitySelect }),
      ...(negotiationSelect !== "" && { negotiation: negotiationSelect }),
      ...(restroomSelect !== "" && { restroom: restroomSelect }),
    };
    console.log(queryObj);
    setLoading(true);
    const data = await axios.post(
      `${process.env.REACT_APP_HOST_BASE}/api/getRooms`,
      queryObj
    );
    // console.log(data.data);
    setRoomData(data.data);
    setLoading(false);
  };

  // Handle Form submission and pass the data to the fetchData request.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const clearAllFilters = () => {
    setTypeSelect("");
    setBedroomSelect("");
    setBathroomSelect("");
    setPetSelect("");
    setSmokingSelect("");
    setParkingSelect("");
    setCollegeSelect("");
    setDisabilitySelect("");
    setNegotiationSelect("");
    setRestroomSelect("");
    setCurrentTab("");
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
              <p className="panel-heading">Search for a Location or Zip Code</p>

              <p className="mt-2 mx-2 control has-icons-left">
                <input
                  className="input is-normal is-link"
                  name="search"
                  placeholder="Enter the name of a Location or a Zip Code."
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

              <p className="panel-tabs is-flex is-flex-direction-row is-flex-wrap-wrap">
                <a
                  className={currentTab === "type" ? "is-active" : ""}
                  onClick={() => setCurrentTab("type")}
                >
                  Type
                </a>
                <a
                  className={currentTab === "bedrooms" ? "is-active" : ""}
                  onClick={() => setCurrentTab("bedrooms")}
                >
                  Bedrooms
                </a>
                <a
                  className={currentTab === "bathrooms" ? "is-active" : ""}
                  onClick={() => setCurrentTab("bathrooms")}
                >
                  Bathrooms
                </a>
                <a
                  className={currentTab == "smoking" ? "is-active" : ""}
                  onClick={() => setCurrentTab("smoking")}
                >
                  Smoking
                </a>
                <a
                  className={currentTab === "pets" ? "is-active" : ""}
                  onClick={() => setCurrentTab("pets")}
                >
                  Pets
                </a>
                <a
                  className={currentTab === "parking" ? "is-active" : ""}
                  onClick={() => setCurrentTab("parking")}
                >
                  Parking
                </a>
                <a
                  className={currentTab === "college" ? "is-active" : ""}
                  onClick={() => setCurrentTab("college")}
                >
                  College
                </a>
                <a
                  className={currentTab === "disability" ? "is-active" : ""}
                  onClick={() => setCurrentTab("disability")}
                >
                  Disability
                </a>
                <a
                  className={currentTab === "negotiation" ? "is-active" : ""}
                  onClick={() => setCurrentTab("negotiation")}
                >
                  Negotiation
                </a>
                <a
                  className={currentTab == "restroom" ? "is-active" : ""}
                  onClick={() => setCurrentTab("restroom")}
                >
                  Restroom Privacy
                </a>
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
              {/* TODO: REFACTOR THIS */}
              {currentTab === "type" ? (
                <div>
                  <a className="panel-block is-active is-flex is-flex-direction-row is-justify-content-center pb-5 pt-5">
                    <div className="select">
                      <select
                        value={typeSelect}
                        onChange={(event) => setTypeSelect(event.target.value)}
                      >
                        <option value="">None</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Mobile Home">Mobile Home</option>
                      </select>
                    </div>
                  </a>
                </div>
              ) : currentTab === "bedrooms" ? (
                <div>
                  <a className="panel-block is-active is-flex is-flex-direction-row is-justify-content-center pb-5 pt-5">
                    <div className="select">
                      <select
                        value={bedroomSelect}
                        onChange={(event) =>
                          setBedroomSelect(event.target.value)
                        }
                      >
                        <option value="">None</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6+</option>
                      </select>
                    </div>
                  </a>
                </div>
              ) : currentTab === "bathrooms" ? (
                <div>
                  <a className="panel-block is-active is-flex is-flex-direction-row is-justify-content-center pb-5 pt-5">
                    <div className="select">
                      <select
                        value={bathroomSelect}
                        onChange={(event) =>
                          setBathroomSelect(event.target.value)
                        }
                      >
                        <option value="">None</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                  </a>
                </div>
              ) : currentTab === "smoking" ? (
                <div>
                  <a className="panel-block is-active is-flex is-flex-direction-row is-justify-content-center pb-5 pt-5">
                    <div className="select">
                      <select
                        value={smokingSelect}
                        onChange={(event) =>
                          setSmokingSelect(event.target.value)
                        }
                      >
                        <option value="">None</option>
                        <option value="no smoking">No Smoking</option>
                        <option value="yes smoking">Smoking Friendly</option>
                      </select>
                    </div>
                  </a>
                </div>
              ) : currentTab === "pets" ? (
                <div>
                  <a className="panel-block is-active is-flex is-flex-direction-row is-justify-content-center pb-5 pt-5">
                    <div className="select">
                      <select
                        value={petSelect}
                        onChange={(event) => setPetSelect(event.target.value)}
                      >
                        <option value="">None</option>
                        <option value="no pets">No Pets</option>
                        <option value="yes pets">Pet Friendly</option>
                      </select>
                    </div>
                  </a>
                </div>
              ) : currentTab === "parking" ? (
                <div>
                  <a className="panel-block is-active is-flex is-flex-direction-row is-justify-content-center pb-5 pt-5">
                    <div className="select">
                      <select
                        value={parkingSelect}
                        onChange={(event) =>
                          setParkingSelect(event.target.value)
                        }
                      >
                        <option value="">None</option>
                        <option value="no parking">No Parking</option>
                        <option value="yes parking">Parking Included</option>
                      </select>
                    </div>
                  </a>
                </div>
              ) : currentTab === "college" ? (
                <div>
                  <a className="panel-block is-active is-flex is-flex-direction-row is-justify-content-center pb-5 pt-5">
                    <div className="select">
                      <select
                        value={collegeSelect}
                        onChange={(event) =>
                          setCollegeSelect(event.target.value)
                        }
                      >
                        <option value="">None</option>
                        <option value="no college oriented">
                          Not College Oriented
                        </option>
                        <option value="yes college oriented">
                          College Oriented
                        </option>
                      </select>
                    </div>
                  </a>
                </div>
              ) : currentTab === "disability" ? (
                <div>
                  <a className="panel-block is-active is-flex is-flex-direction-row is-justify-content-center pb-5 pt-5">
                    <div className="select">
                      <select
                        value={disabilitySelect}
                        onChange={(event) =>
                          setDisabilitySelect(event.target.value)
                        }
                      >
                        <option value="">None</option>
                        <option value="yes disability friendly">
                          Disability Friendly
                        </option>
                        <option value="no disability friendly">
                          Not Disability Friendly
                        </option>
                      </select>
                    </div>
                  </a>
                </div>
              ) : currentTab === "negotiation" ? (
                <div>
                  <a className="panel-block is-active is-flex is-flex-direction-row is-justify-content-center pb-5 pt-5">
                    <div className="select">
                      <select
                        value={negotiationSelect}
                        onChange={(event) =>
                          setNegotiationSelect(event.target.value)
                        }
                      >
                        <option value="">None</option>
                        <option value="no negotiable">
                          Rent Not Negotiable
                        </option>
                        <option value="yes negotiable">Rent Negotiable</option>
                      </select>
                    </div>
                  </a>
                </div>
              ) : currentTab === "restroom" ? (
                <div>
                  <a className="panel-block is-active is-flex is-flex-direction-row is-justify-content-center pb-5 pt-5">
                    <div className="select">
                      <select
                        value={restroomSelect}
                        onChange={(event) =>
                          setRestroomSelect(event.target.value)
                        }
                      >
                        <option value="">None</option>
                        <option value="yes private restroom">
                          Private Restroom
                        </option>
                        <option value="no private restroom">
                          No Private Restroom
                        </option>
                      </select>
                    </div>
                  </a>
                </div>
              ) : null}
              {currentTab !== "" ? (
                <div>
                  <a
                    className="panel-block is-flex is-flex-direction-row is-justify-content-end pb-2 pt-2"
                    onClick={() => clearAllFilters()}
                  >
                    <button class="button is-danger">Clear All</button>
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
          {roomData.length > 0 ? (
            roomData.map((room) => <RoomCard room={room} key={room.roomid} />)
          ) : (
            <div>
              <img src={NoRoomsFound} className="mt-5 mb-3" />
              <div className="has-text-danger has-text-weight-semibold is-size-5">
                No Rooms found. Please update your search preferences.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRooms;
