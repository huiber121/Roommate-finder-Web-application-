import React from "react";

const RoommateCard = ({ roommate }) => {
  console.log(roommate);
  return (
    <div className="m-3 column is-fullscreen-mobile is-half-tablet is-one-quarter-desktop card">
      <div className="card-content">
        <div className="media mb-4">
          <div className="media-content">
            <p className="title is-4">{roommate?.username ?? ""}</p>
            <p className="subtitle is-6">Gender: {roommate?.gender ?? ""}</p>
          </div>
        </div>
        <div className="is-size-5 has-text-weight-bold mb-1">
          Type:{" "}
          {`${roommate?.type}`.charAt(0).toUpperCase() +
            `${roommate?.type}`.slice(1) ?? ""}
        </div>
        {roommate?.type === "student" ? (
          <div className="is-size-6 has-text-weight-semibold">
            {roommate.school} - {roommate.major} {roommate.gradlevel}
          </div>
        ) : (
          <div className="is-size-6 has-text-weight-semibold">
            {roommate?.joblocation ?? ""} - {roommate?.zipcode ?? ""}
          </div>
        )}
        <div className="content">User Score - {roommate?.userscore ?? ""}</div>
      </div>
    </div>
  );
};

export default RoommateCard;
