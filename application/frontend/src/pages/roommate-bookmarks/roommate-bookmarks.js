import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios-config";
import RoommateCard from "../../components/search/roommate-card";
import NoRoommatesFound from "../../assets/images/no-roommates-found.png";

const RoommateBookmarks = () => {
  const [roommateData, setRoommateData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getBookmarks = async () => {
    const data = await axiosInstance.get(`/api/showAllUserBookmark`, {
      withCredentials: true,
    });
    console.log(data);
    if (data.data !== "please login") {
      setRoommateData(data.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div>
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered">
          <h1 className="is-size-1 has-text-weight-bold">Roommate Bookmarks</h1>
          <h5 className="is-size-5 has-text-weight-bold">
            Here's a list of all your roommate bookmarks.
          </h5>
        </div>
      </div>
      {isLoading ? (
        <div className="sk-circle">
          <div className="sk-circle1 sk-child"></div>
          <div className="sk-circle2 sk-child"></div>
          <div className="sk-circle3 sk-child"></div>
          <div className="sk-circle4 sk-child"></div>
          <div className="sk-circle5 sk-child"></div>
          <div className="sk-circle6 sk-child"></div>
          <div className="sk-circle7 sk-child"></div>
          <div className="sk-circle8 sk-child"></div>
          <div className="sk-circle9 sk-child"></div>
          <div className="sk-circle10 sk-child"></div>
          <div className="sk-circle11 sk-child"></div>
          <div className="sk-circle12 sk-child"></div>
        </div>
      ) : (
        <div className="columns is-mobile is-centered is-multiline is-2">
          {roommateData && roommateData.length > 0 ? (
            roommateData.map((roommate) => (
              <RoommateCard
                roommate={roommate}
                key={roommate.username + `${Math.random() * 100}`}
              />
            ))
          ) : (
            <div>
              <img src={NoRoommatesFound} className="mt-5 mb-3" />
              <div className="has-text-danger has-text-weight-semibold is-size-5">
                No Bookmarks found. Bookmark roommates to see them here.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoommateBookmarks;
