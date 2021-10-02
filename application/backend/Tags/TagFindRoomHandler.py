
from TagsHandler import TagsHandler
from TagCouple import TagCouple
from RoomListing import RoomListing



class TagFindRoomHandler:    
    def findRoomListings(tagDes):
        tag=TagsHandler()
        tagids=tag.findingTagIDs(tagDes)
        tagCouple = TagCouple()
        roomids = tagCouple.findTheRoomListing(tagids)
        Roomfn = RoomListing()
        Rooms= Roomfn.findRoomFromDatabase(roomids)
        return Rooms

