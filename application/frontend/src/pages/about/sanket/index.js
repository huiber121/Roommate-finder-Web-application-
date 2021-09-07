import React from "react";
import SanketImage from "../../../assets/images/sanket.png";
import "./sanket.css";

const Sanket = () => {
  return (
    <div>
      <div className="header-row row center-xs center-sm center-md center-lg">
        <div className="col-xs-12 col-sm-12">
          <img src={SanketImage} alt="Sanket Naik" className="header-image" />
        </div>
      </div>
      <div className="row header-row center-xs center-sm center-md center-lg">
        <div className="col-xs-12">
          <h1 className="header-title">Sanket Naik</h1>
        </div>
        <div className="col-xs-12">
          <h3 className="header-subtitle">Frontend Developer</h3>
        </div>
      </div>
      <div className="row description-row center-xs center-sm center-md center-lg">
        <div className="col-xs-11 col-sm-8 col-md-6 col-lg-6">
          <p className="description">
            Hey There! 👋 My name is Sanket Naik and I am the frontend developer
            for Team 04. I am a first semester graduate student and I have
            completed my Bachelor's of Engineering in Computer Engineering from
            Mumbai University <br />
            <br /> I have experience working with React, Next.js and CSS
            frameworks such as TailwindCSS, Bootstrap and Material UI. I will be
            responsible for the frontend of Team 04's website.
          </p>
        </div>
      </div>
      {/* Waves */}
      <div className="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,0L48,32C96,64,192,128,288,138.7C384,149,480,107,576,112C672,117,768,171,864,208C960,245,1056,267,1152,272C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Sanket;
