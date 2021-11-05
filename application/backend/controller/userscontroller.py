"""Importing necessary modules"""
import json
import ast
import logging
from flask import request
import schoolcontroller
import sessioncontroller
import profcontroller
from db.database import Database

DBINSTANCE = Database()
LOGGER = logging.getLogger(__name__)


def get_all_roommates(searchjson):
    """This method returns the list of JSON's for the roommates"""

    if len(searchjson)==0:
        req_body = request.get_data()
        body = json.loads(req_body)
        uijson = ast.literal_eval(json.dumps(body))
    else:
        uijson = searchjson
    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    LOGGER.info(uijson)
    sql = ''
    result_json = []
    if 'type' in uijson.keys():
        sql = get_sql(uijson, uijson['type'])
        LOGGER.info('SQL statement: {%s}',sql)
        result = DBINSTANCE.get_data(sql)
        if result == 0:
            return {}
        result_json.append(get_roommate_json(result, uijson['type']))
    else:
        LOGGER.info('In else')
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
            ' INNER JOIN Schools on Schools.SchoolID = Student_User.SchoolID '
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
        LOGGER.info('Filter: {%s}',userstudentfilter)
        studentsql = studentsql + userstudentfilter + schooljoin
        if len(uijson.keys()) == 1 and 'type' in uijson.keys():
            studentsql = \
                ' SELECT distinct Base_User.UserID ,Base_User.Name, Base_User.type, Base_User.UserScore, Base_User.Age, Base_User.Gender, Student_User.Grad_Level, Student_User.Major, Schools.SchoolName FROM Base_User join Student_User on Base_User.UserID = Student_User.StudentID join Schools on Student_User.SchoolID = Schools.SchoolID'
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
        if 'age' in uijson.keys():
            check_param = check_param + 1
            if check_param < param_len:
                proffilter = proffilter + '( age = ' + str(uijson['age']) + ') and '
            else:
                proffilter = proffilter + '( age = ' + str(uijson['age']) + ') '
        if 'gender' in uijson.keys():
            check_param = check_param + 1
            if check_param < param_len:
                proffilter = proffilter + '( gender like ' + "'%" \
                    + str(uijson['gender']) + "%') and "
            else:
                proffilter = proffilter + '( gender like ' + "'%" \
                    + str(uijson['gender']) + "%') "
        if 'userscore' in uijson.keys():
            check_param = check_param + 1
            if check_param < param_len:
                proffilter = proffilter + '( userscore = ' \
                    + str(uijson['userscore']) + ') and '
            else:
                proffilter = proffilter + '( userscore = ' \
                    + str(uijson['userscore']) + ') '
        if 'joblocation' in uijson.keys():
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
        LOGGER.info('Filter: {%s}',proffilter)
        profsql = profsql + proffilter
        sql = profsql
    return sql


