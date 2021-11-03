"""Importing necessary modules"""
import logging
import sys
import os
sys.dont_write_bytecode = True
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(db_dir)
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
    LOGGER.info(' Add prof SQL {%s}',profsql)
    result = DBINSTANCE.add_data(profsql)
    LOGGER.info(' Before returning add_prof {%s}', result)
    return result
