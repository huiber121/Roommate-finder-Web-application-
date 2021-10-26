import axios from "axios";
import React from "react";
import RoomPlaceholder from "../../assets/images/room-placeholder.png";

const RoomCard = ({ room }) => {
  const bookmarkRoom = async (room) => {
    console.log(room);
    const data = await axios.post(
      `${process.env.REACT_APP_HOST_BASE}/api/bookmarkRoom`,
      { RoomID: room.room_id },
      { withCredentials: true }
    );
    console.log(data);
  };

  return (
    <div className="m-3 column is-fullscreen-mobile is-half-tablet is-one-quarter-desktop card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={room.roommedia[0] ? room.roommedia[0] : RoomPlaceholder}
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media mb-4">
          <div className="media-content">
            <p className="title is-4">{room.location}</p>
            <p className="subtitle is-6">Zipcode: {room.zipcode}</p>
          </div>
        </div>
        <div className="is-size-5 has-text-weight-bold mb-1">
          Rent: ${room.price}
        </div>
        <div className="is-size-6 has-text-weight-semibold">
          {room.numbedrooms}Bed / {room.numbathrooms}Bath
        </div>
        <div className="content">{room.description}</div>
        <div className="is-flex is-flex-direction-row is-justify-content-flex-end">
          <button
            className="button is-pulled-right"
            onClick={() => bookmarkRoom(room)}
          >
            <span className="icon is-small">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ height: "1.25rem", width: "1.25rem" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
