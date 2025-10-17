import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";
import { Link } from "react-router-dom";
import "./ShoesProduct.css";

const ShoesProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const res = await fetch(`${API_BASE}/products?category=shoes`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching shoes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShoes();
  }, []);

  if (loading) return <p>Loading shoes...</p>;

  return (
    <div className="shoes-page">
      <h2>All Shoes</h2>
      <div className="product-grid">
        {products.map((p) => (
          <Link to={`/shoesDetail/${p._id}`} key={p._id} className="product-card">
            <h3>{p.title}</h3>
            <p>Rs {p.retailers?.[0]?.price}</p>
            <small>{p.retailers?.[0]?.retailer_name}</small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShoesProduct;
