import React, { useContext } from "react";
import "./ProductItem.css";
import { FaHeart } from "react-icons/fa";
import { assets } from "../../assets/assets";
import { storeContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromcart } = useContext(storeContext);
  const navigate = useNavigate();

  return (
    <div
      className="product-item"
      onClick={() => navigate(`/shoesDetail/${id}`)}
    >
      <div className="product-item-img-container">
        <img className="product-item-image" src={image} alt="" />
        {/* {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="product-item-counter">
            <img
              onClick={() => removeFromcart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )} */}
        <FaHeart className="add" />
      </div>
      <div className="product-item-info">
        <div className="product-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="product-item-desc">{description}</p>
        {/* <p className="product-item-price">Rs {price}</p> */}
      </div>
    </div>
  );
};

export default ProductItem;
