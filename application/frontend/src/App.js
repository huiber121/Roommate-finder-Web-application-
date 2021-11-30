import "./App.css";
import SearchRooms from "./pages/search/search-rooms";
import { logEvent } from "firebase/analytics";
import { useEffect } from "react";

const App = ({ analytics }) => {
  useEffect(() => {
    logEvent(analytics, "search");
  });

  return (
    <div className="root-container">
      <SearchRooms />
    </div>
  );
};

export default App;
