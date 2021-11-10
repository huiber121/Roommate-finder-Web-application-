"""Importing necessary modules"""
import logging
import sys
import os
import ast
import json
from flask import request, session

sys.dont_write_bytecode = True
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(db_dir)
from model.messagehandler import MessageHandler
import sessioncontroller

LOGGER = logging.getLogger(__name__)
db_chat = MessageHandler()


def send_message():
    """Send message to db."""
    checker = sessioncontroller.check_loggedin()
    if checker:
        sender = session["userid"]
        req_body = request.get_data()
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        recipient = rjson["recipient"]
        message = rjson["message"]
        room_id = db_chat.check_chat_room_exist(sender, recipient)
        if room_id == 0:
            room_id = db_chat.add_chat_room(sender, recipient)
        if room_id == 0:
            LOGGER.error("Some error in adding chatRoom to db")
            return "Some error in adding db"
        chat = db_chat.add_message_to_db(sender, recipient, message, room_id)
        LOGGER.info(
            "{%s} send Message to {%s} in room_id {%s}", sender, recipient, room_id
        )
        return chat
    return "please login"


def get_message():
    """Get all messages by given recipient id, order by message#id desc."""
    checker = sessioncontroller.check_loggedin()
    if checker:
        sender = session["userid"]
        req_body = request.get_data()
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        recipient = rjson["recipient"]
        room_id = db_chat.check_chat_room_exist(sender, recipient)
        messages = db_chat.get_message(room_id)
        LOGGER.info(
            "Get all Message between {%s} and {%s} in room {%s}",
            sender,
            recipient,
            room_id,
        )
        return json.dumps(messages)
    return "plase login"


def get_all_chat_room():
    """Get all chat room."""
    checker = sessioncontroller.check_loggedin()
    if checker:
        current_user = session["userid"]
        output = db_chat.get_all_chat_room(current_user)
        return json.dumps(output)
    return "plase login"
