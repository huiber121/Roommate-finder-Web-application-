
import sys,os
sys.dont_write_bytecode = True
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(db_dir)
from db.database import Database
from datetime import datetime
from db.s3 import s3controller
import json,ast
today= datetime.now().strftime("%Y-%m-%d")
AWS_BUCKET_HEAD="https://group-4-bucket.s3.us-east-2.amazonaws.com/"

class roomhandler:
    def __init__(self):
        self.dbinstall = Database()
        self.s3 = s3controller()

    # check duplicate room detail with same location, type zipcode....
    #if return 0 no duplicate  -1: have morethan one same room
    #else  only have one same room info exist and return id
    def check_no_dup(self,body):
        location = body["Location"]
        type = body["Type"]
        zipcode = body["ZipCode"]
        des=body["Description"]
        id = body["Lister"]
        req= f"Location = '{location}' and Type='{type}' and ZipCode={zipcode} and Description = '{des}' and Lister = {id};"
        sql= f" SELECT R.Room_ID FROM Test1.RoomListing R WHERE (Available=0) and {req}"
        id = self.dbinstall.get_data(sql)
        if(id == 0):  # no dup
            return 0
        elif(len(id)>1): ## have dup
            return -1
        else:       ## only one
            tup=id[0]
            return tup[0]

    def add_new_room(self,body):
        columns = ["ListTime"]
        day=f"'{today}'"
        values = [day]
        for x in body:
            columns.append(x)
            if(isinstance(body.get(x), str)):
                values.append("'"+body.get(x)+"'")
            else:
                values.append(body.get(x))

        colStr = ",".join(map(str, columns))
        ValStr = ",".join(map(str, values))

        sql = f'INSERT INTO Test1.RoomListing ({colStr}) VALUES ({ValStr});'
        self.dbinstall.add_data(sql)
        # use check_no_dup to find the room id
        id = self.check_no_dup(body)
        return id

    def add_media(self,id,file):
        
        output = self.s3.upload_file_to_s3(file)
        url = AWS_BUCKET_HEAD+output
        sql = f"INSERT INTO Test1.RoomMedia (RoomID,RoomPic) VALUES ({id},'{url}');"
        message=self.dbinstall.add_data(sql)
        return message


    def delete_room(self,id):
        sql = f'DELETE FROM Test1.RoomListing WHERE Room_ID = {id};'
        roomListingmessage = self.dbinstall.delete_data(sql)
        return roomListingmessage

    # delete media in s3 and db
    def delet_media(self,id):
        getfileSql = f"SELECT M.RoomPic FROM Test1.RoomMedia M WHERE RoomID ={id};"
        Medianame = self.dbinstall.get_data(getfileSql)
        for filename in Medianame:
            url=filename[0]
            pathtofilename=url.replace(AWS_BUCKET_HEAD,"")
            output = self.s3.delete_file_from_s3(pathtofilename)
        delsql = f'DELETE FROM Test1.RoomMedia WHERE RoomID = {id};'
        mediamessage =self.dbinstall.delete_data(delsql)
        return {"Delete in db": mediamessage, "Delete in s3": output}

    # only update the db information
    def update_room(self,id,body): 
        updateDate = f"ListTime= '{today}' "
        ColList = [updateDate]
        for x in body:
            if(isinstance(body.get(x), str)):
                ColList.append(f"{x} = '{body.get(x)}'")
            else:
                notStr = body.get(x)
                ColList.append(f'{x} = {notStr}')
        column = ",".join(map(str, ColList))
        
        sql = f'UPDATE Test1.RoomListing SET {column} WHERE Room_ID={id};'
        record =self.dbinstall.add_data(sql)
        return record


    # delete one room media 
    def delete_one_pic(self,url):
        pathtofilename=url.replace(AWS_BUCKET_HEAD,"")
        s3message = self.s3.delete_file_from_s3(pathtofilename)
        sql = f"DELETE FROM Test1.RoomMedia WHERE RoomPic = '{url}'"
        dbmessage=self.dbinstall.delete_data(sql)
        return {"s3 Delete": s3message, "db message" : dbmessage}
    
    def get_user_all_roomsid(self,userid):
        sql = f"SELECT R.Room_ID FROM Test1.RoomListing R WHERE Lister={userid};"
        result=self.dbinstall.get_data(sql)
        rooms_ids=[]
        for roomid in result:
            rooms_ids.append(roomid[0])
        return rooms_ids
        

    # show the Detail of room
    def show_room(self,roomid):
        sql = f"SELECT * FROM Test1.RoomListing  WHERE Room_ID={roomid};"
        output =self.dbinstall.get_data(sql)
        mediasql = f"SELECT * FROM Test1.RoomMedia R WHERE RoomID={roomid};"
        result=self.dbinstall.get_data(mediasql)
        room_media = []
        for media in result:
            room_media.append(media[1])
        room=output[0]
        room_dict = {
            'room_id': room[0],
            'lister': room[1],
            'location': room[2],
            'zipcode': room[3],
            'type': room[4],
            'description': room[5],
            'price': int(room[6]),
            'listtime': str(room[7]),
            'size': str(room[8]),
            'numbathrooms': room[9],
            'numbedrooms': room[10],
            'tags': room[11],
            'available': int(room[12]),
            'roommedia': room_media
         }
        room_json = ast.literal_eval(json.dumps(room_dict))
        return room_json
      
        
        