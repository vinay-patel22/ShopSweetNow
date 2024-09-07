import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { id, title, description, price, image, rating } = product;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* Image */}
      <Link to={`/product/${id}`}>
        <div className="w-full h-64 relative">
          <img src={image} alt={title} className="w-full h-full object-fill" />
        </div>
      </Link>

      <div className="p-4 flex flex-col justify-between h-60">
        {/* title & description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 truncate">{description}</p>
        </div>
        {/* price, rating & reviews*/}
        <div className="flex items-center mb-10">
          <span className="text-xl font-bold text-gray-800">
            ${price.toFixed(2)}
          </span>
          <div className="ml-auto text-gray-500 text-sm">
            <span>
              Rating: {rating.rate} ({rating.count} reviews)
            </span>
          </div>
        </div>

        {/* Add to cart button */}
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
