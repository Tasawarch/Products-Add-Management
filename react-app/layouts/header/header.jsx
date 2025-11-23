import React from 'react'
import { Link } from "react-router-dom";


function Header() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MyApp</h1>
          <div className="space-x-4">
            <Link to="/signup" className="hover:text-blue-400">
              Sign Up
            </Link>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
