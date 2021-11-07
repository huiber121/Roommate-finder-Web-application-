import React, { useState, useEffect } from "react";
import NoRoomsFound from "../../../assets/images/no-rooms-found.png";
import axiosInstance from "../../../axios-config";
import ManageRoomCard from "../../../components/admin/manage-room-card";

const ManageRooms = () => {
  const [isLoading, setLoading] = useState(false);
  const [hasNotSearched, setNotSearched] = useState(true);
  const [roomData, setRoomData] = useState([]);

  const fetchData = async () => {
    setNotSearched(false);
    setLoading(true);
    const data = await axiosInstance.post(`/api/getRooms`, { location: "" });
    // console.log(data.data);
    setRoomData(data.data);
    setLoading(false);
  };

  const deleteRoom = async (room) => {
    const result = await axiosInstance.delete(
      `/api/deleteRoom?RoomID=${room.room_id}`
    );
    console.log(result);
    if (result.status === 200) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
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
              <ManageRoomCard
                room={room}
                key={room.roomid}
                deleteRoom={(room) => deleteRoom(room)}
              />
            ))
          ) : roomData.length === 0 && hasNotSearched ? (
            <div>
              <img src={NoRoomsFound} className="mt-5 mb-3" />
              <div className="has-text-success has-text-centered has-text-weight-semibold is-size-5">
                Enter a Location or ZipCode to Search.
              </div>
            </div>
          ) : (
            <div>
              <img src={NoRoomsFound} className="mt-5 mb-3" />
              <div className="has-text-danger has-text-centered	 has-text-weight-semibold is-size-5">
                No Rooms found. Please update your search preferences.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageRooms;
