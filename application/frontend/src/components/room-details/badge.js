import React from "react";
import "./badge.css";

const RoomBadge = ({ roomTag }) => {
  switch (roomTag) {
    case "no smoking":
      return (
        <div className="column has-text-centered has-background-danger has-text-white badge has-text-weight-semibold">
          No Smoking
        </div>
      );
    case "yes smoking":
      return (
        <div className="column has-text-centered has-background-success has-text-white badge has-text-weight-semibold">
          Smoking Friendly
        </div>
      );
    case "no pets":
      return (
        <div className="column has-text-centered has-background-danger has-text-white badge has-text-weight-semibold">
          No Pets
        </div>
      );
    case "yes pets":
      return (
        <div className="column has-text-centered has-background-success has-text-white badge has-text-weight-semibold">
          Pet Friendly
        </div>
      );
    case "no parking availability":
      return (
        <div className="column has-text-centered has-background-danger has-text-white badge has-text-weight-semibold">
          No Parking
        </div>
      );
    case "yes parking availability":
      return (
        <div className="column has-text-centered has-background-success has-text-white badge has-text-weight-semibold">
          Parking Available{" "}
        </div>
      );
    case "no college oriented":
      return (
        <div className="column has-text-centered has-background-danger has-text-white badge has-text-weight-semibold">
          Not College Oriented
        </div>
      );
    case "yes college oriented":
      return (
        <div className="column has-text-centered has-background-success has-text-white badge has-text-weight-semibold">
          College Oriented
        </div>
      );
    case "yes disability friendly":
      return (
        <div className="column has-text-centered has-background-success has-text-white badge has-text-weight-semibold">
          Disability Friendly
        </div>
      );
    case "no disability friendly":
      return (
        <div className="column has-text-centered has-background-danger has-text-white badge has-text-weight-semibold">
          Not Disability Friendly
        </div>
      );
    case "no negotiable":
      return (
        <div className="column has-text-centered has-background-danger has-text-white badge has-text-weight-semibold">
          Rent Not Negotiable
        </div>
      );
    case "yes negotiable":
      return (
        <div className="column has-text-centered has-background-success has-text-white badge has-text-weight-semibold">
          Rent Negotiable
        </div>
      );
    case "yes private restroom":
      return (
        <div className="column has-text-centered has-background-success has-text-white badge has-text-weight-semibold">
          Private Restroom
        </div>
      );
    case "no private restroom":
      return (
        <div className="column has-text-centered has-background-danger has-text-white badge has-text-weight-semibold">
          No Private Restroom
        </div>
      );
    default:
      break;
  }
};

export default RoomBadge;
