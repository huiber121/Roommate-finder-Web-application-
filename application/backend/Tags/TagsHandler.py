
from database import database

class TagsHandler:
    def __init__(self):
        self.Tagid=None
        self.TagDes=None
    
    def findingTagIDs(self,TagDes):
        self.TagDes = TagDes
        mysqldata=database("Tags")
        data = TagsHandler.parseTagDes(TagDes)
        TagId=mysqldata.findTheDataFromTable(data)
        idList=[]
        for x in TagId:
            idList.append(x[0])
        self.Tagid=idList
        return self.Tagid

    def parseTagDes(clientTagDes):
        #assume TagDes is List
        str="TagDes="
        data=""
        if len(clientTagDes) != 0:
            data=str+"\"" + clientTagDes[0] +"\""
            if(len(clientTagDes)>1):
                for x in clientTagDes[1:]:
                    data=data+" OR "+str + "\"" +x +"\""
        return data


