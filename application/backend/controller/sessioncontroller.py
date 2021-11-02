"""Importing necessary modules"""
import json
import ast
import logging
from flask import request, session

LOGGER = logging.getLogger(__name__)

def create_session(userid):
    """This method creates a new session for that particular username."""
    
    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    session['loginid'] = uijson['loginid']
    session['userid'] = userid
    LOGGER.info (' In create_session {}'.format(str(session)))


def check_loggedin():
    """This method validates if the session for that user exists or not."""

    check = False
    LOGGER.info (' Inside check_loggedin {}'.format(str(session)))
    if 'loginid' in session:
        username = session['loginid']
        LOGGER.info(' '+username + ' exists')
        check = True
    else:
        LOGGER.info(' Anonymous user ')
        check = False
    LOGGER.info(' Before return '.format(check))
    return check
