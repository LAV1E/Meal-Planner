
//working perfectly fine code
import React, { useState, useContext } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom/client";

import { AuthContext } from "../context/AuthContext";
import AddRecipe from "./AddRecipe.jsx";

const MySwal = withReactContent(Swal);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, logout } = useContext(AuthContext); // ✅ include token
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Planner", path: "/planner" },
    { name: "About", path: "/about" },
  ];

  // ✅ Add Recipe popup function
  const openAddRecipePopup = () => {
    if (!user || !token) {
      Swal.fire("Please login to add a recipe!");
      return;
    }

    MySwal.fire({
     // title: "Add New Recipe",
      showConfirmButton: false,
      showCloseButton: true,
      width: 600,
      html: "<div id='add-recipe-popup'></div>",
      didOpen: () => {
        const container = document.getElementById("add-recipe-popup");
        const root = ReactDOM.createRoot(container);
        root.render(
          <AddRecipe
            user={user}
            token={token}
            onRecipeAdded={() => {
              MySwal.close();
            }}
          />
        );
      },
    });
  };

  return (
    <nav className="bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md">
              <BookOpen size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Recipe Planner
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          {menuItems.map(({ name, path }) => (
            <li key={name} className="relative group">
              <Link
                to={path}
                className="px-4 py-2 text-gray-700 group-hover:text-indigo-700 transition-colors duration-300 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}

          {/* Add Recipe Button */}
          {user && (
            <li>
              <button
                onClick={openAddRecipePopup}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Add Recipe
              </button>
            </li>
          )}

          {/* Add Meal Plan History link if user is logged in */}
          {user && (
            <li className="relative group">
              <Link
                to="/meal-plan-history"
                className="px-4 py-2 text-indigo-700 font-semibold hover:text-indigo-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Meal Plan History
              </Link>
            </li>
          )}
        </ul>

        {/* Auth Buttons or User Info */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-indigo-700 font-semibold">Hello, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-indigo-700 font-semibold hover:text-indigo-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-xl bg-white shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} className="text-indigo-700" /> : <Menu size={26} className="text-indigo-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
     {/* Mobile Dropdown Menu */}
<div
  className={`md:hidden transition-all duration-500 ease-in-out ${
    isOpen
      ? "max-h-[32rem] opacity-100 translate-y-0"
      : "max-h-0 opacity-0 -translate-y-4"
  } overflow-hidden`}
>
  <div className="bg-white/95 backdrop-blur-lg mx-2 sm:mx-4 mt-2 py-4 text-base sm:text-lg shadow-xl rounded-2xl border border-indigo-100">
    <ul className="flex flex-col space-y-1 sm:space-y-2">
      {menuItems.map(({ name, path }) => (
        <li key={name}>
          <Link
            to={path}
            className="block px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 cursor-pointer transition-all duration-300 font-medium rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            {name}
          </Link>
        </li>
      ))}

      {/* Add Recipe Button */}
      {user && (
        <li>
          <button
            onClick={() => {
              setIsOpen(false);
              openAddRecipePopup();
            }}
            className="block w-full text-left px-4 sm:px-6 py-2.5 sm:py-3 text-white bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mt-1"
          >
            Add Recipe
          </button>
        </li>
      )}

      {/* Meal Plan History */}
      {user && (
        <li>
          <Link
            to="/meal-plan-history"
            className="block px-4 sm:px-6 py-2.5 sm:py-3 text-indigo-700 font-semibold hover:text-indigo-900 transition-colors rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Meal Plan History
          </Link>
        </li>
      )}
    </ul>

    {/* Auth Buttons for Mobile */}
    <div className="border-t border-indigo-100 mt-3 pt-4 px-4 sm:px-6 flex flex-col space-y-3">
      {user ? (
        <>
          <span className="text-indigo-700 font-semibold text-center text-sm sm:text-base">
            Hello, {user.name}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="px-4 py-2 text-indigo-700 font-semibold text-center hover:text-indigo-900 transition-colors text-sm sm:text-base"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center text-sm sm:text-base"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  </div>
</div>

    </nav>
  );
};

export default Navbar;
