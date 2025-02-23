import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SearchResults() {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-backend-w87v.onrender.com/api/v1/products/search?query=${query}`
        );
        setProducts(response.data); // ✅ Backend se search results fetch ho rahe hain
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading)
    return <p className="text-center text-white mt-20">Searching...</p>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 pt-24">
      <h2 className="text-3xl font-bold text-center mb-6">
        Search Results for "{query}"
      </h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-gray-800 p-4 rounded-lg">
              <img
                src={product.image} // ✅ Backend se image le raha hai
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-4 text-sm font-semibold text-center">
                {product.name}
              </h3>
              <p className="text-gray-400 text-center">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
