import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">MyApp</h2>
      <ul className="flex space-x-6">
        <li><Link to="/home" className="hover:text-blue-400">Home</Link></li>
        <li><Link to="/service" className="hover:text-blue-400">Service</Link></li>
        <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
        <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
        <li><Link to="/form" className="hover:text-blue-400">Form</Link></li> {/* ✅ Form link added */}
      </ul>

      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
