import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-700 text-white">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl mt-2">Page Not Found</h2>
      <p className="mt-2">The page you are looking for does not exist.</p>
      
      {/* Back to Home Button */}
      
      <Link to="/Login" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Go to Login
      </Link>
    </div>
  );
}

export default NotFound;
