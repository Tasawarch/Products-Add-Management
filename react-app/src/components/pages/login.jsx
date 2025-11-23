import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Updated URL to match backend
  const API_URL = "http://localhost:3000/api/users/login";

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    // Simple validation
    if (!loginData.email.trim()) {
      setErrors({ email: "Email is required!" });
      return;
    }
    if (!loginData.password.trim()) {
      setErrors({ password: "Password is required!" });
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token); // Save JWT token
        setMessage("Login successful!");

        setTimeout(() => {
          navigate("/form"); // Redirect to form page
        }, 1000);
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96 text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <label className="block font-medium mb-1">Email:</label>
          <input
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-400 font-semibold">{errors.email}</p>
          )}

          {/* Password Input with Toggle */}
          <label className="block font-medium mb-1">Password:</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 font-semibold">{errors.password}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>

          {/* Message */}
          {message && (
            <p className="text-green-400 text-center mt-2">{message}</p>
          )}

          {/* Sign Up Link */}
          <p className="text-center mt-4">Not a Member?</p>
          <Link
            to="/signup"
            className="block text-center text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
