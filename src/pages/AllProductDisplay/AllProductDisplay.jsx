import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_BASE } from "../../config";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AllProductDisplay = () => {
  const query = useQuery().get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Error fetching data");
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load results");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search results for “{query}”</h2>

      {loading && <p>Loading results...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && results.length === 0 && !error && <p>No results found.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {results.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={item.image || "/assets/placeholder.png"}
              alt={item.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3 style={{ margin: "10px 0" }}>{item.title}</h3>
            {item.retailers?.map((r, i) => (
              <div key={i} style={{ marginTop: "8px" }}>
                <strong>{r.retailer_name}</strong><br />
                <span style={{ color: "#0077cc", fontWeight: "bold" }}>
                  {r.price} {r.currency}
                </span>
                <br />
                <a
                  href={r.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Product
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductDisplay;
