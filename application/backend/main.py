"""Flask module"""
from inspect import currentframe
from inspect import getframeinfo
from flask import Flask
from flask_cors import CORS
import rooms
import logging

APP = Flask(__name__)  # name of the module
APP.config['CORS_HEADERS'] = 'Content-Type'
APP.config['SESSION_PERMANENT'] = False
APP.config['SESSION_TYPE'] = 'filesystem'
CORS(APP, resources={r"*": {'origins': r"*"}})
frameinfo = getframeinfo(currentframe())
LOGGER = logging.getLogger(__name__)


@APP.route('/api/getRooms', methods=['POST'])
def get_rooms():
    """Endpoint to get all rooms for the given search conditions."""

    LOGGER.info(' Inside /api/getRooms')
    rooms_list = rooms.get_all_rooms()
    return rooms_list

if __name__ == '__main__':
    logging.basicConfig(filename='backend.log', level=logging.ERROR)
    APP.run('0.0.0.0', port=5000)
    APP.run(debug=True)
