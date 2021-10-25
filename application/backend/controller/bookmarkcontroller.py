import json
import ast
import sys
import os.path
import logging
sys.dont_write_bytecode = True
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(db_dir)
from flask import render_template, request,session
from model.bookmarkhandler import bookmarkhandler
import sessioncontroller
from model.roomhandler import roomhandler
LOGGER = logging.getLogger(__name__)


bookmark_modle = bookmarkhandler()
def room_bookmark():
    checker=sessioncontroller.check_loggedin()
    if(checker):
        id = session["userid"]
        req_body = request.get_data()
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        roomid = rjson["RoomID"]
        checkdup=bookmark_modle.check_dup_roombookmark(id,roomid)
        if(checkdup == 0):
            message = bookmark_modle.add_love_room(id,roomid)
            LOGGER.info(f'Add Room bookmark  room id: {roomid} to userid {id}')
            return message
        else:
            return "Duplicate bookmark"
    else:
        return "please login"

def delete_room_bookmark():
    checker=sessioncontroller.check_loggedin()
    if(checker):
        id = session["userid"]
        req_body = request.get_data()
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        roomid = rjson["RoomID"]
        message = bookmark_modle.delete_love_room(id,roomid)
        LOGGER.info(f'Delete  userid {id} Room bookmark  room id: {roomid}')
        return message

    else:
        return "please login"
def show_all_bookmark_rooms():
    checker=sessioncontroller.check_loggedin()
    getroom = roomhandler()
    if(checker):
        id = session["userid"]
        boommark_room=bookmark_modle.get_all_roomBookmark(id)
        bookmark_room_list=[]
        for roomid in boommark_room:
            bookmark_room_list.append(getroom.show_room(roomid))
        return json.dumps(bookmark_room_list) 

    else:
        return "please login"




def user_bookmark():
    checker=sessioncontroller.check_loggedin()
    if(checker):
        id = session["userid"]
        req_body = request.get_data()
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        bookmarked_userid = rjson["userid"]
        checkdup=bookmark_modle.check_dup_userbookmark(id,bookmarked_userid)
        if(checkdup == 0):
            message = bookmark_modle.add_love_user(id,bookmarked_userid)
            LOGGER.info(f'Add User bookmark  bookmarked_userid: {bookmarked_userid} to userid {id}')
            return message
        else:
            return "Duplicate bookmark"
    else:
        return "please login"

def delete_user_bookmark():
    checker=sessioncontroller.check_loggedin()
    if(checker):
        id = session["userid"]
        req_body = request.get_data()
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        bookmarked_userid = rjson["userid"]
        message = bookmark_modle.delete_love_user(id,bookmarked_userid)
        LOGGER.info(f'Delete Userid{id} user bookmark  bookmarked_userid: {bookmarked_userid}')
        return message

    else:
        return "please login"


##TODO show all bookmark user info




    