
""Importing necessary modules"""
import json
import ast
import sys
import os.path
import logging
sys.dont_write_bytecode = True
DB_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) \
    + '/backend/db/'
sys.path.append(DB_DIR)
sys.dont_write_bytecode = True
from flask import render_template, request, session
from database import Database
import schoolcontroller
import sessioncontroller    
import profcontroller

DBINSTANCE = Database()
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) \
    + '/backend/db/'
sys.path.append(db_dir)
sys.dont_write_bytecode = True
from flask import render_template, request
from database import Database


dbinstance = Database()
LOGGER = logging.getLogger(__name__)


def get_all_roommates():
    """This method returns the list of JSON's for the roommates"""
    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    LOGGER.info(uijson)
    sql = ''
    result_json = []
    if 'type' in uijson.keys():
        sql = get_sql(uijson, uijson['type'])
        LOGGER.info('SQL statement: ' + sql)
        result = DBINSTANCE.get_data(sql)
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
                    checkval = all(item in xval.values() for item in
                                   uijson.values())
                    if checkval == True:
                        result_json.append(xval)

    return json.dumps(result_json)


def get_sql(uijson, usertype):
    """Getting the SQL for student/professor"""

    sql = ''
    if usertype == 'student':
        userstudentfilter = ''
        studentsql = ''
        if len(uijson.keys()) == 0 or 'school' in uijson.keys() \
            and len(uijson.keys()) == 1:
            studentsql = \
                ' SELECT distinct(Base_User.UserID),Base_User.Name, Base_User.type, Base_User.UserScore, Base_User.Age, Base_User.Gender, Student_User.Grad_Level, Student_User.Major, Schools.SchoolName FROM Base_User INNER JOIN Student_User on Student_User.StudentID = Base_User.UserID and hidden = 0'
        else:
            studentsql = \
                ' SELECT distinct(Base_User.UserID),Base_User.Name, Base_User.type, Base_User.UserScore, Base_User.Age, Base_User.Gender, Student_User.Grad_Level, Student_User.Major, Schools.SchoolName FROM Base_User INNER JOIN Student_User on Student_User.StudentID = Base_User.UserID and hidden = 0 and '
        schooljoin = \
            'INNER JOIN Schools on Schools.SchoolID = Student_User.SchoolID '
        check_param = 1
        param_len = len(uijson) - 1
        if 'major' in uijson.keys():
            check_param = check_param + 1
            if check_param < param_len:
                userstudentfilter = userstudentfilter + '( major like ' \
                    + "'%" + uijson['major'] + "%') and"
            else:
                userstudentfilter = userstudentfilter + '( major like ' \
                    + "'%" + uijson['major'] + "%') "
        if 'gradlevel' in uijson.keys():
            check_param = check_param + 1
            if check_param < param_len:
                userstudentfilter = userstudentfilter \
                    + '( grad_level like ' + "'%" + uijson['gradlevel'] \
                    + "%') and "
            else:
                userstudentfilter = userstudentfilter \
                    + '( grad_level like ' + "'%" + uijson['gradlevel'] \
                    + "%') "
        if 'age' in uijson.keys():
            check_param = check_param + 1
            if check_param < param_len:
                userstudentfilter = userstudentfilter + '( age = ' \
                    + str(uijson['age']) + ') and '
            else:
                userstudentfilter = userstudentfilter + '( age = ' \
                    + str(uijson['age']) + ') '
        if 'gender' in uijson.keys():
            check_param = check_param + 1
            if check_param < param_len:
                userstudentfilter = userstudentfilter \
                    + '( gender like ' + "'%" + str(uijson['gender']) \
                    + "%') and "
            else:
                userstudentfilter = userstudentfilter \
                    + '( gender like ' + "'%" + str(uijson['gender']) \
                    + "%') "
        if 'userscore' in uijson.keys():
            print (check_param, param_len)
            check_param = check_param + 1
            if check_param < param_len:
                userstudentfilter = userstudentfilter \
                    + '( userscore = ' + str(uijson['userscore']) \
                    + ') and '
            else:
                userstudentfilter = userstudentfilter \
                    + '( userscore = ' + str(uijson['userscore']) + ') '
        if 'school' in uijson.keys():
            check_param = check_param + 1
            if check_param < param_len:
                schooljoin = schooljoin + 'and (schoolname like ' \
                    + "'%" + str(uijson['school']) + "%') and "
            else:
                schooljoin = schooljoin + 'and (schoolname like ' \
                    + "'%" + str(uijson['school']) + "%') "
        LOGGER.info('Filter : ' + userstudentfilter)
        studentsql = studentsql + userstudentfilter + schooljoin
        sql = studentsql

    if usertype == 'professor':
        profsql = ''
        if len(uijson) == 1:
            profsql = \
                ' SELECT Base_User.UserID, Base_User.Name, Base_User.age, Base_User.Gender, Base_User.UserScore, Professional_User.JobLocation, Professional_User.Zipcode FROM Base_User INNER JOIN Professional_User on Base_User.UserID = Professional_User.Prof_ID '
        else:
            profsql = \
                ' SELECT Base_User.UserID, Base_User.Name, Base_User.age, Base_User.Gender, Base_User.UserScore, Professional_User.JobLocation, Professional_User.Zipcode FROM Base_User INNER JOIN Professional_User on Base_User.UserID = Professional_User.Prof_ID and '
        proffilter = ''
        check_param = 1
        param_len = len(uijson)
        print (param_len, uijson)
        if 'age' in uijson.keys():
            check_param = check_param + 1
            if check_param < param_len:
                proffilter = proffilter + '( age = ' + str(uijson['age'
                        ]) + ') and '
            else:
                proffilter = proffilter + '( age = ' + str(uijson['age'
                        ]) + ') '
        if 'gender' in uijson.keys():
            check_param = check_param + 1
            if check_param < param_len:
                proffilter = proffilter + '( gender like ' + "'%" \
                    + str(uijson['gender']) + "%') and "
            else:
                proffilter = proffilter + '( gender like ' + "'%" \
                    + str(uijson['gender']) + "%') "
        if 'userscore' in uijson.keys():
            print ('userscore', check_param, param_len)
            check_param = check_param + 1
            if check_param < param_len:
                proffilter = proffilter + '( userscore = ' \
                    + str(uijson['userscore']) + ') and '
            else:
                proffilter = proffilter + '( userscore = ' \
                    + str(uijson['userscore']) + ') '
        if 'joblocation' in uijson.keys():
            print (check_param, param_len)
            check_param = check_param + 1
            if check_param < param_len:
                proffilter = proffilter + '( joblocation like ' + "'%" \
                    + str(uijson['joblocation']) + "%') and "
            else:
                proffilter = proffilter + '( joblocation like ' + "'%" \
                    + str(uijson['joblocation']) + "%') "
        if 'zipcode' in uijson.keys():
            check_param = check_param + 1
            if check_param < param_len:
                proffilter = proffilter + '( zipcode = ' \
                    + str(uijson['zipcode']) + ') and '
            else:
                proffilter = proffilter + '( zipcode = ' \
                    + str(uijson['zipcode']) + ') '
        LOGGER.info('Filter ' + proffilter)
        profsql = profsql + proffilter
        sql = profsql
    return sql


