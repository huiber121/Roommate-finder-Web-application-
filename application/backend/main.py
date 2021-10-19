"""Importing necessary modules"""
import sys
import logging
import os.path
from inspect import currentframe
from inspect import getframeinfo
from flask import Flask, make_response
from flask_cors import CORS
from datetime import timedelta
from flask import request, session
CONTROLLER_DIR = \
    os.path.abspath(os.path.join(os.path.dirname(__file__))) \
    + '/controller/'
sys.path.append(CONTROLLER_DIR)
sys.dont_write_bytecode = True
import roomscontroller
import userscontroller
import sessioncontroller


app = Flask(__name__)  # name of the module
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['DEBUG'] = True
CORS(app, resources={r"*": {'origins': r"*"}})
FRAOMEINFO = getframeinfo(currentframe())
app.secret_key = 'GATERROOM_SECRET_KEY'

LOGGER = logging.getLogger(__name__)

@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=10)

@app.route('/api/addUser', methods= ['POST'])
def add_user():
    """Endpoint to add users."""
    LOGGER.info(' Inside /api/addUser')
    message = userscontroller.add_user()
    return {"message":message}

@app.route('/api/login', methods= ['POST'])
def login():
    """Endpoint for user login."""
    LOGGER.info(' Inside /api/login')
    message = userscontroller.login()
    return {"message":message}

@app.route('/api/getRooms', methods=['POST'])
def get_rooms():
    """Endpoint to get all rooms for the given search conditions."""
    LOGGER.info(' Inside /api/getRooms')
    rooms_list = roomscontroller.get_all_rooms()    
    roomscontroller.get_all_rooms()
    return rooms_list
  
@app.route('/api/getRoommates', methods=['POST'])
def get_roommates():
    """Endpoint to get all rooms for the given search conditions."""
    LOGGER.info(' Inside /api/getRoommates')
    roommates_list = userscontroller.get_all_roommates()
    return roommates_list
    

@app.route('/api/logout', methods= ['POST'])
def logout():
    """Endpoint to logout."""
    LOGGER.info(' Inside /api/logout')
    session.pop('loginid',None)
    LOGGER.info('After popping '+str(session))
    return {"message":"Logged out successfully"}


if __name__ == '__main__':
    logging.basicConfig(filename='backend.log', level=logging.INFO)
    app.run('0.0.0.0', port=5000)
