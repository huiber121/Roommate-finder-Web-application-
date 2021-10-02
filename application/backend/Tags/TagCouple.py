from database import database

class TagCouple:
    def __init__(self):
        self.TagId = None
        self.roomId = None
    
    def findTheRoomListing(self,TagId):
        self.Tagid = TagId
        mysqldata=database("TagCouple")
        data = TagCouple.parseTagDes(TagId)
        TagId=mysqldata.findTheDataFromTable(data)
        idList=[]
        for x in TagId:
            idList.append(x[0])
        self.roomId=idList
        return self.roomId

    def parseTagDes(clientTagId):
        #assume TagDes is List
        str="TagID="
        data=""
        if len(clientTagId) != 0:
            data=(str+"%d")%clientTagId[0]
            if(len(clientTagId)>1):
                for x in clientTagId[1:]:
                    data=(data+" OR "+ str + "%d") % x
        return data