import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios-config";

const Alerts = () => {
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(null);

  const fetchAlerts = async () => {
    try {
      const data = await axiosInstance.post(
        `${process.env.REACT_APP_HOST_BASE}/api/getNotifications`,
        {},
        { withCredentials: true }
      );
      if (data.status !== 200) {
        setError(true);
      } else {
        console.log(data.data);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchAlerts();
  });

  return (
    <div>
      <div className="columns is-mobile is-centered is-gapless">
        <div className="column is-11-mobile is-three-quarters-tablet is-half-desktop has-text-centered">
          <h1 className="is-size-1 has-text-weight-bold">Alerts</h1>
          <h5 className="is-size-5 has-text-weight-bold">
            Here are all your latest alerts.
          </h5>
        </div>
      </div>
      {hasError ? (
        <div className="has-text-centered p-5 has-text-danger has-text-weight-bold is-size-5">
          Unable to load your alerts. Please make sure you have set your room
          and roommate preferences first.
        </div>
      ) : null}
    </div>
  );
};

export default Alerts;
