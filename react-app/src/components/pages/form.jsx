import React, { useState } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";

const Validation = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Error! Product name is required.";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
    errors.name = "Error! Product name must contain only letters and spaces.";
  } else if (formData.name.length > 20) {
    errors.name = "Error! Product name must be less than or equal to 20 characters.";
  }

  if (!formData.price.trim()) {
    errors.price = "Error! Product price is required.";
  } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
    errors.price = "Error! Product price must be a positive number.";
  }

  if (!formData.description.trim()) {
    errors.description = "Error! Product description is required.";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.description)) {
    errors.description = "Error! Product description must be a string.";
  } else if (formData.description.length > 30) {
    errors.description = "Error! Product description must be less than 30 characters.";
  }

  return errors;
};

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", price: "", description: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setMessage("");

    const validationErrors = Validation(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const token = localStorage.getItem("token"); // 🔹 Get JWT token
        if (!token) {
          navigate("/login"); // Redirect if not logged in
          return;
        }

        const response = await fetch("http://localhost:3000/api/products/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔹 Send token
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        setFormData({ name: "", price: "", description: "" });
        setMessage("Form submitted successfully!");
      } catch (error) {
        console.error(error);
        setMessage("Error submitting form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 bg-gray-700 text-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Add Product
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block font-medium mb-1">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product Name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="price" className="block font-medium mb-1">Product Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product Price"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block font-medium mb-1">Product Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product Description"
              rows="3"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <Button text={isSubmitting ? "Submitting..." : "Submit"} type="submit" disabled={isSubmitting} />
          <Button text="View Added Products" onClick={() => navigate("/products")} />

          {message && <p className="text-sm mt-2 text-center text-green-400">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Form;
