import React from "react";
import "./about.css";
import Sanket from "../../assets/images/sanket.png";
import Swetha from "../../assets/images/swetha.png";
import Gabriel from "../../assets/images/Gabriel.jpg";
import Georgina from "../../assets/images/Georgina.JPG";
import Zhiling from "../../assets/images/Zhiling.png";
import William from "../../assets/images/William.jpg";
import Placeholder from "../../assets/images/placeholder.png";
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
      <div className="row center-xs card-row">
        {/* Georgina Shirazi */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("georgina")}
        >
          <div className="card">
            <img src={Georgina} alt="Georgina Shirazi" className="card-image" />
            <h1 className="card-title">Georgina Shirazi</h1>
            <p className="card-description">Leader & Github Master</p>
          </div>
        </div>
        {/* Swetha C */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("swetha")}
        >
          <div className="card">
            <img src={Swetha} alt="Swetha C" className="card-image" />
            <h1 className="card-title">Swetha C</h1>
            <p className="card-description">Backend Developer</p>
          </div>
        </div>
        {/* Zhiling Huang */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("zhiling")}
        >
          <div className="card">
            <img src={Zhiling} alt="Zhiling Huang" className="card-image" />
            <h1 className="card-title">Zhiling Huang</h1>
            <p className="card-description">Backend Developer</p>
          </div>
        </div>
        {/* William Zhong */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("william")}
        >
          <div className="card">
            <img src={William} alt="William Zhong" className="card-image" />
            <h1 className="card-title">William Zhong</h1>
            <p className="card-description">Frontend Developer</p>
          </div>
        </div>
        {/* Sanket Naik */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("sanket")}
        >
          <div className="card">
            <img src={Sanket} alt="Sanket Naik" className="card-image" />
            <h1 className="card-title">Sanket Naik</h1>
            <p className="card-description">Frontend Developer</p>
          </div>
        </div>
        {/* Gabriel Pena */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("gabriel")}
        >
          <div className="card">
            <img src={Gabriel} alt="Gabriel Pena" className="card-image" />
            <h1 className="card-title">Gabriel Pena</h1>
            <p className="card-description">Database Administrator</p>
          </div>
        </div>
        {/* Eanguy Eng */}
        <div
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          onClick={() => navigate("eanguy")}
        >
          <div className="card">
            <img src={Placeholder} alt="Eanguy Eng" className="card-image" />
            <h1 className="card-title">Eanguy Eng</h1>
            <p className="card-description">Database Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};
