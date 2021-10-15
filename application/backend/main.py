"""Importing necessary module"""
import sys
import logging
import os.path
from inspect import currentframe
from inspect import getframeinfo
from flask import Flask
from flask_cors import CORS
CONTROLLER_DIR = \
    os.path.abspath(os.path.join(os.path.dirname(__file__))) \
    + '/controller/'
sys.path.append(CONTROLLER_DIR)
sys.dont_write_bytecode = True
import roomscontroller
import userscontroller


APP = Flask(__name__)  # name of the module
APP.secret_key="mysecret"
APP.config['CORS_HEADERS'] = 'Content-Type'
CORS(APP, resources={r"*": {'origins': r"*"}})
FRAOMEINFO = getframeinfo(currentframe())
LOGGER = logging.getLogger(__name__)


@APP.route('/api/getRooms', methods=['POST'])
def get_rooms():
    """Endpoint to get all rooms for the given search conditions."""
    LOGGER.info(' Inside /api/getRooms')
    rooms_list = roomscontroller.get_all_rooms()
    return rooms_list


@APP.route('/api/getRoommates', methods=['POST'])
def get_roommates():
    """Endpoint to get all rooms for the given search conditions."""
    LOGGER.info('Inside /api/getRoommates')
    roommates_list = userscontroller.get_all_roommates()
    return roommates_list

if __name__ == '__main__':
    logging.basicConfig(filename='backend.log', level=logging.INFO)
    APP.run('0.0.0.0', port=5000)
    APP.run(debug=True)
