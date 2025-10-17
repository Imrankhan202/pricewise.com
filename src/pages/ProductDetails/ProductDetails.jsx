import "./ProductDetails.css";
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storeContext } from "../../context/storeContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProduct } = useContext(storeContext);

  // for rating
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMoreImages, setShowMoreImages] = useState(false);

  const product = allProduct.find((item) => item._id === id);

  // Mock data for buying options (you can replace with real data)
  const buyingOptions = [
    {
      retailer: "TeleMart",
      condition: "Used",
      updated: "12 hours ago",
      shipping: "Free Shipping",
      payment: "Affirm",
      savings: "2% Cash Back",
      coupon: "Verified Coupon Available",
      price: "Rs 700.95",
      link: "#",
    },
    {
      retailer: "Shophive",
      condition: "New",
      updated: "18 days ago",
      shipping: "Free Shipping",
      payment: "Affirm",
      savings: "No Cash Back",
      coupon: "",
      price: "Rs 890.00",
      link: "#",
    },
    {
      retailer: "Clicky",
      condition: "New",
      updated: "10 days ago",
      shipping: "",
      payment: "",
      savings: "No Cash Back",
      coupon: "",
      price: "Rs 1010.55",
      link: "#",
    },
    {
      retailer: "Daraz",
      condition: "New",
      updated: "18 days ago",
      shipping: "Free Shipping",
      payment: "Affirm",
      savings: "No Cash Back",
      coupon: "",
      price: "Rs 1400.00",
      link: "#",
    },
    {
      retailer: "Temu",
      condition: "New",
      updated: "18 days ago",
      shipping: "Free Shipping",
      payment: "Affirm",
      savings: "No Cash Back",
      coupon: "",
      price: "Rs 1500.00",
      link: "#",
    },
    {
      retailer: "Lootlo",
      condition: "Used",
      updated: "12 hours ago",
      shipping: "Free Shipping",
      payment: "Affirm",
      savings: "2% Cash Back",
      coupon: "Verified Coupon Available",
      price: "Rs 1150.95",
      link: "#",
    },
  ];

  // for notification
  const [targetPrice, setTargetPrice] = useState("");
  const [alertSet, setAlertSet] = useState(false);
  const [currentPrice] = useState(100); // Hardcoded current price

  const handleSetAlert = (e) => {
    e.preventDefault();
    if (!targetPrice || isNaN(targetPrice)) {
      alert("Please enter a valid price");
      return;
    }
    // Dummy functionality - just shows the alert in UI
    setAlertSet(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top when component mounts
  }, []);

  if (!product) {
    return (
      <div className="p-4">
        <h2>Product not found</h2>
        <button
          onClick={() => navigate("/allProduct")}
          className="text-blue-500 underline"
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  // If product has multiple images, use them, otherwise create an array with the single image
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="product-details">
      <button onClick={() => navigate(-1)} className="btn">
        ← Back
      </button>

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="main-image-container">
          <img
            src={productImages[selectedImage]}
            alt={product.name}
            className="img main-image"
          />
        </div>

        <div className="thumbnail-container">
          {/* {productImages
            .slice(0, showMoreImages ? productImages.length : 4)
            .map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                className={`thumbnail ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))} */}

          {productImages.length > 4 && (
            <button
              className="show-more-btn"
              onClick={() => setShowMoreImages(!showMoreImages)}
            >
              {`showMoreImages ? 'Show Less' : +${
                productImages.length - 4
              } More`}
            </button>
          )}
        </div>
      </div>
      <div className="set-alert">
        <div className="name-description">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          {/* <p className="product-price">Rs {product.price}</p> */}
        </div>
        <div className="price-alert-container">
          <h3>Set Price Drop</h3>
          <p>Get an alert as soon as it's on sale.</p>

          <div className="current-price">
            <span>Rs {currentPrice}</span>
          </div>

          {!alertSet ? (
            <form onSubmit={handleSetAlert} className="alert-form">
              <div className="alert-flex">
                <div className="price-input">
                  <span>Rs </span>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="Enter target price"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
                <button type="submit" className="btn-alert">
                  Set Alert
                </button>
              </div>
              <p className="login-notice">
                (Note: for notifications, login would be required)
              </p>
            </form>
          ) : (
            <div className="alert-confirmation">
              <p>✅ Demo: Price alert would be set for Rs {targetPrice}</p>
              <p className="demo-note">
                (This is a demo. No actual alert will be sent.)
              </p>
              <button className="btn-alert" onClick={() => setAlertSet(false)}>
                Set New Alert
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Compare Buying Options Section */}
      <div className="buying-options">
        <h2>Compare Buying Options</h2>
        <div className="options-grid">
          {buyingOptions.map((option, index) => (
            <div key={index} className="option-card">
              <div className="retailer-info">
                <h3>{option.retailer}</h3>
                <p>
                  {option.condition} • Updated {option.updated}
                </p>
              </div>

              <div className="option-details">
                {option.shipping && <p>🚚 {option.shipping}</p>}
                {option.payment && <p>💳 {option.payment}</p>}
                {option.savings && <p>💰 {option.savings}</p>}
                {option.coupon && <p className="coupon">🎟 {option.coupon}</p>}

                <p className="price">{option.price}</p>
                <a href={option.link} className="visit-btn">
                  Visit Site →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings and Reviews Section */}
      <div className="ratings">
        <h4 className="font-semibolds">Rate this product:</h4>

        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`star ${star <= rating ? "text-yellow" : "text-gray"}`}
          >
            ★
          </span>
        ))}

        {/* Comment Input */}
        <input
          type="text"
          placeholder="Leave a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="custom-input"
        />

        <p className="login-notice">
          (Note: for rating, login would be required)
        </p>
        <br />

        {/* Submit Button */}
        <button
          onClick={() => {
            if (!comment || rating === 0) return;
            setCommentsList([...commentsList, { rating, comment }]);
            setComment("");
            setRating(0);
          }}
          className="btn"
        >
          Submit
        </button>

        {/* Show Comments and Count */}
        {commentsList.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold">
              All Reviews: ({commentsList.length}{" "}
              {commentsList.length === 1 ? "review" : "reviews"})
            </h4>
            {commentsList.map((c, index) => (
              <div key={index} className="mt-2 border-b pb-2">
                <p>⭐ {c.rating} / 5</p>
                <p>📝 {c.comment}</p>
                <hr className="custom-hr" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
