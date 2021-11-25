import React from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios-config";

const RoommateCard = ({ roommate }) => {
  const bookmarkRoommate = async (roommate) => {
    const data = await axiosInstance.post(
      `${process.env.REACT_APP_HOST_BASE}/api/bookmarkUser`,
      {
        userid: roommate.userid,
      },
      { withCredentials: true }
    );
    console.log(data);
  };

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
          <Link to={`/message-room/${roommate.userid}`}>
            <button className="button mr-2 has-background-success has-text-white">
              <span className="icon is-small">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: "1.2rem", width: "1.2rem" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </span>
            </button>
          </Link>
          <button
            className="button is-pulled-right"
            onClick={() => bookmarkRoommate(roommate)}
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

export default RoommateCard;