def get_data_for_no_filters():
    """This method is to get data when there is no user filter i.e no student/professor mentioned"""

    result = []
    allstudentsql = \
        'SELECT distinct(Base_User.UserID),Base_User.Name, Base_User.type, Base_User.UserScore, Base_User.Age, Base_User.Gender, Student_User.Grad_Level, Student_User.Major, Schools.SchoolName FROM Base_User INNER JOIN Student_User on Student_User.StudentID = Base_User.UserID INNER JOIN Schools on Schools.SchoolID = Student_User.SchoolID '
    studentres = DBINSTANCE.get_data(allstudentsql)
    allstudentsresult = ast.literal_eval(json.dumps(studentres))
    LOGGER.info(allstudentsresult)
    for student in allstudentsresult:
        result.append(get_student_json(student))
    allprofsql = \
        'SELECT Base_User.UserID, Base_User.Name, Base_User.age, Base_User.Gender, Base_User.UserScore, Professional_User.JobLocation, Professional_User.Zipcode FROM Base_User INNER JOIN Professional_User on Base_User.UserID = Professional_User.Prof_ID '
    profres = DBINSTANCE.get_data(allprofsql)
    allprofresult = ast.literal_eval(json.dumps(profres))
    for prof in allprofresult:
        result.append(get_prof_json(prof))

    return result


