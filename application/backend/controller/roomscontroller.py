
"""Importing necessary modules"""
import json
import ast
import logging
import sys
import os
from flask import request,session
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(db_dir)
sys.dont_write_bytecode = True
from db.database import Database
from model.roomhandler import RoomHandler
import sessioncontroller
LOGGER = logging.getLogger(__name__)
DBINSTANCE = Database()
rooms_media = DBINSTANCE.get_data("SELECT * FROM RoomMedia")
def get_all_rooms():
    """Get all rooms for the given search attributes."""
    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    LOGGER.info(' JSON from frontend {%s}',uijson)
    filter = ''
    sql = 'SELECT * FROM RoomListing WHERE (Available=0) and '
    if 'zipcode' in uijson.keys():
        filter = filter + '( zipcode=' + str(uijson['zipcode']) + ' )  '
    if 'location' in uijson.keys():
        filter = filter + '( location like ' + "'%" + uijson['location'] \
            + "%') "
    if 'type' in uijson.keys():
        filter = filter + 'and (Type like ' + "'%" + uijson['type'] \
            + "%') "
    if 'desc' in uijson.keys():
        filter = filter + 'and (Description like ' + "'%" + uijson['desc'
                ] + "%') "
    if 'price' in uijson.keys():
        filter = filter + 'and (Price=' + str(uijson['price']) + ')'
    if 'size' in uijson.keys():
        filter = filter + 'and (Type=' + str(uijson['size']) + ')'
    if 'numbathrooms' in uijson.keys():
        filter = filter + 'and (NumBathrooms=' \
            + str(uijson['numbathrooms']) + ')'
    if 'numbedrooms' in uijson.keys():
        filter = filter + 'and (NumBedrooms=' + str(uijson['numbedrooms'
                ]) + ')'
    LOGGER.info(' Filter to get rooms: {%s}',filter)
    sql = sql + filter
    LOGGER.info(' SQL to get rooms: {%s}',sql)
    result = DBINSTANCE.get_data(sql)
    if result == 0:
        return {}
    else:    
        result_json = get_room_json(result, uijson)
        return json.dumps(result_json)
def get_room_media(roomid):
    """Get all room media."""
    media = []
    for i in rooms_media:
        if i[0] == roomid:
            media.append(i[1])
    return media
def get_room_json(room_data, input_tags):
    """Construct JSON for the data fetched from DB."""
    if 'location' in input_tags.keys():
        input_tags.pop('location')
    if 'zipcode' in input_tags.keys():
        input_tags.pop('zipcode')
    if 'numbathrooms' in input_tags.keys():
        input_tags.pop('numbathrooms')
    if 'numbedrooms' in input_tags.keys():
        input_tags.pop('numbedrooms')
    if 'price' in input_tags.keys():
        input_tags.pop('price')
    if 'type' in input_tags.keys():
        input_tags.pop('type')
    if 'size' in input_tags.keys():
        input_tags.pop('size')
    room_list = []
    for room in room_data:
        tags = room[11]
        tag_db_list = tags.split(',')
        check = all(item in tag_db_list for item in input_tags.values())
        if check is True and room[12] == 0:
            room_media = get_room_media(room[0])
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
                'roommedia': room_media,
                }
            room_json = ast.literal_eval(json.dumps(room_dict))
            room_list.append(room_json)
    return room_list
def add_room():
    """add room for the given room attributes."""
    checker=sessioncontroller.check_loggedin()
    roomhandle = RoomHandler()
    if checker:
        req_body =request.form.get('json')
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        rjson["Lister"]=session["userid"]
        id = session["userid"]
        checkdup = roomhandle.check_no_dup(rjson)
        if checkdup == 0:
            LOGGER.info(' JSON from frontend {%s}',rjson)
            room_id=roomhandle.add_new_room(rjson)
            if room_id > 0:
                LOGGER.info('Add Json Info to RoomID{%s}',room_id)
                filemessage="None"
                if 'files' in request.files:
                    req_files = request.files.getlist("files")
                    if len(req_files) > 0:
                        for file in req_files:
                            name = file.filename
                            LOGGER.info('Upload File {%s }to RoomId : {%s}',name,room_id)
                            filemessage = roomhandle.add_media(room_id,file)
                    return {"Roominfo": "success added room info","Roomfile": filemessage}

                LOGGER.info('Successfully Add Json info to Room_ID {%s}',room_id)
                return "successfuly add room"
            elif id == 0 :
                LOGGER.error('Faild Add Json info to Room_ID {%s}',room_id)
                return "faild to adding room"
            elif id == -1:
                LOGGER.error('Faild Add Room info to Room_ID{%s}',room_id)
                return "You have created many same Rooms"
        LOGGER.error("Have same id and info in RoomListing")
        return "You have created a same Room"  
    return "please login first"
def delete_room():
    """delete room for the given room id."""
    checker=sessioncontroller.check_loggedin()
    if checker :
        req_id = request.args.get("RoomID")
        LOGGER.info("Delete Room_ID {%s} INFO",req_id)
        delete=RoomHandler()
        deletemedia= delete.delet_media(req_id)
        deleteroom= delete.delete_room(req_id)
        return {"Room" : deleteroom ," Media" : deletemedia }
    else:
        return "please login first"
def update_a_room():
    """update room for the given room id."""
    checker=sessioncontroller.check_loggedin()
    update =RoomHandler()
    if checker :
        room_id = request.args.get("RoomID")
        updatemessage="None"
        if 'json' in request.form:
            req_body =request.form.get('json')
            body = json.loads(req_body)
            rjson = ast.literal_eval(json.dumps(body))
            LOGGER.info("Update Room_ID {%s} INFO with {%s}",room_id,rjson)
            updatemessage= update.update_room(room_id,rjson)
        filemessage="None"
        if 'files' in request.files :
            req_files = request.files.getlist('files')
            if len(req_files) >0 :
                for file in req_files:
                    name=file.filename
                    LOGGER.info('Upload File {%s} to RoomId : {%s}',name,room_id)
                    filemessage = update.add_media(room_id,file)
        return { "json" : updatemessage, "update s3 and db":filemessage} 
    return "please login first"
# delete one pic, use in update room info
def delete_one_media():
    """delete room one file by given file url."""
    checker=sessioncontroller.check_loggedin()
    if checker :
        url =request.get_data()
        body = json.loads(url)
        rjson = ast.literal_eval(json.dumps(body))
        picurl = rjson["RoomPic"]
        message= RoomHandler().delete_one_pic(picurl)
        LOGGER.info('Delete File {%s} in s3 and db : {%s}',picurl,message)
        return message
    return "please login first"
# show one room
def show_a_room():
    """show room by given room id."""
    roomid= request.args.get("RoomID")
    output=RoomHandler().show_room(roomid)
    LOGGER.info('show room_id {%s}',roomid)
    return output
# get login user all rooms info
def show_user_room():
    """show rooms by user logged in id."""
    checker=sessioncontroller.check_loggedin()
    getroom = RoomHandler()
    if checker:
        user_id = session["userid"]
        user_rooms=getroom.get_user_all_roomsid(user_id)
        room_list=[]
        if user_rooms == 0:
            return {}
        for roomid in user_rooms:
            room_list.append(getroom.show_room(roomid))
        LOGGER.info("show all ueser {%s}'s rooms", user_id)
        return json.dumps(room_list) 
    return "please login"
