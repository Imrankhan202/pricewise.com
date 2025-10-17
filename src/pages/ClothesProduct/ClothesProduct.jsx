import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";
import { Link } from "react-router-dom";
import "./ClothesProduct.css";

const ClothesProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await fetch(`${API_BASE}/products?category=clothes`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching clothes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClothes();
  }, []);

  if (loading) return <p>Loading clothes...</p>;

  return (
    <div className="clothes-page">
      <h2>Clothes Collection</h2>
      <div className="product-grid">
        {products.map((p) => (
          <Link to={`/clothes/${p._id}`} key={p._id} className="product-card">
            <h3>{p.title}</h3>
            <p>Rs {p.retailers?.[0]?.price}</p>
            <small>{p.retailers?.[0]?.retailer_name}</small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClothesProduct;
