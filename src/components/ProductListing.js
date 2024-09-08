import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  setLoading,
} from "../slices/productsSlice";
import SearchBar from "./SearchBar";
import FilterOptions from "./FilterOptions";

const ProductListing = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [filteredItems, setFilteredItems] = useState([]);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading());
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        dispatch(fetchProductsSuccess(data));
        setFilteredItems(data); // Initialize filteredItems with all products
      } catch (err) {
        dispatch(fetchProductsFailure(err.message));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleSearch = (query) => {
    setQuery(query);
    setHasSearched(true);

    if (query.trim() === "") {
      setFilteredItems(items); // Show all products if search is cleared
      setHasSearched(false); // Reset search state when clearing
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = items.filter((product) =>
        Object.values(product).some((value) =>
          value.toString().toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredItems(filtered);
    }
  };

  const handleSort = (order) => {
    const sortedItems = [...filteredItems].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredItems(sortedItems);
  };

  const handleReset = () => {
    setFilteredItems(items); // Reset the filtered items to original list
    setQuery(""); // Clear the search query
    setHasSearched(false); // Reset search state
  };

  if (status === "loading")
    return <p className="text-center text-gray-700 mt-4">Loading...</p>;
  if (status === "failed")
    return <p className="text-center text-red-500 mt-4">Error: {error}</p>;

  return (
    <>
      <div className="p-2 m-2 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <SearchBar onSearch={handleSearch} suggestions={items} />
          <FilterOptions onSort={handleSort} onReset={handleReset} />
        </div>
      </div>
      {filteredItems.length === 0 && hasSearched ? (
        <p className="text-center text-gray-500 mt-4">
          Product will be updated soon...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredItems.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductListing;
