import React from "react";
import "./about.css";
import Sanket from "../../assets/images/sanket.png";
import Swetha from "../../assets/images/swetha.png";
import Gabriel from "../../assets/images/Gabriel.jpg";
import Georgina from "../../assets/images/Georgina.jpg";
import Zhiling from "../../assets/images/Zhiling.png";
import William from "../../assets/images/William.jpg";
import Eanguy from "../../assets/images/eanguy-card.png";
import { useHistory } from "react-router";

export const About = () => {
  let history = useHistory();

  const navigate = (path) => {
    window.scrollTo(0, 0);
    history.push(`/about/${path}`);
  };

  return (
    <div className="about-container">
      <div className="header-container">
        <h1 className="title">Team 04</h1>
      </div>
      <div className="row center-xs about-card-row">
        {/* Georgina Shirazi */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("georgina")}
        >
          <div className="about-card">
            <img
              src={Georgina}
              alt="Georgina Shirazi"
              className="about-card-image"
            />
            <h1 className="about-card-title">Georgina Shirazi</h1>
            <p className="about-card-description">Leader & Github Master</p>
          </div>
        </div>
        {/* Swetha C */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("swetha")}
        >
          <div className="about-card">
            <img src={Swetha} alt="Swetha C" className="about-card-image" />
            <h1 className="about-card-title">Swetha C</h1>
            <p className="about-card-description">Backend Developer</p>
          </div>
        </div>
        {/* Zhiling Huang */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("zhiling")}
        >
          <div className="about-card">
            <img
              src={Zhiling}
              alt="Zhiling Huang"
              className="about-card-image"
            />
            <h1 className="about-card-title">Zhiling Huang</h1>
            <p className="about-card-description">Backend Developer</p>
          </div>
        </div>
        {/* William Zhong */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("william")}
        >
          <div className="about-card">
            <img
              src={William}
              alt="William Zhong"
              className="about-card-image"
            />
            <h1 className="about-card-title">William Zhong</h1>
            <p className="about-card-description">Frontend Developer</p>
          </div>
        </div>
        {/* Sanket Naik */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("sanket")}
        >
          <div className="about-card">
            <img src={Sanket} alt="Sanket Naik" className="about-card-image" />
            <h1 className="about-card-title">Sanket Naik</h1>
            <p className="about-card-description">Frontend Developer</p>
          </div>
        </div>
        {/* Gabriel Pena */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("gabriel")}
        >
          <div className="about-card">
            <img
              src={Gabriel}
              alt="Gabriel Pena"
              className="about-card-image"
            />
            <h1 className="about-card-title">Gabriel Pena</h1>
            <p className="about-card-description">Database Administrator</p>
          </div>
        </div>
        {/* Eanguy Eng */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("eanguy")}
        >
          <div className="about-card">
            <img src={Eanguy} alt="Eanguy Eng" className="about-card-image" />
            <h1 className="about-card-title">Eanguy Eng</h1>
            <p className="about-card-description">Database Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};
