import React from "react";
import RoomPlaceholder from "../../assets/images/room-placeholder.png";

const RoomCard = ({ room }) => {
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
      </div>
    </div>
  );
};

export default RoomCard;
