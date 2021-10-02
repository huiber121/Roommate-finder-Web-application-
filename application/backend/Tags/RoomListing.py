from Room import Room
from database import database
class RoomListing:
    def __init__(self):
        self.rooms =None

    def findRoomFromDatabase(self, Roomid):
        mysqldata=database("RoomListing")
        data = RoomListing.parseTagDes(Roomid)
        Rooms=mysqldata.findTheDataFromTable(data)
        Roomidinfo=[]
        for x in Rooms:
            Roomidinfo.append(Room(x[0],x[1],x[2],x[3],x[4],x[5],float(x[6]),x[7]).Getobject())
            
        self.rooms=Roomidinfo
        return Roomidinfo

    def parseTagDes(roomid):
        #assume TagDes is List
        str="Room_ID="
        data=""
        if len(roomid) != 0:
            data=(str+"%d")%roomid[0]
            if(len(roomid)>1):
                for x in roomid[1:]:
                    data=(data+" OR "+ str + "%d") % x
        return data        

    