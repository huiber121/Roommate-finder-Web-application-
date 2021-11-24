"""Importing necessary modules"""

import json
import ast
import logging
from flask import request, session
import sessioncontroller
import roomscontroller
import userscontroller
from db.database import Database

DBINSTANCE = Database()
LOGGER = logging.getLogger(__name__)


def add_user_preference():
    """This method creates a new session for that particular username."""

    loggedin = sessioncontroller.check_loggedin()
    if loggedin:
    
        # Getting the JSON from request
        req_body = request.get_data()
        body = json.loads(req_body)
        LOGGER.info("body ",body)
        uijson = ast.literal_eval(json.dumps(body))
        jsonstr = str(uijson).replace("'", '"')
        # Adding room preference
        if uijson['preftype'] == 'room':
            resultmsg = ''
            # Check if user exists in table
            checksql = 'SELECT UserID FROM Test1.Preferences where UserID = '+str(session['userid'])+';'
            result = DBINSTANCE.get_data(checksql)
            if result != 0:
                # If yes, update the room preference
                if result[0][0] == session['userid']:
                    roomprefsql = \
                        "UPDATE Preferences SET roompreference='" \
                        + jsonstr + "' where UserId=" \
                        + str(session['userid']) + ';'
                    LOGGER.info('SQL to update room preference if user is in table{}'.format(roomprefsql))
                    resultmsg = \
                        DBINSTANCE.update_data(roomprefsql)
            else:
                # If not, inserting a new row with userid & the room preference
                addroompref = \
                    'INSERT INTO Preferences (`UserID`, `roompreference`) VALUES (' \
                    + str(session['userid']) + ", '" + jsonstr + "');"
                LOGGER.info('SQL to add room preference if user is not in table{}'.format(addroompref))
                resultmsg = DBINSTANCE.add_data(addroompref)
            return resultmsg
        elif uijson['preftype'] == 'roommate':
        # Adding roommate preference
            resultmsg = ''
            # Check if user exists in table
            checksql = 'SELECT UserID FROM Test1.Preferences where UserID = '+str(session['userid'])+';'
            result = DBINSTANCE.get_data(checksql)
            if result != 0:
                # If yes, update the roommate preference
                if result[0][0] == session['userid']:
                        roommateprefsql = \
                            "UPDATE Preferences SET roommatepreference='" \
                            + jsonstr + "' where UserId=" \
                            + str(session['userid']) + ';'
                        LOGGER.info('SQL to update room preference if user is in table{} '.format(roommateprefsql))
                        resultmsg = \
                            DBINSTANCE.update_data(roommateprefsql)
            else:
                # If not, inserting a new row with userid & the roommate preference
                addroommatepref = \
                    'INSERT INTO Preferences (`UserID`, `roommatepreference`) VALUES (' \
                    + str(session['userid']) + ", '" + jsonstr + "');"
                LOGGER.info('SQL to add room preference if user is not in table {}'.format(addroommatepref))
                resultmsg = DBINSTANCE.add_data(addroommatepref)
            return resultmsg
    else:
        return 'please login'


def get_all_notifications():
    """This method gets data needed for notificarion."""

    loggedin = sessioncontroller.check_loggedin()
    if loggedin:
        # Constructing sql to get the room preference of user
        roomprefesql = \
            'SELECT roompreference FROM Test1.Preferences where UserId=' \
            + str(session['userid']) + ';'
        result = DBINSTANCE.get_data(roomprefesql)
        # As the result is a string, we need to convert it to dict/json
        roomsearchjson = json.loads(result[0][0])
        # Calling the search API
        preflist = roomscontroller.get_all_rooms(roomsearchjson)
        preflist = json.loads(preflist)
        # Constructing sql to get the roommate preference of user
        roommateprefesql = \
            'SELECT roommatepreference FROM Test1.Preferences where UserId=' \
            + str(session['userid']) + ';'
        roommatejson = DBINSTANCE.get_data(roommateprefesql)
        # As the result is a string, we need to convert it to dict/json
        roommatesearchjson = json.loads(roommatejson[0][0])
        print(roommatesearchjson)
        roommatelist = \
            userscontroller.get_all_roommates(roommatesearchjson)
        userlist = json.loads(roommatelist)
        for i in userlist:
            preflist.append(i)
        return json.dumps(preflist)
    else:
        return 'please login'
