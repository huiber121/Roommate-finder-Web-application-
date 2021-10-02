import mysql.connector
import jsons


class database:
    
    def __init__(self,tableName):
        self.tableName=tableName
    def connecter():
        mydb = mysql.connector.connect(
            host = "group4-db.czpwr5igmvey.us-west-1.rds.amazonaws.com",
            user = "admin",
            passwd= "admin1234",
            database = "Test1"
        )
        return mydb

    def findTheDataFromTable(self,data):
        mydb = database.connecter()
        tablename = self.tableName
        mycursor = mydb.cursor()
        sql = f"SELECT * FROM {tablename} WHERE {data}"
        mycursor.execute(sql)
        myresult = mycursor.fetchall()
        return myresult
