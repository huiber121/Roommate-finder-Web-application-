
from flask import Flask,request,json
import sys
sys.path.append("./Tags")
from Tags.TagFindRoomHandler import TagFindRoomHandler

##Todo  still missing the error handler

app =Flask(__name__)

@app.route("/RoomListing")

def RoomListing():
    word =request.args.get("Tags")
    list =None
    if(word.count(",") == 0):
        list= [word]
    else:
        list=word.split(",")
    
    data = TagFindRoomHandler.findRoomListings(list)
    response= app.response_class(
        response = json.dumps(data),
        status= 200,
        mimetype = 'application/json'
    )
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)

