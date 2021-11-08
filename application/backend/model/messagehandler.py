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

    def add_message_to_db(self, sender, recipient_id, message):
        """Add message to db by given sender recipient."""
        today = datetime.now().strftime("%Y-%m-%d")
        sql = f"INSERT INTO Test1.Messages \
            (Sender, Recipient, Message, MessageTime) VALUES \
            ({sender},{recipient_id},'{message}','{today}');"
        message = self.dbinstall.add_data(sql)
        return message

    def get_message(self, sender, recipient_id):
        """Get messages from db by given sender and recipient."""
        sql = f"SELECT * FROM Test1.Messages M Where \
                (M.Sender = {sender} and M.Recipient={recipient_id}) \
                or (M.Sender = {recipient_id} and M.Recipient = {sender}) \
                Order by M.MessageID Desc;"
        data = self.dbinstall.get_data(sql)
        messages = []
        for message in data:
            message_obj = {
                "message_id": message[0],
                "Sender_id": message[1],
                "Recipient": message[2],
                "Messgae": message[3],
                "MessageTime": str(message[4]),
            }
            message_json = ast.literal_eval(json.dumps(message_obj))
            messages.append(message_json)
        return messages
