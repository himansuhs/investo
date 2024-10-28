import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold">
        Business Blog
      </Link>
      <div>
        <Link to="/" className="px-4">
          Home
        </Link>
        <Link to="/dashboard" className="px-4">
          Dashboard
        </Link>
        <Link to="/register" className="px-4">
          Register
        </Link>
        <button onClick={logout} className="px-4">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