def get_data_for_no_filters():
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
            roommate_json = {
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
            rjson = ast.literal_eval(json.dumps(roommate_json))
            roommate_list.append(rjson)
        if type == 'professor':
            roommate_json = {
                'userid': roomate[0],
                'username': roomate[1],
                'age': roomate[2],
                'gender': roomate[3],
                'userscore': roomate[4],
                'joblocation': roomate[5],
                'zipcode': roomate[6],
                'type': 'professor',
                }
            rjson = ast.literal_eval(json.dumps(roommate_json))
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
            "INSERT INTO Base_User (`Email`, `Password`, `Name`, `Age`, `SocialSecurity`, `UserScore`, `Gender`, `Type`, `Hidden`, `LoginId`) VALUES ('" \
            + uijson['email'] + "', " + "'" + uijson['password'] + "'," \
            + "'" + uijson['name'] + "'," + "'" + str(uijson['age']) \
            + "'," + "'" + str(uijson['ssn']) + "'," + "'" \
            + str(uijson['userscore']) + "'," + "'" + uijson['gender'] \
            + "'," + "'" + uijson['type'] + "'," + "'0', '" \
            + uijson['loginid'] + "');"
        LOGGER.info('Base_User SQL: {%s}', addusersql)
        result = DBINSTANCE.add_data(addusersql)
        LOGGER.info('After adding to Base_User {%s}',result)
        uid = \
            DBINSTANCE.get_data("SELECT UserID from Base_User where LoginId = '"+ uijson['loginid'] + "'")
        LOGGER.info('Uid {%s}', uid[0][0])
        schoolid = schoolcontroller.add_school(uijson)

        LOGGER.info('School id {%s}',schoolid)
        finalres = schoolcontroller.add_student(uijson, uid, schoolid) \
            + ' ' + uijson['loginid']
        LOGGER.info('Before returning from add student {%s}',finalres)
        return finalres
    elif uijson['type'] == 'professor':
        addusersql = \
            "INSERT INTO Base_User (`Email`, `Password`, `Name`, `Age`, `SocialSecurity`, `UserScore`, `Gender`, `Type`, `Hidden`, `LoginId`) VALUES ('" \
            + uijson['email'] + "', " + "'" + uijson['password'] + "'," \
            + "'" + uijson['name'] + "'," + "'" + str(uijson['age']) \
            + "'," + "'" + str(uijson['ssn']) + "'," + "'" \
            + str(uijson['userscore']) + "'," + "'" + uijson['gender'] \
            + "'," + "'" + uijson['type'] + "'," + "'0', '" \
            + uijson['loginid'] + "');"
        DBINSTANCE.add_data(addusersql)
        uid = \
            DBINSTANCE.get_data("SELECT UserID from Base_User where LoginId = '"+ uijson['loginid'] + "'")
        result = profcontroller.add_prof(uijson)
        return result
    else:
        addusersql = \
            "INSERT INTO Base_User (`Email`, `Password`, `Name`, `Age`, `SocialSecurity`, `UserScore`, `Gender`, `Type`, `Hidden`, `LoginId`) VALUES ('" \
            + uijson['email'] + "', " + "'" + uijson['password'] + "'," \
            + "'" + uijson['name'] + "'," + "'" + str(uijson['age']) \
            + "'," + "'" + str(uijson['ssn']) + "'," + "'" \
            + str(uijson['userscore']) + "'," + "'" + uijson['gender'] \
            + "'," + "'" + uijson['type'] + "'," + "'0', '" \
            + uijson['loginid'] + "');"
        result = DBINSTANCE.add_data(addusersql)
        result = result + ' ' + uijson['loginid']
        LOGGER.info(' Before returning from add prof {%s}',result)
        return result + uijson['loginid']


def login():
    """Login method."""

    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    LOGGER.info(uijson)
    sql = "SELECT Password,Admin, UserID FROM Base_User where LoginId='"+ uijson['loginid'] + "';"
    LOGGER.info(' SQL to check logged in user {%s}', sql)
    result = DBINSTANCE.get_data(sql)
    LOGGER.info('The userid is {%s}', result[0][1])
    if result == 0:
        return 'Incorrect credentials'
    elif uijson['password'] == result[0][0]:
            sessioncontroller.create_session(result[0][2])
            response = {'message': "Logged in successfully'"+ uijson['loginid'], 'roleid': result[0][1]}
            return response

def get_user_profile():
    """This method returns the user profile given the id"""

    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    LOGGER.info(uijson)
    sql = \
        'SELECT Base_User.*,Student_User.Major, Student_User.Grad_Level,Schools.SchoolName, Schools.ZipCode as School_zipcode, Schools.Location, Professional_User.JobLocation, Professional_User.Zipcode as Job_zipcode FROM Test1.Base_User left join Test1.Student_User on Base_User.UserID = Student_User.StudentID left join Test1.Schools on Student_User.SchoolID = Schools.SchoolID left join Professional_User on Base_User.UserID = Professional_User.Prof_ID where Base_User.UserID =' \
        + str(uijson['userid']) + ';'
    result = DBINSTANCE.get_data(sql)
    if result[0][8] == 'student':
        result = get_student_profile(result[0])
    elif result[0][8] == 'professor':
        result = get_prof_profile(result[0])
    return result


def get_student_profile(data):
    """This method returns user(student) profile given the id"""

    profile = {
        'userid': data[0],
        'email': data[1],
        'name': data[3],
        'age': data[4],
        'userscore': data[6],
        'gender': data[7],
        'type': data[8],
        'hidden': data[9],
        'loginid': data[10],
        'admin': data[11],
        'major': data[12],
        'gradlevel': data[13],
        'school': data[14],
        'school_zipcode': data[15],
        'location': data[16],
        }
    return profile


def get_prof_profile(data):
    """This method returns user(prof) profile given the id"""

    profile = {
        'userid': data[0],
        'email': data[1],
        'name': data[3],
        'age': data[4],
        'userscore': data[6],
        'gender': data[7],
        'type': data[8],
        'hidden': data[9],
        'loginid': data[10],
        'admin': data[11],
        'job_zipcode': data[17],
        'job_location': data[18],
        }
    return profile


def user_delete():
    """This method is used to delete the user given the id""" 
    req_body = request.get_data()
    body = json.loads(req_body)
    uijson = ast.literal_eval(json.dumps(body))
    LOGGER.info(uijson)
    roomsql = 'SELECT count(*) FROM RoomListing WHERE Lister ='+str(uijson['userid'])+';'
    lister_count = DBINSTANCE.get_data(roomsql)[0][0]
    if lister_count == 0:
        typesql = 'SELECT Type from Base_User where UserID='+str(uijson['userid'])+';'
        result = DBINSTANCE.get_data(typesql)
        user_type = (result[0][0])
        if user_type == 'student':
            student_sql = 'DELETE FROM Student_User WHERE StudentID='+str(uijson['userid'])+';'
            msg = DBINSTANCE.delete_data(student_sql)
            LOGGER.info("Deleting from student table {%s}", msg)
            base_user = 'DELETE FROM Base_User WHERE UserID='+str(uijson['userid'])+';'
            message = DBINSTANCE.delete_data(base_user)
            return message
        if user_type == 'professor':
            prof_sql = 'DELETE FROM Professional_User WHERE Prof_ID ='+str(uijson['userid'])+';'
            msg = DBINSTANCE.delete_data(prof_sql)
            LOGGER.info("Deleting from prof table {%s}", msg)
            base_user = 'DELETE FROM Base_User WHERE UserID='+str(uijson['userid'])+';'
            message = DBINSTANCE.delete_data(base_user)
            return message
    else:
            return "User is associated with rooms, hence cannot be deleted"