def get_prof_json(prof):
    """This method returns the JSON of the professor object"""

    prof_list = []
    prof_json = {
        'userid': prof[0],
        'username': prof[1],
        'age': int(prof[2]),
        'gender': prof[3],
        'userscore': prof[4],
        'joblocation': prof[5],
        'zipcode': prof[6],
        }
    rjson = ast.literal_eval(json.dumps(prof_json))
    prof_list.append(rjson)
    return prof_list


def get_student_json(student):
    """This method returns the JSON of the student object"""

    student_list = []
    student_json = {
        'userid': student[0],
        'username': student[1],
        'type': student[2],
        'userscore': student[3],
        'age': int(student[4]),
        'gender': student[5],
        'gradlevel': student[6],
        'major': student[7],
        'school': student[8],
        }
    rjson = ast.literal_eval(json.dumps(student_json))
    student_list.append(rjson)
    return student_list


def get_roommate_json(roommate_data, type):
    """This method returns the JSON of the roommate object"""

    roommate_list = []
    for roomate in roommate_data:
        if type == 'student':
            roommate_son = {
                'userid': roomate[0],
                'username': roomate[1],
                'type': roomate[2],
                'userscore': roomate[3],
                'age': int(roomate[4]),
                'gender': roomate[5],
                'gradlevel': roomate[6],
                'major': roomate[7],
                'school': roomate[8],
                }
            rjson = ast.literal_eval(json.dumps(roommate_son))
            roommate_list.append(rjson)
        if type == 'professor':
            roommate_son = {
                'userid': roomate[0],
                'username': roomate[1],
                'age': roomate[2],
                'gender': roomate[3],
                'userscore': roomate[4],
                'joblocation': roomate[5],
                'zipcode': roomate[6],
                }
            rjson = ast.literal_eval(json.dumps(roommate_son))
            roommate_list.append(rjson)
    return roommate_list


