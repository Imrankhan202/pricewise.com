import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo" src={assets.logo1} alt="" />

          <div className="footer-social-icons">
            <a href="https://www.facebook.com/share/1CH3TN6Sr7/?mibextid=wwXIfr">
              <img src={assets.facebook_icon} alt="" />
            </a>
            <a href="https://x.com">
              <img src={assets.twitter_icon} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/imran-khan-722537252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
              <img src={assets.linkedin_icon} alt="" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <Link to="/" >
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About us</li>
            </Link>
            <Link to="/contact">
              <li>Contact us</li>
            </Link>
            <Link to="/privacy">
              <li>Privacy policy</li>
            </Link>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>03220577117</li>
            <li>kamranullah@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 @ pricewise.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
