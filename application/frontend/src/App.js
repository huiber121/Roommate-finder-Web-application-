import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  // This stores and sets the search input field's value
  const [inputField, setInputField] = useState("");
  // This stores and sets the pet select button's value.
  const [petSelect, setPetSelect] = useState("");
  // This stores and sets the rat select button's value.
  const [smokingSelect, setSmokingSelect] = useState("");
  // This stores and sets the room data value which is received from the Flask API.
  const [roomData, setRoomData] = useState([]);

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
      ...(petSelect !== "" && { pets: petSelect }),
      ...(smokingSelect !== "" && { smoking: smokingSelect }),
    };
    const data = await axios.post(
      `${process.env.REACT_APP_HOST_BASE}/api/getRooms`,
      queryObj
    );
    console.log(data.data);
    setRoomData(data.data);
  };

  // Handle Form submission and pass the data to the fetchData request.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  // This function will run when the page loads - It should contain the initial fetch request which loads all the listings.
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="root-container">
      <div className="title-row">
        <h1 className="title-app">GatorRoomer</h1>
        <h2 className="title-class">CSC 648/848 Section 2</h2>
        <h3 className="title-team">Team 04</h3>
      </div>
      <div className="search-row">
        <h3 className="search-title">Search</h3>
        <form
          onSubmit={(event) => handleFormSubmit(event)}
          className="form-container"
        >
          <div className="input-container">
            <label className="input-label">
              Search for a Location or Zip Code{" "}
            </label>
            <input
              className="search-input"
              type="text"
              onChange={(event) => setInputField(event.target.value)}
              value={inputField}
            />
          </div>
          <div className="input-container">
            <label className="input-label">Pet Preference</label>
            <select
              className="search-select"
              value={petSelect}
              onChange={(event) => setPetSelect(event.target.value)}
            >
              <option value="">None</option>
              <option value="no pets">No Pets</option>
              <option value="yes pets">Pet Friendly</option>
            </select>
          </div>
          <div className="input-container">
            <label className="input-label">Smoking Preference</label>
            <select
              className="search-select"
              value={smokingSelect}
              onChange={(event) => setSmokingSelect(event.target.value)}
            >
              <option value="">None</option>
              <option value="no smoking">No Smoking</option>
              <option value="yes smoking">Smoking Friendly</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <div className="room-cards">
        {roomData.length > 0
          ? roomData.map((room) => (
              <div key={room.room_id} className="room-card">
                <div
                  className="room-card-image-container"
                  style={{
                    backgroundImage: `url(${room.roommedia[0]})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                  }}
                ></div>
                <div className="room-data-container">
                  <h3 className="room-location">
                    {room.location} - {room.zipcode}
                  </h3>
                  <p className="room-description">{room.description}</p>
                  <p className="room-bed-bath">
                    {room.numbedrooms} Bed | {room.numbathrooms} Bath
                  </p>
                </div>
                <p className="room-price">Rent - ${room.price}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default App;
