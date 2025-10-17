import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";
import { Link } from "react-router-dom";
import "./CosmeticsProduct.css";

const CosmeticsProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCosmetics = async () => {
      try {
        const res = await fetch(`${API_BASE}/products?category=cosmetics`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching cosmetics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCosmetics();
  }, []);

  if (loading) return <p>Loading cosmetics...</p>;

  return (
    <div className="cosmetics-page">
      <h2>Cosmetics Products</h2>
      <div className="product-grid">
        {products.map((p) => (
          <Link to={`/cosmetics/${p._id}`} key={p._id} className="product-card">
            <h3>{p.title}</h3>
            <p>Rs {p.retailers?.[0]?.price}</p>
            <small>{p.retailers?.[0]?.retailer_name}</small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CosmeticsProduct;
