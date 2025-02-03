import React from "react";
import "./Home.css";
import sampleImage from "./home.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <img src={sampleImage} alt="Sample" className="home-image" />
        <div className="home-text">
          <h1>Welcome to the LSMAA!</h1>
          <p>
            This is an adaptive authentication system built using learning state machine concept.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
