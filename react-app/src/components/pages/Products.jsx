// src/components/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔹 Get JWT token
        if (!token) {
          navigate("/login"); // Redirect if not logged in
          return;
        }

        const res = await fetch("http://localhost:3000/api/products/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔹 Send token
          },
        });

        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setMessage("Error fetching products. Please try again.");
      }
      setLoading(false);
    };

    fetchProducts();
  }, [navigate]);

  if (loading) return <p className="text-white text-center mt-10">Loading products...</p>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Added Products</h1>

      {message && <p className="text-red-400 text-center mb-4">{message}</p>}

      {products.length === 0 ? (
        <p className="text-center">No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product._id} className="p-4 bg-gray-700 rounded-lg shadow">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/form")}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Product
        </button>
      </div>
    </div>
  );
}

export default Products;
