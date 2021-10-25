
"""Importing necessary modules"""
import json
import ast
from flask import request
import logging
import sys, os.path
db_dir = (os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
+ '/db/')
sys.path.append(db_dir)
sys.dont_write_bytecode = True
from database import Database

LOGGER = logging.getLogger(__name__)
      

def get_all_rooms():
        """Get all rooms for the given search attributes."""
        dbinstance = Database()  
        req_body = request.get_data()
        body = json.loads(req_body)
        uijson = ast.literal_eval(json.dumps(body))
        LOGGER.info(' JSON from frontend {}'.format(uijson))
        filter = ''
        sql = 'SELECT * FROM Test1.RoomListing WHERE (Available=0) and '
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

        sql = 'SELECT RoomPic FROM Test1.RoomMedia WHERE RoomID = ' + str(room_id)
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


