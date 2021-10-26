import axios from "axios";
import React, { useEffect, useState } from "react";
import NoRoomsFound from "../../assets/images/no-rooms-found.png";
import RoomCard from "../../components/search/room-card";

const RoomBookmarks = () => {
  const [roomData, setRoomData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getBookmarks = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_HOST_BASE}/api/showAllRoomBookmark`,
      { withCredentials: true }
    );
    console.log(data);
    if (data.data) {
      setRoomData(data.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div>
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered">
          <h1 className="is-size-1 has-text-weight-bold">Bookmarks</h1>
          <h5 className="is-size-5 has-text-weight-bold">
            Here's a list of all your bookmarks.
          </h5>
        </div>
      </div>
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
            roomData.map((room) => (
              <RoomCard
                room={room}
                key={room.roomid + `${Math.random() * 100}`}
              />
            ))
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

export default RoomBookmarks;
