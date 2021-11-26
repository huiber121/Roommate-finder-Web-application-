"""Importing necessary modules."""
import json
import ast
import sys
import os.path
import logging
from flask import request, session

sys.dont_write_bytecode = True
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(db_dir)
from model.roomhandler import RoomHandler
from model.bookmarkhandler import BookMarkHandler
import sessioncontroller

LOGGER = logging.getLogger(__name__)
bookmark_modle = BookMarkHandler()


def room_bookmark():
    """This Method is add room bookmark."""
    checker = sessioncontroller.check_loggedin()
    if checker:
        user_id = session["userid"]
        req_body = request.get_data()
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        roomid = rjson["RoomID"]
        checkdup = bookmark_modle.check_dup_roombookmark(user_id, roomid)
        if checkdup == 0:
            message = bookmark_modle.add_love_room(user_id, roomid)
            LOGGER.info(
                "Add Room bookmark  room id: {%s} to userid {%s}", roomid, user_id
            )
            return message
        return "Duplicate bookmark"
    return "please login"


def delete_room_bookmark():
    """This Method is delete room bookmark."""
    checker = sessioncontroller.check_loggedin()
    if checker:
        user_id = session["userid"]
        req_body = request.get_data()
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        roomid = rjson["RoomID"]
        message = bookmark_modle.delete_love_room(user_id, roomid)
        LOGGER.info("Delete  userid{%s} Room bookmark  room id: {%s}", user_id, roomid)
        return message
    return "please login"


def show_all_bookmark_rooms():
    """This Method is show all room bookmark."""
    checker = sessioncontroller.check_loggedin()
    get_room = RoomHandler()
    if checker:
        user_id = session["userid"]
        boommark_room = bookmark_modle.get_all_roombookmark(user_id)
        bookmark_room_list = []
        if boommark_room == 0:
            return {}
        for roomid in boommark_room:
            bookmark_room_list.append(get_room.show_room(roomid))
        return json.dumps(bookmark_room_list)
    return "please login"


def user_bookmark():
    """This Method is add user bookmark."""
    checker = sessioncontroller.check_loggedin()
    if checker:
        user_id = session["userid"]
        req_body = request.get_data()
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        bookmarked_userid = rjson["userid"]
        checkdup = bookmark_modle.check_dup_userbookmark(user_id, bookmarked_userid)
        if checkdup == 0:
            message = bookmark_modle.add_love_user(user_id, bookmarked_userid)
            LOGGER.info(
                "Add bookmarked_userid: {%s} to userid {%s}", bookmarked_userid, user_id
            )
            return message
        return "Duplicate bookmark"
    return "please login"


def delete_user_bookmark():
    """This Method is delete room bookmark."""
    checker = sessioncontroller.check_loggedin()
    if checker:
        user_id = session["userid"]
        req_body = request.get_data()
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        bookmarked_userid = rjson["userid"]
        message = bookmark_modle.delete_love_user(user_id, bookmarked_userid)
        LOGGER.info(
            "Delete Userid {%s} user bookmark  bookmarked_userid: {%s}",
            user_id,
            bookmarked_userid,
        )
        return message
    return "please login"

def show_all_bookmark_users():
    """This Method is show all room bookmark."""
    checker = sessioncontroller.check_loggedin()
    if checker:
        user_id = session["userid"]
        boommark_users = bookmark_modle.get_all_userbookmark(user_id)
        bookmark_users_list = []
        if boommark_users == 0:
            return {}
        for user in boommark_users:
            user_info = bookmark_modle.get_user_profile(user)[0]
            user_type = user_info[8]
            roommate_json = None
            if user_type == 'student':
                roommate_json = {
                    'userid': user_info[0],
                    'username': user_info[3],
                    'type': user_info[8],
                    'userscore': user_info[6],
                    'age': int(user_info[4]),
                    'gender': user_info[7],
                    'gradlevel': user_info[13],
                    'major': user_info[12],
                    'school': user_info[14],
                    'school_zipcode': user_info[15],
                    }

            if user_type == 'professor':
                roommate_json = {
                    'userid': user_info[0],
                    'username': user_info[3],
                    'age': user_info[4],
                    'gender': user_info[7],
                    'userscore': user_info[6],
                    'joblocation': user_info[18],
                    'job_location': user_info[17],
                    'type': 'professor',
                    }
            rjson = ast.literal_eval(json.dumps(roommate_json))
            bookmark_users_list.append(rjson)
        return json.dumps(bookmark_users_list)
    return "please login"

