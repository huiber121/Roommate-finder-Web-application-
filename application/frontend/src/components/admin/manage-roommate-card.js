import React from "react";

const ManageRoommateCard = ({ roommate, deleteRoommate }) => {
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
        <div className="is-flex is-flex-direction-row is-justify-content-flex-end">
          <button
            className="button is-danger"
            onClick={() => deleteRoommate(roommate)}
          >
            <span className="icon is-small mr-1">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </span>
            <span className="has-text-weight-semibold">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageRoommateCard;
