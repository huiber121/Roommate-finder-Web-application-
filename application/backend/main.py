"""Flask module"""
from inspect import currentframe
from inspect import getframeinfo
from flask import Flask
from flask_cors import CORS
"""Rooms module"""
import rooms
import logging

app = Flask(__name__)  # name of the module
app.config["CORS_HEADERS"] = "Content-Type"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
CORS(app, resources={r"*": {"origins": "*"}})
frameinfo = getframeinfo(currentframe())
LOGGER = logging.getLogger(__name__)


@app.route("/api/getRooms", methods=["POST"])
def get_rooms():
    """Endpoint to get all rooms for the given search conditions."""
    LOGGER.info(" Inside /api/getRooms")
    rooms_list = rooms.get_all_rooms()
    return rooms_list



if __name__ == "__main__":
    logging.basicConfig(filename='logs/backend.log',level=logging.INFO)
    app.run("0.0.0.0", port=5000)



# """Flask module"""
# from inspect import currentframe
# from inspect import getframeinfo
# from flask import Flask
# from flask_cors import CORS
# """Rooms module"""
# import rooms

# app = Flask(__name__)  # name of the module
# app.config["CORS_HEADERS"] = "Content-Type"
# CORS(app, resources={r"*": {"origins": "*"}})
# frameinfo = getframeinfo(currentframe())

# @app.route("/api/getRooms", methods=["POST"])
# def get_rooms():
#     """Endpoint to get all rooms for the given search conditions."""
#     print("Inside /api/getRooms")
#     rooms_list = rooms.get_all_rooms()
#     return rooms_list



# if __name__ == "__main__":
#     app.run("0.0.0.0", port=5000)