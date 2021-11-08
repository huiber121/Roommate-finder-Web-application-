"""Importing necessary modules."""
import sys
import os
import json
import ast
from datetime import datetime

sys.dont_write_bytecode = True
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(db_dir)
from db.s3 import S3Controller
from db.database import Database
from config.config import config


class RoomHandler:
    """Handling any action to the Room."""

    def __init__(self):
        """Setting the init defult for the class."""
        self.dbinstall = Database()
        self.s3install = S3Controller()

    def check_no_dup(self, body):
        """This Method check Duplicate Room and get a room id."""
        location = body["Location"]
        room_type = body["Type"]
        zip_code = body["ZipCode"]
        des = body["Description"]
        user_id = body["Lister"]
        req = f"Location = '{location}' and Type='{room_type}' and ZipCode={zip_code} \
            and Description = '{des}' and Lister = {user_id};"
        sql = f" SELECT R.Room_ID FROM Test1.RoomListing R WHERE \
                (Available=0) and {req}"
        room_id = self.dbinstall.get_data(sql)
        if room_id == 0:  # no dup
            return room_id
        elif len(room_id) > 1:  # have dup
            return -1
        else:  # only one
            tup = room_id[0]
            return tup[0]

    def add_new_room(self, body):
        """Construct the queries to execute add room to the db."""
        today = datetime.now().strftime("%Y-%m-%d")
        columns = ["ListTime"]
        day = f"'{today}'"
        values = [day]
        for element in body:
            columns.append(element)
            if isinstance(body.get(element), str):
                values.append("'" + body.get(element) + "'")
            else:
                values.append(body.get(element))
        col_str = ",".join(map(str, columns))
        val_str = ",".join(map(str, values))
        sql = f"INSERT INTO Test1.RoomListing ({col_str}) VALUES ({val_str});"
        self.dbinstall.add_data(sql)
        # use check_no_dup to find the room id
        room_id = self.check_no_dup(body)
        return room_id

    def add_media(self, room_id, file):
        """Construct the queries to execute add media the db and s3."""

        output = self.s3install.upload_file_to_s3(file)
        url = config.aws_bucket_head + output
        sql = f"INSERT INTO Test1.RoomMedia (RoomID,RoomPic) \
                 VALUES ({room_id},'{url}');"
        message = self.dbinstall.add_data(sql)
        return message

    def delete_room(self, room_id):
        """Construct the queries to execute delete room to db."""

        sql = f"DELETE FROM Test1.RoomListing WHERE Room_ID = {room_id};"
        room_listing_message = self.dbinstall.delete_data(sql)
        return room_listing_message

    def delet_media(self, room_id):
        """Construct the queries to execute delete meida to db and s3."""

        get_file_sql = (
            f"SELECT M.RoomPic FROM Test1.RoomMedia M WHERE RoomID = {room_id};"
        )
        media_name = self.dbinstall.get_data(get_file_sql)
        if media_name == 0:
            return "no meidafile in db"
        for filename in media_name:
            url = filename[0]
            path_to_filename = url.replace(config.aws_bucket_head, "")
            output = self.s3install.delete_file_from_s3(path_to_filename)
        del_sql = f"DELETE FROM Test1.RoomMedia WHERE RoomID = {room_id};"
        media_message = self.dbinstall.delete_data(del_sql)
        return {"Delete in db": media_message, "Delete in s3": output}

    def update_room(self, room_id, body):
        """Construct the queries to execute update room to db and s3."""
        today = datetime.now().strftime("%Y-%m-%d")
        update_date = f"ListTime= '{today}' "
        col_list = [update_date]
        for key in body:
            if isinstance(body.get(key), str):
                col_list.append(f"{key} = '{body.get(key)}'")
            else:
                not_str = body.get(key)
                col_list.append(f"{key} = {not_str}")
        column = ",".join(map(str, col_list))
        sql = f"UPDATE Test1.RoomListing SET {column} WHERE Room_ID={room_id};"
        record = self.dbinstall.add_data(sql)
        return record

    def delete_one_pic(self, url):
        """Construct the queries to execute delete one media to db and s3."""

        path_to_filename = url.replace(config.aws_bucket_head, "")
        s3_message = self.s3install.delete_file_from_s3(path_to_filename)
        sql = f"DELETE FROM Test1.RoomMedia WHERE RoomPic = '{url}'"
        db_message = self.dbinstall.delete_data(sql)
        return {"s3 Delete": s3_message, "db message": db_message}

    def get_user_all_roomsid(self, userid):
        """Construct the queries to execute get all the room created by current user from db."""

        sql = f"SELECT R.Room_ID FROM Test1.RoomListing R WHERE Lister={userid};"
        result = self.dbinstall.get_data(sql)
        rooms_ids = []
        if result == 0:
            return 0
        for roomid in result:
            rooms_ids.append(roomid[0])
        return rooms_ids

    def show_room(self, roomid):
        """Construct the queries to execute get a room detail from db."""

        sql = f"SELECT * FROM Test1.RoomListing  WHERE Room_ID={roomid};"
        output = self.dbinstall.get_data(sql)
        mediasql = f"SELECT * FROM Test1.RoomMedia R WHERE RoomID={roomid};"
        result = self.dbinstall.get_data(mediasql)
        room_media = []
        if result != 0:
            for media in result:
                room_media.append(media[1])
        room = output[0]
        room_dict = {
            "room_id": room[0],
            "lister": room[1],
            "location": room[2],
            "zipcode": room[3],
            "type": room[4],
            "description": room[5],
            "price": int(room[6]),
            "listtime": str(room[7]),
            "size": str(room[8]),
            "numbathrooms": room[9],
            "numbedrooms": room[10],
            "tags": room[11],
            "available": int(room[12]),
            "roommedia": room_media,
        }
        room_json = ast.literal_eval(json.dumps(room_dict))
        return room_json
