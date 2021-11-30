import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios-config";
import RoomCard from "../../components/search/room-card";
import RoommateCard from "../../components/search/roommate-card";

const Alerts = () => {
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(null);
  const [roomSuggestion, setRoomSuggestions] = useState([]);
  const [roommateSuggestion, setRoommateSuggestions] = useState([]);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const data = await axiosInstance.post(
        `${process.env.REACT_APP_HOST_BASE}/api/getNotifications`,
        {},
        { withCredentials: true }
      );
      if (data.status !== 200) {
        setError(true);
      } else {
        console.log(data.data);
        const rooms = data.data.filter((entry) =>
          entry.room_id ? true : false
        );
        setRoomSuggestions(rooms);
        const roommates = data.data.filter((entry) =>
          entry.userid ? true : false
        );
        setRoommateSuggestions(roommates);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div>
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered">
          <h1 className="is-size-1 has-text-weight-bold">Alerts</h1>
          <h5 className="is-size-5 has-text-weight-bold">
            Here are all your latest alerts.
          </h5>
        </div>
      </div>
      {hasError ? (
        <div className="has-text-centered p-5 has-text-danger has-text-weight-bold is-size-5">
          Unable to load your alerts. Please make sure you have set your room
          and roommate preferences first.
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
        <div>
          <div className="mb-4 is-flex is-flex-direction-row is-justify-content-center is-size-3 has-text-weight-bold is-text-center">
            Rooms
          </div>
          <div className="columns is-mobile is-centered is-multiline is-2">
            {roomSuggestion.map((room) => (
              <RoomCard
                room={room}
                key={room.room_id + `${Math.random() * 100}`}
              />
            ))}
          </div>
          <div className="mt-10 mb-4 is-flex is-flex-direction-row is-justify-content-center is-size-3 has-text-weight-bold is-text-center">
            Roommates
          </div>
          <div className="columns is-mobile is-centered is-multiline is-2">
            {roommateSuggestion.map((roommate) => (
              <RoommateCard
                roommate={roommate}
                key={roommate.username + `${Math.random() * 100}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;
