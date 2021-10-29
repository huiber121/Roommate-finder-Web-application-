
"""Importing necessary modules"""
import json
import ast
from flask import request,session
import logging
import sys, os.path
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(db_dir)
sys.dont_write_bytecode = True
from db.database import Database
from model.roomhandler import roomhandler
import sessioncontroller
LOGGER = logging.getLogger(__name__)
      

def get_all_rooms():
        """Get all rooms for the given search attributes."""
        dbinstance = Database()  
        req_body = request.get_data()
        body = json.loads(req_body)
        uijson = ast.literal_eval(json.dumps(body))
        LOGGER.info(' JSON from frontend {}'.format(uijson))
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
        LOGGER.info(' Filter to get rooms: {}'.format(filter))
        sql = sql + filter
        LOGGER.info(' SQL to get rooms: {}'.format(sql))
        result = dbinstance.get_data(sql)
        if result == 0:
            return {}
        else:    
            result_json = get_room_json(result, uijson, dbinstance)
            return json.dumps(result_json)


def get_room_media(room_id, dbinstance):
        """Get room media for a given room id."""
        sql = 'SELECT RoomPic FROM RoomMedia WHERE RoomID = ' + str(room_id)
        result = dbinstance.get_data(sql)
        room_media = []
        if result==0:
            room_media.append("")   
        else: 
            room_media.append(result[0][0])
        return room_media


def get_room_json(room_data, input_tags, dbinstance):
        """Construct JSON for the data fetched from DB"""

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
                room_media = get_room_media(room[0],dbinstance)
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
    checker=sessioncontroller.check_loggedin()
    roomhandle = roomhandler()

    if(checker):
        req_body =request.form.get('json')
        body = json.loads(req_body)
        rjson = ast.literal_eval(json.dumps(body))
        rjson["Lister"]=session["userid"]
        id = session["userid"]
        checkdup = roomhandle.check_no_dup(rjson)
        if(checkdup == 0):
            LOGGER.info(' JSON from frontend {}'.format(rjson))
            id=roomhandle.add_new_room(rjson)
            if(id > 0):
                LOGGER.info(f'Add Json Info to RoomID{id}')
                filemessage="None"
                
                if('files' in request.files):
                    req_files = request.files.getlist("files")
                    if(len(req_files) >0):
                        for file in req_files:
                            name=file.filename
                            LOGGER.info(f'Upload File {name} to RoomId : {id}')
                            filemessage = roomhandle.add_media(id,file)
                    return {"Roominfo": "success added room info","Roomfile": filemessage}
                else:
                    LOGGER.info(f'Successfully Add Json info to Room_ID {id}')
                    return "successfuly add room"
            elif(id == 0):
                LOGGER.error(f'Faild Add Json info to Room_ID {id}')
                return "faild to adding room"
            elif(id == -1):
                LOGGER.error(f'Faild Add Room info to Room_ID{id}')
                return "You have created many same Rooms"
        else:
            LOGGER.error("Have same id and info in RoomListing")
            return "You have created a same Room"
           
    else:
        return "please login first"

def delete_room():
    checker=sessioncontroller.check_loggedin()
    if(checker):
        req_id = request.args.get("RoomID")
        LOGGER.info(f"Delete Room_ID {req_id} INFO")
        delete=roomhandler()
        deletemedia= delete.delet_media(req_id)
        deleteroom= delete.delete_room(req_id)
        return {"Room" : deleteroom ," Media" : deletemedia }
    else:
        return "please login first"

def update_a_room():
    checker=sessioncontroller.check_loggedin()
    update =roomhandler()
    if(checker):
        id = request.args.get("RoomID")
        updatemessage="None"
        if('json' in request.form):
            req_body =request.form.get('json')
            body = json.loads(req_body)
            rjson = ast.literal_eval(json.dumps(body))
            LOGGER.info(f"Update Room_ID {id} INFO with {rjson}")
            updatemessage= update.update_room(id,rjson)
        filemessage="None"
        if('files' in request.files):
            req_files = request.files.getlist('files')
            if(len(req_files) >0):
                for file in req_files:
                    name=file.filename
                    LOGGER.info(f'Upload File {name} to RoomId : {id}')
                    filemessage = update.add_media(id,file)
        return { "json" : updatemessage, "update s3 and db":filemessage} 
    else:
        return "please login first"

# delete one pic, use in update room info
def delete_One_Media():
    checker=sessioncontroller.check_loggedin()
    if(checker):
        url =request.get_data()
        body = json.loads(url)
        rjson = ast.literal_eval(json.dumps(body))
        picurl = rjson["RoomPic"]
        message= roomhandler().delete_one_pic(picurl)
        return message
    else:
        return "please login first"

# show one room
def show_a_room():
    roomid= request.args.get("RoomID")
    output=roomhandler().show_room(roomid)
    return output
# get login user all rooms info
def show_user_room():
    checker=sessioncontroller.check_loggedin()
    getroom = roomhandler()
    if(checker):
        id = session["userid"]
        user_rooms=getroom.get_user_all_roomsid(id)
        room_list=[]
        if(user_rooms == 0):
            return {}
        else:
            for roomid in user_rooms:
                room_list.append(getroom.show_room(roomid))
            return json.dumps(room_list) 

    else:
        return "please login"




