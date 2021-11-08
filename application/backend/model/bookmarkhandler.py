"""Importing necessary modules."""
import sys
import os

db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(db_dir)
sys.dont_write_bytecode = True
from db.database import Database


class BookMarkHandler:
    """This class handle all action of bookmark from db."""

    def __init__(self):
        """Set Defult element."""
        self.dbinstall = Database()

    def add_love_room(self, userid, roomid):
        """Construct the queries to execute the db."""
        sql = f"INSERT INTO Test1.Bookmark_Room (UserId,RoomBookmarked) \
            VALUES ({userid}, {roomid});"
        message = self.dbinstall.add_data(sql)
        return message

    def delete_love_room(self, userid, roomid):
        """Construct the queries to execute the db."""
        sql = f"DELETE FROM Test1.Bookmark_Room \
            WHERE RoomBookmarked = {roomid} and UserId = {userid};"
        message = self.dbinstall.delete_data(sql)
        return message

    def check_dup_roombookmark(self, userid, roomid):
        """Construct the queries to execute the db."""
        sql = f"SELECT * FROM Test1.Bookmark_Room \
            WHERE RoomBookmarked = {roomid} and UserId = {userid};"
        checker = self.dbinstall.get_data(sql)
        if checker != 0:
            return -1
        return checker

    def add_love_user(self, userid, bookmark_userid):
        """Construct the queries to execute the db."""
        sql = f"INSERT INTO Test1.Bookmark_User (User_ID,Bookmarked_User) \
        VALUES ({userid}, {bookmark_userid});"
        message = self.dbinstall.add_data(sql)
        return message

    def delete_love_user(self, userid, bookmark_userid):
        """Construct the queries to execute the db."""
        sql = f"DELETE FROM Test1.Bookmark_User WHERE User_ID = {userid} \
        and Bookmarked_User = {bookmark_userid};"
        message = self.dbinstall.delete_data(sql)
        return message

    # check the duplicate on userbookmark in db/ same as above

    def check_dup_userbookmark(self, userid, bookmark_userid):
        """Construct the queries to execute the db."""
        sql = f"SELECT * FROM Test1.Bookmark_User \
            WHERE User_ID = {userid} and Bookmarked_User = {bookmark_userid};"
        checker = self.dbinstall.get_data(sql)
        if checker != 0:
            return -1
        return checker

    def get_all_roombookmark(self, userid):
        """Construct the queries to execute the db."""
        sql = f"SELECT B.RoomBookmarked FROM Test1.Bookmark_Room B WHERE UserId = {userid};"
        result = self.dbinstall.get_data(sql)
        bookmark_room = []
        if result == 0:
            return 0
        for roomid in result:
            bookmark_room.append(roomid[0])
        return bookmark_room
