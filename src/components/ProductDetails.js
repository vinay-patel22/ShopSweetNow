import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details from API
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const { title, description, price, image, rating } = product;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <img src={image} alt={title} className="w-auto h-auto object-fill" />
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 mb-4">{description}</p>
          <span className="text-xl font-bold text-gray-800">
            Price: ${price.toFixed(2)}
          </span>
          <div className="mt-2 text-gray-500 text-sm">
            <span>
              Rating: {rating.rate} ({rating.count} reviews)
            </span>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out mt-4">
            Add to Cart
          </button>
          <Link to="/" className="block mt-4 text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
