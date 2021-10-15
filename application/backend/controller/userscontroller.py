import json
import ast
import sys
import os.path
import logging
sys.dont_write_bytecode = True
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) \
    + '/backend/db/'
sys.path.append(db_dir)
sys.dont_write_bytecode = True
from flask import render_template, request
from database import Database


dbinstance = Database()
LOGGER = logging.getLogger(__name__)


def get_all_roommates():
    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    LOGGER.info('JSON from frontend '+ uijson) 
    sql = ""
    result_json = []
    if 'type' in uijson.keys():
      sql = get_sql(uijson,uijson['type'])
      LOGGER.info("SQL statement: "+ sql)
      result = dbinstance.get_data(sql) 
      result_json.append(get_roommate_json(result, uijson['type']))
    else: 
      LOGGER.info('When UI JSON is empty')
      if len(uijson) == 0:
        result = get_data_for_no_filters()
        result_json.append(result)
      else:
        LOGGER.info('When UI JSON has no user type')
        data = get_data_for_no_filters()
        LOGGER.info(uijson)
        for x in data:
          for xval in x:
            checkval =  all(item in xval.values() for item in uijson.values())
            if checkval == True:
              result_json.append(xval)      

        
    return json.dumps(result_json)
    
def get_sql(uijson, usertype):
  sql = ""
  LOGGER.info('uijson '+ uijson)
  if usertype == 'student':
        userstudentfilter= ""
        studentsql = ""
        if len(uijson.keys()) == 0 or ('school' in uijson.keys() and len(uijson.keys()) == 1) or 'type' in uijson.keys():
          studentsql = " SELECT distinct(Base_User.UserID),Base_User.Name, Base_User.type, Base_User.UserScore, Base_User.Age, Base_User.Gender, Student_User.Grad_Level, Student_User.Major, Schools.SchoolName FROM Base_User INNER JOIN Student_User on Student_User.StudentID = Base_User.UserID "
        else:
          studentsql = " SELECT distinct(Base_User.UserID),Base_User.Name, Base_User.type, Base_User.UserScore, Base_User.Age, Base_User.Gender, Student_User.Grad_Level, Student_User.Major, Schools.SchoolName FROM Base_User INNER JOIN Student_User on Student_User.StudentID = Base_User.UserID and " 
        schooljoin = "INNER JOIN Schools on Schools.SchoolID = Student_User.SchoolID "
        check_param = 1
        param_len = len(uijson)
        if 'major' in uijson.keys():
          check_param = check_param+1
          if(check_param < param_len):
            userstudentfilter = userstudentfilter + "( major like "+"'%"+uijson['major']+"%') and"
          else:   
            userstudentfilter = userstudentfilter + "( major like "+"'%"+uijson['major']+"%') "
        if 'gradlevel' in uijson.keys():
          check_param = check_param+1
          if(check_param < param_len):
            userstudentfilter = userstudentfilter + "( grad_level like "+"'%"+uijson['gradlevel']+"%') and "
          else:
            userstudentfilter = userstudentfilter + "( grad_level like "+"'%"+uijson['gradlevel']+"%') "   
        if 'age' in uijson.keys():
          check_param = check_param+1
          if(check_param < param_len):
            userstudentfilter = userstudentfilter + "( age = "+str(uijson['age']) +") and "  
          else:    
            userstudentfilter = userstudentfilter + "( age = "+str(uijson['age']) +") "  
        if 'gender' in uijson.keys():
          check_param = check_param+1
          if(check_param < param_len):
            userstudentfilter = userstudentfilter + "( gender like "+"'%"+str(uijson['gender'])+"%') and "  
          else:    
            userstudentfilter = userstudentfilter + "( gender like "+"'%"+str(uijson['gender'])+"%') "      
        if 'userscore' in uijson.keys():
          check_param = check_param+1
          if(check_param < param_len):
            userstudentfilter = userstudentfilter + "( userscore = "+str(uijson['userscore']) +") and "  
          else:    
            userstudentfilter = userstudentfilter + "( userscore = "+str(uijson['userscore']) +") "      
        if 'school' in uijson.keys():
          check_param = check_param+1
          if(check_param < param_len):
            schooljoin = schooljoin + "and (schoolname like "+"'%"+str(uijson['school'])+"%') and "  
          else: 
            schooljoin = schooljoin + "and (schoolname like "+"'%"+str(uijson['school'])+"%') "     
        LOGGER.info("Filter : "+ userstudentfilter)
        studentsql = studentsql + userstudentfilter + schooljoin
        sql = studentsql
  
  if usertype == 'professor':
        profsql = ""
        if len(uijson) == 1:
          profsql = " SELECT Base_User.UserID, Base_User.Name, Base_User.age, Base_User.Gender, Base_User.UserScore, Professional_User.JobLocation, Professional_User.Zipcode FROM Base_User INNER JOIN Professional_User on Base_User.UserID = Professional_User.Prof_ID "  
        else:     
          profsql = " SELECT Base_User.UserID, Base_User.Name, Base_User.age, Base_User.Gender, Base_User.UserScore, Professional_User.JobLocation, Professional_User.Zipcode FROM Base_User INNER JOIN Professional_User on Base_User.UserID = Professional_User.Prof_ID and "  
        proffilter = ""
        check_param = 1
        param_len = len(uijson)
        if 'age' in uijson.keys():
          check_param = check_param+1
          if(check_param < param_len):
            proffilter = proffilter + "( age = "+str(uijson['age']) +") and "  
          else:    
            proffilter = proffilter + "( age = "+str(uijson['age']) +") "  
        if 'gender' in uijson.keys():
          check_param = check_param+1
          if(check_param < param_len):
            proffilter = proffilter + "( gender like "+"'%"+str(uijson['gender'])+"%') and "  
          else:    
            proffilter = proffilter + "( gender like "+"'%"+str(uijson['gender'])+"%') "      
        if 'userscore' in uijson.keys():
          check_param = check_param+1
          if(check_param < param_len):
            proffilter = proffilter + "( userscore = "+str(uijson['userscore']) +") and "  
          else:    
            proffilter = proffilter + "( userscore = "+str(uijson['userscore']) +") "        
        if 'joblocation' in uijson.keys():
          check_param = check_param+1
          if(check_param < param_len):
            proffilter = proffilter + "( joblocation = uijson['joblocation']) and "
          else:    
            proffilter = proffilter + "( joblocation = uijson['joblocation']) "
        if 'zipcode' in uijson.keys():
          check_param = check_param+1
          if(check_param < param_len):
            proffilter = proffilter + "( zipcode = "+str(uijson['zipcode']) +") and "  
          else:    
            proffilter = proffilter + "( zipcode = "+str(uijson['zipcode']) +") "  
        LOGGER.info('Filter '+ proffilter)              
        profsql = profsql + proffilter
        sql = profsql
  return sql