def add_user():
    """This method is to register a new user."""

    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    LOGGER.info(uijson)
    if uijson['type'] == 'student':
        addusersql = \
            "INSERT INTO Test1.Base_User (`Email`, `Password`, `Name`, `Age`, `SocialSecurity`, `UserScore`, `Gender`, `Type`, `Hidden`, `LoginId`) VALUES ('" \
            + uijson['email'] + "', " + "'" + uijson['password'] + "'," \
            + "'" + uijson['name'] + "'," + "'" + str(uijson['age']) \
            + "'," + "'" + str(uijson['ssn']) + "'," + "'" \
            + str(uijson['userscore']) + "'," + "'" + uijson['gender'] \
            + "'," + "'" + uijson['type'] + "'," + "'0', '" \
            + uijson['loginid'] + "');"
        LOGGER.info('Base_User SQL ' + addusersql)
        result = DBINSTANCE.add_data(addusersql)
        LOGGER.info('After adding to Base_User ' + result)
        uid = \
            DBINSTANCE.get_data("SELECT UserID from Test1.Base_User where LoginId = '"
                                 + uijson['loginid'] + "'")
        LOGGER.info('Uid ' + str(uid[0][0]))
        schoolid = schoolcontroller.add_school(uijson)
        print(schoolid)
        LOGGER.info('School id ' + str(schoolid))
        finalres = schoolcontroller.add_student(uijson, uid, schoolid) \
            + ' ' + uijson['loginid']
        LOGGER.info('Before returning from add student ' + finalres + ''
                    )
        return finalres
    elif uijson['type'] == 'professor':
        addusersql = \
            "INSERT INTO Test1.Base_User (`Email`, `Password`, `Name`, `Age`, `SocialSecurity`, `UserScore`, `Gender`, `Type`, `Hidden`, `LoginId`) VALUES ('" \
            + uijson['email'] + "', " + "'" + uijson['password'] + "'," \
            + "'" + uijson['name'] + "'," + "'" + str(uijson['age']) \
            + "'," + "'" + str(uijson['ssn']) + "'," + "'" \
            + str(uijson['userscore']) + "'," + "'" + uijson['gender'] \
            + "'," + "'" + uijson['type'] + "'," + "'0', '" \
            + uijson['loginid'] + "');"
        DBINSTANCE.add_data(addusersql)
        uid = \
            DBINSTANCE.get_data("SELECT UserID from Test1.Base_User where LoginId = '"
                                 + uijson['loginid'] + "'")
        result = profcontroller.add_prof(uijson)
        return result
    else:
        addusersql = \
            "INSERT INTO Test1.Base_User (`Email`, `Password`, `Name`, `Age`, `SocialSecurity`, `UserScore`, `Gender`, `Type`, `Hidden`, `LoginId`) VALUES ('" \
            + uijson['email'] + "', " + "'" + uijson['password'] + "'," \
            + "'" + uijson['name'] + "'," + "'" + str(uijson['age']) \
            + "'," + "'" + str(uijson['ssn']) + "'," + "'" \
            + str(uijson['userscore']) + "'," + "'" + uijson['gender'] \
            + "'," + "'" + uijson['type'] + "'," + "'0', '" \
            + uijson['loginid'] + "');"
        result = DBINSTANCE.add_data(addusersql)
        result = result + ' ' + uijson['loginid']
        LOGGER.info(' Before returning from add prof ' + result + ' '
                    + type(result))
        return result + uijson['loginid']


def login():
    """Is the login method."""

    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    LOGGER.info(uijson)
    sql = "SELECT Password FROM Test1.Base_User where LoginId='" \
        + uijson['loginid'] + "';"
    LOGGER.info(' SQL to check logged in user ' + sql)
    result = DBINSTANCE.get_data(sql)
    if result == 0:
        return 'Incorrect credentials'
    else:    
        if uijson['password'] == result[0][0]:
            sessioncontroller.create_session()
            return 'Logged in successfully ' + uijson['loginid']
       
    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    LOGGER.info(uijson) 
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
  if usertype == 'student':
        userstudentfilter= ""
        studentsql = ""
        if len(uijson.keys()) == 0 or ('school' in uijson.keys() and len(uijson.keys()) == 1) :
          studentsql = " SELECT distinct(Base_User.UserID),Base_User.Name, Base_User.type, Base_User.UserScore, Base_User.Age, Base_User.Gender, Student_User.Grad_Level, Student_User.Major, Schools.SchoolName FROM Base_User INNER JOIN Student_User on Student_User.StudentID = Base_User.UserID and hidden = 0"
        else:
          studentsql = " SELECT distinct(Base_User.UserID),Base_User.Name, Base_User.type, Base_User.UserScore, Base_User.Age, Base_User.Gender, Student_User.Grad_Level, Student_User.Major, Schools.SchoolName FROM Base_User INNER JOIN Student_User on Student_User.StudentID = Base_User.UserID and hidden = 0 and " 
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
      roommate_json = {
        "userid":roomate[0],
        "username":roomate[1],
        "age":roomate[2],
        "gender":roomate[3],
        "userscore":roomate[4],
        "joblocation":roomate[5],
        "zipcode":roomate[6],
      }
      rjson = ast.literal_eval(json.dumps(roommate_json))
      roommate_list.append(rjson) 
  return roommate_list    
        

