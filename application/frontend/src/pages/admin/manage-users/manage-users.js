import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axios-config";
import ManageRoommateCard from "../../../components/admin/manage-roommate-card";
import NoRoommatesFound from "../../../assets/images/no-roommates-found.png";

const ManageUsers = () => {
  const [isLoading, setLoading] = useState(true);
  const [roommatesData, setRoommatesData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const data = await axiosInstance.post(`/api/getRoommates`, {});
    console.log(data.data);
    setRoommatesData(data.data);
    setLoading(false);
  };

  const deleteUser = async (user) => {
    const result = await axiosInstance.delete(`/api/deleteUser`, {
      withCredentials: true,
      data: { userid: user.userid },
    });
    // console.log(result);
    if (result.status === 200) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-6">
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
      ) : roommatesData.length > 0 ? (
        <div className="columns is-mobile is-centered is-multiline is-2">
          {roommatesData.map((roommate) => (
            <ManageRoommateCard
              key={roommate.username + Math.random() * 1000}
              roommate={roommate}
              deleteRoommate={(roommate) => deleteUser(roommate)}
            />
          ))}
        </div>
      ) : (
        <div>
          <img src={NoRoommatesFound} className="mt-5 mb-3" />
          <div className="has-text-danger has-text-weight-semibold is-size-5">
            No Rommates found. Please update your search preferences.
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