def get_data_for_no_filters():
  result = []
  allstudentsql = "SELECT distinct(Base_User.UserID),Base_User.Name, Base_User.type, Base_User.UserScore, Base_User.Age, Base_User.Gender, Student_User.Grad_Level, Student_User.Major, Schools.SchoolName FROM Base_User INNER JOIN Student_User on Student_User.StudentID = Base_User.UserID INNER JOIN Schools on Schools.SchoolID = Student_User.SchoolID "
  studentres = dbinstance.get_data(allstudentsql)
  allstudentsresult = ast.literal_eval(json.dumps(studentres))
  LOGGER.info(allstudentsresult)
  for student in allstudentsresult:
      result.append(get_student_json(student))
  allprofsql = "SELECT Base_User.UserID, Base_User.Name, Base_User.age, Base_User.Gender, Base_User.UserScore, Professional_User.JobLocation, Professional_User.Zipcode FROM Base_User INNER JOIN Professional_User on Base_User.UserID = Professional_User.Prof_ID "
  profres = dbinstance.get_data((allprofsql))
  allprofresult = ast.literal_eval(json.dumps(profres))
  for prof in allprofresult:
      result.append(get_prof_json(prof))
  return result

def get_prof_json(prof):
  prof_list = []
  prof_json = {
        "userid":prof[0],
        "username":prof[1],
        "age":int(prof[2]),
        "gender":prof[3],
        "userscore":prof[4],
        "joblocation":prof[5],
        "zipcode":prof[6],
      }
  rjson = ast.literal_eval(json.dumps(prof_json))
  prof_list.append(rjson) 
  return prof_list

def get_student_json(student):
  student_list = []
  student_json =  {
        "userid":student[0],
        "username":student[1],
        "type":student[2],
        "userscore":student[3],
        "age":int(student[4]),
        "gender":student[5],
        "gradlevel":student[6],
        "major":student[7],
        "school":student[8],
      }
  rjson = ast.literal_eval(json.dumps(student_json))
  student_list.append(rjson)
  return student_list 

def get_roommate_json(roommate_data,type):
  roommate_list = []
  for roomate in roommate_data:
    if type == 'student':
      roommate_son = {
        "userid":roomate[0],
        "username":roomate[1],
        "type":roomate[2],
        "userscore":roomate[3],
        "age":int(roomate[4]),
        "gender":roomate[5],
        "gradlevel":roomate[6],
        "major":roomate[7],
        "school":roomate[8],
      }
      rjson = ast.literal_eval(json.dumps(roommate_son))
      roommate_list.append(rjson) 
    if type == 'professor':   
      roommate_son = {
        "userid":roomate[0],
        "username":roomate[1],
        "age":roomate[2],
        "gender":roomate[3],
        "userscore":roomate[4],
        "joblocation":roomate[5],
        "zipcode":roomate[6],
      }
      rjson = ast.literal_eval(json.dumps(roommate_son))
      roommate_list.append(rjson) 
  return roommate_list    
        
      
   


