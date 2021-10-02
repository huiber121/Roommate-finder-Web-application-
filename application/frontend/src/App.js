import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [inputField, setInputField] = useState("");
  const [roomData, setRoomData] = useState([]);

  const fetchData = async (query) => {
    const data = await axios.post("http://localhost:5000/getRooms", {
      description: query,
    });
    console.log(data.data);
    setRoomData(data.data);
  };

  // Handle Form submission and pass the data to the fetchData request.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchData(inputField);
  };

  // This function will run when the page loads - It should contain the initial fetch request which loads all the listings.
  useEffect(() => {
    fetchData("Appliances");
  }, []);

  return (
    <div className="">
      <div className="search-row">
        <h3 className="search-title">Search</h3>
        <form onSubmit={(event) => handleFormSubmit(event)}>
          <input
            type="text"
            onChange={(event) => setInputField(event.target.value)}
            value={inputField}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <div className="room-cards">
        {roomData.length > 0
          ? roomData.map((room) => (
              <div key={room.room_id} className="room-card">
                <h3>{room.location}</h3>
                <p>{room.description}</p>
                <p>$ {room.price}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default App;
