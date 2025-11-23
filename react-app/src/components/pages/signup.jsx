import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Signup() {
  const navigate = useNavigate(); // Initialize navigate function
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const delay = (d) => new Promise((resolve) => setTimeout(resolve, d * 1000));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await delay(1);
    
    const validationErrors = validation(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.fullname, 
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage("User registered successfully!");
          setTimeout(() => {
            navigate("/login"); // Redirect to login page after success
          }, 1500);
        } else {
          setMessage(data.message || "Registration failed.");
        }
      } catch (error) {
        setMessage("Error connecting to server.");
      }
    }
    setIsSubmitting(false);
  };

  const validation = (formData) => {
    const errors = {};
    if (!formData.fullname.trim()) {
      errors.fullname = "Fullname is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullname)) {
      errors.fullname = "Fullname must contain only letters and spaces.";
    } else if (formData.fullname.length > 20) {
      errors.fullname = "Fullname must be less than or equal to 20 characters.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Error! Enter a valid email";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96 text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block font-medium mb-1">Enter your full name:</label>
          <input
            name="fullname"
            onChange={handleChange}
            value={formData.fullname}
            className="w-full px-3 py-2 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Full Name"
            type="text"
          />
          {errors.fullname && <p className="text-red-500">{errors.fullname}</p>}

          <label className="block font-medium mb-1">Enter your email:</label>
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="w-full px-3 py-2 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            type="email"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <label className="block font-medium mb-1">Create password:</label>
          <input
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="w-full px-3 py-2 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            type="password"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <label className="block font-medium mb-1">Repeat password:</label>
          <input
            name="repeatPassword"
            onChange={handleChange}
            value={formData.repeatPassword}
            className="w-full px-3 py-2 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Repeat password"
            type="password"
          />
          {errors.repeatPassword && <p className="text-red-500">{errors.repeatPassword}</p>}

          <button
            className="w-full bg-blue-500 text-white py-2 mt-5 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
          {message && <p className="text-green-400 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
