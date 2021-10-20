"""Importing necessary modules"""
import json
import ast
import sys
import os.path
import logging
sys.dont_write_bytecode = True
DB_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) \
    + '/backend/db/'
sys.path.append(DB_DIR)
sys.dont_write_bytecode = True
from flask import request, session

LOGGER = logging.getLogger(__name__)

def create_session():
    """This method creates a new session for that particular username."""
    
    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    session['loginid'] = uijson['loginid']
    LOGGER.info ( 'In create_session ' +str(session))


def check_loggedin():
    """This method validates if the session for that user exists or not."""

    check = False
    LOGGER.info (' Inside check_loggedin ' + str(session))
    if 'loginid' in session:
        username = session['loginid']
        LOGGER.info(' '+username + ' exists')
        check = True
    else:
        LOGGER.info(' Anonymous user ')
        check = False
    LOGGER.info(' Before return ' + str(check))
    return check
