import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../slices/cartSlice";
import { toast } from "react-toastify"; // Import toast
import AddToCartButton from "./AddToCartButton"; // Import the button component

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, description, price, image, rating } = product;

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success("Item added to cart!"); // Display success message
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${id}`}>
        <div className="w-full h-64 relative">
          <img src={image} alt={title} className="w-full h-full object-fill" />
        </div>
      </Link>

      <div className="p-4 flex flex-col justify-between h-60">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 truncate">{description}</p>
        </div>
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
        <AddToCartButton onClick={handleAddToCart} />
      </div>
    </div>
  );
};

export default Product;
