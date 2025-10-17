import { useContext } from "react";
import { assets } from "../../assets/assets";
import { FaHeart } from "react-icons/fa";
import "./FoodItem.css";
import { storeContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";
const ProductItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(storeContext);
  const navigate = useNavigate();

  return (
    <div className="food-item" onClick={() => navigate(`/product/${id}`)}>
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
        {/* {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => addToCart(id)}
              alt=""
            />
          </div>
        )} */}

        <FaHeart className="add" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        {/* <p className="food-item-price">Rs {price}</p> */}
      </div>
    </div>
  );
};

export default ProductItem;
