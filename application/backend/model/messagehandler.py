"""Importing necessary modules."""
import sys
import os
import json
import ast
from datetime import datetime

db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(db_dir)
sys.dont_write_bytecode = True
from db.database import Database


class MessageHandler:
    """This class use for massage connted to db."""

    def __init__(self):
        """Set db module in init."""
        self.dbinstall = Database()

    def check_chat_room_exist(self, user_a, user_b):
        """Check the userA have been talked userB"""
        sql = f"SELECT C.ChatRoomID FROM Test1.ChatRoom C \
                WHERE C.UserID1 = {user_a} and C.UserID2 = {user_b} \
                Union \
                SELECT C1.ChatRoomID FROM Test1.ChatRoom C1 \
                WHERE C1.UserID1 = {user_b} and C1.UserID2 = {user_a}"
        output = self.dbinstall.get_data(sql)
        if output == 0:  # no chat room between this two user
            return 0
        return output[0][0]  # return chat room id

    def add_chat_room(self, user_a, user_b):
        """Add chat room between two user and return chat id"""
        sql = f"INSERT INTO Test1.ChatRoom \
            (UserID1, UserID2) VALUES \
            ({user_a},{user_b});"
        self.dbinstall.add_data(sql)
        room_id = self.check_chat_room_exist(user_a, user_b)
        return room_id

    def add_message_to_db(self, sender, recipient_id, message, room_id):
        """Add message to db by given sender recipient."""
        today = datetime.now().strftime("%Y-%m-%d")
        sql = f"INSERT INTO Test1.Messages \
            (Sender, Recipient, Message, MessageTime, ChatRoom_ID) VALUES \
            ({sender},{recipient_id},'{message}','{today}',{room_id});"
        message = self.dbinstall.add_data(sql)
        return message

    def get_message(self, room_id):
        """Get messages from db by given Chat Room id."""
        sql = f"SELECT * FROM Test1.Messages M \
                WHERE M.ChatRoom_ID = {room_id};"

        data = self.dbinstall.get_data(sql)
        if data == 0:
            return {}
        messages = []
        for message in data:
            message_obj = {
                "message_id": message[0],
                "Sender_id": message[1],
                "Recipient": message[2],
                "Messgae": message[3],
                "MessageTime": str(message[4]),
                "ChatRoom_ID": message[5],
            }
            message_json = ast.literal_eval(json.dumps(message_obj))
            messages.append(message_json)
        return messages

    def get_all_chat_room(self, user_id):
        """Get all Logined user chat room."""
        sql = f"SELECT * FROM Test1.ChatRoom M \
                WHERE M.UserID1 = {user_id} or M.UserID2 = {user_id};"
        output = self.dbinstall.get_data(sql)
        if output == 0:
            return {}
        room_list = []
        room_obj = None
        for user in output:
            if user[1] == user_id:
                room_obj = {
                    "Roomid": user[0],
                    "Current_user": self.get_user_name(user[1]),
                    "User_id": user[2],
                    "User": self.get_user_name(user[2]),
                }
            elif user[2] == user_id:
                room_obj = {
                    "Roomid": user[0],
                    "Current_user": self.get_user_name(user[2]),
                    "User_id": user[1],
                    "User": self.get_user_name(user[1]),
                }
            room_json = ast.literal_eval(json.dumps(room_obj))
            room_list.append(room_json)
        return room_list

    def get_user_name(self, user_id):
        """Get user name by id."""
        sql = f"SELECT U.Name FROM Test1.Base_User U \
                WHERE UserID = {user_id};"
        output = self.dbinstall.get_data(sql)
        return output[0][0]
