import React, { useContext } from "react";
import "./Category.css";
import { storeContext } from "../../context/storeContext";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Category = () => {
  const { category } = useContext(storeContext);

  return (
    <div className="category-display" id="category-display">
      <h2>Explore Categories</h2>
      <div className="container">
        {/* <Link */}
        <Link to="/shoesProduct" className="category-display-list">
          <div className="category-item">
            <div className="category-item-img-container">
              <img
                className="category-item-image"
                src={category[0].image}
                alt=""
              />
            </div>
            <div className="category-item-info">
              <div className="category-item-name-rating">
                <p>{category[0].name}</p>
                <img src={assets.rating_starts} alt="" />
              </div>
              <p className="category-item-desc">{category[0].description}</p>
            </div>
          </div>
        </Link>
        <Link to="/cosmeticProduct" className="category-display-list">
          <div className="category-item">
            <div className="category-item-img-container">
              <img
                className="category-item-image"
                src={category[1].image}
                alt=""
              />
            </div>
            <div className="category-item-info">
              <div className="category-item-name-rating">
                <p>{category[1].name}</p>
                <img src={assets.rating_starts} alt="" />
              </div>
              <p className="category-item-desc">{category[1].description}</p>
            </div>
          </div>
        </Link>
        <Link to="/clothesProduct" className="category-display-list">
          <div className="category-item">
            <div className="category-item-img-container">
              <img
                className="category-item-image"
                src={category[2].image}
                alt=""
              />
            </div>
            <div className="category-item-info">
              <div className="category-item-name-rating">
                <p>{category[2].name}</p>
                <img src={assets.rating_starts} alt="" />
              </div>
              <p className="category-item-desc">{category[2].description}</p>
            </div>
          </div>
        </Link>
        <Link to="/technologyProduct" className="category-display-list">
          <div className="category-item">
            <div className="category-item-img-container">
              <img
                className="category-item-image"
                src={category[3].image}
                alt=""
              />
            </div>
            <div className="category-item-info">
              <div className="category-item-name-rating">
                <p>{category[3].name}</p>
                <img src={assets.rating_starts} alt="" />
              </div>
              <p className="category-item-desc">{category[3].description}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Category;

{
  /* {category.map((item, index) => {
  return (
    <CategoryItem
      key={index}
      id={item._id}
      name={item.name}
      description={item.description}
      price={item.price}
      image={item.image}
    />
  );
})} */
}
