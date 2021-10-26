import axios from "axios";
import React, { useEffect, useState } from "react";
import NoRoommatesFound from "../../assets/images/No-roomate-found.png";
import "./search-roommates.css";

const SearchRoommates = () => {
  // This stores and sets the search input field's value
  const [inputField, setInputField] = useState("");
  // Store the filters values.
  const [majorSelect,setMajorSelect] = useState("");
  const [gradeSelect,setGradeSelect] = useState("");

  const [currentTab, setCurrentTab] = useState("");
  // This stores and sets the room data value which is received from the Flask API.
  const [roomData, setRoommateData] = useState([]);
  // Loading boolean flag.
  const [isLoading, setLoading] = useState(true);

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
    };
    console.log(queryObj);
    setLoading(true);
    const data = await axios.post(
      `${process.env.REACT_APP_HOST_BASE}/api/getRooms`,
      queryObj
    );
    // console.log(data.data);
    setRoommateData(data.data);
    setLoading(false);
  };
  return <div>
    
  </div>;
};

export default SearchRoommates;
