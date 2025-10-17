import React, { useState } from "react";
import "./ProductSearch.css";

const API_BASE = "http://127.0.0.1:8000"; // backend base URL

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-section">
      <h2 className="search-title">Compare Prices Instantly 🔍</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products (e.g. Nike Shoes)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Fetching products...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
      {!loading && results.length === 0 && query && !error && <p>No results found.</p>}

      <div className="results-container">
        {results.map((item, index) => (
          <div key={index} className="product-card">
            <img
              src={item.image || "/assets/placeholder.png"}
              alt={item.title}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">{item.title}</h3>
              {item.retailers?.map((r, i) => (
                <div key={i} className="retailer-row">
                  <span className="retailer-name">{r.retailer_name}</span>
                  <span className="retailer-price">
                    {r.price} {r.currency}
                  </span>
                  <a
                    href={r.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-button"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
