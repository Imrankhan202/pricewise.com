import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div className="header" id="header">
      <div className="header-contents">
        <div className="sub-data">
          <h2>Shop Smart, Pay less</h2>
          <p>
            PriceWise empowers you to make smarter purchasing decisions, save
            money effortlessly, and enjoy user-friendly experience—one smart
            deal at a time.
          </p>
        </div>
        <Link to="/allProduct">
          <button>Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
