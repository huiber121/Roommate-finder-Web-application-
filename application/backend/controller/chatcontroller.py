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


def chat_message():
    """Send message to db."""
    checker = sessioncontroller.check_loggedin()
    if checker:
        sender = session["userid"]
        req_body = request.get_data()
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        recipient = rjson["recipient"]
        message = rjson["message"]
        chat = db_chat.add_message_to_db(sender, recipient, message)
        LOGGER.info("{%s} send Message to {%s}", sender, recipient)
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
        messages = db_chat.get_message(sender, recipient)
        LOGGER.info("Get all Message between {%s} and {%s}", sender, recipient)
        return json.dumps(messages)
    return "plase login"
