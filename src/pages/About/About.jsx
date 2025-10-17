import React from "react";
import "./About.css";
import user from "../../assets/user-3.png";

const About = () => {
  return (
    <div className="about">
      <div className="about-right">
        <h2>ABOUT US</h2>
        <p>
          PriceWise is an intelligent price comparison platform built to help
          users find the best deals across various online stores. We aim to make
          your shopping experience smarter by saving time, money, and effort.
        </p>
        <h2>OUR MISSION</h2>
        <p>
          Our mission is to simplify online shopping by delivering real-time
          price comparisons, deal alerts, and smart recommendations—empowering
          users to make confident, cost-effective choices.
        </p>
        <h2>OUR GOAL</h2>
        <p>
          We aim to become the leading shopping companion by continuously
          improving our features, expanding store coverage, and making price
          tracking accessible and effortless for all users.
        </p>
      </div>
      <div className="about-left">
        <img className="about-img" src={user} alt="" />
      </div>
    </div>
  );
};

export default About;
