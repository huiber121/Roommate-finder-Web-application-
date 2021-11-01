#!/usr/bin/python
# -*- coding: utf-8 -*-
"""Importing necessary modules"""

import logging
from db.database import Database

LOGGER = logging.getLogger(__name__)
DBINSTANCE = Database()


def add_prof(uijson):
    """This method is to add prof users."""
    countprofsql = 'SELECT COUNT(*) FROM Test1.Professional_User;'
    count = DBINSTANCE.get_data(countprofsql)
    print (count[0][0], type(count[0][0]))
    pid = count[0][0] + 1

    profsql = \
        "INSERT INTO `Test1`.`Professional_User` (`Prof_ID`, `JobLocation`, `Zipcode`) VALUES ('" \
        + str(pid) + "', '" + uijson['joblocation'] + "', '" \
        + str(uijson['zipcode']) + "');"
    LOGGER.info(' Add prof SQL {}'.format(profsql))
    result = DBINSTANCE.add_data(profsql)
    LOGGER.info(' Before returning add_prof {}'.format(result))
    return result
