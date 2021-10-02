
class Room:
    def __init__(self,roomId,Lister,Location,ZipCode,Type,Description,Price,ListTime):
        self.roomId =roomId
        self.Lister = Lister
        self.Location =Location
        self.ZipCode =ZipCode
        self.Type = Type
        self.Description =Description
        self.Price =Price
        self.ListTime=ListTime
    
    def setRoomID(self,roomId):
        self.roomId=roomId
    def setLister(self,Lister):
        self.Lister=Lister
    def setLocation(self,Location):
        self.Location=Location
    def setZipCode(self,ZipCode):
        self.ZipCode=ZipCode   
    def setType(self,Type):
        self.Type=Type
    def setDescription(self,Description):
        self.Description=Description
    def setPrice(self,Price):
        self.Price=Price
    def setListTime(self,ListTime):
        self.ListTime=ListTime
    
    def Getobject(self):
        Roomdetil = {
            'roomId':self.roomId,
            'Lister':self.Lister,
            'Location':self.Location,
            'ZipCode':self.ZipCode,
            'Type':self.Type,
            'Description':self.Description,
            'Price':self.Price,
            'ListTime':self.ListTime
        }
        return Roomdetil