"""Flask module"""
from inspect import currentframe
from inspect import getframeinfo
from flask import Flask
from flask_cors import CORS
from flask_session import Session
"""Rooms module"""
import rooms

app = Flask(__name__)  # name of the module
app.config["CORS_HEADERS"] = "Content-Type"
CORS(app, resources={r"*": {"origins": "*"}})
frameinfo = getframeinfo(currentframe())

@app.route("/api/getRooms", methods=["POST"])
def get_rooms():
    """Endpoint to get all rooms for the given search conditions."""
    print("Inside /api/getRooms")
    rooms_list = rooms.get_all_rooms()
    return rooms_list



if __name__ == "__main__":
    app.run("0.0.0.0", port=5000)
