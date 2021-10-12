#!/usr/bin/python
# -*- coding: utf-8 -*-
"""JSON module"""

import json
import ast
from flask import request
from database import Database
import logging

dbinstance = Database()
LOGGER = logging.getLogger(__name__)


def get_all_rooms():
    """Get all rooms for the given search attributes."""

    req_body = request.get_data()
    body = json.loads(req_body)
    rjson = ast.literal_eval(json.dumps(body))
    LOGGER.info(' JSON from frontend ', rjson)
    filter = ''
    sql = 'SELECT * FROM Test1.RoomListing WHERE (Available=0) and '
    if 'zipcode' in rjson.keys():
        filter = filter + '( zipcode=' + str(rjson['zipcode']) + ' )  '
    if 'location' in rjson.keys():
        filter = filter + '( location like ' + "'%" + rjson['location'] \
            + "%') "
    if 'type' in rjson.keys():
        filter = filter + 'and (Type=' + str(rjson['type']) + ')'
    if 'desc' in rjson.keys():
        filter = filter + 'and (Description like ' + "'%" + rjson['desc'
                ] + "%') "
    if 'price' in rjson.keys():
        filter = filter + 'and (Price=' + str(rjson['price']) + ')'
    if 'size' in rjson.keys():
        filter = filter + 'and (Type=' + str(rjson['size']) + ')'
    if 'numbathrooms' in rjson.keys():
        filter = filter + 'and (NumBathrooms=' \
            + str(rjson['numbathrooms']) + ')'
    if 'numbedrooms' in rjson.keys():
        filter = filter + 'and (NumBedrooms=' + str(rjson['numbedrooms'
                ]) + ')'
    LOGGER.info(' Filter to get rooms : ' + filter)
    sql = sql + filter
    LOGGER.info(' SQL to get rooms: ' + sql)
    result = dbinstance.get_data(sql)
    result_json = get_room_json(result, rjson)
    return json.dumps(result_json)


def get_room_media(room_id):
    """Get room media for a given room id."""

    sql = 'SELECT * FROM Test1.RoomMedia WHERE RoomID = ' + str(room_id)
    LOGGER.info(' SQL to get room media ' + sql)
    result = dbinstance.get_data(sql)
    room_media = []
    for media in result:
        room_media.append(media[1])
    return room_media


def get_room_json(room_data, input_tags):
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
        room_media = get_room_media(room[0])
        if check is True and room[12] == 0:
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
