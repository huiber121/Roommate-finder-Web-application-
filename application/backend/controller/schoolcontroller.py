import json
import ast
import sys
import os.path
import logging
sys.dont_write_bytecode = True
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(db_dir)
from flask import render_template, request
from db.database import Database


LOGGER = logging.getLogger(__name__)
dbinstance = Database()  
        

def add_school(uijson):
  schoolid = "SELECT SchoolID FROM Test1.Schools where SchoolName='"+uijson['school']+"';"
  schooexists = dbinstance.get_data(schoolid)
  if len(schooexists) == 0:
    countschoolsql = "SELECT COUNT(*) FROM Test1.Schools;"
    count = dbinstance.get_data(countschoolsql)
    print(count[0][0], type(count[0][0]))
    sid = count[0][0] + 1
    schoolsql = "INSERT INTO `Test1`.`Schools` (`SchoolId`,`SchoolName`, `Location`, `ZipCode`) VALUES ("+ str(sid)+",'"+uijson['school']+"','"+uijson['location']+"',"+str(uijson['zipcode'])+");"
    result = dbinstance.add_data(schoolsql)
    LOGGER.info("Before add school result "+result)
    return sid
  else:
    LOGGER.info("School exists {} ".format(schooexists[0][0] ))
    return schooexists[0][0]     


def add_student(uijson,uid,schoolid):
   studentsql = "INSERT INTO Test1.Student_User (`StudentID`, `Major`, `Grad_Level`, `SchoolID`) VALUES ('"+str(uid[0][0])+"', " +"'"+uijson["major"]+"'," +"'"+uijson["gradlevel"]+"'," +"'"+str(schoolid)+"');"
   result = dbinstance.add_data(studentsql)
   LOGGER.info("After adding in student_user "+result)
   return result