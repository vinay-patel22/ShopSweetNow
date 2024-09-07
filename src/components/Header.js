// Header.jsx
import React from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; // Import icons from react-icons
import CompanyLogo from "../images/CompanyLogo.png"; // Updated logo path

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Company Logo */}
      <div className="flex items-center">
        <img src={CompanyLogo} alt="Company Logo" className="h-12" />
      </div>

      {/* Welcome Message and Slogan */}
      <div className="flex-1 text-center">
        <p className="text-2xl font-extrabold text-gray-800">
          Welcome to ShopSweetNow
        </p>
        <p className="text-sm text-black-600">
          Your one-stop shop for the sweetest deals!
        </p>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-6">
        {/* Shopping Cart Icon */}
        <div className="relative">
          <FaShoppingCart className="text-purple-600 text-2xl cursor-pointer" />
          {/* Optional cart item count can be added here */}
        </div>

        {/* User Profile Icon */}
        <FaUserCircle className="text-purple-600 text-2xl cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
