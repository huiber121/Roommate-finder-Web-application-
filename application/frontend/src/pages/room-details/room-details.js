import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./room-details.css";
import RoomBadge from "../../components/room-details/badge";
import axios from "axios";
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

// const RoomData = {
//   available: 0,
//   description: "Has not rats",
//   lister: 1,
//   listtime: "2021-09-01",
//   location: "SOmewhere Apartment",
//   numbathrooms: 1,
//   numbedrooms: 3,
//   price: 1200,
//   room_id: 1,
//   roommedia: [
//     "https://group-4-bucket.s3.us-east-2.amazonaws.com/public/title_images/r0_jasmine-huang-TZPeoM7uKfc-unsplash.jpg",
//     "https://group-4-bucket.s3.us-east-2.amazonaws.com/public/title_images/r1_blake-woolwine-3mlg5BRUifM-unsplash.jpg",
//   ],
//   size: "1700.00",
//   tags: "no pets,yes smoking,yes disability friendly,no college oriented,yes parking availability",
//   type: "Apartment",
//   zipcode: 92300,
// };

const RoomDetails = () => {
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
    loop: true,
  });
  const [RoomData, setRoomData] = useState();

  const updateMap = async (zipCode) => {
    mapboxGl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const mapboxZipData = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
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

      setTimeout(() => {
        updateMap(data.data.zipcode);
        setCurrentSlide(0);
      }, 500);
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
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {RoomData.roommedia.map((image) => (
                <div className="keen-slider__slide slider-slide">
                  <img src={image} />
                </div>
              ))}
            </div>
            {slider && (
              <>
                <ArrowLeft
                  onClick={(e) => e.stopPropagation() || slider.prev()}
                  disabled={currentSlide === 0}
                />
                <ArrowRight
                  onClick={(e) => e.stopPropagation() || slider.next()}
                  disabled={currentSlide === slider.details().size - 1}
                />
              </>
            )}
          </div>
          {slider && (
            <div className="dots">
              {[...Array(slider.details().size).keys()].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      slider.moveToSlideRelative(idx);
                    }}
                    className={"dot" + (currentSlide === idx ? " active" : "")}
                  />
                );
              })}
            </div>
          )}
          <div>
            <div className="has-background-link has-text-white type-tag has-text-weight-bold is-size-6">
              {RoomData.type}
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
