import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";
import { Link } from "react-router-dom";
import "./TechnologyProduct.css";

const TechnologyProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const res = await fetch(`${API_BASE}/products?category=technology`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching technology:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTech();
  }, []);

  if (loading) return <p>Loading technology...</p>;

  return (
    <div className="tech-page">
      <h2>Technology Products</h2>
      <div className="product-grid">
        {products.map((p) => (
          <Link to={`/technology/${p._id}`} key={p._id} className="product-card">
            <h3>{p.title}</h3>
            <p>Rs {p.retailers?.[0]?.price}</p>
            <small>{p.retailers?.[0]?.retailer_name}</small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TechnologyProduct;
