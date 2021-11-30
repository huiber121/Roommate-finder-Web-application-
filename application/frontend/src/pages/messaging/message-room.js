import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios-config";

const MessageRoom = () => {
  const { id } = useParams();
  const [chat, setChat] = useState([]);
  const [userName, setUserName] = useState("");

  const fetchMessages = async () => {
    console.log(id);
    const data = await axiosInstance.post(
      `${process.env.REACT_APP_HOST_BASE}/api/getMessages`,
      { recipient: id },
      { withCredentials: true }
    );
    console.log(data);
    if (data.status == 200) {
      setChat(data.data);
    }
  };

  const fetchRoomName = async () => {
    const data = await axiosInstance.get(
      `${process.env.REACT_APP_HOST_BASE}/api/getChatRoom`,
      {
        withCredentials: true,
      }
    );
    if (data.data) {
      console.log(data.data);
      const user = data.data.find((room) => room.User_id == id);
      if (user) {
        setUserName(user.User);
      } else {
        setUserName("Chat");
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchMessages();
      fetchRoomName();
    }
  }, []);

  const sendMessage = async (message) => {
    const data = await axiosInstance.post(
      `${process.env.REACT_APP_HOST_BASE}/api/sendMessage`,
      { recipient: id, message: message },
      { withCredentials: true }
    );
    console.log(data);
    fetchMessages();
  };

  return (
    <section className="hero">
      <div className="hero-head">
        <header className="hero is-link is-bold">
          <div className="hero-body">
            <div className="container">
              <p className="title">{userName}</p>
              <p className="subtitle"></p>
            </div>
          </div>
        </header>
      </div>

      <div className="hero-body">
        <Messages chat={chat} id={id} />
      </div>

      <div className="hero-foot">
        <footer className="section is-small">
          <Chat sendMessage={(message) => sendMessage(message)} />
        </footer>
      </div>
    </section>
  );
};

const Chat = ({ sendMessage }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      sendMessage(e.target.elements.userInput.value);
      e.target.reset();
    }}
  >
    <div className="field has-addons">
      <div className="control is-expanded">
        <input
          className="input"
          name="userInput"
          type="text"
          placeholder="Type your message"
        />
      </div>
      <div className="control">
        <button className="button is-info">Send</button>
      </div>
    </div>
  </form>
);

const Messages = ({ chat, id }) => (
  <div style={{ heigth: "100%", width: "100%" }}>
    {chat.length > 0
      ? chat.map((m, i) => {
          const msgClass = m.Sender_id == id;
          return (
            <p
              style={{
                padding: ".25em",
                textAlign: msgClass ? "left" : "right",
                overflowWrap: "normal",
              }}
            >
              <span
                key={m.message_id}
                className={`tag is-medium ${
                  msgClass ? "is-success" : "is-info"
                }`}
              >
                {m.Messgae}
              </span>
            </p>
          );
        })
      : null}
  </div>
);

export default MessageRoom;
