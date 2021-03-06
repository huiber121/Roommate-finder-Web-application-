import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./room-details.css";
import RoomBadge from "../../components/room-details/badge";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import mapboxGl from "mapbox-gl";
import axiosInstance from "../../axios-config";
import RoomPlaceholder from "../../assets/images/room-placeholder.png";

const RoomDetails = () => {
  const { id } = useParams();
  const [RoomData, setRoomData] = useState(null);

  const updateMap = async (zipCode) => {
    mapboxGl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const mapboxZipData = await axiosInstance.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`,
      {
        withCredentials: false,
      }
    );
    if (mapboxZipData.status == 200) {
      const center = mapboxZipData.data.features[0].center;
      console.log(center);
      const map = new mapboxGl.Map({
        container: "map-container",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 12,
      });
    }
  };

  const fetchData = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_HOST_BASE}/api/showRoom?RoomID=${id}`
    );
    if (data.data) {
      setRoomData(data.data);
      console.log(data.data);
      setTimeout(() => {
        updateMap(data.data.zipcode);
      }, 1000);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  if (RoomData) {
    return (
      <div className="columns is-mobile is-gapless is-centered">
        <div className="is-11-mobile is-three-quarters-tablet is-half-desktop">
          {RoomData ? (
            <Carousel className="carousel">
              {RoomData.roommedia.length > 0 ? (
                RoomData.roommedia.map((image) => (
                  <div key={image}>
                    <img src={image} />
                  </div>
                ))
              ) : (
                <div className="">
                  <img src={RoomPlaceholder} />
                </div>
              )}
            </Carousel>
          ) : null}
          <div>
            <div className="is-flex is-flex-direction-row	is-flex-wrap-nowrap">
              <div className="has-background-link has-text-white type-tag has-text-weight-bold is-size-6">
                {RoomData.type}
              </div>
              <div className="ml-4">
                <Link
                  to={`/message-room/${RoomData.lister}`}
                  className="button is-info"
                >
                  <span className="icon is-small">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ height: "1.2rem", width: "1.2rem" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </span>
                  <span className="ml-3 has-text-weight-bold">
                    Message Lister
                  </span>
                </Link>
              </div>
            </div>
            <h1 className="is-size-2 has-text-weight-bold	">
              {RoomData.location} - {RoomData.zipcode}
            </h1>
            <h2 className="is-size-3 has-text-weight-semibold">
              {RoomData.numbedrooms}Bed / {RoomData.numbathrooms}Bath (
              {parseFloat(RoomData.size).toFixed(0)} sq. ft.)
            </h2>
            <h3 className="is-size-3 has-text-weight-medium">
              Rent - ${RoomData.price}
            </h3>
          </div>
          <div id="map-container"></div>
          <div>
            <h3 className="mt-5 is-size-3 has-text-weight-semibold">
              Features
            </h3>
            <div className="columns is-multiline is-5 is-mobile">
              {RoomData.tags.split(",").map((tag) => (
                <div className="column is-3" key={tag}>
                  <RoomBadge roomTag={tag.trim()} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mt-5 is-size-3 has-text-weight-semibold">
              More Information
            </h3>
            <p className="is-size-4 has-text-weight-medium">
              {RoomData.description}
            </p>
          </div>
          <div className="is-flex mt-5 mb-5 is-flex-direction-row is-justify-content-space-between">
            <WhatsappShareButton
              title={`${RoomData.location} - ${RoomData.zipCode}`}
            >
              <WhatsappIcon size={45} round />
            </WhatsappShareButton>
            <FacebookShareButton
              title={`${RoomData.location} - ${RoomData.zipCode}`}
            >
              <FacebookIcon size={45} round />
            </FacebookShareButton>
            <FacebookMessengerShareButton
              title={`${RoomData.location} - ${RoomData.zipCode}`}
            >
              <FacebookMessengerIcon size={45} round />
            </FacebookMessengerShareButton>
            <TwitterShareButton
              title={`${RoomData.location} - ${RoomData.zipCode}`}
            >
              <TwitterIcon size={45} round />
            </TwitterShareButton>
            <EmailShareButton
              title={`${RoomData.location} - ${RoomData.zipCode}`}
            >
              <EmailIcon size={45} round />
            </EmailShareButton>
            <RedditShareButton
              title={`${RoomData.location} - ${RoomData.zipCode}`}
            >
              <RedditIcon size={45} round />
            </RedditShareButton>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="columns is-centered mt-5">
        <div className="column">
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
        </div>
      </div>
    );
  }
};

function ArrowLeft(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={"arrow arrow--left" + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  );
}

function ArrowRight(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={"arrow arrow--right" + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
  );
}

export default RoomDetails;
