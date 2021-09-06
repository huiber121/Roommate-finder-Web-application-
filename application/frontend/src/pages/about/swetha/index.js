import React from "react";
import SwethaImg from "../../../assets/images/swetha.png";

const Swetha = () => {
  return (
    <div>
      <div className="header-row row center-xs center-sm center-md center-lg">
        <div className="col-xs-8 col-sm-6 col-md-3 col-lg-3">
          <img src={SwethaImg} alt="Swetha" className="header-image" />
        </div>
      </div>
      <div className="row header-row center-xs center-sm center-md center-lg">
        <div className="col-xs-12">
          <h1 className="header-title">Swetha</h1>
        </div>
        <div className="col-xs-12">
          <h3 className="header-subtitle">Backend Developer</h3>
        </div>
      </div>
      <div className="row description-row center-xs center-sm center-md center-lg">
        <div className="col-xs-11 col-sm-8 col-md-6 col-lg-6">
          <p className="description">
            Hello..!! I'm Swetha and I'm a backend developer for team 4. I'm a senior at SF State and I'll be graduating next May.
            <br />
            <br />
            JAVA is my proficient programming language, and I have worked in a couple of frontend projects. Some of the technologies I know
            are Spring Boot, GraphQL, Netflix DGS, REST API development, Hadoop, Kafka, Spark, Logging frameworks, Unit tests automation using Junit and Mockito.
            There are many more technologies which I'm learning such as Python, HIVE.. and so on..!!!
          </p>
        </div>
      </div>
      {/* Waves */}
      <div className="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,0L48,32C96,64,192,128,288,138.7C384,149,480,107,576,112C672,117,768,171,864,208C960,245,1056,267,1152,272C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Swetha;
