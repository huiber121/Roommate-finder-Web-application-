"""Importing necessary modules"""

import sys
import logging
import os.path
from inspect import currentframe
from inspect import getframeinfo
from flask import Flask
from flask_cors import CORS
from datetime import timedelta
from flask import session

CONTROLLER_DIR = (
    os.path.abspath(os.path.join(os.path.dirname(__file__))) + "/controller/"
)
sys.path.append(CONTROLLER_DIR)
sys.dont_write_bytecode = True
import roomscontroller
import userscontroller
import sessioncontroller
import bookmarkcontroller
import chatcontroller

app = Flask(__name__)  # name of the module
app.config["CORS_HEADERS"] = "Content-Type"
app.config["DEBUG"] = True
CORS(
    app,
    resources={r"*": {"origins": r"*"}},
    headers=["Content-Type"],
    expose_headers=["Access-Control-Allow-Origin"],
    supports_credentials=True,
)
FRAOMEINFO = getframeinfo(currentframe())
app.secret_key = "GATERROOM_SECRET_KEY"
LOGGER = logging.getLogger(__name__)


@app.before_request
def make_session_permanent():
    """Make session permanent."""

    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=1440)


# User


@app.route("/api/addUser", methods=["POST"])
def add_user():
    """Endpoint to add users."""

    LOGGER.info(" Inside /api/addUser")
    message = userscontroller.add_user()
    return {"message": message}


@app.route("/api/login", methods=["POST"])
def login():
    """Endpoint for user login."""

    LOGGER.info(" Inside /api/login")
    response = userscontroller.login()
    return response


@app.route("/api/getProfile", methods=["POST"])
def get_profile():
    """Endpoint to get user profile for the given id."""

    LOGGER.info(" Inside /api/getProfile")
    user_profile = userscontroller.get_user_profile()
    return user_profile


@app.route("/api/logout", methods=["POST"])
def logout():
    """Endpoint to logout."""

    LOGGER.info(" Inside /api/logout")
    session.pop("loginid", None)
    LOGGER.info("After popping {%s}", session)
    return {"message": "Logged out successfully"}


@app.route("/api/deleteUser", methods=["DELETE"])
def delete_user():
    """Endpoint to delete user."""

    LOGGER.info(" Inside /api/deleteUser")
    message = userscontroller.user_delete()
    return {"message": message}


# Search


@app.route("/api/getRooms", methods=["POST"])
def get_rooms():
    """Endpoint to get all rooms for the given search conditions."""

    LOGGER.info(" Inside /api/getRooms")
    rooms_list = roomscontroller.get_all_rooms()
    return rooms_list


@app.route("/api/getRoommates", methods=["POST"])
def get_roommates():
    """Endpoint to get all rooms for the given search conditions."""

    LOGGER.info(" Inside /api/getRoommates")
    roommates_list = userscontroller.get_all_roommates()
    return roommates_list


# Room


@app.route("/api/addRoom", methods=["POST"])
def add_room():
    """Endpoint to add room."""

    LOGGER.info(" Inside /api/addRoom")
    message = roomscontroller.add_room()
    return {"message": message}


@app.route("/api/deleteRoom", methods=["DELETE"])
def delete_room():
    """Endpoint to delete room."""

    LOGGER.info("Inside /api/deleteRoom")
    message = roomscontroller.delete_room()
    return {"message": message}


@app.route("/api/updateRoom", methods=["PUT"])
def update_room():
    """Endpoint to update room."""

    LOGGER.info("Inside /api/updateRoom")
    output = roomscontroller.update_a_room()
    return {"message": output}


@app.route("/api/deleteOnepic", methods=["DELETE"])
def delete_one_pic():
    """Endpoint to delete a delete a files."""

    LOGGER.info("Inside /api/deleteOnepic")
    message = roomscontroller.delete_one_media()
    return {"message": message}


@app.route("/api/showRoom", methods=["GET"])
def show_room():
    """Endpoint to show a room."""

    LOGGER.info("Inside /api/showRoom")
    output = roomscontroller.show_a_room()
    return output


@app.route("/api/getuserRooms", methods=["GET"])
def get_user_rooms():
    """Endpoint to get user's rooms."""

    LOGGER.info("Inside /api/getuserRooms")
    output = roomscontroller.show_user_room()
    return output


# Bookmark


@app.route("/api/bookmarkRoom", methods=["POST"])
def bookmark_room():
    """Endpoint to bookmark room."""

    LOGGER.info("Inside /api/bookmarkRoom")
    message = bookmarkcontroller.room_bookmark()
    return {"message": message}


@app.route("/api/deletebookmarkRoom", methods=["DELETE"])
def delete_bookmark_room():
    """Endpoint to delete room bookmark."""

    LOGGER.info("Inside /api/deletebookmarkRoom")
    message = bookmarkcontroller.delete_room_bookmark()
    return {"message": message}


@app.route("/api/bookmarkUser", methods=["POST"])
def bookmark_user():
    """Endpoint to bookmark user."""

    LOGGER.info("Inside /api/bookmarkUser")
    message = bookmarkcontroller.user_bookmark()
    return {"message": message}


@app.route("/api/deletebookmarkUser", methods=["DELETE"])
def delete_bookmark_user():
    """Endpoint to user bookmark."""

    LOGGER.info("Inside /api/deletebookmarkUser")
    message = bookmarkcontroller.delete_user_bookmark()
    return {"message": message}


@app.route("/api/showAllRoomBookmark", methods=["GET"])
def show_all_room_bookmark():
    """Endpoint to show all room bookmark."""

    LOGGER.info("Inside /api/showAllRoomBookmark")
    message = bookmarkcontroller.show_all_bookmark_rooms()
    return message


# chat
@app.route("/api/sendMessage", methods=["POST"])
def send_message():
    """Endpoint to send message."""
    LOGGER.info("Inside /api/sendMessage")
    chat = chatcontroller.send_message()
    return {"message ": chat}


@app.route("/api/getMessages", methods=["GET"])
def get_messages():
    """Endpoint to get message."""
    LOGGER.info("Inside /api/getMessage")
    chat = chatcontroller.get_message()
    return chat


@app.route("/api/getChatRoom", methods=["GET"])
def get_chat_room():
    """Endpoint to get chat Room."""
    LOGGER.info("Inside /api/getChatRoom")
    chat_room = chatcontroller.get_all_chat_room()
    return chat_room


if __name__ == "__main__":
    logging.basicConfig(filename="backend.log", level=logging.INFO)
    app.run("0.0.0.0", port=5000)
