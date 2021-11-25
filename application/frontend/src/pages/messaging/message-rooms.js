import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios-config";

const MessageRooms = () => {
  const [isLoading, setLoading] = useState(true);
  const [chatData, setChatData] = useState([]);

  const fetchChatRooms = async () => {
    const data = await axiosInstance.get(
      `${process.env.REACT_APP_HOST_BASE}/api/getChatRoom`,
      {
        withCredentials: true,
      }
    );

    if (data.data) {
      console.log(data.data);
      setChatData(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <div>
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered">
          <h1 className="is-size-1 has-text-weight-bold">Messages</h1>
          <h5 className="is-size-5 has-text-weight-bold">
            Here are all the people that you have messaged before.
          </h5>
        </div>
      </div>
      {isLoading ? (
        <div className="columns is-centered mt-5">
          <div className="column">
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
          </div>
        </div>
      ) : null}
      {chatData.length > 0 && !isLoading ? (
        <div className="columns is-mobile is-centered is-gapless">
          {chatData.map((chat) => (
            <div
              key={chat.Roomid}
              className="column is-11-mobile is-three-quarters-tablet is-three-quarters-desktop"
            >
              <Link to={`/message-room/${chat.User_id}`}>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <div className="is-flex is-flex-direction-row is-align-items-center">
                        <span className="icon is-large">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ height: "2rem", width: "2rem" }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        <p className="ml-5 is-size-4 has-text-weight-bold">
                          {chat.User}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : chatData.length == 0 && !isLoading ? (
        <div className="columns is-mobile is-centered is-gapless">
          <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered">
            <h4 className="is-size-4 has-text-weight-bold p-4 has-text-danger">
              No Messages found.
            </h4>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MessageRooms;
