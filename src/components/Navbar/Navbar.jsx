import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { API_BASE } from "../../config";


const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("Home");

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const boxRef = useRef(null);

  // fetch suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/suggest?query=${encodeURIComponent(searchTerm)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
        }
      } catch (err) {
        console.error("Suggest error:", err);
      }
    };

    const delay = setTimeout(fetchSuggestions, 200); // small debounce
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/allProduct?q=${encodeURIComponent(searchTerm)}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    navigate(`/allProduct?q=${encodeURIComponent(title)}`);
    setShowSuggestions(false);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo1} alt="" />
      </Link>

      <ul className="navbar-menu">
        {/* your existing links unchanged */}
        <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href="#category-display" onClick={() => setMenu("Shop")} className={menu === "Shop" ? "active" : ""}>Shop</a>
        <a href="#testimonials" onClick={() => setMenu("Testimonial")} className={menu === "Testimonial" ? "active" : ""}>Testimonial</a>
        <Link to="/about" onClick={() => setMenu("About Us")} className={menu === "About Us" ? "active" : ""}>About Us</Link>
        <Link to="/contact" onClick={() => setMenu("Contact Us")} className={menu === "Contact Us" ? "active" : ""}>Contact Us</Link>
      </ul>

      <div className="navbar-right" ref={boxRef}>
        {/* SEARCH WITH DROPDOWN */}
        <form className="search" onSubmit={handleSearch} autoComplete="off">
          <input
            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setShowSuggestions(true); }}
          />
          <button type="submit" style={{ background: "none", border: "none" }}>
            <img src={assets.search_icon} alt="Search" />
          </button>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestion-box">
              {suggestions.map((s) => (
                <li key={s._id} onClick={() => handleSuggestionClick(s.title)}>
                  {s.title}
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className="navbar-search-icon">
          <FaHeart className="add" />
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
