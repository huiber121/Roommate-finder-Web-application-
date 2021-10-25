import json
import ast
import sys
import os.path
import logging
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(db_dir)
sys.dont_write_bytecode = True
from flask import render_template, request
from db.database import Database


LOGGER = logging.getLogger(__name__)
dbinstance = Database()  
        

def add_prof(uijson):
  countprofsql = "SELECT COUNT(*) FROM Test1.Professional_User;"
  count = dbinstance.get_data(countprofsql)
  print(count[0][0], type(count[0][0]))
  pid = count[0][0] + 1

  profsql = "INSERT INTO `Test1`.`Professional_User` (`Prof_ID`, `JobLocation`, `Zipcode`) VALUES ('"+str(pid)+"', '"+uijson['joblocation']+"', '"+str(uijson['zipcode'])+"');"
  LOGGER.info(" Add prof SQL "+ profsql)
  result = dbinstance.add_data(profsql)
  LOGGER.info(" Before returning add_prof "+result)
  return result    

