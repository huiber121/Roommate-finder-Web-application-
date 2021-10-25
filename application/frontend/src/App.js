import "./App.css";
import SearchRooms from "./pages/search/search-rooms";

const App = () => {
  return (
    <div className="root-container">
      {/* <div className="title-row">
        <h1 className="title-app">GatorRoomer</h1>
        <h2 className="title-class">CSC 648/848 Section 2</h2>
        <h3 className="title-team">Team 04</h3>
      </div> */}
      {/* <div className="input-container">
            <label className="input-label">
              Search for a Location or Zip Code
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
          </div> */}
      <SearchRooms />
    </div>
  );
};

export default App;
